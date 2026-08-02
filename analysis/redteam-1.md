# Red-team review 1: "It Has Read Everything We Ever Wrote. It Has Never Read a River."

*Persona: a climate and energy analyst at an environmental think tank, angry, hostile, and unsoftened.*

---

I have spent three years watching the AI industry manufacture reasons not to look at its meter. This essay is the best-written one yet, and that is what makes it worth attacking rather than ignoring. It is fluent, it is sourced, it concedes generously, and its structural move is the oldest one in the book: concede the measured harm at full strength, then relocate the *real* risk to a domain that is unmeasured, unbounded, and — conveniently — the author's line of business.

## FATAL

### 1. The denominator compares a stock to a stock when the argument requires a delta

"Computing's electricity is heading for about three per cent of world electricity. World electricity is itself roughly a fifth of world energy. So the entire object of the fight—every data centre on Earth—is something under one per cent of what humanity burns."

Then: agri-food is ~30% of end-use energy, transport ~30% of final energy, water ~4% of global electricity. Then: "A small distortion in how the governor allocates the governed dominates the complete elimination of the governor's own footprint. Not by a little."

That does not follow, and the essay never does the arithmetic that would make it follow. The footprint number is a *quantity AI consumes*. The sector numbers are *quantities AI does not consume, does not control, and in most cases barely touches*. The comparison the argument actually needs is: AI's own footprint versus **the change in sector throughput induced by AI allocation**. Nothing in the essay estimates that delta. Run it: ~950 TWh by 2030 is roughly 3.4 EJ against ~620 EJ total supply. Agri-food at 30% is ~186 EJ. For allocation harm to *dominate* footprint harm, misdirected optimisation must move on the order of **two per cent of all agri-food energy in the wrong direction** — every year, net of the gains. That may be defensible. It is a real, statable threshold. The essay never states it, because stating it would convert "dominates, not by a little" into a contestable number.

Worse, the unit mixing runs the wrong way for the author. Computing's figure is *delivered electricity*. Total energy supply is *primary energy*, ~60% of which is conversion loss. Comparing delivered electricity to primary energy mechanically shrinks the numerator by a factor of two to three before the argument starts. Meanwhile "end-use energy" (agri-food), "final energy" (transport), and "primary demand" (chemicals) are three different accounting boundaries stacked into one paragraph. The essay says the arithmetic is "kept coarse on purpose, because the honest version is coarse." Coarse is not the problem. **Inconsistent** is the problem, and the inconsistencies all point the same direction.

**The refusal to give a multiple is not honesty here — it is deniable quantification.** "I will not pretend to a clean multiple" appears in a section that then hands the reader a **logarithmic chart** of computing against those same sector throughputs. A log axis exists to make incommensurable quantities co-plottable. The reader reads a multiple off the figure that the text has disclaimed responsibility for. You cannot decline to name a number and then draw it.

**To answer this the essay must:** state the misallocation fraction at which allocation harm exceeds footprint harm, using one consistent energy boundary; or drop the "dominates" claim to "may become comparable."

### 2. The footprint risk is not reversible, and the essay's own paradigm case of irreversibility is a data-centre harm

"The footprint risk is **bounded** by physics and grid capacity, **measured** by the IEA quarterly, **priced** into capacity auctions and utility bills, and **reversible**—decommission the campus and the load goes away."

This is false, and it is the load-bearing sentence of the whole asymmetry. The load goes away. The **combined-cycle turbine built to serve it does not** — it is a thirty-to-forty-year asset with its own interconnection, its own gas contract, and its own local NOx. The **CO₂ already emitted does not** go away on any human timescale; that is the definition of a stock pollutant. And the aquifer drawn down to cool the campus does not refill because the campus closed.

Which brings us to the tell. The essay's chosen exemplars of irreversible allocation harm are "an aquifer drawn past recharge, a species past viability." Data centres draw aquifers. Now. In Arizona, in Georgia, in Chile. The author's own ledger records 66 billion litres of direct US consumption in 2023. The essay assigns irreversibility exclusively to the speculative column while the measured column contains the identical harm class, and does not notice.

"Bounded by physics and grid capacity" is the same error in a different key. Grid capacity is not a bound; it is a **thing currently being built**, at ratepayer expense, in response to this load. Calling the constraint a bound while the industry is spending tens of billions relaxing it is not analysis.

**To answer this the essay must:** re-do the four-property table honestly. Footprint harm is bounded-ish, well measured, partially priced, and **partly irreversible**. The asymmetry survives on two properties, not four — and a two-property asymmetry does not carry "not by a little."

### 3. "Unbounded, unmeasured, unpriced, irreversible" is a template, and two of its four terms are circular

Apply it to grey goo. Engineered pandemics. Solar geoengineering. Any speculative risk whatsoever. The template always wins against any measured risk, because *being measured* is what forfeits the "unmeasured" point. That is not a decision procedure; it is a machine for defeating whatever anyone has bothered to quantify.

And "unmeasured" and "unpriced" are not independent evidence of severity. They are consequences of nobody having established the risk is real — a fact the essay itself supplies in its own lede ("I cannot show you a documented case, and as far as I can tell neither can anyone else"). The argument is: *this risk is grave because nobody measures it; nobody measures it because nobody has shown it happens.* Then: "And only one of the two has anyone working on it." That is a sentence about attention allocation deployed as if it were a sentence about magnitude.

"Asymmetry under uncertainty is how serious people decide. It is how we buy insurance, site a plant, and set a margin of safety. It is not a weaker argument than proof."

Insurance is priced against a **base rate**. Margins of safety are set against a **characterised failure mode**. Both are quantified expected-value calculations. The essay has neither and is borrowing their respectability. Invoking actuarial practice for a risk with no observed instance and no estimated magnitude is precisely the move that actuaries would refuse.

**To answer this the essay must:** state what evidence in the next three years would make it *lower* its estimate of allocation risk. F1 does not do this — see below.

### 4. The central claim has no live falsifier

"F1 — The magnitude claim. If by 1 August 2029 no documented case exists ... *and* at least one national regulator has by then opened a reporting category ... then the central claim here was wrong."

It is conjunctive, and the author is simultaneously campaigning for the second conjunct ("If you run an agency: open an incident category"). If no regulator opens one — the outcome the essay predicts and treats as the scandal — **F1 cannot fire**. Emptiness is then structural, and the thesis survives untouched. F2 and F3 do not save this: both would be satisfied by the *gaps closing*, which the essay would read as vindication anyway. So between now and 2029 there is no observable world in which the magnitude claim is refuted. The essay opens by declaring "a claim that cannot fail is not a claim." Correct.

**To answer this:** make F1 disjunctive, or commit to a magnitude threshold on a proxy that already has a detector.

## SERIOUS

### 5. The concession performs respect and withdraws it in three sentences

"The people fighting data centres at zoning hearings and utility commissions are doing skilled, unglamorous, necessary work, and winning some of it. The footprint case is true. It should be pressed.

It is also the meter on the outside of the building.

Nobody is asking what the building is doing."

Read as a campaigner. "Unglamorous" is condescension wearing praise. "Winning some of it" is a shrug. "Necessary" is conspicuously not "sufficient," and the essay never once says the footprint fight is primary or even large. Then the pivot converts three years of work into peripheral instrumentation, and "nobody" erases every energy analyst in the field.

The real damage is upstream: "the entire object of the fight—every data centre on Earth—is something under one per cent of what humanity burns." That is not the object of the fight. The fight is about **who pays** — the $9.3bn PJM transfer the essay itself cites — about local water, local air, land use, noise, tax abatement, and the gas plants being sited to serve specific campuses in specific communities. None of that is a share of world energy. The essay selects the single metric on which the campaign looks trivial, calls it the whole object, and proceeds. A campaigner does not feel recruited. They feel *reframed*, and then handed the ask: "keep the data-centre campaign, and add one person who reads model specifications." One person. That is the essay's honest estimate of what the footprint fight is worth relative to its own thesis.

**To answer this:** state explicitly whether the footprint fight should receive more, less, or the same resources, and say which.

### 6. The conflict of interest is real and the disclosure is absent

Search the essay for the word "disclosure." It is not there. There is no company named, no funding statement, no interest declared. What exists is oblique: "it is why I do this work rather than write letters of complaint"; "every environmental AI system I know of, including the ones I have built"; "There is no product here and nothing to buy."

An essay whose conclusion is *the world needs much more and much better environmental AI, funded, urgently, at L4 authority* is demand generation for the author's sector, and the reader is entitled to know the size of the interest. "Nothing here is for sale" addresses the artifact, not the career.

Worse is the pre-emption: "The entire environmental industry—consultants, lawyers, remediation contractors, me—is paid on the downstream side of harm that already occurred." This is presented as self-implication but functions as an alibi — *my incentives run against my thesis* — while saying nothing about the upstream interest that actually applies. That is the more sophisticated bias, and it is the one left undeclared.

**To answer this:** a named disclosure line under the byline. Entity, role, and whether anything advocated here would be revenue.

### 7. The missing energy analysis

Absent from an essay claiming to have taken the footprint case seriously at full strength: **gas turbine buildout** (Memphis-class on-site generation, permitted and unpermitted, with local criteria-pollutant burden); **interconnection queues** and the multi-year congestion that is now the binding constraint on clean generation for everyone else; **behind-the-meter fossil** and the Greenidge pattern, which sits in the ledger and never reaches the page; **transmission cost allocation**; **speculative queue-stuffing**, where a single project appears in five utilities' load forecasts.

Most conspicuous: the ledger verifies at A4/A5 that energy per AI task is "dropping by at least an order of magnitude annually" and that Gemini's per-prompt energy fell 33× in a year — and **neither number appears in the essay**. Those facts are the strongest available support for "the footprint risk is bounded," and they are also the setup for the rebound: per-task energy collapsed 33× while total consumption rose 17%. That is Jevons, stated. The essay declares the footprint bounded without ever confronting the one piece of evidence that both supports and complicates the claim. Whether that omission is convenience or oversight, an energy analyst reads it as the author declining a fight he would have had to hold.

**To answer this:** one paragraph on the rebound, and one on where the marginal electron for a 2030 data centre comes from.

## QUIBBLES

- The **675:1 parameter ratio** is dressed as a finding and then disowned two sentences later ("Small is not the problem"). It is a rhetorical prop with a figure attached. Cut it or defend it.
- The **Landauer paragraph** is well hedged in the objection box and still does no work. Nobody's objection to environmental interlocks was ever that the compute would be too expensive.
- "**No frontier lab's stated values contain a watershed**" is a real and well-executed null result, but the essay does not say what a watershed clause in a model spec would *do*. Absence of a word is not absence of a constraint, and the essay treats them as equivalent.

---

## OBJECTIONS THE AUTHOR CANNOT ANSWER

1. **The footprint harm you call reversible includes the two harms you name as paradigm-irreversible.** Emitted CO₂ and drawn-down aquifers do not return when the campus closes, and the gas turbine built to serve it outlives the load by decades. Your asymmetry table assigns irreversibility to the speculative column while the measured column already contains it.

2. **You compare a stock to a stock when your claim requires a delta, and you never state the delta.** "A small distortion dominates the complete elimination of the governor's footprint" is arithmetic you have not done. On your own numbers it requires misdirected optimisation to move roughly two per cent of a governed sector's entire annual energy the wrong way, every year, net of gains. You have not argued that. You have not even named it.

3. **"Unbounded, unmeasured, unpriced, irreversible" defeats every measured risk by construction, and two of the four terms are consequences of your own null result.** The risk is unmeasured because nobody has shown it occurs — which you establish in your first section. You cannot cite the absence of evidence as a property that makes the risk dominant.

4. **Your central claim has no falsifier that can fire.** F1 requires a regulator to have opened a category you are simultaneously campaigning for. If nobody opens one, the emptiness is structural and your thesis is untouched. By your own standard — "a claim that cannot fail is not a claim" — the magnitude claim is not yet a claim.

5. **You call the footprint fight "the meter on the outside of the building" while the fight is about who pays for the meter.** Ratepayer transfers, local water, local air, land use, and tax abatement do not reduce to a share of world energy. You chose the one denominator on which the campaign looks small and called it "the entire object of the fight."

6. **You conclude that the world urgently needs more and better environmental AI, and you have not told the reader what you would earn if it did.** "Nothing here is for sale" describes the essay. It does not describe the career, and the reader cannot weigh the argument without it.
