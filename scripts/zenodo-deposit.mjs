// Zenodo deposit pipeline for the foundational corpus.
// =====================================================================
// Registers a citable DOI for each foundational essay while declaring the
// live page as the canonical original. Consumes docs/zenodo/manifest.json
// (the reconciled metadata + sibling graph) and attaches BOTH the PDF and
// the raw markdown source to every record.
//
// SAFETY MODEL (read this before running):
//   - DRY RUN IS THE DEFAULT. Nothing hits the network unless --execute is
//     passed AND a token is present. The dry run builds every payload,
//     materializes the reciprocal sibling graph over simulated reserved
//     DOIs, validates each payload against the deposit schema locally, and
//     prints it. Zero network calls.
//   - Sandbox is the default target. Production requires BOTH --production
//     and --confirm-production; either alone is refused.
//
// USAGE:
//   node scripts/zenodo-deposit.mjs                       # sandbox DRY RUN
//   node scripts/zenodo-deposit.mjs --execute             # sandbox LIVE (needs token)
//   node scripts/zenodo-deposit.mjs --production --confirm-production --execute
//
// ENV (.env in repo root, gitignored):
//   ZENODO_SANDBOX_TOKEN=...   # used when target = sandbox
//   ZENODO_TOKEN=...           # used when target = production
//   ORCID_ID=0000-0000-0000-0000
//
// The classic Zenodo deposit API is used (works on both zenodo.org and
// sandbox.zenodo.org). Reserve -> cross-link -> publish ordering lets the
// sibling related_identifiers reference DOIs that are reserved but not yet
// published.

import { readFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MANIFEST_PATH = join(ROOT, 'docs', 'zenodo', 'manifest.json');

const SANDBOX_BASE = 'https://sandbox.zenodo.org/api';
const PRODUCTION_BASE = 'https://zenodo.org/api';
const COMMUNITY_TITLE = 'Environmental Superintelligence';
const COMMUNITY_ID = 'environmental-superintelligence';
const COMMUNITY_DESCRIPTION =
  'Environmental superintelligence, information physics, and the causal sovereignty of knowledge over matter and energy — the foundational corpus of Jed Anderson / EnviroAI.';

const CREATOR_NAME = 'Anderson, Jed';
const CREATOR_AFFILIATION = 'EnviroAI';

// DataCite/Zenodo relation types we emit. Reciprocity is encoded in the
// manifest; this is the allow-list the local validator enforces.
const ALLOWED_RELATIONS = new Set([
  'cites', 'isCitedBy',
  'references', 'isReferencedBy',
  'isSupplementTo', 'isSupplementedBy',
  'isVariantFormOf', 'isOriginalFormOf',
  'isPartOf', 'hasPart',
  'continues', 'isContinuedBy',
  'isDerivedFrom', 'isSourceOf',
]);

// ---------------------------------------------------------------------
// CLI + env
// ---------------------------------------------------------------------

function parseArgs(argv) {
  const args = argv.slice(2);
  const flags = new Set(args);
  const production = flags.has('--production');
  const confirmProduction = flags.has('--confirm-production');
  const execute = flags.has('--execute');
  // --only=<slug> scopes the run to a single record (canary).
  const onlyArg = args.find((a) => a.startsWith('--only='));
  const only = onlyArg ? onlyArg.slice('--only='.length) : null;
  // --add-to-community=<recid> joins an existing published record to the
  // community (find/create + inclusion request), then exits. No deposit.
  const addArg = args.find((a) => a.startsWith('--add-to-community='));
  const addToCommunity = addArg ? addArg.slice('--add-to-community='.length) : null;
  // --reversion=<recid> creates a new version of an existing record whose
  // only change is replacing the attached .md with its frontmatter-stripped
  // body. Requires --only=<slug> to identify the source .md. No metadata change.
  const revArg = args.find((a) => a.startsWith('--reversion='));
  const reversion = revArg ? revArg.slice('--reversion='.length) : null;
  // --complete-draft=<draftId> finishes an EXISTING new-version draft (strip
  // its .md + publish). Recovery path for a draft left by a failed reversion.
  const cdArg = args.find((a) => a.startsWith('--complete-draft='));
  const completeDraft = cdArg ? cdArg.slice('--complete-draft='.length) : null;
  // --expect-concept=<doi> aborts before publish if the draft's concept DOI
  // differs (guards against accidentally minting a second concept DOI).
  const ecArg = args.find((a) => a.startsWith('--expect-concept='));
  const expectConcept = ecArg ? ecArg.slice('--expect-concept='.length) : null;
  // --sandbox is the default and accepted explicitly; --production overrides.
  return { production, confirmProduction, execute, only, addToCommunity, reversion, completeDraft, expectConcept };
}

async function loadDotEnv() {
  const envPath = join(ROOT, '.env');
  try {
    const raw = await readFile(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/i);
      if (!m) continue;
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!(m[1] in process.env)) process.env[m[1]] = val;
    }
  } catch {
    // no .env — fine; rely on process.env / dry run.
  }
}

async function exists(p) {
  try { await access(p, constants.R_OK); return true; } catch { return false; }
}

// ---------------------------------------------------------------------
// Frontmatter cross-check (defensive; no external deps)
// ---------------------------------------------------------------------

async function liveFrontmatter(slug) {
  const p = join(ROOT, 'src', 'content', 'essays', `${slug}.md`);
  const raw = (await readFile(p, 'utf8')).replace(/\r\n/g, '\n');
  const end = raw.indexOf('\n---', 3);
  const fm = end === -1 ? '' : raw.slice(4, end);
  const title = (fm.match(/^title:\s*['"]?(.+?)['"]?\s*$/m) || [])[1] || null;
  const date = (fm.match(/^date:\s*['"]?(\d{4}-\d{2}-\d{2})/m) || [])[1] || null;
  return { title, date };
}

// Strip a leading YAML frontmatter block (--- ... ---) and return only the
// prose body. The repo source keeps its frontmatter; only the Zenodo-attached
// .md copy is stripped. No-op if the file has no frontmatter block.
function stripFrontmatter(raw) {
  const norm = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const m = norm.match(/^---\n[\s\S]*?\n---[ \t]*\n?/);
  if (!m) return norm;
  return norm.slice(m[0].length).replace(/^\n+/, '');
}

// Return {name, body} for an attachment. Markdown is frontmatter-stripped;
// all other files (PDF) are read verbatim as bytes.
async function fileToUpload(relPath) {
  const abs = join(ROOT, relPath);
  const name = basename(abs);
  if (name.toLowerCase().endsWith('.md')) {
    const raw = await readFile(abs, 'utf8');
    return { name, body: Buffer.from(stripFrontmatter(raw), 'utf8') };
  }
  return { name, body: await readFile(abs) };
}

// ---------------------------------------------------------------------
// Payload construction
// ---------------------------------------------------------------------

// Build the Zenodo metadata payload for one record. `doiBySlug` maps each
// sibling slug to its reserved DOI so the reciprocal graph can be wired
// across DOIs. The canonical web page is always declared isVariantFormOf.
function buildMetadata(record, doiBySlug, orcid, communities) {
  const related = [
    {
      identifier: record.canonical_url,
      relation: 'isVariantFormOf',
      scheme: 'url',
    },
  ];
  for (const sib of record.siblings || []) {
    const doi = doiBySlug[sib.slug];
    if (!doi) continue; // sibling not in this run
    related.push({ identifier: doi, relation: sib.relation, scheme: 'doi' });
  }

  const creators = [{ name: CREATOR_NAME, affiliation: CREATOR_AFFILIATION }];
  if (orcid) creators[0].orcid = orcid;

  const metadata = {
    upload_type: record.upload_type,            // 'publication'
    publication_type: record.publication_type,  // 'workingpaper'
    title: record.title,
    publication_date: record.publication_date,
    creators,
    description: record.description_html,
    keywords: record.keywords || [],
    license: record.license,                    // 'cc-by-4.0'
    related_identifiers: related,
  };
  if (communities && communities.length) {
    metadata.communities = communities.map((id) => ({ identifier: id }));
  }
  return { metadata };
}

// ---------------------------------------------------------------------
// Local schema validation (no network)
// ---------------------------------------------------------------------

function validatePayload(payload, record, filesOnDisk, orcidExpected) {
  const errors = [];
  const warnings = [];
  const m = payload.metadata;

  if (m.upload_type !== 'publication') errors.push('upload_type must be "publication"');
  if (m.publication_type !== 'workingpaper') errors.push('publication_type must be "workingpaper"');
  if (typeof m.title !== 'string' || !m.title.trim()) errors.push('title missing/empty');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(m.publication_date || '')) errors.push('publication_date not YYYY-MM-DD');
  if (m.license !== 'cc-by-4.0') warnings.push(`license is "${m.license}" (expected cc-by-4.0)`);

  if (!Array.isArray(m.creators) || m.creators.length === 0) {
    errors.push('creators empty');
  } else {
    if (m.creators[0].name !== CREATOR_NAME) errors.push(`creators[0].name must be "${CREATOR_NAME}"`);
    if (m.creators[0].affiliation !== CREATOR_AFFILIATION) warnings.push('creators[0].affiliation not EnviroAI');
    if (orcidExpected) {
      if (m.creators[0].orcid !== orcidExpected) errors.push('creators[0].orcid does not match ORCID_ID');
    } else if (!m.creators[0].orcid) {
      warnings.push('creators[0].orcid empty (ORCID_ID not set) — will be filled when .env provides it');
    }
  }

  if (typeof m.description !== 'string' || m.description.length < 80) errors.push('description missing/too short');
  if (m.description && !m.description.includes(record.canonical_url)) {
    warnings.push('description does not contain canonical URL line');
  }
  if (!Array.isArray(m.keywords) || m.keywords.length === 0) warnings.push('keywords empty');

  // related_identifiers
  if (!Array.isArray(m.related_identifiers)) {
    errors.push('related_identifiers missing');
  } else {
    const variants = m.related_identifiers.filter((r) => r.relation === 'isVariantFormOf');
    if (variants.length !== 1) errors.push('expected exactly one isVariantFormOf (canonical URL)');
    if (variants[0] && variants[0].identifier !== record.canonical_url) {
      errors.push('isVariantFormOf identifier is not the canonical URL');
    }
    for (const r of m.related_identifiers) {
      if (!r.identifier) errors.push('related_identifier with no identifier');
      if (!ALLOWED_RELATIONS.has(r.relation)) errors.push(`disallowed relation "${r.relation}"`);
      if (!['doi', 'url'].includes(r.scheme)) errors.push(`unexpected scheme "${r.scheme}"`);
      if (r.scheme === 'doi' && !/^10\.\d{4,9}\//.test(r.identifier)) {
        errors.push(`related DOI "${r.identifier}" not a DOI`);
      }
    }
    // sibling count check (canonical + each sibling that resolved)
    const expectedSiblings = (record.siblings || []).length;
    const gotSiblings = m.related_identifiers.filter((r) => r.scheme === 'doi').length;
    if (gotSiblings !== expectedSiblings) {
      warnings.push(`sibling DOI links: got ${gotSiblings}, manifest declares ${expectedSiblings}`);
    }
  }

  // communities
  if (m.communities) {
    if (!Array.isArray(m.communities) || !m.communities.every((c) => c.identifier)) {
      errors.push('communities malformed');
    }
  } else {
    warnings.push('no community set (inclusion deferred)');
  }

  // files
  for (const [kind, present] of Object.entries(filesOnDisk)) {
    if (!present) errors.push(`attachment missing on disk: ${kind}`);
  }
  if (Object.keys(filesOnDisk).length !== 2) errors.push('expected exactly 2 attachments (pdf + markdown)');

  return { errors, warnings };
}

// ---------------------------------------------------------------------
// Network layer (only reached with --execute + token)
// ---------------------------------------------------------------------

const RETRYABLE = new Set([429, 500, 502, 503, 504]);

async function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function zfetch(base, path, token, opts = {}, attempt = 0) {
  const sep = path.includes('?') ? '&' : '?';
  const url = path.startsWith('http') ? path : `${base}${path}${sep}access_token=${token}`;
  const res = await fetch(url, opts);
  if (RETRYABLE.has(res.status) && attempt < 6) {
    const retryAfter = Number(res.headers.get('retry-after')) || 0;
    const backoff = retryAfter > 0 ? retryAfter * 1000 : Math.min(60000, 1000 * 2 ** attempt) + Math.floor(Math.random() * 500);
    console.warn(`  ↻ HTTP ${res.status} on ${opts.method || 'GET'} ${path} — retry ${attempt + 1}/6 in ${Math.round(backoff)}ms`);
    await sleep(backoff);
    return zfetch(base, path, token, opts, attempt + 1);
  }
  if (!res.ok) {
    throw new Error(`Zenodo ${opts.method || 'GET'} ${path} → HTTP ${res.status}: ${await res.text()}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

// InvenioRDM communities API (current zenodo.org). Find by exact slug
// (GET /api/communities/{slug} → 200 or 404); create with the InvenioRDM
// shape {slug, metadata:{title,description,type:{id}}, access:{...}}.
// Returns {id (uuid), slug, created} or null on failure.
async function findOrCreateCommunity(base, token) {
  const H = { Authorization: `Bearer ${token}` };
  // Exact find by slug.
  let res = await fetch(`${base}/communities/${COMMUNITY_ID}`, { headers: H });
  if (res.status === 200) {
    const c = await res.json();
    console.log(`  ✓ community found: ${c.slug} (${c.id})`);
    return { id: c.id, slug: c.slug, created: false };
  }
  if (res.status !== 404) {
    console.warn(`  ! community lookup HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  // Create (InvenioRDM shape).
  const body = {
    slug: COMMUNITY_ID,
    metadata: {
      title: COMMUNITY_TITLE,
      description: COMMUNITY_DESCRIPTION,
      type: { id: 'topic' },
    },
    access: {
      visibility: 'public',
      member_policy: 'closed',
      record_policy: 'open',
      review_policy: 'closed',
    },
  };
  res = await fetch(`${base}/communities`, {
    method: 'POST',
    headers: { ...H, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (res.status === 201) {
    const c = await res.json();
    console.log(`  ✓ community created: ${c.slug} (${c.id})`);
    return { id: c.id, slug: c.slug, created: true };
  }
  console.warn(`  ! community creation failed HTTP ${res.status}: ${(await res.text()).slice(0, 400)}`);
  return null;
}

// InvenioRDM: submit an already-published record to a community. Creates a
// community-submission/inclusion request the curator approves in Requests.
// POST /api/records/{recid}/communities {communities:[{id}]}.
async function submitRecordToCommunity(base, token, recid, communityId) {
  const res = await fetch(`${base}/records/${recid}/communities`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ communities: [{ id: communityId }] }),
  });
  const raw = await res.text();
  let data = {};
  try { data = raw ? JSON.parse(raw) : {}; } catch { /* keep raw */ }
  const processed = data.processed || [];
  const errors = data.errors || [];
  const requestId = processed[0]?.request_id || processed[0]?.request?.id || null;
  return { status: res.status, ok: res.status >= 200 && res.status < 300 && errors.length === 0, requestId, processed, errors, raw };
}

async function liveDeposit(base, token, orcid, records) {
  // Resolve the community up front (InvenioRDM). Inclusion happens AFTER
  // publish via submitRecordToCommunity — the legacy metadata.communities
  // field is ignored by current Zenodo, so we do not set it.
  const community = await findOrCreateCommunity(base, token);
  const communities = [];

  // 1. Reserve all DOIs by creating empty drafts.
  const state = {};
  for (const rec of records) {
    const dep = await zfetch(base, '/deposit/depositions', token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const doi = dep.metadata?.prereserve_doi?.doi;
    if (!doi) throw new Error(`${rec.slug}: no reserved DOI returned`);
    state[rec.slug] = { id: dep.id, bucket: dep.links.bucket, reservedDoi: doi };
    console.log(`  ✓ reserved ${rec.slug} → ${doi} (dep ${dep.id})`);
  }
  const doiBySlug = Object.fromEntries(records.map((r) => [r.slug, state[r.slug].reservedDoi]));

  // 2. Attach metadata (cross-linked) + upload both files.
  for (const rec of records) {
    const { id, bucket } = state[rec.slug];
    const payload = buildMetadata(rec, doiBySlug, orcid, communities);
    await zfetch(base, `/deposit/depositions/${id}`, token, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    for (const relPath of [rec.files.pdf, rec.files.markdown]) {
      const { name, body } = await fileToUpload(relPath);
      const put = await fetch(`${bucket}/${name}?access_token=${token}`, { method: 'PUT', body });
      if (!put.ok) throw new Error(`${rec.slug}: upload ${name} → HTTP ${put.status}: ${await put.text()}`);
    }
    console.log(`  ✓ metadata + 2 files attached (md frontmatter-stripped): ${rec.slug}`);
  }

  // 3. Publish all (mints DOIs).
  for (const rec of records) {
    const { id } = state[rec.slug];
    const pub = await zfetch(base, `/deposit/depositions/${id}/actions/publish`, token, { method: 'POST' });
    state[rec.slug].published = pub;
    console.log(`  ✓ published ${rec.slug} → ${pub.doi}`);
  }

  // 4. Submit each published record to the community (InvenioRDM inclusion).
  if (community) {
    for (const rec of records) {
      const recid = state[rec.slug].id;
      const sub = await submitRecordToCommunity(base, token, recid, community.id);
      state[rec.slug].inclusion = sub;
      console.log(`  ${sub.ok ? '✓' : '✗'} community submit ${rec.slug}: HTTP ${sub.status}${sub.requestId ? ` req ${sub.requestId}` : ''}${sub.errors.length ? ` errors=${JSON.stringify(sub.errors).slice(0, 200)}` : ''}`);
    }
  } else {
    console.warn('  ! no community resolved — inclusion skipped.');
  }

  // 5. GET each + assert.
  console.log('\n== Post-publish assertions ==');
  for (const rec of records) {
    const { id } = state[rec.slug];
    const got = await zfetch(base, `/deposit/depositions/${id}`, token);
    const m = got.metadata || {};
    const inc = state[rec.slug].inclusion;
    const assert = (cond, msg) => console.log(`  ${cond ? '✓' : '✗'} ${rec.slug}: ${msg}`);
    assert(!!got.doi, `DOI minted (${got.doi})`);
    assert(m.title === rec.title, `title matches frontmatter`);
    assert((m.license?.id || m.license) === 'cc-by-4.0' || (m.license === 'CC-BY-4.0'), `license correct`);
    assert((got.files || []).length === 2, `both files attached (${(got.files || []).length})`);
    assert((m.related_identifiers || []).length >= 1, `related identifiers present (${(m.related_identifiers || []).length})`);
    assert(m.creators?.[0]?.orcid === orcid, `ORCID round-trips (${m.creators?.[0]?.orcid})`);
    assert(!!(inc && inc.ok), `community inclusion request created${inc?.requestId ? ` (req ${inc.requestId})` : ''}`);
    console.log(`    record: ${got.links?.html || got.links?.record_html || '(url n/a)'} | concept: ${got.conceptdoi || '(n/a)'} | version: ${got.doi}`);
  }
}

// InvenioRDM: replace the .md on an existing draft with its frontmatter-
// stripped body, then publish. All other files (the PDF) are left untouched.
// The legacy deposit API cannot read/edit InvenioRDM new-version drafts, so
// the whole file lifecycle uses the InvenioRDM records/draft API.
async function replaceMdAndPublish(base, token, draftId, rec) {
  const H = { Authorization: `Bearer ${token}` };
  const JH = { ...H, 'Content-Type': 'application/json' };
  const { name: mdName, body: strippedBody } = await fileToUpload(rec.files.markdown);

  // a. Delete the existing .md entry (ignore 404).
  let r = await fetch(`${base}/records/${draftId}/draft/files/${mdName}`, { method: 'DELETE', headers: H });
  if (!r.ok && r.status !== 404) throw new Error(`delete ${mdName} → HTTP ${r.status}: ${await r.text()}`);
  console.log(`  ✓ deleted existing ${mdName} (HTTP ${r.status})`);

  // b. Re-create the file key.
  r = await fetch(`${base}/records/${draftId}/draft/files`, { method: 'POST', headers: JH, body: JSON.stringify([{ key: mdName }]) });
  if (!r.ok) throw new Error(`create key ${mdName} → HTTP ${r.status}: ${await r.text()}`);

  // c. Upload the stripped content.
  r = await fetch(`${base}/records/${draftId}/draft/files/${mdName}/content`, {
    method: 'PUT', headers: { ...H, 'Content-Type': 'application/octet-stream' }, body: strippedBody,
  });
  if (!r.ok) throw new Error(`upload ${mdName} content → HTTP ${r.status}: ${await r.text()}`);

  // d. Commit the file.
  r = await fetch(`${base}/records/${draftId}/draft/files/${mdName}/commit`, { method: 'POST', headers: JH });
  if (!r.ok) throw new Error(`commit ${mdName} → HTTP ${r.status}: ${await r.text()}`);
  console.log(`  ✓ replaced ${mdName} with frontmatter-stripped body (${strippedBody.length} bytes), PDF untouched`);

  // e. Publish (mints a new version DOI; concept DOI preserved).
  r = await fetch(`${base}/records/${draftId}/draft/actions/publish`, { method: 'POST', headers: JH });
  if (!r.ok) throw new Error(`publish draft ${draftId} → HTTP ${r.status}: ${await r.text()}`);
  const published = await r.json();
  console.log(`  ✓ published v2 → record ${published.id} (doi ${published.pids?.doi?.identifier})`);
  return published.id;
}

// Full reversion: open a NEW InvenioRDM version of a published record, import
// the parent's files, then strip+publish via replaceMdAndPublish. (Used for
// fresh reversions; the one-off recovery of an existing draft uses
// replaceMdAndPublish directly — see --complete-draft.)
async function reversionStripMd(base, token, recid, rec) {
  const JH = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  let r = await fetch(`${base}/records/${recid}/versions`, { method: 'POST', headers: JH });
  if (!r.ok) throw new Error(`new version of ${recid} → HTTP ${r.status}: ${await r.text()}`);
  const draft = await r.json();
  console.log(`  ✓ new-version draft ${draft.id} (parent concept ${draft.conceptdoi})`);
  r = await fetch(`${base}/records/${draft.id}/draft/actions/files-import`, { method: 'POST', headers: JH });
  if (!r.ok) throw new Error(`files-import → HTTP ${r.status}: ${await r.text()}`);
  console.log('  ✓ imported parent files into draft');
  return replaceMdAndPublish(base, token, draft.id, rec);
}

// InvenioRDM post-publish verification for a stripped-md reversion. Asserts
// the user's full checklist against the live v2 record + the v1 record.
async function verifyReversion(base, token, v2recid, v1recid, rec, expectedStrippedLen) {
  const H = { Authorization: `Bearer ${token}` };
  const v2 = await (await fetch(`${base}/records/${v2recid}`, { headers: H })).json();
  const v1 = await (await fetch(`${base}/records/${v1recid}`, { headers: H })).json();
  const v2files = await (await fetch(`${base}/records/${v2recid}/files`, { headers: H })).json();
  const fEntries = v2files.entries || [];
  const pdf = fEntries.find((f) => f.key.toLowerCase().endsWith('.pdf'));
  const md = fEntries.find((f) => f.key.toLowerCase().endsWith('.md'));
  const v1pdf = (v1.files || []).find((f) => (f.key || f.filename || '').toLowerCase().endsWith('.pdf'));
  // Download the v2 .md to inspect head + exact size.
  let mdText = '';
  try { mdText = await (await fetch(md?.links?.content, { headers: H })).text(); } catch { /* */ }

  const communities = v2.parent?.communities?.ids || (v2.metadata?.communities || []).map((c) => c.id || c);
  const inCommunity = JSON.stringify(communities).includes('environmental-superintelligence') || (communities || []).includes('48f676d9-b2d1-4b61-b892-8c17bdcf8c40');

  const A = (cond, msg) => { console.log(`  ${cond ? '✓' : '✗'} ${msg}`); return !!cond; };
  console.log('\n== v2 assertions ==');
  const ok = [
    A(v2.conceptdoi === '10.5281/zenodo.20723029', `concept DOI unchanged (${v2.conceptdoi})`),
    A(!!v2.doi && v2.doi !== v1.doi, `new version DOI minted (${v2.doi})`),
    A(fEntries.length === 2, `two files present (${fEntries.map((f) => f.key).join(', ')})`),
    A(md && md.size === expectedStrippedLen, `.md is stripped (${md?.size} bytes, expected ${expectedStrippedLen})`),
    A(!!mdText && !mdText.startsWith('---'), `.md does not start with frontmatter (---)`),
    A(pdf && v1pdf && pdf.checksum === v1pdf.checksum, `PDF byte-identical to v1 (${pdf?.checksum})`),
    A(v2.metadata?.title === rec.title, `title carried (${v2.metadata?.title})`),
    A((v2.metadata?.rights?.[0]?.id || v2.metadata?.license?.id) === 'cc-by-4.0', `license carried (cc-by-4.0)`),
    A(v2.metadata?.creators?.[0]?.person_or_org?.identifiers?.some((i) => i.identifier === (process.env.ORCID_ID || '')) || v2.metadata?.creators?.[0]?.orcid === (process.env.ORCID_ID || ''), `ORCID carried`),
    A(inCommunity, `community environmental-superintelligence inherited at parent`),
  ];
  return { allOk: ok.every(Boolean), communityInherited: inCommunity, v2, recordHtml: v2.links?.self_html, versionDoi: v2.doi, conceptdoi: v2.conceptdoi };
}

// ---------------------------------------------------------------------
// Dry run (no network)
// ---------------------------------------------------------------------

async function dryRun(records, orcid) {
  // Simulate reserved DOIs so the reciprocal graph materializes in the
  // printed payloads. Sandbox uses the 10.5072 prefix.
  const doiBySlug = Object.fromEntries(
    records.map((r, i) => [r.slug, `10.5072/zenodo.DRYRUN-${String(i + 1).padStart(4, '0')}`])
  );
  // Community is unknown without network; show what would be requested.
  const communities = [COMMUNITY_ID];

  let totalErrors = 0;
  const printable = [];
  for (const rec of records) {
    const payload = buildMetadata(rec, doiBySlug, orcid, communities);
    const filesOnDisk = {
      [rec.files.pdf]: await exists(join(ROOT, rec.files.pdf)),
      [rec.files.markdown]: await exists(join(ROOT, rec.files.markdown)),
    };
    // Defensive: manifest vs live frontmatter drift.
    const live = await liveFrontmatter(rec.slug);
    const drift = [];
    if (live.title && live.title !== rec.title) drift.push(`title manifest="${rec.title}" live="${live.title}"`);
    if (live.date && live.date !== rec.publication_date) drift.push(`date manifest="${rec.publication_date}" live="${live.date}"`);

    const { errors, warnings } = validatePayload(payload, rec, filesOnDisk, orcid);
    totalErrors += errors.length;

    console.log('\n' + '='.repeat(72));
    console.log(`RECORD: ${rec.slug}   [${rec.description_status}]`);
    console.log('='.repeat(72));
    console.log('would attach:');
    for (const [f, ok] of Object.entries(filesOnDisk)) console.log(`  ${ok ? '✓' : '✗ MISSING'}  ${f}`);
    console.log('would request community:', communities.join(', '));
    console.log('reserved-DOI (simulated):', doiBySlug[rec.slug]);
    console.log('PAYLOAD:');
    console.log(JSON.stringify(payload, null, 2));
    if (drift.length) console.log('FRONTMATTER DRIFT:', drift.join(' | '));
    console.log(`VALIDATION: ${errors.length} error(s), ${warnings.length} warning(s)`);
    for (const e of errors) console.log(`  ✗ ERROR  ${e}`);
    for (const w of warnings) console.log(`  ⚠ warn   ${w}`);
    printable.push({ slug: rec.slug, payload, files: Object.keys(filesOnDisk), errors, warnings, drift });
  }

  console.log('\n' + '='.repeat(72));
  console.log(`DRY RUN COMPLETE: ${records.length} records, ${totalErrors} blocking error(s) total.`);
  console.log('No network calls were made. Add a token + run with --execute to deposit to sandbox.');
  console.log('='.repeat(72));
  return totalErrors === 0;
}

// ---------------------------------------------------------------------
// main
// ---------------------------------------------------------------------

async function main() {
  const { production, confirmProduction, execute, only, addToCommunity, reversion, completeDraft, expectConcept } = parseArgs(process.argv);
  await loadDotEnv();

  // Target + production guard.
  let base = SANDBOX_BASE;
  let target = 'sandbox';
  if (production) {
    if (!confirmProduction) {
      console.error('REFUSED: --production requires --confirm-production. No call made.');
      process.exit(2);
    }
    base = PRODUCTION_BASE;
    target = 'production';
    console.warn('\n*** PRODUCTION TARGET ARMED (zenodo.org) — this mints real, permanent DOIs ***\n');
  }

  const token = target === 'sandbox' ? process.env.ZENODO_SANDBOX_TOKEN : process.env.ZENODO_TOKEN;
  const orcid = process.env.ORCID_ID || '';

  // Standalone: join an existing published record to the community. No deposit.
  if (addToCommunity) {
    if (!token) {
      console.error(`REFUSED: no ${target === 'sandbox' ? 'ZENODO_SANDBOX_TOKEN' : 'ZENODO_TOKEN'} in env/.env.`);
      process.exit(2);
    }
    console.log(`== Community inclusion | target=${target} | record=${addToCommunity} ==`);
    const community = await findOrCreateCommunity(base, token);
    if (!community) {
      console.error('FAILED: could not find or create the community.');
      process.exit(1);
    }
    const sub = await submitRecordToCommunity(base, token, addToCommunity, community.id);
    console.log(`  community: ${community.slug} (${community.id}) — ${community.created ? 'CREATED' : 'found'}`);
    console.log(`  inclusion: HTTP ${sub.status} — ${sub.ok ? 'request created' : 'NOT created'}${sub.requestId ? ` (req ${sub.requestId})` : ''}`);
    if (sub.errors.length) console.log(`  errors: ${JSON.stringify(sub.errors).slice(0, 400)}`);
    if (!sub.ok && !sub.errors.length) console.log(`  raw: ${sub.raw.slice(0, 400)}`);
    process.exit(sub.ok ? 0 : 1);
  }

  // Standalone: new version of an existing record with a frontmatter-stripped .md.
  if (reversion) {
    if (!token) {
      console.error(`REFUSED: no ${target === 'sandbox' ? 'ZENODO_SANDBOX_TOKEN' : 'ZENODO_TOKEN'} in env/.env.`);
      process.exit(2);
    }
    if (!only) {
      console.error('REFUSED: --reversion requires --only=<slug> to identify the source .md.');
      process.exit(2);
    }
    const m = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
    const rec = m[only];
    if (!rec) { console.error(`REFUSED: --only=${only} matched no manifest record.`); process.exit(2); }
    console.log(`== New version (strip md) | target=${target} | record=${reversion} | slug=${only} ==`);
    const v2recid = await reversionStripMd(base, token, reversion, rec);
    const expLen = (await fileToUpload(rec.files.markdown)).body.length;
    const v = await verifyReversion(base, token, v2recid, reversion, rec, expLen);
    console.log(`\n  record: ${v.recordHtml} | concept: ${v.conceptdoi} | new version: ${v.versionDoi}`);
    if (!v.communityInherited) console.error('\n⚠ STOP: community did NOT inherit at parent — NOT auto-resubmitting. Flag to operator.');
    process.exit(v.allOk ? 0 : 1);
  }

  // Standalone: complete an EXISTING new-version draft (strip md + publish).
  if (completeDraft) {
    if (!token) { console.error(`REFUSED: no ${target === 'sandbox' ? 'ZENODO_SANDBOX_TOKEN' : 'ZENODO_TOKEN'} in env/.env.`); process.exit(2); }
    if (!only) { console.error('REFUSED: --complete-draft requires --only=<slug> to identify the source .md.'); process.exit(2); }
    const m = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
    const rec = m[only];
    if (!rec) { console.error(`REFUSED: --only=${only} matched no manifest record.`); process.exit(2); }
    console.log(`== Complete draft (strip md) | target=${target} | draft=${completeDraft} | slug=${only} ==`);
    // Safety: read the draft and confirm its concept DOI before any write.
    const dres = await fetch(`${base}/records/${completeDraft}/draft`, { headers: { Authorization: `Bearer ${token}` } });
    if (!dres.ok) { console.error(`FAILED: cannot read draft ${completeDraft} → HTTP ${dres.status}`); process.exit(1); }
    const draft = await dres.json();
    console.log(`  draft concept DOI: ${draft.conceptdoi}`);
    if (expectConcept && draft.conceptdoi !== expectConcept) {
      console.error(`STOP: draft concept ${draft.conceptdoi} !== expected ${expectConcept}. No publish, no second concept DOI.`);
      process.exit(3);
    }
    // v1 = the latest PUBLISHED version under this concept right now (captured
    // before we publish v2, for the PDF byte-identity + new-DOI checks).
    const conceptRec = await (await fetch(`${base}/records/${draft.conceptrecid}`, { headers: { Authorization: `Bearer ${token}` } })).json();
    const v1recid = conceptRec.id;
    console.log(`  current latest published version (v1): ${v1recid}`);
    const v2recid = await replaceMdAndPublish(base, token, completeDraft, rec);
    const expLen = (await fileToUpload(rec.files.markdown)).body.length;
    const v = await verifyReversion(base, token, v2recid, v1recid, rec, expLen);
    console.log(`\n  record: ${v.recordHtml} | concept: ${v.conceptdoi} | new version: ${v.versionDoi}`);
    if (!v.communityInherited) console.error('\n⚠ STOP: community did NOT inherit at parent — NOT auto-resubmitting. Flag to operator.');
    process.exit(v.allOk ? 0 : 1);
  }

  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
  let records = Object.entries(manifest)
    .filter(([k]) => !k.startsWith('__'))
    .map(([, v]) => v);

  if (only) {
    records = records.filter((r) => r.slug === only);
    if (records.length === 0) {
      console.error(`REFUSED: --only=${only} matched no record in the manifest.`);
      process.exit(2);
    }
    console.log(`-- CANARY SCOPE: --only=${only} → ${records.length} record (siblings not deposited this run) --`);
  }

  // Dry run is the default. Live requires --execute AND a token.
  const live = execute && !!token;
  console.log(`== Zenodo deposit | target=${target} | mode=${live ? 'LIVE' : 'DRY RUN'} | records=${records.length} ==`);
  if (orcid) console.log(`   ORCID_ID = ${orcid}`);
  else console.log('   ORCID_ID not set — creators[0].orcid will be empty until .env provides it.');

  if (!live) {
    if (execute && !token) {
      console.warn(`   --execute passed but no ${target === 'sandbox' ? 'ZENODO_SANDBOX_TOKEN' : 'ZENODO_TOKEN'} found in env/.env → forced DRY RUN.`);
    }
    const ok = await dryRun(records, orcid);
    process.exit(ok ? 0 : 1);
  }

  await liveDeposit(base, token, orcid, records);
}

main().catch((err) => {
  console.error('zenodo-deposit failed:', err);
  process.exit(1);
});
