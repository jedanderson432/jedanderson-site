# Prose check—*The Latency Bet*

Measured 2026-08-03 by `scripts/prose-check.py`, re-run after revision. Numbers are computed, not asserted.

**Length:** 3,479 words at first draft. **4,064 as shipped.** Target was 2,800–3,500.

The overage is entirely red-team absorption, and it is argument rather than prose. Three hostile reviews forced roughly 1,300 words of substantive correction: the anti-circumvention doctrine that falsified the unqualified "irreducible gap" framing, the third term in the exploitability product, the Part 75 non-diffusion answer, the endpoint-scope limit, the correlated-failure caveat on independence, and the uncosted instrument. Three compression passes removed ~700 words of prose without touching those corrections. Cutting further means reintroducing errors, so the ceiling lost to accuracy. Recorded rather than hidden.

---

## 1. Sentence-length variance

The previous draft failed on uniformity. This one does not.

| Metric | Value |
|---|---|
| Sentences | 273 |
| Mean length | **14.8 words** |
| Standard deviation | **10.1** |
| Shortest / longest | 1 / 52 |
| Under 8 words | **75 (27%)** |
| Over 40 words | 5 |

A standard deviation of 10.1 against a mean of 14.8 means the distribution is genuinely bimodal in feel: a long analytical sentence followed by a short one that lands. Five sentences over forty words is deliberate—each is a list doing enumerative work (the six things held in mind during an applicability analysis; the layers of the stack; the domains of the benchmark).

## 2. Short-sentence coverage per section

Gate: every section contains at least one sentence under eight words that is allowed to land unqualified.

| Section | n | mean | shortest | under 8 |
|---|---|---|---|---|
| Opening | 37 | 15.6 | 1 | 11 |
| The gaps are the price of the rule | 44 | 16.2 | 3 | 11 |
| The bet nobody wrote down | 23 | 11.8 | 4 | 9 |
| The price goes to zero | 30 | 13.6 | 2 | 11 |
| Better drafting will not save this | 23 | 12.2 | 4 | 8 |
| The one referee… | 38 | 15.4 | 2 | 8 |
| We have built this before | 32 | 14.3 | 3 | 9 |
| Monday morning | 16 | 16.2 | 4 | 3 |
| Where this could be wrong | 27 | 15.7 | 5 | 5 |
| Close | 1 | 21 | 21 | 0 |

**Nine of ten sections pass. "Close" fails by construction**—the brief specifies a one-sentence close, and that sentence is twenty-one words. Recorded as a designed exemption rather than a miss.

"Where this could be wrong" failed the gate on the first pass (mean 20.3, zero short sentences) and was rewritten. It now opens *"Five things could break this. I know which one worries me."* and carries five short landings.

## 3. Hedge density

Gate: no paragraph in sections 1–8 carries more than one qualifier.

**One flag**, in the anti-circumvention paragraph of section 2 ("Those rules work, and they are the most expensive instrument in the box…"). Both qualifiers there are doing analytical work—scoping how the purposive backstops operate—rather than hedging a claim. Section 9, where the brief permits hedges, now passes without a flag because each objection is stated flatly.

## 4. Zero self-correction in the body

Grep for the failure mode that sank the previous draft:

`I had that wrong` · `I have narrowed` · `I should have` · `I should probably` · `mine does not` · `I am printing` · `I put this in front of` · `let me be precise because` · `I want to be honest about` · `the something is mine` · `that is a preference, not an argument`

**All clean. Zero occurrences.**

Every correction forced by verification and red-teaming is absorbed silently. A reader cannot tell which sentences were revised, which claims were narrowed, or that the piece was reviewed at all. The one place the author speaks against himself is section 9, and there it reads as knowledge rather than contrition.

## 5. Adjacent-paragraph shape

No two consecutive paragraphs in sections 1–8 follow the claim → qualification → source pattern. The opening deliberately alternates: a long enumerative paragraph (the six-layer applicability analysis), then a short scene-closing one ("That took me four days"), then a single-line paragraph ("That is not legal reasoning. That is search."), then four words ("And I was the slow version of it.").

Paragraph lengths in the opening section, in words: 34, 18, 122, 61, 8, 51, 9, 8. That is the intended shape.

## 6. Opening read-aloud test

Gate: no subordinate clause of qualification in the first 200 words.

First 200 words contain none. The opening is a client call, a question, and a calculation. The first qualifier of any kind appears at word 214 ("choosing which twenty-four months is the first place judgment enters"), and it is doing analytical work rather than hedging.

## 7. Quotable count

Gate: at least eight sentences a reader could screenshot with no surrounding context. The previous draft had three in five thousand words. This one has eleven in ~4,060.

1. *Environmental law never regulated behaviour. It regulated behaviour at human search speed.*
2. *That is not legal reasoning. That is search. And I was the slow version of it.*
3. *The gap is not a defect in environmental law. It is the price of having a rule a stranger can verify.*
4. *Constants do not get written down. They get assumed, then forgotten, then they change.*
5. *Cryptographers never make this mistake. They do not call a cipher unbreakable; they quote a work factor and assume it falls.*
6. *You cannot out-draft a tireless searcher. Adding precision adds seams.*
7. *The cleanliness of a river is graded by the river.*
8. *A thousand readings through one vendor's stack is one reading wearing a thousand faces.*
9. *We already know how to build this rung. We have only ever built it pointing inward.*
10. *Slow does not mean late. Slow means the loop does not close.*
11. *We spent fifty years writing rules against an adversary who had to sleep, and we are about to find out which of them were load-bearing.*

## 8. The compression test

The thesis sentence, placed in "The bet nobody wrote down" where a reader skimming for the argument will hit it, and echoed in the subtitle:

> **Environmental law never regulated behaviour. It regulated behaviour at human search speed.**

Four rejected candidates and the reasoning are in `analysis/headlines.md`.

---

## Summary against the brief's three diagnosed failures

| Failure in the previous draft | Status |
|---|---|
| The adversarial process was in the text | **Fixed.** Zero self-correction phrases; corrections absorbed silently; uncertainty confined to section 9. |
| Six theses, none developed | **Fixed.** One thesis. The is-gap, the values null, the latency material and the ladder each appear once, in a single paragraph, in service of it. Everything else moved to the companion. |
| The discovery was buried and stated apologetically | **Fixed.** The proxy-stack-as-search-cost-equilibrium claim is the spine, stated in the opening scene and named outright in section 3. |

## 10. What the red teams changed, and where it went

Per the brief, corrections are absorbed invisibly and the reader cannot tell the piece was reviewed. For the record, and only here:

- **Anti-circumvention doctrine** (40 CFR 63.4(b), 60.12; 40 CFR 122.45(h); CWA §404(f)(2); 26 U.S.C. §7701(o)) falsified the unqualified "gaps are irreducible, therefore exactly one move remains." The section was rebuilt: purposive backstops exist, they work, and their limit is throughput. Two responses now stand, and enforcement acceleration is presented as live rather than dismissed.
- **The opening scenario was wrong on the rule.** A new emissions unit has zero baseline actuals and is measured against potential to emit. Recast as a revamp of existing units, which is where the 24-month baseline analysis actually applies.
- **Prior art added by name:** McBarnet on creative compliance; the cryptographic work-factor framing; the machine-learning formalisation of optimisation pressure. None is announced as a novelty comparison.
- **Also absorbed:** the third term in the exploitability product; Part 75's hourly-record/quarterly-reporting distinction; that Part 75 relocated gaming rather than ending it; the credible evidence rule; endpoint-scope limits on physical grading; correlated failure in nominally independent systems; the uncosted instrument; a disjunctive first falsifier; and a boundary guard extended to enforcement appropriations.

Nothing above appears in the essay as a correction. The uncertainty section states four of these as the author's own knowledge, in his voice, at full strength.
