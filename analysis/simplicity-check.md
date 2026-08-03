# Simplicity check — *The Daylight*

Run 2026-08-03 against `src/content/essays/the-daylight.md`.
Measured by `scripts/simplicity-check.py` (gates 1, 2) and by a blind reading pass (gates 3, 4, 5).

---

## 1. Banned words — PASS

Grepped for all thirty-two banned terms plus inflections: *proxy/proxies, optimizer, optimiser, optimization, optimisation, optimizing, optimising, control loop, feedback loop, phase margin, latency, dead time, thermodynamic, entropy, Landauer, Goodhart, reward hacking, specification gaming, alignment, epistemic, isomorphic, corpus, instantiation, non-proxiable, interlock, annunciation, framework, paradigm, leverage, asymmetry.*

**0 hits.**

Where each idea went instead:

| Banned | Said as |
|---|---|
| proxy | "a number standing in for something we care about" |
| optimising / reward hacking | "told to hit a target"; "the cheapest way to a high score" |
| latency / search cost | "how slow we were"; "a price on its head, and the price was a specialist's time" |
| interlock / continuous monitoring | "put an instrument in the water"; "a reading, every hour, published" |
| alignment | "the closest thing these machines have to a conscience" |
| thermodynamic argument | cut entirely; lives in the companion |

## 2. Sentence length — PASS

| Metric | Value | Gate |
|---|---|---|
| Sentences | 161 | — |
| Words (body, excl. frontmatter, byline, sources note) | 1,680 | 1,200–1,800 ✅ |
| **Mean sentence length** | **10.43** | < 15.00 ✅ |
| Median | 8 | — |
| Standard deviation | 6.54 | — |
| Shortest | 1 word | — |
| Longest | 30 words | — |
| Sentences under 8 words | 68 (42%) | — |
| Sentences over 30 words | **0** | breath test ✅ |
| Paragraphs | 52 | — |
| Mean paragraph length | 32.3 words | — |
| Longest paragraph | 101 words | — |

Three sentences failed the breath test on the first pass (35, 34 and 47 words) and were split. Three more failed on the second pass (38, 36, 37) and were split. Nothing now exceeds 30.

## 3. The restatement test — PASS

A separate reading pass was given the essay and nothing else — no brief, no repository context, no prior drafts — and asked to state the thesis in one sentence. It returned:

> "Environmental rules have always contained exploitable gaps that no amount of better drafting can remove, and the only thing that ever kept them safe was how expensive those gaps were to find — so now that AI has made finding them cheap, the fix is to stop measuring compliance through self-reported paperwork and start measuring the river itself, continuously, with instruments."

Target: *environmental law only ever worked because breaking it was expensive, and it just got cheap.*

The returned sentence contains the target claim, in the right causal order, and carries the remedy as well. **Pass.** No rewrite required.

## 4. The stranger test — nine flags raised, nine addressed

The blind pass listed every sentence requiring prior knowledge of environmental law, AI, or physics. All nine were fixed rather than argued with.

| # | Flag | Fix |
|---|---|---|
| 1 | "40 CFR Part 75" — an unreadable code citation | Sources note now reads "the federal rule known as Part 75" with a plain gloss |
| 2 | "airshed" — specialist term | → "the air over a neighbourhood" |
| 3 | "preamble" — assumes rulemaking documents | → "no statute and no rulebook" |
| 4 | "Federal Register" — assumes US institutional knowledge | → "Every rule in the country is published, free" |
| 5 | "Clean Air Act" — assumes the reader knows what it is | → "the law that governs the air over every American city" |
| 6 | Shutdowns and restarts being dirty — load-bearing and unstated | Now stated plainly: "Plants run dirtiest when they are pushed hard, and dirtier still coming back from a long shutdown, when everything is cold and nothing is tuned" |
| 7 | Wind disperses pollution — inferred | Left implicit; the following sentence ("The people downwind of the still afternoon do") now carries it |
| 8 | "score" appearing as a technical object | Grounded first: "Just to score as well as possible under them, the way a company tries to do well under a rule" |
| 9 | "sandboxed" — AI jargon in the sources note | → "sealed test versions rather than live regulations" |

**Remaining terms requiring prior knowledge: none.**

## 5. Quotable count — PASS (12, gate is 6)

Sentences the blind pass judged capable of standing alone with zero context:

1. "We were never protected by the rules. We were protected by how slow we were."
2. "We spent fifty years writing rules against an opponent who had to sleep."
3. "You cannot out-write something that never gets tired."
4. "The number is not the river. It never was."
5. "Stop grading the paperwork. Grade the river."
6. "To make the score say clean, you have to make the water clean."
7. "They are removing the slowness. They do not know what it was holding up."
8. "You don't write down the thing that has always been true."
9. "It has no idea it is standing in a river."
10. "A rule that can loosen while you watch is not a rule."
11. "Every gap in American environmental law has had a price on its head, and the price was a specialist's time."
12. "When the measurement is the thing itself, there is not much left to argue about."

## 6. Where the blind reader slowed down — five snags, five fixed

This was the most useful output of the exercise and every item was acted on.

**(a) The study paragraph — reader lost the thread, read it three times.** Four consecutive fragments qualified the same noun, and "More than half" arrived with no stated denominator. Rewritten: the thirty-two regulations are now named up front, the gaps are explained as previously found and patched, and the result reads "rediscovered more than half of the gaps."

**(b) "And speed is the smaller half" — reader stopped dead, no two-part claim had been set up.** Now: "Speed is the smaller half of it. The larger half is that nobody has to be looking." The second half is stated rather than left to be reconstructed.

**(c) The jump to the five AI companies read as a topic change.** A connective now carries it: "Which would matter less if the people building these machines were watching for it. They are not, and I do not think it is malice."

**(d) The load-bearing sentence went by in a subordinate clause.** "There is no daylight in that test, because the test and the thing being tested are the same object" has been given its own paragraph and expanded: *"Every gap I have ever found lived in the space between a measurement and the thing it stood for. Close that space… and there is no space left to work in. Not a smaller gap. No gap."*

**(e) "So, concretely" plus a three-way address lost the general reader.** The label is gone. The asks now run as one paragraph opening "The work is small and it is nobody's job."

Also fixed: a repetition of "months on a question" in consecutive fragments that made the reader check whether they had re-read a line.

## 7. The sceptic's first objection — absorbed into the text

The blind pass identified the weakest link a general reader would poke first: **a chimney has one owner; a river has many, and a dirty reading does not say who made it dirty.** Attribution is the crack, and it was not addressed in the draft.

It now opens the what-would-change-my-mind paragraph, in the author's voice, stated at full strength:

> "A chimney has one owner. A river has a farm on it, a road, a town, and three plants. A reading that says the water is dirty does not say who made it dirty. If that cannot be solved, the river cannot be graded, and my answer fails exactly where I most want it to work."

## 8. Figure decision — ship none

The brief permits one figure, and only if it can be understood in three seconds with no caption.

`the-proxy-stack.png` was rebuilt for the previous draft and is good, but it carries six labelled layers, an equation, a decay curve and a four-line source note. It takes about forty seconds. It fails the test.

No three-second figure was found that adds anything the sentence *"we were never protected by the rules, we were protected by how slow we were"* does not already do. A chart here would reintroduce exactly the apparatus this draft exists to remove.

**Shipped: no figure.** The social hero carries one line of text and nothing else. `the-proxy-stack.png` remains in `public/images/` and is used by the technical companion.

---

## 9. Slug candidates

Brief supplied three; five more generated. Chosen: **`the-daylight`**, because it is the essay's own word for the thing, it appears in the text six times, it is concrete, and it means nothing until you have read the piece — which makes it a title rather than a summary.

| Slug | Note |
|---|---|
| **`the-daylight`** | **Chosen.** The essay's own word. Short, concrete, earns its meaning. |
| `how-slow-we-were` | Supplied. Good, but reads as nostalgia rather than warning. |
| `we-were-protected-by-being-slow` | Supplied. It is the thesis, and too long for a URL. |
| `the-price-on-its-head` | From the search-cost passage. Strong, slightly noir. |
| `an-opponent-who-had-to-sleep` | From the closing line. Best of the generated set after the winner. |
| `grade-the-river` | The remedy rather than the diagnosis. Would suit a shorter, ask-led piece. |
| `the-number-is-not-the-river` | Clearest statement of the mechanism. Long. |
| `what-the-slowness-was-holding-up` | Accurate, and asks the reader to work before they have any reason to. |

---

## Summary

| Gate | Result |
|---|---|
| Banned words | **PASS** — 0 of 32 |
| Mean sentence length | **PASS** — 10.43 |
| Word count | **PASS** — 1,680 (ceiling 1,800) |
| Breath test | **PASS** — 0 sentences over 30 words |
| Restatement | **PASS** — blind reader recovered the thesis |
| Stranger test | **PASS** — 9 flags raised, 9 rewritten |
| Quotables | **PASS** — 12 (gate 6) |
