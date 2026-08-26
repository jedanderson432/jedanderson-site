---
title: "Why von Neumann Was Right"
slug: "why-von-neumann-was-right"
subtitle: "Shannon Entropy, Boltzmann Entropy, and the One Formula Underneath Both"
date: 2026-06-07
date_modified: 2026-07-26
type: essay
status: published
tags: ["information-theory", "thermodynamics", "physics", "artificial-energy", "landauer", "causal-sovereignty"]
abstract: "John von Neumann's 1948 instruction to Shannon—call your information measure entropy—was a statement of mathematical identity, not convenience: Boltzmann's thermodynamic entropy and Shannon's information entropy are the same function. This essay traces that identity through Jaynes, Maxwell's Demon, and the Landauer limit to a single number fixed by fundamental constants: at 298 K, erasing one bit costs about 0.0178 eV, while a single carbon–hydrogen bond holds roughly 240 times as much. The gap between the cost of knowing and the cost of moving matter is written into the electromagnetic structure of the universe."
license: CC-BY-4.0
pdf: "/pdfs/why-von-neumann-was-right.pdf"
pdf_pages: 11
hero_image: "/images/why-von-neumann-was-right-hero.jpg"
hero_image_alt: "Cover for Why von Neumann Was Right: the essay title set in serif type on a pale ground inside a hairline frame."
---

*John von Neumann's instruction to Claude Shannon in 1948—to call his information measure entropy—was not a naming convenience. It was a statement of mathematical identity. Boltzmann's thermodynamic entropy and Shannon's information entropy are the same function, counting the same object: the logarithm of the distinguishable configurations compatible with what is known. This essay traces that identity—through Jaynes, Maxwell's Demon, and the Landauer limit—to a single number fixed by the constants of physics. At room temperature, erasing one bit costs about 0.0178 eV. A single chemical bond holds roughly 240 times as much. The gap between the cost of knowing and the cost of moving matter is not an engineering accident. It is written into the structure of matter.*

## I. The Formula That Appears Twice

In the fall of 1948, Claude Shannon was finishing the most important paper in the history of communication theory and could not decide what to call his central quantity. "Information" was too vague, already overloaded. He had settled tentatively on "uncertainty." He brought the problem to John von Neumann.

The exchange that followed is famous, but it survives only as Shannon later recalled it—reported by Myron Tribus and Edward McIrvine in 1971, decades after the fact, with no contemporaneous record. As Shannon recounted it, von Neumann said: "You should call it entropy, for two reasons. In the first place your uncertainty function has been used in statistical mechanics under that name, so it already has a name. In the second place, and more important, no one really knows what entropy really is, so in a debate you will always have the advantage."

Treat it as anecdote, not transcript. The second reason gets quoted for its wit. The first reason is the one that matters, and it holds whether or not the words are verbatim: the function Shannon derived for the information content of a message is the same function Boltzmann derived for the disorder of a thermodynamic system. Not analogous. Not similar in spirit. The same function, the same counting operation, the same logical structure, in two languages—one built from molecules in a gas, one from symbols on a wire.

Von Neumann had reason to see it at once. In his 1932 treatise on quantum mechanics he had already defined what is now called the von Neumann entropy, using the functional form Shannon would independently reach sixteen years later. He had been there before.

Boltzmann's entropy counts the ways the microscopic parts of a system can be arranged while producing the same macroscopic state: S = −k_B Σ pᵢ ln pᵢ. This is the entropy of a gas, a crystal, a black hole—the quantity the Second Law forbids from decreasing in an isolated system.

Shannon's entropy, derived from the requirements of consistent information measurement, is H = −Σ pᵢ log₂ pᵢ. This is the entropy of a message, a language, a genome.

Strip the constants and the two expressions are the same object. Both count the logarithm of the number of distinguishable configurations. Both maximize when all configurations are equally probable. Both reach zero when the system is fully ordered. Not analogous. Isomorphic.

This is not coincidence. Both arise from one requirement: how do you consistently assign a number to the uncertainty of a probability distribution? Subject to mild consistency assumptions, there is essentially one answer. It was found twice—once in molecules and heat, once in symbols and transmission. The universe had one answer to give, and offered it to whoever asked correctly.

## II. What Jaynes Argued

The von Neumann anecdote points at the identity. E.T. Jaynes, in two papers in 1957, argued for what it means.

Jaynes's claim was audacious then and remains a live position now: statistical mechanics is not a special branch of physics but a special case of Bayesian inference under constraints. On his account, the Boltzmann distribution emerges from thermodynamics for the same reason it emerges from the principle of maximum entropy—both answer one question: given what I know, what is the least biased probability distribution over the microstates? Maximize entropy, because the maximum-entropy distribution is the unique one that assumes nothing beyond the stated constraints. Any lower-entropy assignment smuggles in structure not actually known.

If Jaynes is right—and the view is influential, though not held universally as the last word—the consequence runs deep. The laws of thermodynamics would be laws of inference applied to physical systems. Entropy would be missing information: how much you do not know about which microstate the system occupies, given its macrostate. The Second Law would be a statement about information as much as about molecules—a system's entropy rises as knowledge of its precise microstate is lost. Pollution as entropy increase is then information loss: a molecule of benzene dispersed through groundwater is a molecule whose location and configuration have been forfeited.

Whether or not one grants Jaynes's full reduction, the formulas are identical. That much is not a matter of interpretation. Von Neumann was stating a mathematical fact when he told Shannon to call it entropy.

## III. The Gate and the Gradient

Maxwell's Demon, proposed in 1867, sits at the hinge of everything that follows.

Maxwell imagined a tiny being at a door between two chambers of gas. By observing individual molecules and opening the door selectively, the demon could sort the gas hot from cold without apparent work. For nearly a century it seemed to violate the Second Law. The resolution—Szilard in 1929, completed by Bennett in 1982—is that the demon is an information-processing system. It must acquire information about each molecule, store it, and eventually erase it to keep operating. Erasure is physically irreversible. Landauer proved in 1961 that erasing one bit must dissipate at least k_B·T·ln2 of heat. The entropy of erasure exactly compensates the entropy decrease in the gas. The Second Law survives.

The dissolution of the paradox is the smaller result. The larger one is that the demon is real. It works. It uses information to steer energy, paying the information price to avoid the thermodynamic price. Its cost is k_B·T·ln2 per bit—and that cost is extraordinary in its smallness. How small is the whole point, and it is the subject of the next section.

## IV. The Number

Here is the number the identity forces.

At 298 K, Landauer's floor for erasing one bit is k_B·T·ln2 ≈ 0.0178 eV (about 2.85 × 10⁻²¹ joules). A carbon–hydrogen bond holds ≈ 4.28 eV (413 kJ/mol). The ratio is ~240×. Erasing the bit that records a decision costs, at the thermodynamic floor, roughly one two-hundred-fortieth of the energy locked in the bond that decision controls.

This is the [bond-bit ratio](/essays/bond-bit-ratio). It is not an empirical accident. The fine-structure constant and the electron mass set bond energies. The Boltzmann constant and temperature set the information floor. The ~240× gap is written into the electromagnetic structure of matter at room temperature—derivable from first principles, fixed by fundamental constants. Change the constants of physics and the ratio moves. Hold physics fixed and it does not.

That is the microscopic ratio: one bit, one bond. A second claim, larger and looser, follows from aggregation, and it must not be mistaken for the same fact or lean on the same authority. A single bit of information—whether a valve is sound—can decide the fate of a macroscopic quantity of matter, on the order of 10²⁶ molecular bonds that either hold or scatter into groundwater. Run the per-bond advantage through that leverage and the effective ratio of knowing over moving reaches something on the order of 10²⁰. The 240× is exact and derivable. The 10²⁰ is an order-of-magnitude statement about how far information compresses when matter does not; it inherits none of the first number's precision.

The biosphere has been collecting on this ratio for 3.5 billion years. Chlorophyll is a Maxwell's Demon realized in molecular architecture: matter structured with enough information—on the order of ten thousand bits of evolved protein configuration per photosynthetic reaction center, an order-of-magnitude estimate, not a measured constant—to couple selectively to photons near 680 nanometers and deposit their energy in a chemical bond rather than release it as heat. The gradient (sunlight against the cold of space) supplies the energy. The molecular structure supplies the information. The information steers the gradient. Reduce the chlorophyll to its atoms in disordered arrangement and there is no light-harvesting, only an absorber that radiates heat. The structure is the technology. Its thermodynamic cost is the Landauer floor: k_B·T·ln2 per bit, ~240 times cheaper than the bond the bit controls.

## V. The Quantum Object, and a Correction

Von Neumann's 1932 entropy—S = −k_B Tr ρ ln ρ, where ρ is the density matrix of a quantum system—is the most general form of the counting operation. When ρ is diagonal, it reduces exactly to the Shannon entropy of those probabilities. Take the classical limit and it becomes the Boltzmann formula. One mathematical object, three expressions, one question underneath: how many distinguishable configurations are compatible with what is known? Von Neumann wrote it down sixteen years before Shannon derived the same functional form for messages, which is why he recognized Shannon's formula on sight. This part is not in dispute.

What is in dispute—and has now largely settled against an earlier reading—is whether that quantum object does load-bearing work in photosynthesis. For about a decade it looked like it might. In 2007, Engel, Fleming, and colleagues used two-dimensional electronic spectroscopy on the Fenna–Matthews–Olson complex and saw long-lived oscillations in the signal. These were initially read as functional electronic coherence: the excitation exploring multiple pathways at once and interfering constructively, quantum mechanics boosting transport efficiency beyond what classical hopping allows.

That interpretation has not held. By 2025–2026 the consensus attributes those oscillations largely to vibrational coherence in the electronic ground state—molecular motion, not a working superposition of transport pathways. At physiological temperature, genuine electronic coherence in these complexes is too short-lived, roughly 60 to 170 femtoseconds, to steer energy transfer over the picoseconds that transfer actually takes. Efficient light-harvesting is now understood to proceed by robust, largely classical, Förster-type (FRET-like) mechanisms: energy hopping down a well-tuned funnel of pigment sites, resistant to disorder rather than dependent on delicate coherence.

The thesis does not need the coherence. It never did. The efficiency of photosynthesis is a triumph of information-structured matter steering a gradient, and that claim rests on the bond-bit ratio, not on quantum superposition. Von Neumann's entropy remains the correct unifying object for counting configurations across classical, quantum, and informational settings—that is a mathematical fact, undisturbed by any of this. It simply does not certify that the biosphere runs on quantum coherence. Keep the theorem. Drop the mechanism it was briefly conscripted to support.

## VI. The Hypothesis: Artificial Energy

Everything above is established physics. What follows is the engineering hypothesis it motivates, not a result it proves.

The identity is real. The bond-bit ratio is fixed. Biology has exploited it for 3.5 billion years. The hypothesis is that we can do the same on purpose—deliberately, at scale, in engineered materials—and that this defines a technology category worth naming.

Call it [Artificial Energy](/essays/artificial-energy), and set it parallel to Artificial Intelligence. The parallel is structural, not decorative. AI substitutes information for cognitive labor: intelligence maintained in silicon, sustained against noise. Artificial Energy would substitute information for physical forcing: free-energy gradients harvested in engineered materials, ordered reactions sustained against the pull of equilibrium, by matter structured to know what to steer. Both would be purchases of order in the same currency the Landauer limit prices—one in the cognitive domain, one in the physical—because information entropy and thermodynamic entropy are the same thing counted at different scales.

What would it look like? A solar panel already proves the gradient-harvesting regime is real, but it is the crude end of the space. The interesting end is high-information: designed catalysts that select one reaction pathway out of millions at ambient temperature; engineered enzymes that fold a protein into a functional configuration without the energy budget blind search would demand across 10¹³⁰ possible sequences; artificial reaction centers that route, transform, and combine energy flows the way a chlorophyll complex or a metabolic pathway does. In each case the wager is the same: pay the small, information-side cost of structure, and collect the large, matter-side value of the bond.

This is a hypothesis, not a theorem. The identity does not entail that such materials are buildable, economical, or close. It motivates the search. It says the leverage exists in principle, fixed by constants, already demonstrated by biology—and that a technology able to exploit the hinge between knowing and moving would inherit that leverage. Whether we can build it is an engineering question the physics only makes worth asking.

## VII. Von Neumann Was Right

He was right about the thing he actually claimed. Not about any technology—about the identity. Information and thermodynamics are one discipline seen from two sides. Entropy is the hinge between knowing and moving. The formula is the same formula, in units that convert, whether the uncertainty is about a molecule's position, a quantum state, or a symbol on a wire. The cost of resolving it has a floor: k_B·T·ln2. He saw the theorem, and the theorem was true.

The name is entropy. The number is ~240×. The rest—what we choose to build now that we can read what the formula was always telling us—is up to us.

---

*Jed Anderson is the founder and CEO of EnviroAI and the author of [Artificial Energy: The Next Civilizational Technology Layer](/essays/artificial-energy), [The Intelligence Leverage Equation](/essays/intelligence-leverage-equation), and [The Missing Quadrillion](/essays/missing-quadrillion). The intellectual foundation of this work is maintained at jedanderson.org.*

## Revision history

*Revised 2026-07-26: restructured argument; corrected claims about quantum coherence in photosynthesis to reflect current (2025–2026) consensus; reframed the von Neumann–Shannon anecdote and the reaction-center bit estimate.*
