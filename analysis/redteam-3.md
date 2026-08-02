# Red-team review 3 — the practitioner's objection

**Reviewer persona:** senior environmental lawyer, twenty-five years split between a state agency and a national environmental organisation. NSR, Title V, NPDES, ESA §4 and §7. Hostile by assignment and, having read the piece, by inclination.

**Target:** `src/content/essays/it-has-never-read-a-river.md` (draft, 2026-08-02), checked against `analysis/fact-ledger.md`.

---

I will concede the good parts at the end, because they exist. First the part that made me put the piece down.

You have written, for a general audience, under a heading in your own name, that **"environmental law is the easiest thing in the world to game."** You are a member of this bar. You then illustrate the claim with five features of the regulatory system — averaging periods, netting, applicability cutoffs, monitor downtime allowances, substitute data — every one of which you have characterised backwards. Not shaded. Backwards.

---

## 1. The proxy stack — FATAL

### 1a. You described protective devices from the wrong side

> "Below the permit is a measurement rule: which emission factor, which test method, how much monitor downtime is allowed, what substitute data covers the hours the analyser was down."

Part 75 does not *allow* downtime. It **prices** it. Under 40 CFR §§75.31–75.37 the substitute value scales inversely with monitor availability: at high availability you report a percentile of your own recent quality-assured data; as availability degrades below 80 percent you report the **maximum potential concentration** for every missing hour ([40 CFR 75.33](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-75/subpart-D/section-75.33); [EPA Plain English Guide to Part 75](https://www.epa.gov/sites/default/files/2015-05/documents/plain_english_guide_to_the_part_75_rule.pdf)). The design is punitive on purpose. A missing hour is the most expensive hour on the quarterly report, which is exactly why availability at Acid Rain units runs where it runs. You have taken the single most successful anti-gaming mechanism in the Clean Air Act and filed it under "gap between compliance and intent."

Averaging periods are worse. You present them as slack around the number. The averaging time **is** the health endpoint. Ozone is 8-hour because the exposure–response literature synthesised in the Integrated Science Assessment locates the respiratory effect in a multi-hour window; SO₂ went to 1-hour because the bronchoconstriction endpoint is a 5-to-10-minute peak phenomenon; PM2.5 carries both an annual and a 24-hour standard because the long-term mortality signal and the short-term morbidity signal are different endpoints requiring different windows. An 8-hour standard is not a lax 1-hour standard. It is the standard shaped to the biology. Calling that "a substitution of something measurable for something meant" gets it precisely inverted: the averaging period is where the meaning lives.

Netting. You know the elements — contemporaneous (the five-year window), creditable, at the same source, and reduced to permit conditions that are themselves enforceable — and you know Step 2 exists to bar credit for unenforceable decreases ([EPA, Project Emissions Accounting, 85 Fed. Reg. 74889](https://www.federalregister.gov/documents/2020/11/24/2020-23784/prevention-of-significant-deterioration-psd-and-nonattainment-new-source-review-nnsr-project)). Netting is an emissions-neutrality test with an offsetting requirement bolted to it. It is *litigated to death* and it has a defensible protective logic: a source that genuinely does not increase net emissions should not trigger BACT. You may think the contemporaneous window is too long. Say that. Do not tell a lay reader that the whole apparatus is a hole.

So which is it — you know this and left it out because it complicates the thesis, or twenty-seven years produced a view of the stack shaped mostly by the parts you were retained to exploit? Those are the two available readings and the essay picks neither.

### 1b. "Nothing I ever did was cheating" — SERIOUS

> "I have made hundreds of thousands of dollars in netting exercises and common-control analyses… Here is the operative fact: nothing I ever did was cheating."

This does not do the work you think. It reads as: *the system is corrupt, I profited from the corruption, I was personally blameless, and I am now the one who sees it.* You keep the fees and the halo. Meanwhile every colleague who files a netting analysis next Tuesday has been told, by a peer, in public, that their work product is a demonstration of how gameable the law is. You never say what they should do differently. An indictment with no charge attached is just contempt with a disclaimer.

### 1c. The statutory standard — FATAL

> "Below that is a statutory standard, which is a sentence—*requisite to protect public health with an adequate margin of safety*. Below that is a number."

You have inverted the holdings.

*Lead Industries Ass'n v. EPA*, 647 F.2d 1130 (D.C. Cir. 1980), holds that the margin of safety exists precisely to protect against effects "research has not yet uncovered," and that requiring EPA to wait for conclusive proof of harm is inconsistent with the Act's "precautionary and preventive orientation" ([Justia](https://law.justia.com/cases/federal/appellate-courts/F2/647/1130/237769/)). *Whitman v. American Trucking Ass'ns*, 531 U.S. 457 (2001), holds that §109(b)(1) bars cost consideration outright and that the phrase supplies an intelligible principle sufficient to survive nondelegation ([Justia](https://supreme.justia.com/cases/federal/us/531/457/)).

Read together, that sentence is not a proxy one rung down from intent. It is the rung that **carries** intent — the statutory instruction to err protectively under uncertainty, held constitutionally adequate *because* it resists reduction to an optimisable number. Your essay quotes it as evidence of the opposite. Neither case appears anywhere in the piece. You quoted the most litigated sentence in American environmental law and did not cite the two cases that construe it.

### 1d. "No permit requires you to report it" — FATAL

> "No state agency I can find has such a category. No permit requires you to report it."

Wrong, and consequentially wrong. 40 CFR §70.6(a)(3)(iii)(B) requires **prompt reporting of all deviations**, expressly including those from upset conditions, with probable cause and corrective action — cause-agnostic by construction ([eCFR](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-70/section-70.6)). NPDES permits carry 24-hour reporting of any noncompliance that may endanger health or the environment, 40 CFR §122.41(l)(6) ([eCFR](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-D/part-122/subpart-C/section-122.41)). CERCLA §103 and EPCRA §304 reportable-quantity reporting attach to the release, not to the reason for it.

If an optimiser drives a unit out of limits, that excursion **is reported**, under the same condition as any other excursion. What you actually discovered is that no database has an *attribution field* for "an algorithm did it." That is a taxonomy gap. It is a good finding and it is worth a paragraph. It is not a reporting gap, and the difference between those two claims is the difference between your lede and a footnote.

---

## 2. Contempt, not respect — SERIOUS

The piece asserts respect and then performs its opposite in the register.

> "This is not a story about people not caring. I have sat in those rooms; the people care enormously."

Sincerity is the consolation prize you hand someone whose judgment you have just taken away. You have said, in sequence, that our system is trivially gameable, that our loop steers backward, and that we are sincere. That last one lands as a pat on the head.

> "They have the loop and they have the values, and almost none of them know the field needs both."

You are telling a profession what it does not know, in a piece it was not asked to review, in a section that flatters it as "the missing constituency."

> "The entire environmental industry—consultants, lawyers, remediation contractors, me—is paid on the downstream side of harm that already occurred."

Tell that to the permit writer on a GS-12 salary, the agency inspector, the NGO staff attorney on a Title V petition. Your business model is not the profession's business model, and the sentence generalises your billing arrangement into a structural indictment of people who make a fraction of what you do.

---

## 3. Deregulatory risk — SERIOUS

Yes, you are responsible. Not for the misuse — for the gift-wrapping.

**"Environmental law is the easiest thing in the world to game," signed by a twenty-seven-year practitioner, is a comment-letter epigraph.** It will appear in rulemaking dockets arguing for streamlined permitting, in briefs arguing that fixed limits are obsolete, and in testimony arguing that programmes should be swapped for "continuous monitoring with fewer conditions." You will not be there to add the qualifiers. The sentence travels alone.

And the "living permit" is the real problem:

> "A permit that knows there is a thermal inversion over the fenceline tonight and tightens for six hours instead of averaging across a year."

Name the enforcement theory. A permit condition must be **practically enforceable** — independently verifiable, with a determinable averaging period and a fixed compliance method. That doctrine is not bureaucratic residue; it is what makes a citizen suit under CAA §304 possible at all. A condition that recomputes itself in real time is a condition that also **loosens** in real time, on a function nobody outside the operator has seen. Who gets notice and comment on the adjustment algorithm? What does the SEP-obligated community group sue on? Where is the model in the administrative record? Your L5 — "the environmental criterion sits in the grading signal itself: non-proxiable, held outside the agent" — has no public-participation story at all.

You concede in your own objection box that "*who owns the instruments*" is the whole game. Then you propose relocating the entire regulatory apparatus onto instruments. The concession never touches the proposal. Right now this is deregulation with better instrumentation, and I do not think you intend that, which is why someone should tell you.

---

## 4. Accuracy audit

- **ESA "average of more than twelve years against a two-year statutory deadline" — SERIOUS.** The [Puckett, Kesler & Greenwald (2016)](https://biologicaldiversity.org/campaigns/esa/pdfs/Puckett_et_al_2016.pdf) mean is real, but you strip three things out of it. First, the two-year clock is the *petition* pathway (90-day finding, 12-month finding, one year from proposal), not a universal listing deadline. Second, §4(b)(3)(B)(iii) creates "warranted but precluded" as a **statutory off-ramp Congress wrote** — the candidate backlog is lawful, not a breach. Third, the paper's own headline finding is that listing rates track **funding and policy phase**, and that litigation is what moves species. That is an appropriations story. You convert it into a control-theory story about loop latency. Congress built the delay; you have charged it to physics.
- **EPA OIG 2022 — SERIOUS.** [Report 22-E-0047](https://www.epa.gov/office-inspector-general/report-epa-continues-fail-meet-inspection-requirements-hazardous-waste) concerns **EPA-conducted** inspections of RCRA TSDFs. In authorised states — nearly all of them — the states run the inspection programme. The decline in EPA-conducted inspections substantially reflects delegation. "The agency does not meet even the inspection frequencies binding on it" will be heard by a lay reader as "nobody is inspecting." Say *EPA-conducted*, or say the combined federal-state figure. As written it overstates.
- **EU AI Act — SERIOUS, incomplete in the direction that flatters the thesis.** Annex III is characterised correctly. But [Article 95(2)(a)](https://artificialintelligenceact.eu/article/95/) expressly contemplates codes of conduct on "assessing and minimising the impact of AI systems on environmental sustainability," Article 40 reaches energy efficiency through standardisation, and GPAI technical documentation captures energy consumption. Voluntary, unenforceable, agreed — but your sentence "the environment is something you report after it is damaged, not something that gates" is false as written, and you omitted the one provision a reader would check. Separately: your own ledger flags the Digital Omnibus deferral dates as unconfirmed pending Official Journal publication (§I.1), and the draft went to publication anyway.
- **Part 75 CEMS — accurate but self-undermining.** "Hour by hour since the early nineties" is right (certification deadlines 15 Nov 1993, programme-wide from 1995). It is also the strongest counterexample to your own thesis: a thirty-year-old, hourly, publicly posted, punitively-backstopped instrument record covering ~96 percent of US fossil generation. The law built the thing you say the law cannot build. Reconcile that or the section does not hold.
- **The incident registries — QUIBBLE, but the lede rests on it.** AIID and OECD AIM are voluntary, media-scraped registries. Their emptiness is close to evidentially weightless, and your ledger concedes AIID was probed by search indexing rather than dumped (§I.3). You half-flag it. The lede does not.
- **"Fifty years of environmental law… the largest tested statement of environmental *ought* any civilisation has produced" — QUIBBLE.** Parochial. The EU environmental acquis is arguably denser and considerably more recent. It costs you nothing to say "one of the largest."

---

## 5. What it gets right, grudgingly

The ought-gap audit is genuine work. I did not know that no frontier lab values document contains the word "watershed," it is checkable, and it is the most useful thing in the piece. The is-gap claim has been narrowed honestly — §C12 of the ledger deletes a false formulation rather than softening it, which is more discipline than most advocacy shows. The asymmetry framing (bounded/measured/priced/reversible against unbounded/unmeasured/unpriced/irreversible) is how precaution has always been argued and it is argued well here. Dated falsifiers with a stated willingness to be wrong are rare. And the central organisational claim — that environmental professionals are a missing constituency in AI safety, holding both the control loop and the ought-channel — is correct and worth an essay. It is worth a better one than this.

---

## OBJECTIONS THE AUTHOR CANNOT ANSWER

**1.** Every "gap" in your proxy stack is a protective device described from the wrong side. Part 75 does not allow downtime; it prices it at the maximum potential concentration, which makes a missing hour the most expensive hour on the report. Averaging periods are not slack around the number — the averaging time *is* the health endpoint, set from the exposure window in the Integrated Science Assessment. Netting is not a hole; it is a contemporaneous, creditable, permit-enforceable neutrality test with Step 2 barring unenforceable credit. You have twenty-seven years. You know all three. So either you knew and did not say, or the stack you generalised from is the part you were paid to work.

**2.** *Requisite to protect public health with an adequate margin of safety* is not a proxy standing in for intent. It is the statutory instruction to be wrong in the protective direction under uncertainty. *Lead Industries* held the margin exists to guard against effects research has not yet uncovered; *Whitman* held Congress may delegate exactly that imprecision and forbade cost consideration. You cite the sentence as the second rung of a ladder descending away from meaning. Both courts held it is the rung that carries meaning. Neither case appears in your essay.

**3.** "No permit requires you to report it" is wrong. 40 CFR §70.6(a)(3)(iii)(B) requires prompt reporting of every deviation, cause-agnostic, with probable cause; NPDES permits require 24-hour reporting of noncompliance endangering health or the environment. What you found is that no database has an attribution field for algorithms. That is a taxonomy gap, not a reporting gap — and the distance between them is the distance between your lede and a footnote.

**4.** Name the enforcement theory for a living permit. If the condition adjusts in real time: what number does a citizen sue on under §304, who gets notice and comment on the adjustment function, what is in the administrative record, and how does a dynamic setpoint satisfy practical enforceability? A permit that tightens for six hours is a permit that loosens for six hours, computed by a model the public has not seen. Until you answer this, you have drafted the deregulatory brief and attributed it to engineering.

**5.** You concede that "who owns the instruments" is the whole game, then propose moving the entire regulatory apparatus onto instruments. Either the concession is real — in which case the proposal is premature — or it is decoration in an objection box.

**6.** Part 75 is your counterexample, not your example. A thirty-year-old hourly instrument record covering ~96 percent of US fossil generation, publicly posted, with punitive substitute data, was built *by the law you call trivially gameable*. Explain why the profession that built it is the profession that cannot build the next one.

**7.** "Nothing I ever did was cheating" absolves the author and convicts everyone still doing the work. Say what the colleague running a netting analysis next Tuesday should do differently, or withdraw the sentence.

---

## HOW TO FIX THE TONE

The argument survives all of this. The register does not. Six sentence-level changes:

**1. The section heading.**
Now: *"Why environmental law is the easiest thing in the world to game"*
Better: **"Why environmental law is the hardest reward function we have ever handed a machine"**
Same claim, aimed at the optimiser instead of at the drafters. It also happens to be more accurate: the point is that the stack is *dense*, not that it is *weak*.

**2. The proxy-stack setup.**
Now: *"Every substitution opens a space between satisfying the number and achieving the intent."*
Better: **"Every substitution was engineered to close that space, and most of them do — Part 75 makes a missing hour the most expensive hour on the report. What none of them was designed against is a tireless searcher probing every layer at once."**
This concedes the protective logic and keeps the entire argument, because your argument was never that the proxies are bad. It was that they were built against a slower adversary.

**3. The statutory-standard rung.**
Now: *"Below that is a statutory standard, which is a sentence…"*
Better: **"Below that is a statutory standard that deliberately refuses to be a number — *requisite to protect public health with an adequate margin of safety*, a phrase the D.C. Circuit read in *Lead Industries* as an instruction to act before the science is conclusive. That irreducibility is a feature for a court and a vacuum for an optimiser, which is the whole problem: the layer that carries the meaning is the layer a machine cannot read."**
Stronger version of your own thesis, and it stops looking like you skipped the casebook.

**4. The netting confession.**
Now: *"I have made hundreds of thousands of dollars in netting exercises and common-control analyses… nothing I ever did was cheating."*
Better: **"I have run netting analyses and common-control analyses for paying clients, and the work was legitimate — netting is a real neutrality test, and Step 2 exists precisely to stop the abuse people assume it invites. What I noticed over twenty-seven years is how much of my value to a client was pattern-matching speed across the layers. That is the part a machine does better than I do, and it will not stop where I stopped."**
Removes the dollar figure, which reads as a boast; removes the absolution, which reads as an indictment of everyone else; and lands the actual point harder.

**5. The condescension.**
Now: *"This is not a story about people not caring. I have sat in those rooms; the people care enormously."*
Better: **"The people in those rooms are not slow because they are indifferent or because they are bad at the work. They are running a statutory process that Congress underfunded and then gave a lawful off-ramp — 'warranted but precluded' is in the statute. The delay is legislated, not clinical."**
Names the real cause, which is also more useful to your reader, and stops praising sincerity as a substitute for competence.

**6. The living permit.**
Now: *"A permit that knows there is a thermal inversion over the fenceline tonight and tightens for six hours instead of averaging across a year."*
Better: **"A permit whose fixed annual limit stays exactly where it is, with an additional condition that ratchets *down* on a thermal inversion and never up — one-directional by design, with the trigger function in the administrative record and subject to comment. Anything that can loosen in real time is not a permit; it is a negotiation, and I am not proposing one."**
This is the single highest-value change in the list. It converts the proposal from something an industry coalition can quote into something a state agency could actually pilot, and it forecloses the reading that makes this essay dangerous.

**One structural addition.** Add a paragraph, somewhere before the ask, that says plainly: *nothing here is an argument for fewer permit conditions, shorter permits, or replacing fixed limits with dynamic ones.* You believe that. It is not on the page. Without it, the deregulatory reading is not a misreading — it is the reading, and you have no standing to complain about it later.
