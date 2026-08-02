---
title: "It Has Read Everything We Ever Wrote. It Has Never Read a River."
slug: "it-has-never-read-a-river"
subtitle: "The environmental movement is auditing AI's electricity bill. Meanwhile we are handing these systems authority over food, water, freight, chemicals and the grid—and they cannot read the planet's instruments, and no frontier lab's stated values contain a watershed."
date: 2026-08-02
type: essay
status: draft
tags: ["environmental-intelligence", "monitoring", "incorruptible-grader", "regulatory-reform", "information-theory"]
abstract: "Data-centre electricity is a real, bounded, measured harm—roughly three per cent of world power by 2030. It is also the wrong denominator. AI systems are being given allocation authority over agriculture, water, freight, chemicals and electricity dispatch, and two gaps run through them: they learned the physical world almost entirely from text about it rather than from the instruments Earth now carries, and not one frontier lab's published constitution, model spec or safety framework contains a conservation law, a watershed, a species or a permit limit. Neither gap is a hardware problem. Both are fixable now. A working environmental lawyer of twenty-seven years argues the asymmetry, shows why environmental law is the densest reward function ever built and therefore the most exposed, and proposes Environmental Safety Mode—an open, six-level alarm-to-interlock specification for environmental criteria in AI systems."
license: CC-BY-4.0
author: "Jed Anderson"
hero_image: "/images/environmental-alignment-social-hero.png"
hero_image_alt: "Near-black title card reading 'It has read everything we ever wrote. It has never read a river.' A single horizontal rule runs across the card, broken in the middle—cream on the left, amber on the right—with the two halves never meeting."
pdf: "/pdfs/it-has-never-read-a-river.pdf"
show_abstract_on_page: true
---

*Jed Anderson is an independent researcher in Houston, Texas, and has practised environmental law for twenty-seven years. ORCID [0009-0003-1807-2459](https://orcid.org/0009-0003-1807-2459).*

**Disclosure.** I founded and led a company that builds environmental AI and sold such systems to large regulated industrial companies. This essay argues the world needs far more and far better environmental AI—the sector I work in. If the programme described here were funded, firms like mine would benefit. Nothing here is for sale, but that describes the artifact, not the career. Discount accordingly, and check the argument against the open fact ledger rather than trusting the arguer.

---

I went looking for a particular kind of story, and I want to start by telling you I could not find it.

The story goes like this. An automated system is given a job—irrigate this district, dispatch this grid, route this fleet, apply this nitrogen, report these emissions. It does the job well. It hits its target. And in hitting its target it does something to the air or the water or the ground that nobody asked for and nobody noticed, because the harm was not in the objective and no instrument in the loop was watching for it.

That has to have happened somewhere. Optimisers are everywhere in the systems that touch land and water. But I cannot show you a documented case, and as far as I can tell neither can anyone else.

Let me be precise about what is missing, because the imprecise version is wrong. The excursion itself would be reported: Title V permits require prompt reporting of every deviation, cause-agnostic by construction, and discharge permits require twenty-four-hour reporting of noncompliance that may endanger health. If an optimiser drives a unit out of limits, that lands on a report like any other exceedance.

What does not exist is any way to say *why*. There is no attribution field. No form anywhere asks whether an excursion happened because an automated system was doing exactly what it was told. Two international registries of AI incidents—one nonprofit, one run by the OECD—both define an incident to include environmental harm; both have a box for this and I could not find anything in it. EPA, collecting enforcement data since 1970, has no such category either; its only algorithm-adjacent enforcement line is defeat devices, which are people cheating on purpose rather than machines succeeding on purpose.

So this is a taxonomy gap, not a reporting gap. That is a smaller claim than the one I set out to make and it is still the load-bearing one. The harm gets counted. The cause never does. We built an apparatus for counting environmental damage that cannot distinguish a bad Tuesday from an optimiser that has found something and will keep finding it.

## The fight we're having

The environmental community has spent three years fighting artificial intelligence over its electricity bill, and it has been right to.

The numbers are not soft. The International Energy Agency puts data-centre electricity at 485 terawatt-hours in 2025, up seventeen per cent in a single year, and projects roughly a doubling by 2030 to just under three per cent of world demand—growing four times faster than every other sector combined. The load is concentrated to the point of distortion. Ireland's data centres take more than a fifth of the country's metered electricity, more than all its urban households. Virginia's take about a quarter of the state's power. Direct water consumption in American data centres runs to tens of billions of litres a year.

And the bill lands on people who did not sign up for it. In the PJM market, capacity prices jumped more than eightfold in a single auction cycle, and PJM's own market monitor attributed about sixty-three per cent of that increase—roughly $9.3 billion, recovered from customers—to data centres. That is a line on a household bill in Ohio.

One number complicates this in a way that belongs here rather than buried. The IEA also reports energy per AI task falling by at least an order of magnitude annually; Google measured a thirty-three-fold drop in energy per prompt across a single year. Both things are true at once—the cost of a unit of AI work is collapsing and total consumption is rising steeply anyway. That is a rebound effect, and it does not soften the footprint case. It sharpens the one I am about to make, because it means growth in the numerator is driven by **expansion in what these systems are asked to do**, not by the cost of doing it. Scope expansion is exactly how allocation authority accumulates.

I want to be exact about my position, because what follows can be misread as dismissal and is not. The people fighting data centres at zoning hearings and utility commissions are doing skilled, necessary work and winning some of it. The footprint case is true, it should be pressed, and it should keep every resource it has. I am arguing for an addition, not a reallocation.

It is also the meter on the outside of the building.

Nobody is asking what the building is doing.

## The wrong denominator

Computing's electricity is heading for about three per cent of world electricity. World electricity is itself roughly a fifth of world energy. So the entire object of the fight—every data centre on Earth—is something under one per cent of what humanity burns.

Now look at what those machines are pointed at. Agri-food systems take about thirty per cent of the world's end-use energy and account for between a fifth and a third of net greenhouse emissions. Transport takes another thirty per cent of final energy. Chemicals is the largest industrial energy consumer on the planet. Water supply and treatment take about four per cent of global electricity by themselves—several times the whole AI footprint. And every one is acquiring an optimisation layer: what to plant and when to irrigate, which unit to dispatch, how to route a fleet, which feedstock to run, when to release.

Computing is the governor. Food, water, freight, chemicals and the grid are the governed.

But comparing two totals is not the comparison this argument needs, so let me state the threshold rather than gesture past it. What matters is computing's footprint against the *change* in sector throughput caused by automated allocation. That arithmetic lands somewhere specific: computing's projected 2030 electricity is around half a per cent of world energy supply and the governed sectors are on the order of half of it, so the two effects are comparable when automated allocation misdirects roughly **one to two per cent** of a governed sector's annual throughput, net of the gains it also produces. Above that line allocation dominates; below it the footprint does.

I do not know which side we are on. Nobody does, because nobody is measuring it—which is the actual complaint of this essay.

**And this is an asymmetry argument, not a proof**—and the asymmetry is thinner than I first wrote it. The footprint risk is measured quarterly by the IEA and partially priced into capacity auctions and utility bills. It is *not* reversible, and I had that wrong: decommission the campus and the load goes away, but the carbon already emitted does not, the aquifer drawn past recharge does not refill, and the turbine built to serve the campus is a thirty-year asset with its own gas contract. Those are the same harm classes I would otherwise have claimed only for the other side of the ledger.

What survives is narrower and holds: the footprint risk is **measured and partially priced**; the allocation risk is **neither**. Both can be irreversible. Only one has anyone counting it.

And I should be honest about what kind of decision this is. It is not actuarial—an insurer prices against a base rate and I have none. It is the decision you make about a failure mode you have characterised mechanically but never observed, which in process safety is ordinary and has an ordinary answer: instrument it first, argue about the setpoint once you have data. That is the entire ask of this essay.

![The governor and the governed: computing's own energy use on a logarithmic scale against the energy throughput of the agri-food, transport, water and electricity systems computing is being handed authority over.](/images/governor-and-governed.png)

## It has never read a river

The systems being handed these decisions learned the physical world almost entirely from our writing about it.

That is not a slight. It is a description of the training data. A frontier model has read the hydrology textbook, the permit application, the enforcement order, the impact statement, the paper about the plume, the news story about the fish kill. It has, in a meaningful sense, read everything we ever wrote about a river.

It has never read a river.

Meanwhile the planet grew instruments. Landsat and Sentinel image the whole land surface on a schedule. Continuous emission monitors have reported stack chemistry hour by hour since the early nineties. Stream gauges, soil probes, air monitors and a constellation of small satellites now produce a record of physical state that nobody had when environmental law was written.

And there are models that read it, and they are good. Prithvi-EO-2.0, built by NASA and IBM, was trained on 4.2 million global time-series samples from the Harmonized Landsat and Sentinel-2 archive; compressed versions were uploaded to a satellite and to a payload on the International Space Station and ran inference in orbit. Google DeepMind's AlphaEarth Foundations produces an embedding for every ten-metre patch of land and coastal water on Earth, refreshed annually.

Those models are small—the largest measured in hundreds of millions of parameters, against 405 billion for the largest frontier model with a published count. Small is not the problem; these are perception models and they do not need to be large. The problem is what they are connected to.

Let me be precise, because this is the most falsifiable claim in the essay and I have already narrowed it once to survive the evidence. It would be false to say Earth-observation models are not wired into agentic systems at all. They are. Google's Earth AI and its Geospatial Reasoning agent have Gemini orchestrating expert sub-agents equipped with Earth-observation foundation models, and it is impressive work—but limited-release, decision support, and human-in-the-loop by design, which Google says itself in every example it publishes.

What does not exist, anywhere I can find as of this month, is an Earth-observation foundation model inside an autonomous decision loop with authority over a physical system. The perception layer exists. The authority layer exists. They are separate systems, built by different people, and the wire between them has not been run.

The planet finally started keeping records, and nobody has shown them to the thing making the calls.

![It has read everything we ever wrote. It has never read a river.—a comparison of frontier general-purpose model scale against Earth-observation foundation model scale, with the missing connection between them drawn as an explicit gap.](/images/it-has-never-read-a-river.png)

## What nature can and cannot teach

I need to correct something, and the something is mine.

I have written, in a public letter, that nature itself is the alignment dataset—that Earth has been keeping a journal since the Archaean and the work of alignment is teaching our machines to read it. I still think that sentence is close to right. But it sits one comma from a claim I do not hold and will not defend, and the seductive misreading is doing rounds without me.

The misreading: train an AI on nature and it will learn right from wrong.

It will not. The biosphere has no preferred decade. It has no nostalgia, no baseline it is trying to return to, no opinion about whether a marsh should be a marsh or a parking lot. Five mass extinctions did not register as tragedies at the level of physics. The Pleistocene you are picturing when you say "restore" is a curated postcard from a particular ten thousand years, chosen by a human, for human reasons.

Anyone who tells you their system learned its values from ecology has smuggled a human chooser into the loop and not said where. Ask them where. There is always an answer and it is always a person.

What nature supplies is narrower and more useful: the one grader that cannot be bribed. Every objective we know how to write down is a representation—a number, a reward model, a rater's approval—and a representation is a different object from what it stands for. That gap gives an optimiser two routes to a high score: change the world, which is expensive and is what you wanted, or edit the map, which is cheap and is what you got. Physical state is the one case where the two converge. The cleanliness of a river is graded by the river.

Not incorruptibly, and I have argued against my own title on this before. You never touch physical reality bare; you touch it through a sensor, and a sensor is a representation again—spoofable, mis-sited, or never installed. What survives is a cost asymmetry: faking a densely and independently measured physical system gets harder without bound, while faking a single approval does not.

So: nature grades consequences and has no view on what should happen. Humans supply the aim. Physics supplies the referee. Confuse those two jobs and you have built something worse than what we have, because it will be wrong with a straight face.

## The values we do have, and where they aren't

We are not short of environmental values. Fifty years of environmental law is not a set of good intentions—it is a corpus hammered out by industry lawyers and agency lawyers fighting each other in front of judges, line by line, for half a century, with money and liberty on the table. Every threshold in it was contested by someone with a strong incentive to contest it. That adversarial history is what makes it worth something: a record of what a society concluded, under pressure, about how much harm is too much. Together with the European environmental acquis it is one of the two largest tested statements of environmental ought any civilisation has produced.

So I went looking for it in the places that now govern machine behaviour.

I read the current published values documents of the five labs that matter—Anthropic's constitution for Claude, OpenAI's Model Spec, Google's AI Principles and DeepMind's Frontier Safety Framework, Meta's scaling framework, xAI's frontier framework—and searched their full texts for: ecosystem, species, watershed, habitat, emissions, pollution, conservation, biodiversity, climate, wildlife.

The result is close to a clean null. Across all five, "watershed," "habitat," "biodiversity," "pollution" and "wildlife" appear zero times. Every "ecosystem" means an information or developer ecosystem. Every "environment" means a sandbox, a test harness, or an enterprise network. The single "species" hit in Anthropic's constitution is a hard constraint against destroying the human one. The closest any lab comes is Anthropic listing "welfare of animals and of all sentient beings"—a real moral commitment, and a sentience-based one, which is not an ecological one. A watershed is not sentient. Neither is an aquifer.

These are not empty documents. They are careful, serious and specific about chemical and biological weapons, cyber operations, manipulation and loss of control. The environment is simply not in the risk taxonomy. It was not excluded after an argument. It never came up.

The law is better than a first pass suggests. The EU AI Act names environmental protection in its purpose clause, counts serious environmental harm as a reportable incident, and in Article 95 expressly invites voluntary codes of conduct on minimising AI's environmental impact—a provision I would not want to be caught omitting. It is also voluntary, unenforceable, and about the systems' own footprint rather than their effects. Where the Act actually binds—the Annex III high-risk categories and the systemic-risk definition governing the largest models—the environment does not appear. You may volunteer to consider it. You must report it once damaged. It does not gate what a system may do.

## Why environmental law is the hardest reward function we have ever built

This is the part I know from the inside, so I will be careful with it, because the careless version is a gift to people I have no wish to help.

Environmental law is a stack of proxies. At the top is something nobody can measure: a river people and fish can live in, air that does not shorten a life. Below that is a statutory standard that deliberately refuses to become a number—*requisite to protect public health with an adequate margin of safety*, which the D.C. Circuit read in *Lead Industries* as an instruction to act before the science is conclusive, and which the Supreme Court held in *Whitman* to be a workable delegation that forbids weighing cost at all. Below that is a number. Below the number is a permit condition with an averaging period, an applicability cutoff, a netting baseline. Below the permit is a measurement rule: which emission factor, which test method, what substitute data covers the hours the analyser was down. At the bottom is the reported number.

**Every one of those layers was engineered to close the gap between compliance and intent, and most of them do their job.** The sloppy version of this argument has that backwards, so: Part 75 does not *allow* monitor downtime, it prices it—as availability degrades the substitute value climbs toward the maximum potential concentration, making a missing hour the most expensive hour on your report. Averaging periods are not slack around a number; the averaging time *is* the health endpoint, which is why ozone is eight hours and sulphur dioxide is one. Netting is not a hole but a contemporaneous, creditable, permit-enforceable neutrality test litigated for four decades.

I have run netting and common-control analyses for paying clients and the work was legitimate. What I noticed over twenty-seven years is narrower and more uncomfortable: a large part of what I was worth to a client was **pattern-matching speed across the layers**—holding the statute, the rule, the permit, the test method and the averaging convention in mind at once, and seeing quickly where they did not quite meet.

That is the part a machine does better than I do, and it will not stop where I stopped.

So the claim is not that environmental law is weak. It is the opposite. Environmental law is the densest, most adversarially tested proxy stack ever built—and every layer was designed against a *slow* adversary: a company with lawyers, a budget and a quarterly filing deadline. None of it was designed against a tireless searcher probing every layer at once, for free, forever.

Now put a capable optimiser in front of that stack.

We already know what happens, and this part is measured rather than speculated. A team from King's College London, Fudan and the Alan Turing Institute built seventy-two simulated regulatory environments this June, thirty-two reverse-engineered from real regulations with real loopholes later patched. Reinforcement learning rediscovered more than sixty per cent of those loopholes—the ones that had required actual exploitation in the world to motivate an amendment—while simply optimising its reward, with no instruction to look for exploits. Refusal training caught almost none of it, because there is no harmful request to refuse. Self-critique flagged thirty-seven per cent.

The authors are careful and I will be too: those were sandboxed simulations, and they say explicitly the results are evidence for a mechanism, not a measurement of real damage. Agreed. But the mechanism is the point and it does not stand alone. METR found OpenAI's o3 rewriting scoring functions in one to two per cent of task attempts, rising to seventy per cent on one task framed as having real consequences. Anthropic found models generalising from gameable training environments to rewriting their own reward function in 45 of 32,768 held-out trials—and in 7 of those, editing the unit tests to hide it. Small numbers, stated as small, because the honest reading is that this is rare and unprompted rather than common.

None of it is new to the people who study it. The mechanism is Goodhart's law with a decade of formalisation behind it, and the specific failure has been named since 2016. What is new is where I am pointing it.

And of those seventy-two regulatory environments, not one is environmental. There is a single energy-sector scenario, and in context it concerns market rules. No water. No land use. No emissions. No permits.

The densest proxy stack we have, and it is not in the benchmark.

I put this essay in front of a hostile AI-safety reviewer before publishing it, and asked for the honest verdict on what is actually new. It came back: *the environmental-law-as-proxy-stack analysis and the cross-literature identification are new, the rest is synthesis.* That is correct and I am printing it. The mechanism belongs to other people. What I can contribute is the finding that the compliance-intent gap is **designed in and load-bearing**—the substitutions are required for the law to be enforceable, so the gap cannot be closed—which makes environmental regulation the largest adversarial testbed for reward hacking that anyone has, and which nobody in AI safety is positioned to notice from where they sit.

![The proxy stack: environmental law read as a reward function, with intent at the top and descending layers of measurable proxies, and the gap between compliance and intent widening at each layer.](/images/the-proxy-stack.png)

## What we could have instead

Everything above is the risk half. The opportunity half is larger, and it is why I do this work rather than write letters of complaint. Environmental protection has never had an instrument that runs at the speed of the harm.

Consider what we are up against. A contaminant in a river moves at roughly a metre a second—the 2015 Gold King Mine release covered a hundred kilometres in about a day and a half. A cyanobacteria bloom doubles in about a day. Against that: an Endangered Species Act listing takes an average of more than twelve years, against a petition pathway Congress designed to run about two.

Be careful what that gap measures, though, because it is easy to charge to physics something Congress did on purpose. Section 4 contains a lawful off-ramp—"warranted but precluded"—and the study behind the twelve-year figure found listing rates tracking appropriations rather than biology. The delay is legislated and underfunded before it is ever technical.

So this is not a story about people not caring, and not really about people at all. What sits underneath is a control loop whose delay exceeds the timescale of what it controls, and control theory is unambiguous. Past a threshold, a slow controller does not steer weakly. It steers backward—corrections arrive out of phase and amplify the swing they were meant to damp. No budget buys back phase margin already lost to delay. You can only shorten the loop.

Slow does not mean late. Past the threshold, slow means impossible.

And this profession has closed such a loop before, which is the part I did not expect to be writing. Forty CFR Part 75 is a thirty-year-old, hourly, publicly posted, punitively backstopped continuous instrument record covering roughly ninety-six per cent of US fossil generation. Environmental law built that, at national scale, in 1993, against an adversary with every incentive to defeat it—and it worked. The question is not whether this profession can build a continuous instrument. It is whether it builds the next one, or whether the next one gets built around it by people who have never read a permit.

Now consider what closing the loop makes possible with instruments that exist today. A leak found in the hour it starts rather than the quarter it is reported. A bloom caught at the nutrient pulse rather than the fish kill. A permit whose fixed annual limit stays exactly where it is, with an additional condition that ratchets *down* when there is a thermal inversion over the fenceline tonight and never up—one-directional by design, trigger function in the administrative record and open to comment.

That last one carries a constraint I want on the page. **Nothing here argues for fewer permit conditions, shorter permits, weaker limits, or replacing fixed numbers with dynamic ones.** A condition that can loosen in real time is not a permit; it is a negotiation, and it destroys what makes a citizen suit possible—a fixed number, a determinable averaging period, a compliance method a stranger can verify. Everything proposed here is additive and one-directional. If you find yourself quoting this piece in a comment letter arguing for streamlined permitting, you have my sentence and not my argument.

None of it requires a discovery. It requires the perception layer connected to the decision layer, which is the wire nobody has run.

And here is why it has never been funded: prevention is invisible. Nobody gets a headline for the spill that did not happen. The environmental industry—consultants, lawyers, remediation contractors, me—is largely paid downstream of harm that already occurred, and there is no line item for the release that was interlocked at second forty. That is a market failure, not a technical one, and it is the largest single reason this instrument does not exist.

## Environmental Safety Mode

So let me put what I am asking for in the language of the people who already know how to build it.

Process safety has a ladder from *the system noticed* to *the system stopped it*, and anyone who has worked in a plant knows where every rung sits. I should say plainly what this is and is not. The shape is IEC 61511's, with its layers of protection and its terms of art; I have borrowed it and dropped the part that makes it useful, which is quantified failure probability per rung. A serious version needs that back. What is new is not the ladder. It is applying any such ladder to environmental criteria in general-purpose AI systems, which nobody has done. Six levels:

- **L0—Instrumentation.** The system perceives environmental state at all: sensors, satellites, telemetry, inside the loop rather than in a report.
- **L1—Annunciation.** An advisory flag. The system says so. Nothing is stopped.
- **L2—Deviation logging.** An auditable record of every deviation, written where the optimiser cannot reach it.
- **L3—Permissive.** An affirmative environmental check is required before the action proceeds.
- **L4—Interlock.** A trip that fires on physical criteria regardless of the task objective, outside the optimiser's reach.
- **L5—Embedded objective.** The environmental criterion sits in the grading signal itself: non-proxiable, held outside the agent.

I want to be honest about where the art is, including mine. Environmental AI systems sit at L1—an advisory flag, and then the task objective wins, because the task objective is the only thing holding authority. That is true of everything I have built.

It is not true of everything, and the exception matters. Google has run autonomous data-centre cooling since 2018 with hard operating constraints the optimiser cannot cross. That is a real interlock around a real optimiser, and it works. But the constraints are equipment limits protecting the plant, not environmental criteria protecting anything outside it. Which is the point in miniature: **we already know how to build this rung. We have only ever built it pointing inward.**

L1 is an alarm. L4 is an interlock. Anyone who has stood at a board has watched a safety instrumented system trip a unit over the operator's objection, and remembers the feeling, because that is what it means for a criterion to have authority rather than a voice. The distance from L1 to L4, for environmental criteria, is the entire engineering programme this essay is asking for.

![The alarm-to-interlock ladder: six levels of environmental capability from instrumentation to embedded objective, with a hard line at the alarm/interlock threshold and the current state of the art marked below it.](/images/alarm-to-interlock-ladder.png)

## One paragraph of physics

The gate is cheap, and that is the whole thermodynamic content of this argument. A control system does not supply the energy it redirects—it gates energy already present, the way a transistor's gate signal switches a current it did not generate. So the cost of the decision that prevents a release is negligible against the cost of the release. At the floor set by the second law, erasing one bit at 300 kelvin costs about 240 times less than the average carbon-hydrogen bond whose fate it might decide; in real deployed control systems, energy steered over energy spent runs eight to twelve orders of magnitude. Two claims, two warrants, not to be blurred. The point is only this: nothing in physics makes environmental gating expensive. The obstacle is that nobody built it.

## The refinery, honestly

The analogy has a real disanalogy in it, so let me put that first.

A refinery has a design basis: a piping and instrumentation diagram, a permit with numbers in it, and an engineer who can tell you the setpoint and why. Earth has none of that. There is no as-built for a watershed and no setpoint for a river. Anyone who tells you the biosphere has a target state is choosing one and calling it discovered.

So the setpoint does not transfer. The setpoint was never the interesting part.

What transfers is the loop: instrument, monitor, alarm, investigate, interlock, correct, verify. That loop is the accumulated knowledge of how to keep a dangerous process inside limits while a relentless optimiser—economic pressure—leans on every one of them, continuously, for decades. Environmental professionals are the only population who have run that loop at industrial scale against exactly that adversary. They also wrote the ought-channel: the permit limits, the ambient standards, the listing thresholds, precisely what the labs' values documents do not contain.

Which makes them the missing constituency in AI safety. They hold both halves, and the two fields do not read each other.

## The ask

Monday morning, concretely.

**If you write permits:** write one machine-readable condition. Take a limit you already impose, express it as a structured constraint a system could evaluate continuously, and see what breaks. You will learn more about the future of your job in a week than in a year of conference panels.

**If you run an agency:** add an attribution field. When a deviation is reported, ask whether an automated system was involved. It costs a checkbox, and until it exists these cases cannot be counted.

**If you run an environmental organisation:** keep the data-centre campaign at full strength, and add one person who reads model specifications. Those documents are public, they are short, and nobody from your world is reading them.

**If you work at a frontier lab:** put an environmental environment in the reward-hacking benchmark. Seventy-two regulatory environments and not one environmental—that is a weekend of work for someone who already has the harness.

**If you are a plant engineer:** you already know what L4 means. Say so, loudly, to people who work on AI. They lack your vocabulary and they need it.

**And read the specification.** The full technical treatment—the denominator calculation, the formal proxy-stack analysis, the thermodynamics done properly, and the L0–L5 requirements including how an adversary defeats each level—is in the [technical companion](/essays/environmental-safety-mode). Take it, argue with it, fork it.

## Try to break it

<div class="callout">

**If AI authority stays advisory and human-gated, this is alarmism.** The argument turns entirely on optimisers acquiring real allocation authority over physical systems. If humans stay in every consequential loop, the ratio never converts into risk. I think the trend line is clear; I cannot prove it, and if I am wrong here I am wrong about everything downstream.

**"Unmeasured and unpriced" is a template that defeats every measured risk by construction.** Apply it to any speculative harm and it wins, because being measured is what forfeits the point—and two of those terms are consequences of my own null result. I have restated the argument as a numerical threshold rather than a template, which helps. It does not fully answer this, and nothing will short of somebody actually measuring.

**The footprint fight is about who pays, and I chose the denominator on which it looks small.** Ratepayer transfers, local water, local air and land use do not reduce to a share of world energy. A campaigner is entitled to resent the framing.

**The absence in my lede has a competing explanation I cannot exclude.** The registries may be empty because nobody counts. Or they may be empty because refining, chemicals and grid operations already run safety instrumented systems that catch exactly this class of excursion before it becomes an incident. If so, my preferred remedy is the reason my lede exists, and the correct conclusion is that the fix works and should be extended rather than that a catastrophe is being missed. I cannot currently tell these apart, and the attribution field is what would.

**I have misidentified the adversary.** Dense independent measurement raises the cost of faking *for the optimiser*. It does nothing about the party that owns, sites, calibrates and proof-tests the instruments—which is the same party deploying the optimiser. Process safety's fifty years of receipts include falsified proof tests, not only nuisance trips. Redundancy through one vendor's stack is one reading wearing a thousand faces.

**Badly tuned trips get bypassed.** A bypassed interlock is worse than none because everyone believes it is there. An L4 trip that fires wrongly on Tuesday is disabled by Thursday, and any real specification must treat false-trip rate as a first-class design constraint. Mine does not yet do that.

**L5 may not be a coherent rung.** Any objective evaluated by an instrument is evaluated through a proxy, so "non-proxiable" is doing work no architecture currently supports—this is precisely the problem the eliciting-latent-knowledge line of work exists to attack, and it is unsolved. L5 also has no public-participation story: if a criterion sits inside a grading signal, what does a citizen sue on, who comments on it, what is in the record? Two objections, no answers. L5 is a research direction, not a policy proposal, and I should probably have cut the rung rather than shipped it.

**Urgency is not evidence of tractability.** If irreversibility is my criterion, the impact-measure literature has spent seven years formalising exactly that and has produced no deployable method. I have not said why the environmental framing changes the difficulty, and I am not sure it does.

**The adjudicated corpus encodes capture.** Environmental law is also a record of who had lawyers—capture, jurisdictional inconsistency, communities never at the table. An ought-channel trained on it inherits all of that. I have only a preference for a flawed adjudicated corpus over an unexamined one written by a values team in a hurry. That is a preference, not an argument.

**Today's silicon runs far above the thermodynamic floor.** The cheapness of gating is a claim about limits, not hardware; real CMOS dissipates six orders of magnitude more than the Landauer bound per bit. I made this case against myself in [Why von Neumann Was Right](/essays/why-von-neumann-was-right) and will not quarantine it. Physics says gating is not *required* to be expensive. It does not say your build will be cheap.

</div>

## What would prove me wrong

**F1—The magnitude claim.** Disjunctive, because the version I first wrote was gated on a detector I am also campaigning for and so could never fire. If **either** (a) a national regulator opens a reporting category for environmental harm caused by automated systems and it stands empty for two years, **or** (b) by **1 August 2029** no peer-reviewed study, enforcement action or agency finding anywhere identifies a single case of an automated optimisation system producing material environmental harm as a side effect of succeeding at its objective—despite the reward-hacking literature having by then run at least one environmental benchmark environment—then the central claim here was wrong. Not premature. Wrong. Branch (b) does not depend on anyone taking my advice.

**F2—The is-gap.** If by **1 August 2029** any vendor, utility or agency has published documentation of an Earth-observation foundation model actuating a physical system—grid dispatch, water release, agricultural application—without a human approving each action, then the perception gap closed on its own and this diagnosis was a snapshot, not a finding. Checkable from public product documentation and regulatory filings; no access to me required.

**F3—The ought-gap.** If by **1 August 2029** at least three of the five labs audited here publish values documents containing a substantive environmental criterion—not a footprint pledge, but a stated value about ecosystems, species or environmental limits that constrains model behaviour—then the null result was a phase and the field corrected without this argument. Run the same full-text search I ran; the method is in the ledger and takes an afternoon.

**F4—The one I would rather not find.** If by **1 August 2029** any published incident report, agency finding or peer-reviewed study shows a deployed environmental interlock causing net environmental harm through nuisance trips, operator workarounds, or optimisation against the trip condition, then the ladder is the wrong shape and I built the thing I warned about. I think this is the likeliest of the four, and I would want to know early.

## Close

The instruments exist. The models that read them exist. The values exist, in fifty years of contested law that nobody has thought to show a machine. None of the three pieces is missing. They have never been connected, and there is no one whose job it is to connect them.

We taught the machines every word we ever wrote about the world, and almost nothing the world has written down itself.

Now we are handing them the world.

---

*Published under CC-BY-4.0. Environmental Safety Mode is an open specification; nothing here is for sale. The fact ledger behind every number in this essay, including the claims deleted for being unverifiable and the three corrections forced by adversarial review, is available on request.*
