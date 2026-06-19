---
title: "Jed's Angel"
slug: "jeds-angel"
subtitle: "A successor to Maxwell's Demon, and a falsifiable conjecture about the cost of saving the Earth"
date: 2026-06-19
type: essay
status: published
tags: ["physics", "information-theory", "enviroai", "causal-sovereignty"]
abstract: "Maxwell's Demon proved that information is a lever on energy. Scaled from molecules to the biosphere, the same physics yields Jed's Angel—and a falsifiable conjecture: that steering planetary flows toward life is bounded by the quality of information, not the size of the energy budget, with a thermodynamic floor near 240× and an operational gain of 10⁸–10¹²."
license: CC-BY-4.0
hero_image: "/images/jeds-angel-cover.png"
pdf: "/pdfs/jeds-angel.pdf"
---

In 1867 James Clerk Maxwell imagined a creature small enough to see individual molecules. It sat at a tiny door between two halves of a box of gas. When a fast molecule approached from the right, it opened the door and let it through to the left; when a slow one approached from the left, it let it through to the right. No work, only watching and switching. Slowly the left side grew hot and the right side grew cold. A temperature difference appeared out of nothing, and with it the ability to do work. The second law of thermodynamics—entropy never decreases in a closed system—appeared to have been broken by a being that did nothing but know which molecule was which.

The Demon haunted physics for a century. The resolution, when it came, did not save the second law by finding the Demon's hidden exertion. It saved it by discovering that information itself is physical—and in doing so it revealed something far more useful than a defended law.

This essay scales the Demon from a box of gas to a planet. The creature that results I will call Jed's Angel. Same physics. Opposite errand.

## I. The Demon, resolved

Leó Szilárd took the first real step in 1929. He stripped the Demon down to a single molecule in a box and showed that the Demon's one bit of knowledge—which half is the molecule in?—can be converted into work, and that the amount is exactly kT ln2. One bit buys one kT ln2. Information and free energy turned out to be the same currency, exchangeable at a fixed rate.

Rolf Landauer closed it in 1961, and Charles Bennett sealed it in 1982. The Demon does not pay its thermodynamic debt when it observes. It pays when it forgets. To run continuously, the Demon must reset its memory for the next molecule, and erasing one bit of information costs at least kT ln2 of energy, dumped as heat into the surroundings. That erasure is where the entropy goes. The Demon never cheated. Its sorting was real, its temperature difference was real, and the books balanced exactly—because thinking is a thermodynamic act.

The law survived. But the lesson outgrew it:

> Information does not create energy. It decides energy's direction. And deciding is cheaper than the thing decided.

That is the whole seed. Everything below grows from it.

## II. Three numbers, never to be confused

Most accounts of the Demon stop at Szilárd and conclude that information is "worth" energy one-for-one. That is true and it is a trap, because it hides the leverage. There are three distinct quantities here, and the entire argument lives or dies on keeping them apart.

**One: the Szilárd rate, about 1×.** One bit yields about one kT ln2 of work. Information is worth energy at roughly unity. This is a statement about conversion—turning knowledge directly into work—and conversion is not where leverage comes from. If this were the whole story, there would be no Angel.

**Two: the bond–bit floor, about 240×.** Take the thermodynamic minimum cost of a single decision—kT ln2, which at 300 K is about 2.9 × 10⁻²¹ joules. Compare it to the energy stored in a strong covalent bond: a carbon–hydrogen bond holds roughly 4.3 electron-volts, about 6.9 × 10⁻¹⁹ joules. The ratio is near 240. The decision about a piece of matter can cost, at the floor, a few hundred times less than the matter's own binding energy. This is not a typical value; it is a minimum—a statement about the smallest the informational handle on matter is allowed to be. It scales with temperature, and different bonds give different ratios, so 240× is representative, not a constant of nature. But the direction is fixed: the handle is cheaper than the held.

**Three: the operational gain, 10⁸ to 10¹².** Here is the leverage, and it comes from neither of the above. Real control systems do not supply the energy they redirect. They gate energy that is already present. A transistor's small gate signal switches a large current it did not generate. An enzyme's molecular recognition redirects a reaction whose energy comes from the substrate. A thermostat's one bit commits a furnace's kilowatts. The Demon's frictionless door redirected molecular kinetic energy it never created. A gate's gain is not bounded by the cost of the information, because the controlled energy enters from outside the control system. In deployed environmental systems—sensing a watershed, modeling a plume, triggering an intervention—the energy steered exceeds the energy spent sensing, computing, and actuating by eight to twelve orders of magnitude.

Keep these three apart and the argument is unbreakable. Slur them together—claim Szilárd gives 240×, or that the bond–bit floor explains the operational gain—and a competent physicist dismantles it in an afternoon. The floor says information is never forced to be as expensive as matter. The gain says that in practice, by gating, it is astronomically cheaper. They are different claims with different warrants, and both are true.

## III. The Angel

The Demon sat at a molecular door, sorting with bits, paying Landauer's bill, redirecting a bottle's worth of energy. Its stewardship gain—energy steered over energy spent—was about one. It was a thought experiment, not a machine, and it operated at the scale of a single degree of freedom.

Now keep the physics and change the scale.

Jed's Angel sits at the control surfaces of a planet. It senses air, water, and land continuously and in real time. It computes. It actuates—not by moving the biosphere's mass itself, but by gating, triggering, and redirecting flows the biosphere already carries: where water goes, where a pollutant disperses, when a process starts or stops, which intervention fires where. It spends sensing, compute, and actuation energy that is minuscule against the flows it directs. It is a macroscopic Demon, scaled by the gain of gating, and pointed at the persistence of life.

Its figure of merit is the stewardship gain:

`G = E_steered / (E_sense + E_compute + E_actuate)`

The Demon's G was near unity. The Angel's G, in real environmental control, runs from 10⁸ to 10¹². That gap is not magic and it is not a violation of any law. It is the gain of a gate, applied to a planet.

## IV. The conjecture

The Angel is a thought experiment. The claim it carries is a conjecture, and a conjecture earns its keep only if it can be proven false. Here it is, scoped as tightly as honesty requires.

First, the scope, because it is everything. There are two kinds of environmental task and they obey different physics:

- **Steering**—redirecting, gating, or triggering energy and matter flows that already exist. Directing where a flow goes.
- **Working against a gradient**—the irreducible thermodynamic cost of a transformation, such as separating dilute CO₂ from air. This cost has a hard floor set by free-energy minimums, and no amount of intelligence reduces it below that floor. A smarter system can approach the limit; it cannot beat it.

The Angel is mighty at the first and bounded by physics at the second. The conjecture is strictly about the first.

> **The Angel Conjecture.** For any environmental task that consists of steering pre-existing flows toward a target state—rather than performing thermodynamic work against a gradient—the binding constraint on success is the quality of information and control, not the size of the energy budget. The stewardship gain G exceeds unity, with a thermodynamic floor on the order of 240× and a deployed operational range of 10⁸ to 10¹².

And its corollary, which is the thesis this whole body of work is named for:

> **Bits Protect Its.** Because steering is categorically cheaper than forcing, a sufficiently well-informed defender of the biosphere operates at a permanent thermodynamic advantage over any equally resourced process that must act by moving matter through force.

## V. What would falsify this

A claim that cannot fail is not a claim. The Angel Conjecture is false if any of the following holds:

- **A floor below unity.** Show a class of genuine steering tasks for which G ≤ 1 of necessity—where directing a flow must cost as much as the flow itself. One clean case sinks the general claim.
- **A broken handle.** Show that the informational handle on matter cannot, even in principle, be cheaper than the matter's binding energy—that the bond–bit floor does not exist.
- **A collapsed distinction.** The honest soft spot. The conjecture's truth rests on the steering-versus-gradient distinction. Its importance rests on an empirical claim: that a large fraction of real planetary stewardship is steering rather than brute transformation. If it turns out that the environmental problems that actually matter are dominated by irreducible-work problems, then the Angel's leverage is real but marginal—the conjecture would be true and unimportant at once. This is where it is most vulnerable, and where evidence, not argument, must do the work.

I state these plainly because a conjecture that names its own failure conditions is harder to kill than one that hides them.

## VI. What the Angel is not

The physics is morally neutral, and the name is not. The same gain that lets the Angel steer a biosphere toward life lets an identical system steer it toward optimized extraction—precision depletion, efficient ruin. The conjecture establishes the affordance, not the user. Whether planetary information leverage builds the Earth or strips it is the open question the physics hands to us. It is not a question the physics answers. "Angel" is a hope and a choice. The Demon was neither good nor evil; neither is its successor. The halo is something we would have to put there.

Two fences, so the strong core is not dragged down by weaker neighbors. The Angel Conjecture is a claim about the thermodynamic cost of control. It is not a claim that any such system is safe, aligned, or wise—that is a separate problem with a separate argument. And the deeper question I have raised elsewhere—whether physical reality can serve as an objective that cannot be gamed—is its own conjecture for its own page. It must not lean on this one, and this one does not need it.

What remains, fenced and scoped, is simple and I believe it is true: Maxwell imagined a creature that broke a law and instead revealed one. Information is a lever on energy, and the lever is long. We are the part of nature that grew old enough to pick it up.

> The Demon was imagined to cheat the world.
> The Angel is the same physics, asked to save it.

## Sources

J. C. Maxwell, *Theory of Heat* (1871), the original sorting demon. L. Szilárd, "On the decrease of entropy in a thermodynamic system by the intervention of intelligent beings," *Zeitschrift für Physik* (1929)—the one-bit-to-kT ln2 result. R. Landauer, "Irreversibility and heat generation in the computing process," *IBM Journal of Research and Development* (1961)—the cost of erasure. C. H. Bennett, "The thermodynamics of computation—a review," *International Journal of Theoretical Physics* (1982)—the resolution of the Demon via Landauer's principle. Numerical figures: kT ln2 ≈ 2.9 × 10⁻²¹ J at 300 K; representative C–H bond energy ≈ 413 kJ/mol ≈ 4.3 eV ≈ 6.9 × 10⁻¹⁹ J; the ratio ≈ 240 is temperature- and bond-dependent and is presented as a representative thermodynamic floor, not a universal constant.

## Cite this work

Anderson, J. (2026). *Jed's Angel: A successor to Maxwell's Demon, and a falsifiable conjecture about the cost of saving the Earth.* Independent Researcher, Houston, Texas. https://jedanderson.org/essays/jeds-angel (DOI pending Zenodo deposit.)

Canonical: https://jedanderson.org/essays/jeds-angel
