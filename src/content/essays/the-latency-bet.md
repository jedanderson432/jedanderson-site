---
title: "The Latency Bet"
slug: "the-latency-bet"
subtitle: "Environmental law never regulated behaviour. It regulated behaviour at human search speed—and we are removing the latency on purpose, right now, without having priced it."
date: 2026-08-03
type: essay
status: draft
tags: ["regulatory-reform", "environmental-intelligence", "incorruptible-grader", "monitoring", "clean-air-act"]
abstract: "Every layer of environmental law substitutes a measurable number for an unmeasurable intent, and every substitution opens a gap between compliance and intent. The gaps are the price of a rule a stranger can verify, and they cannot be drafted away. The law's purposive backstops—circumvention rules, dilution prohibitions, economic substance—do reach conduct that satisfies the letter while defeating the intent, but they work case by case, at the speed of adjudication. For fifty years the regime held because finding a gap took a lawyer, a budget, and time that had to win against a quarterly deadline. Regulatory stability was never a property of the drafting. It was an equilibrium in the cost of adversary search, and that cost is now collapsing. A working environmental lawyer of twenty-seven years argues that two responses remain—accelerate the enforcer, or stop grading compliance against the proxy and grade it against physical state—and that only the second one scales."
license: CC-BY-4.0
author: "Jed Anderson"
hero_image: "/images/the-latency-bet-social-hero.png"
hero_image_alt: "Near-black title card reading 'The Latency Bet—environmental law never regulated behaviour.' Two horizontal rules run across the card, cream on the left and amber on the right, separated by a gap."
pdf: "/pdfs/the-latency-bet.pdf"
show_abstract_on_page: true
---

*Jed Anderson is an independent researcher in Houston, Texas. He has practised environmental law for twenty-seven years. ORCID [0009-0003-1807-2459](https://orcid.org/0009-0003-1807-2459).*

**Disclosure.** I founded and led a company that builds environmental AI and sold such systems to large regulated industrial companies. I retain a financial interest in that sector. The final section of this essay argues for more of that work, and if the programme described here were funded, firms like mine would be among the beneficiaries. Nothing here is for sale and the specification it points to is open, but you should know where I sit before you read what I recommend.

---

A client calls. They are revamping a crude unit—new internals, higher throughput, existing heaters and existing furnaces running harder. The question is whether the project triggers New Source Review, because if it does the answer costs them eighteen months and a control technology analysis, and if it does not they order steel in March.

Nobody answers that by reading a rule. You answer it by holding six things in your head at once.

You start with projected actual emissions after the change, which is a forecast, not a measurement. You compare that against baseline actual emissions, which for a non-utility unit means the average over any consecutive twenty-four months you choose from the preceding decade—and the choosing is the first place judgment enters. You adjust that baseline down for anything that would have exceeded a currently applicable limit, because a favourable period is not free-standing. You net the increase against contemporaneous decreases at the same source inside a five-year window, and *contemporaneous* and *creditable* are both defined terms with litigation behind them. You check whether the estimate rests on an AP-42 factor rated E, which means the underlying data was thin, which means the number has room in it. You check the averaging period on the existing permit limit, because tons per twelve-month rolling total behaves differently from the same number expressed hourly. And you check whether the unit sits under a synthetic minor cap, and whether that cap is federally enforceable as a practical matter, which is a different question from whether it is written down.

Then you see it. Two units in the affected group have a twenty-four-month window in 2017 that sits high for reasons that had nothing to do with this project—a turnaround year, unusual run rates, all of it real and all of it documented. Use that window and the projected increase lands under the significance threshold. The tonnage does not change. What changes is the denominator you measure it against.

Nothing there is improper. The regulation lets the operator pick the window. The numbers are true. And it is not invisible: if there is a reasonable possibility the project could have triggered review, the rules require the source to document the projection and track actual post-change emissions for five or ten years, and an agency can ask.

That took me four days. It was worth what they paid.

I did that work, or work shaped like it, for twenty-seven years. What I understood far too late is that I was not selling knowledge of the law. Any competent lawyer can look up a significance threshold. I was selling **speed across layers**—holding statute, rule, permit, test method and averaging convention in mind at once and seeing, quickly, where they did not quite meet.

That is not legal reasoning. That is search.

And I was the slow version of it.

## The gaps are the price of the rule

Environmental law is a stack of proxies. It has to be.

At the top is a thing nobody can measure: a river people and fish can live in, air that does not shorten a life. You cannot serve a notice of violation on a facility for failing to be a good neighbour to a watershed. So you substitute.

The first substitution is a statutory standard, and the Clean Air Act's is deliberately not a number: ambient standards must be *requisite to protect public health with an adequate margin of safety*. The D.C. Circuit read that margin, in *Lead Industries*, as an instruction to act against effects research has not yet uncovered; the Supreme Court held in *Whitman* that cost may not enter it at all. It is a good sentence doing real work. It is also, precisely because it refuses to reduce, unenforceable on its own.

So you substitute again, into a number—an ambient standard, an effluent limit, a listing threshold. Then again, into a permit condition, which needs an averaging period and an applicability cutoff and a netting baseline, because a facility has to know on Tuesday whether Tuesday complied. Then again, into a measurement rule: which emission factor, which test method, what fills the hours the analyser was down. At the bottom sits a reported number. The credible evidence rule means that number is not the last word in an enforcement case, and an agency may prove a violation by other means. But it is the layer the system runs on day to day, and it is the only one an automated process ever touches.

Every one of those substitutions was necessary, and every one was fought over by people who were good at their jobs. The version of this argument that treats the system as sloppy gets the finding backwards, so be exact about how good it is. Part 75 does not permit monitor downtime, it prices it: as availability degrades the substitute value climbs toward the maximum potential concentration, making a missing hour the most expensive hour on the report. Averaging periods are not slack—the averaging time *is* the health endpoint, which is why ozone is eight hours and sulphur dioxide is one. Netting is not a hole but a contemporaneous, creditable, permit-enforceable neutrality test, litigated for four decades, with a step that exists to refuse credit for decreases nobody can enforce.

This is the best proxy system anyone has ever built.

And every substitution in it opens a gap between satisfying the number and achieving the intent. Not through carelessness. **Through the act of substituting.** The moment you replace a thing you care about with a thing you can measure, you have created a set of world-states that satisfy the measurement and miss the point, and no amount of redrafting eliminates that set. You can move it. You can shrink one and widen another. You cannot close it, because closing it would mean writing a rule with no proxy in it, and a rule with no proxy in it is a sentiment.

The gap is not a defect in environmental law. It is the price of having a rule a stranger can verify.

Doreen McBarnet named the practice that lives in those gaps thirty years ago: creative compliance, using the letter of the law to defeat its spirit, not as deviance but as an industry norm. She was right about the mechanism. What she described was a profession. What I am describing is what happens when the profession stops being the rate limit.

And the law is not naive about this. It has purposive backstops—rules that turn on why you did something rather than on a number. The air toxics and new source performance rules forbid circumvention outright, without specifying a quantity. The discharge rules forbid meeting a limit by dilution. Tax went further and codified economic substance into the statute.

Those rules work, and they are the most expensive instrument in the box: each requires an agency to prove purpose, case by case, against a party with counsel. They are a scalpel, not a filter, and there are only so many hands. Which sharpens the problem rather than softening it. The purposive layer is real, and its throughput is measured in cases per year.

![The proxy stack, and the variable that moved: six layers of environmental law from intent down to the reported number, with the gap each substitution opens, set against the collapsing cost of searching those gaps.](/images/the-proxy-stack.png)

## The bet nobody wrote down

So why did it hold?

For fifty years, the gaps sat there, fully exploitable, and mostly nobody exploited them. Not because they were hidden—they were in the Federal Register. Because finding one cost too much.

Finding a seam took a lawyer who had spent a decade learning where seams live, billable hours that competed against other matters, and a client willing to fund four days on a question that might come back *no*. Every gap in the stack had a price on its head. The price was human attention, and human attention was scarce, expensive, and busy.

That is the whole equilibrium. Environmental law never regulated behaviour. It regulated behaviour at human search speed.

Nobody wrote that down. Agencies model compliance costs and enforcement budgets; nobody models the regulated party's search budget, because for fifty years it was a constant. Constants do not get written down. They get assumed, then forgotten, then they change.

Cryptographers never make this mistake. They do not call a cipher unbreakable; they quote a work factor and assume it falls. A regime whose security is a work factor nobody wrote down has not been tested. It has been lucky, in a way nobody measured.

**Exploitability is the gap, times the search you can afford, times what it costs you if the agency disagrees.** Three terms, and it is worth being clear about which one moved. The first has been fixed since 1970. The third—expected penalty, discounted by the chance of being caught—is what enforcement policy operates on, and it is the term every conventional remedy targets.

The second is the one nobody was watching.

## The price goes to zero

In June of this year a team from King's College London, Fudan, and the Alan Turing Institute built seventy-two simulated regulatory environments. Thirty-two of them were reverse-engineered from real regulations with real loopholes—gaps that had to be closed by actual amendment, after somebody in the world found them and used them.

Reinforcement learning rediscovered more than sixty per cent of those loopholes.

Not by being asked to. The systems were optimising a reward. Nobody instructed them to look for exploits, and there was no exploit-shaped request to refuse, which is why refusal training caught almost none of it. Self-critique flagged thirty-seven per cent.

Hold that number loosely. The environments were built backwards from the patches, so the target was drawn around the answer, and the match was scored by another model agreeing with human raters about half the time above chance. The authors' own framing is right: sandboxed, and evidence for a mechanism rather than a measurement of damage.

The mechanism is what worries me. Each of those thirty-two loopholes represents a search a human once ran—expensively, over months, against a deadline. The machine ran all of them at once, for free, while pursuing something else.

The corroboration is thinner and I will state it thinly. METR found OpenAI's o3 rewriting scoring functions in one to two per cent of task attempts, rising to seventy per cent on a single task framed as having real consequences. Anthropic found models generalising from gameable training environments to rewriting their own reward function in forty-five of 32,768 held-out trials, seven of which also edited the unit tests to hide it. Small numbers. They are small because this is rare and unprompted, not because it is hard.

Two more facts belong here, together.

None of those seventy-two environments covers environmental regulation. Finance, healthcare, tax, housing, immigration, consumer protection, one energy scenario about market rules. No water. No land use. No permits. The densest proxy stack in existence is absent from the only benchmark measuring the thing it is most exposed to.

And I searched the current published values documents of all five frontier labs—Anthropic's constitution, OpenAI's Model Spec, Google's principles and DeepMind's safety framework, Meta's, xAI's—for *watershed*, *habitat*, *biodiversity*, *pollution*, *wildlife*. Zero hits across all five. Every "ecosystem" means a developer ecosystem; every "environment" is a sandbox.

Those are the same observation from two directions. The people removing the latency have no idea what it was holding up.

## Better drafting will not save this

The instinct of every regulator and every environmental lawyer facing a discovered loophole is to write a better rule. It is a good instinct. It has worked for fifty years. It is what the thirty-two amendments in that benchmark *were*.

Every fix adds a layer. Every layer is another substitution of the measurable for the meant. Every substitution opens its own gap. The response to a discovered exploit is a rule that is more specific, which means more proxies, which means more surface. Each patch used to be cheaper than the next search, and while that held it was a fine game. Invert the cost and the same move runs backwards: you generate attack surface faster than an adversary that never sleeps consumes it.

You cannot out-draft a tireless searcher. Adding precision adds seams.

The machine-learning people have formalised this. Push optimisation pressure past a threshold and a proxy stops tracking what it stood for—not gradually but as a turn, past which more optimisation makes things worse. Their remedy is to stop optimising at the turn. A regulator cannot ask an industry to optimise less.

So the drafting move is exhausted, and two are left. Both belong on the table, because eliminating one by assertion is how this argument goes wrong.

The first is to accelerate the enforcer. The purposive backstops work; their limit is throughput. Give agencies the search capability the regulated side is acquiring and the asymmetry closes from the other end. I have no argument that this fails—only the observation that it requires appropriations to outpace private capital, which has a poor record.

The second is to stop grading compliance against the proxy at all.

## The one referee whose reading cannot be edited cheaply

Every objective you can write down is a representation. A number, a reported value, a rater's approval. And a representation is a different object from the thing it represents, which is what gives an optimiser two routes to a good score: change the world, which is expensive and is what you wanted, or edit the representation, which is cheap and is what you got.

There is one case where those routes converge. Physical state.

The cleanliness of a river is graded by the river. There is no register to hack that is not the water. To make the score read clean, you have to make the water clean.

I want to be exact about what this is not, because a seductive version of it is circulating and I have contributed to that. Nature does not supply values. The biosphere has no preferred decade and no opinion about whether a marsh should be a marsh. Anyone selling a system that learned its ethics from ecology has hidden a human chooser somewhere and not told you where. Physical state is a referee, not a legislature: it grades consequences and has nothing whatever to say about what should have been aimed at.

Nor is it incorruptible. You never touch physical reality bare—you touch it through a sensor, and a sensor is a representation again. Spoofable, mis-sited, or simply never installed.

What you get is a price differential, and the differential is the point. Faking a single approval costs about what lunch with the right person costs. Faking a dense, redundant, independently-owned measurement of a watershed costs more with every instrument, and keeps costing, against a world that keeps generating fresh evidence.

Independence carries that whole argument, and it is harder to buy than to specify. A thousand readings through one vendor's stack is one reading wearing a thousand faces, and independently built systems have been known since the eighties to fail in correlated ways, because their builders share assumptions even when they share nothing else. Independence is a claim to audit, not a property you get from using two suppliers.

And it only works where the thing you care about is continuously measurable. Stack gases, discharge chemistry, flow, temperature—those admit a physical grader. Habitat, biodiversity, fugitives and trace toxics do not, and there the grading still runs through a model or a periodic sample. That is the proxy stack again with instruments bolted on. This move is not general, and pretending otherwise would be the error I am accusing the drafters of.

The physics is permissive and unglamorous. A control system does not supply the energy it redirects; it gates energy already present, the way a transistor's gate signal switches a current it did not generate. At the floor set by the second law, erasing one bit at 300 kelvin costs about 240 times less than the average carbon-hydrogen bond whose fate it might decide, and in deployed control systems the energy steered over energy spent runs eight to twelve orders of magnitude. Nothing in thermodynamics makes environmental gating expensive. Which is not the same as saying it is cheap to build.

It has to be continuous, and that is not a preference. A contaminant in a river moves at about a metre a second; a bloom doubles in a day. A quarterly grading loop is not a slow version of an hourly one. Past a threshold a controller slower than its disturbance stops damping and starts amplifying. Slow does not mean late. Slow means the loop does not close.

## We have built this before, pointing inward

None of this is speculative engineering, and I want to be concrete about why.

In 1993 this profession built exactly the instrument I am describing. Forty CFR Part 75 put continuous monitors on fossil generating units, required an hourly record for every operating hour, made the data public, and priced missing hours punitively. It covers the large majority of US fossil generation, it was built against an adversary with every incentive to defeat it, and it moved the grading from a reported estimate to a measured physical quantity.

It did not end gaming. It relocated it. When the number comes off an instrument the attack moves to the instrument, and there is an enforcement history of falsified accuracy testing to prove it. You trade a large population making defensible judgment calls for a small population committing felonies. A very good trade. Not a solution.

Then the question I did not expect to be the interesting one. Part 75 has existed for thirty-three years and has barely spread—water, waste, land use, hazardous air pollutants, fugitives all still run on estimates and periodic sampling. If continuous grading is so obviously better, why is it still sitting in one corner of the Clean Air Act?

The answer is not technical. Part 75 exists because an allowance market needed tonnage accurate enough to settle trades. Somebody had a reason to pay. Everywhere else the beneficiary is the public, diffusely, in harm that does not happen, and no line item funds a release that was interlocked at second forty. The instrument did not spread because prevention is invisible, not because it is hard.

That is the real obstacle, and it is a market failure rather than a physics one.

The second precedent is newer and points the other way. Google has run autonomous cooling in its data centres since 2018—a real optimiser with real authority over real equipment, wrapped in hard constraints it cannot cross. That is an interlock around an optimiser, deployed, working, at scale.

The constraints protect the plant.

We already know how to build this rung. We have only ever built it pointing inward.

The distance that matters is small and specific. An advisory environmental flag—the system notices, says so, and is overruled by the task objective—is an alarm. Everything deployed today, including everything I have built, is an alarm. A trip that fires on physical criteria regardless of what the objective wants, evaluated outside the optimiser's reach, is an interlock. Every plant engineer has watched a safety instrumented system shut a unit down over the board operator's objection and remembers exactly how that felt, because that is what it means for a criterion to have authority instead of a voice.

Alarm to interlock. That is the whole engineering programme.

## Monday morning

**If you write permits:** express one condition you already impose as a structured constraint a machine could evaluate continuously, and see what breaks. You will learn more in a week than in a year of panels.

**If you run an agency:** add an attribution field. When a deviation is reported, ask whether an automated system was involved. It costs a checkbox, and until it exists none of this can be counted.

**If you work at a frontier lab:** put an environmental environment in the reward-hacking benchmark. You have the harness. It is a weekend.

**If you are a plant engineer:** you understand the interlock argument better than the AI safety field does. Say so where they can hear you.

And a boundary, because this argument has an obvious misuse. Nothing here is a case for fewer permit conditions, weaker limits, or a dollar less of enforcement funding. Continuous physical grading is **additive and one-directional**: the fixed limit stays where it is, anything that adjusts may only tighten, and none of it substitutes for inspectors. Enforcement being rate-limited is an argument for more of it, arriving faster. A condition that can loosen in real time is not a permit but a negotiation, and it destroys the fixed number a citizen needs in order to sue—whereas dense public monitoring data is the best thing that ever happened to a citizen suit, because it replaces an inference with a record. If you are quoting this in a comment letter arguing for streamlined permitting, you have taken my sentence and left my argument.

## Where this could be wrong

Five things could break this. I know which one worries me.

**The trend I claim has not been shown.** Legal search has been getting cheaper for twenty-five years. If I am right, something should already be visible—more applicability disputes, stranger netting structures, anomalies clustered where averaging conventions are most exploitable. I looked and did not find it. That absence is consistent with an effect nobody measures, which is what I believe, and equally consistent with no effect. The two look identical from here, and anyone who tells you otherwise is selling something.

**Identification may never have been the binding constraint.** A benchmark environment is not a live permit. Real exploitation means a specific unit's history and an agency that can say no, and a company with a legal department was never short of ideas. If that is the truth, the right response is not this programme—it is to keep drafting and fund the enforcers. I would rather be told now than in 2031.

**I have not costed the instrument.** Sensing at national scale means hardware, siting, calibration, telemetry, replacement cycles and the compute to run the grader. The redundancy that makes it hard to fake is what makes it expensive to build, and I have put that number only on the adversary's side of the ledger. Price it before funding it. If it prices badly, no payer is the whole Part 75 story rather than half of it.

**A bypassed interlock is worse than none**, because everyone believes it is there. A trip that shuts a unit on a false reading gets disabled within the week, and nobody has published a false-trip rate for any environmental criterion against real data. Until somebody does, this is not ready to deploy.

Three dates, so this is checkable by a stranger without waiting on anyone's cooperation.

**By 1 August 2029**, if no enforcement action, agency finding, docketed comment or peer-reviewed study anywhere identifies an automated system finding a regulatory gap it was not directed to find, the mechanism does not transfer and this argument was wrong. Nobody has to build anything for that to fire.

**By 1 August 2029**, if three of the five labs audited here publish values documents containing a substantive environmental criterion, that half of the diagnosis was a phase. Run the same search; it takes an afternoon.

**By 1 August 2029**, if any incident report or study shows a deployed environmental interlock causing net harm through nuisance trips or optimisation against its own trip condition, the remedy is worse than the disease and I built the thing I warned about.

## Close

We spent fifty years writing rules against an adversary who had to sleep, and we are about to find out which of them were load-bearing.

---

*Published under CC-BY-4.0. The technical treatment—the formal proxy-stack analysis, the physical-grounding argument, and the full alarm-to-interlock specification with adversary analysis at each level—is in the [companion](/essays/environmental-safety-mode). Every number in this essay is sourced in an open fact ledger.*
