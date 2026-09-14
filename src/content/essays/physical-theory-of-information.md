---
title: "A Physical Theory of Information"
slug: "physical-theory-of-information"
subtitle: "A bit of information costs heat to let go, time to change, and space to hold. The three constants of nature are its price tags. And at the edge of a black hole, where two of the bills must match, the matching is gravity."
date: 2026-09-14
type: essay
status: published
tags: ["physics", "information-theory", "thermodynamics", "holography", "landauer", "bekenstein"]
abstract: "Every bit is written in something physical, and physics charges exactly three prices for it: kT ln 2 of heat to let it go (Boltzmann's constant), h/4 of action to change it (Planck's constant), and 4 ln 2 Planck areas to hold it on a horizon (Newton's constant, with ħ and c). Read this way the constants of nature are the price tags of a bit, and Jacobson's 1995 derivation of Einstein's equations becomes the requirement that the heat price and the area price agree at every horizon; each claim is tagged as established, derived, synthesis or conjecture, and the one open question, whether a laboratory bit and a horizon bit are the same object, is stated with the experiments that bear on it."
license: CC-BY-4.0
author: "Jed Anderson"
hero_image: "/images/physical-theory-of-information-hero.jpg"
hero_image_alt: "Cover artwork on a warm cream ground. Above a thin gold rule, the title A Physical Theory of Information in large dark-green serif capitals, beneath the kicker 'A paper · The three prices of a bit.' Below, a dark-green panel headed 'What the world charges for one bit' lists three rows, each with a gold constant at the right: Let it go, heat, kT ln 2, k; Change it, action, h/4, h; Hold it on a horizon, area, 4 ln 2 Planck areas, G. At the foot, 'Every claim tagged. Every number computed.'"
pdf: "/pdfs/physical-theory-of-information.pdf"
related_essay: "/essays/physics-bit-first"
show_abstract_on_page: true
---

*Draft for review, September 2026. A technical companion with every derivation, number and source accompanies this article. A companion essay, [Physics, Bit First](/essays/physics-bit-first), reorganizes the subject around the same three prices.*

In 1948 Claude Shannon showed that information is a quantity. Any message, any signal, any fact can be measured in one unit, the bit, the answer to a single yes-or-no question, and the unit obeys exact laws: how many bits a message contains, how many a wire can carry. His theory said nothing about what carries the bits. It did not have to. The laws hold for smoke signals and for fiber optics.

But every bit is written in something. A bit is a bead in one of two dimples, a charge on a capacitor, a magnet pointing up or down, a molecule on the left or the right of a wall. Whatever carries a bit obeys the laws of physics, and those laws charge for certain things done to it.

This article states the charges. There are three, and they are exact.

A bit costs heat to let go. A bit costs time to change. A bit costs space to hold. The three charges are set by the three constants that appear in every physics textbook: Boltzmann’s constant, Planck’s constant and Newton’s constant. Those constants are usually taught as properties of matter, of light, of gravity. Read this way, they are properties of a bit. They are its price in three currencies.

And the prices are not independent. At a horizon, the surface around a black hole, or behind any accelerating observer, past which nothing can be seen, the heat bill and the space bill for the same bit must agree. Ted Jacobson showed in 1995 that requiring them to agree, everywhere, is Einstein’s equations of general relativity. Gravity, on this reading, is the universe balancing its books.

Everything above is either established physics or a reading of established physics, and the article marks which is which. The one thing that is neither, that the bit paying in a laboratory and the bit paying at a horizon are the same object, is stated at the end as a conjecture, with the experiments that bear on it.

## 1. The rule

One rule sits under all three prices, and it can be stated without an equation.

The universe never loses a possibility. It only moves them.

Take any closed system and count the distinct conditions it could be in. A coin: two. A shuffled deck: about 10⁶⁸ orderings. A liter of air: a number with more digits than there are atoms in the Earth. The exact laws of motion, Newton’s for planets and Schrödinger’s for atoms, share a property that is easy to state and has never been seen to fail: they never shrink that count. Two conditions that could be told apart today can be told apart tomorrow. The count is conserved the way energy is conserved. **ESTABLISHED**

In quantum mechanics the rule has a sharper form. Every uncertainty about a part of the world is a definiteness of some larger whole that contains it; what looks random in one place is only entangled with something not being looked at. In 2011 Giulio Chiribella, Giacomo Mauro D’Ariano and Paolo Perinotti proved that this one property, added to five rules that ordinary probability also obeys, singles out quantum theory from every conceivable alternative. **DERIVED** The theory of the very small is what a world that never loses a possibility looks like from inside. **SYNTHESIS**

What is not conserved is who knows which condition the system is in. That is where the observer comes in, and with the observer, a line.

## 2. The line, and the unit

Draw a line around what an observer can read: measure, record, act on. Everything else lies outside the line: the water around a bead, the air in a room, the far side of a wall, the inside of a black hole.

Information is possibility that has been pinned down on the observer’s side of the line. A memory holding a 1 has excluded the 0; one possibility has been located. Entropy is possibility that has not been pinned down: the count of conditions that remain, with the observer unable to say which. **DEFINITION**

These are not two things. They are one thing counted in two units. Shannon counted in bits, using logarithms in base 2. Ludwig Boltzmann, sixty years earlier, counted the same possibilities in the units of heat, joules per degree, using natural logarithms and a constant now named for him: k = 1.380649 × 10⁻²³ joules per kelvin. Convert one logarithm to the other and the exchange rate appears:

one bit = k ln 2 = 9.57 × 10⁻²⁴ joules per kelvin of entropy. **ESTABLISHED**

Boltzmann’s constant is not a law of nature. It is the rate at which counting converts to heat. That is the first price tag, and the other two follow the same pattern.

With the rule and the line, three operations have exact meanings. Learning moves possibility from unlocated to located. Forgetting moves it back across the line, into the part of the world the observer cannot read. Computing rearranges located possibility without moving it across. The prices attach to these operations, and the rule dictates them.

## 3. The first price: heat

Statement. Letting go of one bit, into surroundings at temperature T, releases at least kT ln 2 of heat into those surroundings. **ESTABLISHED**

The derivation takes three sentences, and a reader who follows them has understood Landauer’s principle as well as anyone alive.

First: before a bit is erased, its carrier could be in either of two conditions; after, it can be in one. The carrier’s count has fallen from two to one.

Second: the rule forbids the loss. The missing possibility must go somewhere, and the only somewhere is the surroundings, whose count rises by the same factor of two. In the units of heat, that is a rise of k ln 2 in the entropy of the surroundings.

Third: Rudolf Clausius showed in 1865 that entropy delivered to a body at temperature T arrives as heat equal to T times the entropy. So the heat is at least kT ln 2.

At room temperature, 300 kelvin, that is 2.87 × 10⁻²¹ joules per bit. **VERIFIED** Rolf Landauer wrote it down at IBM in 1961. In 2012 a team in Lyon led by Sergio Ciliberto, with the theorist Eric Lutz, held a two-micrometer glass bead in a laser trap shaped into two dimples, used it as a one-bit memory, erased the bit by tilting the trap, and measured the heat in the water. Done slowly, the heat came down to kT ln 2 and never below it. Two more laboratories confirmed it in 2014 and 2016, one with a nanoscale magnet of the kind used in memory chips. **MEASURED**

The price has a mirror image, and the mirror is exact. In 1929 Leo Szilard showed that one located bit can be spent: a molecule whose side of a box is known can push a piston and do exactly kT ln 2 of work, drawn from the warmth of the room. Knowing a bit is worth kT ln 2. Forgetting a bit costs kT ln 2. Takahiro Sagawa and Masahito Ueda proved between 2008 and 2010 that the exchange never nets a profit: gathering a bit and discarding it together cost at least the bit’s worth, and either can be free, but not both. **DERIVED** and confirmed in the laboratory.

Some scale. The thermal jiggle of one air molecule is 1.4 of these units. A photon of green light carries 126. A carbon-hydrogen bond, the commonest bond in living matter, stores 240. A single logic operation in the best chip anyone can buy burns between thirty thousand and three hundred thousand. **ESTIMATE** And a machine that forgot a hundred billion billion bits every second, at the floor, would warm the room by less than a third of a watt. **VERIFIED** Today’s data centers draw tens of millions of watts. The floor has not moved since 1961, and every argument about the energy appetite of artificial intelligence is, underneath, an argument about the distance to it.

One more fact, and it is the one that makes the rest of the theory possible. The first price is charged only for crossing the line. Shuffling located possibility around on the observer’s side costs nothing, however elaborate the shuffle. Charles Bennett proved in 1973 that any computation whatsoever can be carried out by steps that forget nothing. Computing is free. Forgetting is what costs.

## 4. The second price: time

Statement. Changing one bit, moving a carrier from one distinguishable condition to another, when the carrier has energy E, takes at least h/4E of time, where h is Planck’s constant. Equivalently, one bit change costs at least h/4 of action, action being energy multiplied by time. **DERIVED**

This is the Margolus-Levitin theorem of 1998, and its content can be seen in one picture. In quantum mechanics a carrier with energy E is a wave that ticks E/h times per second; that relation, E = hν, is the oldest equation in quantum theory, Planck’s own. A wave cannot become recognizably different from itself in less than a quarter of a tick. So a bit change takes at least a quarter of the period h/E, which is h/4E.

The unit of this price is neither energy nor time but their product. A change given more time may use less energy, so long as the product stays above h/4. Planck’s constant is not, on this reading, a fact about light. It is the size of the smallest change: the price of a bit in action.

Some scale. An atom with one electron-volt of energy above its lowest state cannot change a bit in less than about one femtosecond. **VERIFIED** A kilogram of anything holds 9 × 10¹⁶ joules by E = mc² and therefore cannot change more than 5.4 × 10⁵⁰ bits per second, whatever it is made of. **VERIFIED** A bit powered only by the thermal energy of a room takes at least 40 femtoseconds. **VERIFIED**

That last number hides a small exact fact, and it shows that the first two prices are one price seen from two sides. A bit handled with the thermal energy of its surroundings pays kT ln 2 in heat and takes h/4kT in time. Multiply them and the temperature cancels: heat × time = h ln 2/4, the same at every temperature. **VERIFIED** A hotter bath makes forgetting dearer and changing faster, in exact proportion. Boltzmann’s constant and Planck’s constant are not two prices for a thermal bit. They are one price, split between heat and time by the temperature.

## 5. The third price: space

Statement. Holding one bit on a horizon takes at least 4 ln 2 Planck areas of it: 4 ln 2 × ħG/c³ = 7.2 × 10⁻⁷⁰ square meters, where G is Newton’s constant, c the speed of light, and ħ is h/2π. **DERIVED** for black holes and for every horizon; **CONJECTURE** for every region of space.

This price took longest to find and is the strangest, so it is worth seeing exactly where it comes from. It follows from three standard facts, chained.

First, Einstein: a black hole of mass M has a horizon, the surface of no return, whose area grows with the square of the mass. Add energy, and the surface grows.

Second, Hawking, 1975: a black hole is not black. It glows, with a temperature inversely proportional to its mass. Small black holes are hot; large ones are cold.

Third, Clausius again: energy dropped into a body at temperature T adds entropy equal to the energy divided by T.

Chain them. Drop energy into a black hole. Clausius says how much entropy it gains, using Hawking’s temperature. Einstein says how much area it gains. Divide the one by the other, and every trace of the mass cancels, leaving a pure number times a pure area: the entropy of any black hole is one quarter of its horizon area, measured in Planck areas. Convert entropy to bits with the first exchange rate, and the result is one bit for every 4 ln 2, about 2.77, Planck areas. This is the Bekenstein-Hawking formula. **DERIVED**

In plain words: a black hole is matter in its most compressed form, and what survives of the matter’s possibilities is written on its surface, in cells of Planck size, one bit per cell. Newton’s constant, with ħ and c, sets the size of the cell. It is the price of a bit in space.

The price is not only about black holes. Jacob Bekenstein argued in 1981 that a region of space cannot hold more information than a black hole fitting inside it would, and the argument has since hardened into the holographic bound, one of the best-supported conjectures in physics: a black hole is simply the case that fills the ceiling. **CONJECTURE** So the third price caps how much any volume of the universe can contain, and the cap grows with the surface, not the volume. A black hole of the Sun’s mass, three kilometers in radius, holds 1.5 × 10⁷⁷ bits. **VERIFIED** A one-kilogram black hole, with a horizon a billionth of a billionth of a billionth of a meter across, holds 3.8 × 10¹⁶. **VERIFIED**

## 6. Three constants, three price tags

Here is the table the whole theory reduces to.

| Operation | Currency | Price tag | Amount |
|---|---|---|---|
| Letting a bit go, into surroundings at temperature T | Heat | Boltzmann’s constant k | kT ln 2 |
| Changing a bit, with energy E | Action (energy × time) | Planck’s constant h | h/4 |
| Holding a bit on a horizon | Area | Newton’s constant G, with ħ and c | 4 ln 2 ħG/c³ |

Physics has a natural system of units, the Planck units, built from exactly these constants: a Planck energy, a Planck time, a Planck area, a Planck temperature. Ask what a bit costs in those units and the answer is: about one of everything. At the Planck temperature, letting a bit go costs 0.69 Planck energies. At the Planck energy, changing a bit takes 1.57 Planck times. On any horizon, holding a bit takes 2.77 Planck areas. **VERIFIED** The Planck units are the currency in which a bit costs about one of each.

This is the article’s central claim. The fundamental constants of nature are the three prices of a bit. Boltzmann’s constant prices it in heat. Planck’s constant prices it in action. Newton’s constant, with ħ and c, prices it in area. The speed of light sets no price of its own; it converts between the three. The claim is a way of reading three established laws rather than a fourth law, and its test is whether any fourth price of a bit can be found. None is known. **SYNTHESIS**

## 7. What the first price buys

Three consequences follow from the first price alone. Two have been enacted in a laboratory; the third can be.

**The demon.** In 1867 James Clerk Maxwell imagined a tiny being at a door in a wall dividing a box of gas, letting fast molecules through one way and slow ones the other, until one side is hot and the other cold and an engine can run on the difference. Nothing has been spent except attention. The second law of thermodynamics, which forbids running an engine on a single warm reservoir, appears to have been broken by looking.

The first price kills the demon, and it kills it exactly. Each bit the demon learns is worth kT ln 2 of work: Szilard. Each bit the demon lets go costs kT ln 2 of heat: Landauer. To keep running, the demon must eventually clear its notebook. It earns one unit per bit and pays one unit per bit. Its profit is zero or less. Looking, being a copy, is free; Léon Brillouin’s 1951 claim that the cost lay in the looking was believed for thirty years and is wrong. The demon does not break the second law. It borrows against its own memory, and the debt comes due when it forgets. Since 2010 the demon has been built four times: from a microscopic particle in Japan, from a single electron and then from an on-chip device in Finland whose notebook could be watched heating while the gas it sorted cooled, and from a superconducting circuit in France that tracked information and energy cycle by cycle. The books balanced every time. **MEASURED**

**The floor under every computer.** Because only crossings are charged, the minimum heat of any computer is kT ln 2 times the number of bits it pushes across its line. For a classical machine those are its erasures. A quantum computer’s logic gates are all reversible and push nothing across, so its logic is free. But qubits accumulate errors, and a working quantum computer corrects them by constantly measuring which errors occurred and resetting the qubits that carried them. That is a Maxwell’s demon inside the machine, and it must clear its notebook. The unavoidable heat of a quantum computer is its demon forgetting. **SYNTHESIS** The test is simple: count the resets per operation in a given error-correcting code; the floor is kT ln 2 per reset.

**The credit.** Two qubits can be entangled, which means the pair is in a perfectly definite state while each one alone is as unpredictable as a coin toss. An observer holding one of them knows, in an exact sense, more than everything about the other: the correlations as well as the state, an amount that classical physics cannot write down because it is negative. In 2011 Lídia del Rio and colleagues showed what that does to the first price. Letting go of a qubit while holding its entangled partner can cost less than nothing. The erasure pays out work, up to kT ln 2. Entanglement is stored order, and order is worth energy. This is a derivation, not yet a measurement; the experiment is within reach of today’s superconducting and trapped-ion machines. **DERIVED**

## 8. The receipt

Now take the first price and the third to the one place they meet.

A horizon is any surface that light from beyond it can never cross to reach a given observer. A black hole has one. So, less famously, does anyone who accelerates: behind a steadily accelerating observer there forms a surface from which light can never catch up. In 1976 William Unruh showed that such an observer feels the vacuum as a warm bath, at a temperature proportional to the acceleration. At Earth’s gravity the temperature is 4 × 10⁻²⁰ kelvin, which is why no one has ever noticed it, but it is exact. **DERIVED**

So a horizon has a temperature, and the region beyond it is, by definition, outside the line. Both prices apply to a bit that falls across it.

By the first price, a bit that crosses a horizon has been let go by everyone outside, into a region at the Unruh temperature. The energy that crosses with it is at least kT ln 2.

By the third price, the horizon must grow by one cell, 4 ln 2 Planck areas, to hold it.

Divide the area gained by the energy crossed, per bit, and the answer is 8πG divided by the acceleration and by c². **VERIFIED** Physicists found that formula in 1973 by a different route and called it the first law of black hole mechanics. Here it is simply the ratio of two price tags.

In 1995 Ted Jacobson asked what would follow if these two facts held not only for black holes but for every horizon, everywhere, for every accelerating observer. What follows, he showed, is Einstein’s equations of general relativity, the equations that say how matter and energy curve space and time, with Newton’s constant fixed by the size of the cell. Gravity comes out the way the gas law comes out of atoms: as the large-scale consequence of countless microscopic things doing their accounting. **DERIVED**

Read one bit at a time, Jacobson’s derivation says something plain. Einstein’s equations are the requirement that the heat price and the space price of a bit agree at every horizon, and Newton’s constant is the exchange rate between them. Space curves around matter because, whenever possibility falls out of view, the heat bill and the area bill must match. General relativity is a receipt. **SYNTHESIS**

This reading adds nothing to the derivation, which stands without it. What it adds is a test. If horizons hold bits the way memories do, the elementary cell of a horizon should hold exactly one bit, so that the smallest possible growth of a horizon is 4 ln 2 Planck areas. Jacob Bekenstein and Viatcheslav Mukhanov proposed exactly that quantum in 1995 on separate grounds. A 1998 argument by Shahar Hod, from the frequencies at which black holes ring, suggests the cell might hold a three-valued unit instead. The instrument that could decide, in principle, is a gravitational-wave detector listening to a black hole ring after a collision. In practice the effect lies far below what any detector can now hear.

The second price shows up at horizons too. Nothing can scramble information faster than a rate set by its temperature and Planck’s constant, a bound derived in 2016, and black holes are believed to be the fastest scramblers in the universe, sitting exactly on the line. At a horizon all three prices are paid at once: energy per bit set by k, speed of change set by h, area per bit set by G. **DERIVED** for the bound; **CONJECTURE** that black holes saturate it.

## 9. What is not known

Here the solid ground ends, and the article says so.

Three prices have been read off, and two have been shown to meet at a horizon. What has not been shown is that the same object pays at every counter: that the bit whose erasure warmed the water in Lyon and the bit that enlarges a horizon are the same kind of thing. The qubits of the laboratory have no gravity. The cells of a horizon have no known carrier and no known dynamics. Saying which quantum objects live on a horizon and how they move is a theory of quantum gravity, and there is none. The claim that they are one object is a conjecture. **CONJECTURE**

It is a conjecture with experiments attached. In 2017 two groups independently proposed a tabletop test of whether gravity itself can entangle two small masses; if it can, gravity is carried by something that carries quantum information, which the conjecture requires, and if at sufficient sensitivity it cannot, the conjecture’s premise fails. Ringdown spectroscopy could, in principle, say whether a horizon cell holds one bit. And the credit of Section 7, work paid out by erasing a qubit against its entangled partner, could be measured now.

Two smaller honesties. The third price is proven for black holes and derived for every horizon under Jacobson’s assumptions; that it caps every region of space, horizon or not, is a well-supported conjecture. And the second price bounds changes between distinguishable states; it becomes a price per bit only when the states are used as a code, which every physical computer does and nature need not.

## 10. Where it stands

Shannon measured the bit and said nothing about what carries it. Turing showed how bits are moved and said nothing about what the moving costs. Einstein said how matter curves space and did not know that his equation could be read as an accountant’s rule about bits crossing horizons; that reading was not available for another eighty years.

A physical theory of information sits where the three meet. Every price here is quoted in Shannon’s unit. The price falls on Turing’s forgetting steps and not on his computing steps, which Bennett showed can be made to forget nothing; so it falls on forgetting, not on computing and not on thinking, and Turing’s question of whether machines can think is a different question that nothing here answers. And Einstein’s equation, read per bit, is the agreement of two of the prices.

What is settled: a bit is a located possibility; letting it go costs kT ln 2; changing it costs h/4 of action; holding it on a horizon costs 4 ln 2 Planck areas; the constants of nature are the price tags; and at a horizon the heat bill and the area bill must match, which is gravity. What is open: whether one bit is being charged at every counter, or three.

Nothing is forgotten for free. Nothing is changed for free. Nothing is held for free. The constants of nature are what those three things cost, and the shape of space is the receipt.

## What is solid, and what is not

- **Measured:** the heat price of a bit (2012, 2014, 2016); a bit’s cash value and the demon’s debt (2010, 2014, 2015, 2017).
- **Derived within accepted theory:** the time price (1998); the space price for black holes (1973, 1975) and for every horizon (1995); Einstein’s equations from horizon entropy (1995); erasure at a profit for entangled qubits (2011); quantum theory from six information rules (2011); the scrambling bound (2016).
- **Readings offered in this article, each with a test:** the three constants as the three prices of a bit; heat × time = h ln 2/4 for a thermal bit; error correction as the demon inside a quantum computer; Einstein’s equations as the agreement of the heat price and the space price; quantum theory as the rule seen from inside.
- **Conjecture:** that laboratory bits and horizon bits are one object; that black holes are the fastest scramblers; that the space price caps every region, not only horizons.
- **Estimates:** energy per logic operation in current chips; the distance from today’s machines to the floor and the ceiling.

## By the numbers

*Computed from CODATA 2018 constants in the technical companion.*

- Heat price of a bit at room temperature: 2.87 × 10⁻²¹ joules, or 0.018 electron-volts. Erasing one gigabyte at the floor: 23 picojoules. Forgetting 10²⁰ bits per second at the floor: 0.29 watts.
- In heat-price units: thermal energy of one molecule, 1.4; a green photon, 126; a carbon-hydrogen bond, 240; one elementary logic operation in a current chip, 30,000 to 300,000 (estimate).
- Time price of a bit: h/4 = 1.66 × 10⁻³⁴ joule-seconds of action; one femtosecond at one electron-volt; 40 femtoseconds at room-temperature energy; at most 5.4 × 10⁵⁰ bit changes per second per kilogram.
- Heat × time for a thermal bit: h ln 2/4 = 1.15 × 10⁻³⁴ joule-seconds, at every temperature.
- Space price of a bit: 4 ln 2 ≈ 2.77 Planck areas, or 7.2 × 10⁻⁷⁰ square meters, on any horizon.
- In Planck units the three prices are 0.69, 1.57 and 2.77.
- A solar-mass black hole: radius 2.95 kilometers; 1.5 × 10⁷⁷ bits. A one-kilogram black hole: radius 1.5 × 10⁻²⁷ meters; 3.8 × 10¹⁶ bits; evaporation in about 10⁻¹⁶ seconds.
- Temperature of the horizon behind an observer at Earth’s gravity: 4 × 10⁻²⁰ kelvin.

## About this document

Part of the jedanderson.org corpus. Prepared in September 2026 as a collaboration between Jed Anderson, whose questions, curiosity and framing directed the work, and Claude, an AI system made by Anthropic, which drafted the text, carried out the derivations and computed every number in the companion verification script. The physics rests on the people named in the companion paper’s Sources. The readings and the conjecture are the collaboration’s own, and are tagged so that they can be judged. This work stands on the shoulders of giants, and with these tools the giants got even bigger. Corrections and challenges are welcome at jedanderson.org.
