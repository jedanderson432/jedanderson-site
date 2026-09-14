---
title: "Physics, Bit First"
slug: "physics-bit-first"
subtitle: "A new spine for the subject: one rule, one object, three prices, and the constants of nature as the price tags."
date: 2026-09-14
type: essay
status: published
tags: ["physics", "information-theory", "thermodynamics", "holography", "landauer"]
abstract: "Physics is still taught in the order it was discovered, so k, h, c and G arrive as four unrelated facts and information arrives last or not at all. This essay proposes a different spine: one rule (possibility is never lost), one object (the bit, located possibility), three prices set by k, h and G, c as the converter between them, Einstein's equations as the requirement that the heat and area prices agree at every horizon, and quantum gravity restated as a specification for the object that pays all three; nothing in the physics changes, only which facts are primitive."
license: CC-BY-4.0
author: "Jed Anderson"
hero_image: "/images/physics-bit-first-hero.jpg"
hero_image_alt: "Cover artwork on a deep forest-green ground inside a thin double border. At the top, in large cream serif capitals, A New Framing of Physics, beneath the kicker 'An essay · A new spine for physics.' Centred below is a white page from the essay itself, showing the heading Physics, Bit First, its opening paragraphs and the start of section 1, The spine, on one page, with small claim badges. At the foot, 'Physics, Bit First' in spaced capitals over 'One rule. One object. Three prices.'"
pdf: "/pdfs/physics-bit-first.pdf"
related_essay: "/essays/physical-theory-of-information"
show_abstract_on_page: true
---

*Draft for review, September 2026. Companion to [A Physical Theory of Information](/essays/physical-theory-of-information), which carries the derivations, the claim tags, the sources and the verification script behind every number here.*

Every subject has a spine: the order in which its facts are taught, which decides which facts are primitive and which are consequences. Physics has kept the same spine since the nineteenth century. Mechanics first, then heat, then electricity and light, then the quantum, then relativity, then, for the few who continue, gravity as geometry. Each stage brings its own constant, introduced as a new fact of nature: k for heat, h for the quantum, c for light, G for gravity. The order is the order of discovery. It was never the order of explanation, and it has a cost that is easy to miss because everyone paid it as a student. Four constants arrive as four unrelated facts. The Planck units, built from them, arrive as a curiosity. Information arrives last or not at all, as an elective. Maxwell’s demon, the one problem that ties heat to knowledge, is a footnote, and Landauer’s answer to it is not in the syllabus.

This essay proposes a different spine. It puts one rule and one object first, and lets the constants enter one at a time, each at the moment its operation on that object is introduced. Nothing in the physics changes. What changes is which facts are primitive, and that is what a spine is.

## 1. The spine, on one page

The rule. The universe never loses a possibility; it only moves them. **ESTABLISHED**

The object. A bit is one unit of possibility that an observer has located on the readable side of a line. Entropy is possibility not yet located. They are one quantity in two units. **DEFINITION**

The first price. Forgetting a bit, moving it across the line into surroundings at temperature T, costs kT ln 2 of heat. Boltzmann’s constant is the price of a bit in heat. **ESTABLISHED**

The second price. Changing a bit, moving its carrier between two distinguishable conditions with energy E, takes h/4E of time: h/4 of action. Planck’s constant is the price of a bit in action. **ESTABLISHED**

The converter. The speed of light prices nothing per bit. It converts distance into time and mass into energy, caps the speed at which a bit can be relocated, and gives every observer’s line an edge, called a horizon. **ESTABLISHED**

The third price. Holding a bit on a horizon takes 4 ln 2 Planck areas of it. Newton’s constant, with ħ and c, is the price of a bit in area. **ESTABLISHED** for black holes; derived for every horizon; **CONJECTURE** for every region.

The agreement. At every horizon the first price and the third must be paid for the same bit. Requiring them to agree everywhere is Einstein’s equations. **SYNTHESIS** of Jacobson’s derivation, read per bit.

The carrier. What object pays all three? Unknown. The question is quantum gravity, restated as a specification. **CONJECTURE** that one object pays at every counter.

![A vertical diagram headed “The spine,” with a second column headed “What hangs from each vertebra.” Eight boxes are stacked and joined by downward arrows. The rule: possibility is never destroyed, only moved (Liouville’s theorem; unitarity; entropy grows only by coarsening). The object: a bit is located possibility, entropy unlocated (Shannon = Boltzmann, S = k ln 2 · H; the line and the ledger: learn, forget, compute, relocate). Price 1, heat, marked k: forgetting a bit costs kT ln 2 (temperature is the price of entropy; Landauer, Szilard, the demon; the floor under every computer). Price 2, action, marked h: changing a bit costs h/4 of action (energy is tick rate; entanglement, copying, decoherence; Newton as the limit action ≫ h). The converter, marked c: no price per bit, converts length to time (relativity as the geometry of lines; E = mc²; horizons; no relocation faster than c). Price 3, area, marked G: a horizon bit costs 4 ln 2 Planck areas (Bekenstein, Hawking, Unruh; black holes as full memories; cosmic horizon 10¹²² bits). The agreement, highlighted in gold: Price 1 = Price 3 at every horizon (that requirement is Einstein’s equations; Jacobson 1995; G is the exchange rate; Λ left free; Newton’s law as the limit). The carrier, in a dashed red box marked with a question mark: what pays all three prices? (quantum gravity as a specification; tests: entangled erasure, gravitational entanglement, one bit per horizon cell). A footnote reads: dimensionless constants (α, mass ratios, mixing angles) describe carriers, not prices; they are the flesh, not the spine.](/images/physics-bit-first-fig1.png)

*Figure 1. The spine, vertebra by vertebra, with what hangs from each. Dimensionless constants (α, mass ratios, mixing angles) describe carriers, not prices. They are the flesh, not the spine.*

## 2. Vertebra by vertebra

### The rule

A system’s state is the full description of its condition; its state space is the set of all conditions it could be in. Two states are distinguishable if some measurement can tell them apart with certainty. The exact laws of motion of a closed system never reduce the number of its distinguishable states. Classically this is Liouville’s theorem: the volume of phase space occupied by a set of possible states is constant in time. In quantum mechanics it is unitarity: evolution preserves the inner product, so states that were distinguishable stay distinguishable. **ESTABLISHED**

The rule is placed first because everything else is a consequence of it. Entropy grows for one reason only: an observer’s description coarsens, so the count of states consistent with what the observer knows rises. It never falls, because the laws forbid it. The second law of thermodynamics is therefore not a separate law in this spine. It is the rule, seen by an observer who has lost track.

### The object and the line

Draw a line around what an observer can read: measure, record and act on. A bit is one unit of possibility located on the readable side, the answer to one yes-or-no question. Entropy is the possibility that remains unlocated, k times the natural logarithm of the number of states still consistent with the observer’s records. Shannon counted located possibility in bits; Boltzmann counted unlocated possibility in joules per kelvin; the two are one quantity, related by S = k ln 2 × H, and Boltzmann’s constant is the exchange rate. **ESTABLISHED**

For a closed system containing the observer, located plus unlocated possibility is the total, and by the rule the total never decreases. That is the ledger identity, Zurek’s physical entropy, and it makes four operations exact. Learning moves possibility from unlocated to located. Forgetting moves it back across the line. Computing rearranges located possibility without crossing the line. Relocating moves located possibility from one observer’s line to another’s, which is communication. The rest of the spine prices these operations.

### Price 1: heat, and the constant k

Temperature is defined here, not assumed: it is the price of entropy, the energy needed to buy one unit of unlocated possibility, 1/T = dS/dE. Clausius’s relation dQ = T dS is the definition read backward. **ESTABLISHED**

The first price follows in three sentences. Forgetting a bit takes the carrier from two states to one, so its count falls by ln 2. The rule forbids the loss, so the surroundings’ count rises by ln 2, an entropy rise of k ln 2. Clausius converts that to heat: at least kT ln 2. At room temperature, 2.87 × 10⁻²¹ joules. **VERIFIED** This is Landauer’s principle, measured in 2012, 2014 and 2016.

Everything in classical thermodynamics hangs from this vertebra, and it hangs more simply than before. Heat engines are ledgers: Carnot’s efficiency is the statement that entropy taken from a hot body must be delivered somewhere colder, and the bit counts on both sides must balance. Szilard’s engine is the converse of the first price: a located bit is worth kT ln 2 of work. The demon is the canonical problem of the chapter, the inclined plane of the bit-first curriculum. Maxwell imagined in 1867 a tiny being at a door in a wall dividing a box of gas, passing fast molecules one way and slow ones the other until one side is hot and the other cold, so that an engine can run on the difference with nothing spent but attention. Bit first, the demon earns kT ln 2 per bit learned, pays kT ln 2 per bit forgotten when it clears its notebook, and nets zero; it has been built four times since 2010, and the books balanced every time. Computing is free, because Bennett showed that any computation can be carried out without forgetting, and the floor under every computer is kT ln 2 per bit exported across its line. One consequence deserves its own line, because it is exact and not widely known: the floor is set by the temperature of the final heat sink, not of the device. Cooling a processor to 20 mK lowers its Law 1 cost 15,000-fold, and Carnot’s theorem returns every joule when the refrigerator dumps to the room; referred to Earth’s surface, forgetting costs kT ln 2 at 300 K wherever it happens. **VERIFIED**

### Price 2: action, and the constant h

Quantum mechanics enters as the theory of how a bit changes, and its first equation is Planck’s own, E = hν: a carrier with energy E is a wave that ticks E/h times per second. Energy is tick rate. Schrödinger’s equation, in this spine, is the statement that every component of a state rotates its phase at the rate its energy dictates; superposition is what several tick rates look like at once; interference is their agreement and disagreement.

The second price follows. A wave cannot become recognizably different from itself in less than a quarter of a tick, so changing a bit takes at least h/4E of time, which is h/4 of action. This is the Margolus-Levitin theorem. **ESTABLISHED** The price is charged in action, not energy: slower change may use less energy so long as the product stays above h/4. A kilogram can change at most 5.4 × 10⁵⁰ bits per second; a bit driven by room-temperature thermal energy takes at least 40 femtoseconds. **VERIFIED**

Two more things hang here. First, the rule takes a sharper form: every uncertainty about a part is a definiteness of a larger whole, the purification principle, and Chiribella, D’Ariano and Perinotti showed in 2011 that this property, added to five that classical probability also obeys, singles out quantum theory. Entanglement is located correlation; a memory entangled with a system can hold more than a complete classical record, and by the result of del Rio and colleagues, erasing such a system pays out work instead of costing it. Second, the classical world is derived rather than assumed. Measurement is copying, which the first price does not charge. An environment copies information about a system’s pointer states many times over, which is decoherence; a classical fact is possibility located redundantly, and it is robust because unwriting it would require every copy to be found. Newton’s mechanics returns at the end of the chapter as the limit in which the action of every change is enormous compared with h, so that tick rates are unobservable and only the rotation of the whole survives.

The two prices meet at a temperature. A bit handled with thermal energy pays kT ln 2 in heat and h/4kT in time, and the product is h ln 2/4 at every temperature. **VERIFIED** At room temperature the two floors cross at about 60 femtoseconds per operation: slower, and heat binds; faster, and action does. **VERIFIED** k and h are one price for a thermal bit, split by the temperature.

### The converter: c

The speed of light is placed between the second price and the third because it prices nothing per bit and everything depends on it. It converts distance to time, so that a region’s size is also a duration. It converts mass to energy, so that a kilogram is 9 × 10¹⁶ joules of action budget for the second price. And it caps relocation: a bit cannot be moved from one observer’s line to another’s faster than c, which is the no-signaling principle, the first of Chiribella’s six rules. Special relativity is the geometry of lines under that cap. Its most important consequence for the spine is that lines have edges. An observer who accelerates steadily has a surface behind them from which light can never catch up. That surface is a horizon, and the third price is charged there.

### Price 3: area, and the constant G

Unruh showed in 1976 that an accelerating observer feels the vacuum as a warm bath, at a temperature proportional to the acceleration. So a horizon has a temperature, and the region beyond it is, by definition, outside the observer’s line. A black hole’s horizon is the extreme case: the surface of no return.

The third price follows from three chained facts. Einstein: a black hole’s horizon area grows with the square of its mass. Hawking: a black hole glows at a temperature inversely proportional to its mass. Clausius: energy dropped into a body at temperature T adds entropy E/T. Chain them and the mass cancels: a black hole’s entropy is one quarter of its horizon area in Planck areas, which is one bit for every 4 ln 2 Planck areas, 7.2 × 10⁻⁷⁰ square meters. **VERIFIED** A black hole is a full memory, and its capacity is its surface. Bekenstein’s bound extends the ceiling to any region, and the holographic principle conjectures that it is universal. **CONJECTURE** for regions without horizons.

Newton’s constant is introduced here, as the size of a horizon cell, and its familiar meaning as the strength of attraction is recovered afterward rather than assumed before. The cosmic horizon, at one bit per cell, holds about 10¹²² bits, the information budget of the observable universe. **VERIFIED** The smallest black hole, of one Planck mass, holds 4π/ln 2 ≈ 18 bits and lives about 5000 Planck times **VERIFIED**: the point where a bit costs about one of everything.

### The agreement: Einstein’s equations

At a horizon, a single bit that falls out of view is charged twice. By the first price, the energy that crosses with it must be at least kT ln 2 at the Unruh temperature. By the third, the horizon must grow by 4 ln 2 Planck areas to hold it. The ratio of area to energy per bit is 8πG/ac², the first law of horizon mechanics. **VERIFIED**

Jacobson showed in 1995 that if those two facts hold at every horizon for every observer, Einstein’s equations follow, with G fixed by the cell size. Read per bit: Einstein’s equations are the requirement that the heat price and the space price of a bit agree everywhere, and Newton’s constant is the exchange rate. **SYNTHESIS** Gravity is attractive because a horizon must grow when possibility falls across it, and it is universal because every bit pays the same two prices. Newton’s law of gravitation is the weak-field limit of the agreement, which is why G arrives last in this spine and first in the old one. The derivation leaves the cosmological constant free, so the acceleration of the universe’s expansion is not priced by any bit; the spine says so plainly.

### The carrier

The top vertebra is missing, and the spine is designed to say so. The first two prices are paid by laboratory objects: beads, electrons, qubits. The third is paid by horizon cells with no known carrier and no known dynamics. Whether one object pays at every counter is a conjecture. **CONJECTURE** Bit-first, quantum gravity is not “quantize the geometry”; it is a specification: find the object that pays kT ln 2 when forgotten, h/4 when changed, and 4 ln 2 Planck areas when held on a horizon, and show that a horizon’s worth of them obeys Einstein’s equations. Loop quantum gravity’s horizon punctures, holography’s boundary qubits and tensor-network geometries each meet part of the specification. Three experiments grade candidates: erasure at a profit with entangled qubits, gravitational entanglement of two masses, and one bit per horizon cell from black hole ringdown, where a 1998 argument of Hod’s suggests a three-valued cell instead and the spine predicts a binary one.

## 3. Where everything else goes

A spine is not a whole body. The forces, the particles and the dimensionless numbers of the Standard Model are not in it, and the reason is exact. Once k, ħ, c and G are used as units, every remaining constant of physics is a pure number: the fine-structure constant, about 1/137; the ratios of particle masses; the mixing angles. Dimensionful constants price the bit. Dimensionless constants describe the carriers: how particular bits, charges and spins, interact with each other. Electromagnetism, the weak force and the strong force are chapters about the flesh, and the spine does not explain their numbers. It claims only that none of them prices a bit, and it predicts that no fourth price will be found.

Chemistry and biology hang from the first price. A living cell is an information engine that pays Law 1 for every copy it discards and Hopfield’s kinetic proofreading cost for every error it rejects; it operates on the same ledger as a chip, closer to the floor. Communication hangs from the second price and the converter: Shannon’s channel is a relocation of located possibility between lines, and the Bekenstein and Bremermann bounds are the second price applied to a signal. Computing hangs from the first price and the second: free to rearrange, charged to forget, bounded in speed by action.

The chapter map:

| Chapter | Primitive | Constant | Cornerstone | Canonical problem |
|---|---|---|---|---|
| 0. The rule | Conservation of possibility | none | Liouville; unitarity | The shuffled deck |
| 1. The object | The bit; the line | none | S = k ln 2 × H | The coin |
| 2. Heat | Temperature as the price of entropy | k | Landauer, kT ln 2 | Maxwell’s demon |
| 3. Action | Energy as tick rate | h | Margolus-Levitin, h/4 | Two entangled qubits |
| 4. The converter | Lines have edges | c | E = mc²; no signaling faster than c | The accelerating observer |
| 5. Area | Horizons have temperature | G | Bekenstein-Hawking, A/4ℓₚ² | The one-kilogram black hole |
| 6. The agreement | Price 1 = Price 3 | G fixed | Jacobson, Einstein’s equations | The falling bit |
| 7. The carrier | Unknown | ? | none yet | The tabletop gravity test |

## 4. What the new spine explains that the old one asserts

The old spine asserts the Planck scale; the new one explains it. The Planck scale is where a bit costs about one of everything, 0.69 Planck energies to forget at the Planck temperature, 1.57 Planck times to change at the Planck energy, 2.77 Planck areas to hold. **VERIFIED** No price can be neglected against the others there, which is the same as saying thermodynamics, quantum mechanics and gravity stop being separate subjects.

The old spine asserts four constants; the new one explains why there are three prices and one converter. k, ħ and G each attach to one operation on a bit with a definite coefficient. c attaches to none.

The old spine asserts that gravity attracts; the new one derives it from a horizon’s obligation to grow. The old spine asserts the second law; the new one derives it from the rule and a coarsened description. The old spine treats the classical world as given and the quantum world as strange; the new one derives the classical world from copying. The old spine leaves the demon as a paradox; the new one makes it the first worked problem.

And the old spine has no place for the fact that has quietly become the most consequential number in engineering, the price of forgetting, which bounds the energy of every computer and every intelligence that will ever be built. The new spine puts it in Chapter 2.

## 5. What the new spine costs

It is a reorganization, not a new law. Laws 1, 2 and 3 are Landauer’s, Margolus and Levitin’s, and Bekenstein and Hawking’s; the agreement is Jacobson’s. What is new is the object, the order, the reading of the constants as prices, and the specification at the top. Each of those is tagged Synthesis or Conjecture and carries a test.

The objection it must answer is that any three constants define units in which everything is order one, so “a bit costs about one of everything” is dimensional analysis. The answer is that the content lies in the coefficients, ln 2, 1/4 and 4 ln 2, each fixed by a derivation or a measurement and each attached to one operation and no other, and in the fact that two of them are already tied together by the first law of horizon mechanics. The Planck-unit statement is a corollary of the spine, not its claim.

The third price is proven for black holes and derived for local horizons; its extension to every region is a conjecture. The reading of Jacobson adds nothing to his derivation. The measurement problem is untouched: decoherence explains why records are robust, not why one outcome occurs. The forces are not derived. And the pedagogy reverses tradition: a student meets counting and possibility before Newton’s laws, which is harder to begin and easier to finish.

## 6. The spine in one paragraph

Possibility is conserved. A bit is a possibility an observer has located. Forgetting one costs kT ln 2; changing one costs h/4 of action; holding one on a horizon costs 4 ln 2 Planck areas. The three constants of nature are the three price tags, and the speed of light converts between them. At every horizon the heat bill and the area bill for the same bit must match, and the requirement that they match everywhere is the shape of space. What carries the bit is the open question, and it is the only one at the top of the spine.

Shannon said how much a bit is. Turing said how a bit is moved. Einstein said how space curves. Bit first, the three are one subject with one object, and the subject has a spine.

## About this document

Part of the jedanderson.org corpus. Prepared in September 2026 as a collaboration between Jed Anderson, whose questions, curiosity and framing directed the work, and Claude, an AI system made by Anthropic, which drafted the text, carried out the derivations and computed every number in the companion verification script. The physics rests on the people named in the companion paper’s Sources. The readings and the conjecture are the collaboration’s own, and are tagged so that they can be judged. This work stands on the shoulders of giants, and with these tools the giants got even bigger. Corrections and challenges are welcome at jedanderson.org.
