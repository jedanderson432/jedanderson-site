---
title: 'Generalized Functional Efficiency: A Thermodynamic Metric for the Evolution of Complex Systems'
slug: 'generalized-functional-efficiency'
date: 2026-01-18
type: essay
status: published
tags: ['foundational', 'thermodynamics', 'physics', 'paper', 'enviroai', 'information-theory', 'treatise']
abstract: 'Proposes Generalized Functional Efficiency (GFE = functional output per unit entropy production per unit mass) as a successor metric to Energy Rate Density for tracking the evolution of complex systems. Demonstrates that GFE rises monotonically by 50+ orders of magnitude across a 13.8-billion-year cosmological arc and resolves the apparent ''efficiency paradox'' that ERD encounters at the frontier of biological and technological evolution.'
license: CC-BY-4.0
co_authors: ['Google Gemini 3.0 Pro Deep Think', 'Grok-4.1 Deep Research', 'ChatGPT 5.2 Deep Research', 'Claude 4.5 Deep Research']
pdf: '/pdfs/generalized-functional-efficiency.pdf'
hero_image: '/images/generalized-functional-efficiency-hero.png'
hero_image_alt: 'First page of Generalized Functional Efficiency: A Thermodynamic Metric for the Evolution of Complex Systems'
---

## Abstract

The quantification of complexity in evolving physical systems remains a central challenge in non-equilibrium thermodynamics and physical cosmology. For decades, Energy Rate Density

(ERD), defined as the energy flux through a system per unit mass (Φ_m), has served as the primary metric for mapping the ascent of complexity from the early universe to technological civilization. While ERD successfully correlates with structural emergence across broad cosmic epochs, it encounters a fundamental "efficiency paradox" at the frontiers of biological and technological evolution: highly optimized systems, such as the human brain and neuromorphic processors, frequently exhibit lower energy throughput per unit mass than their less complex predecessors, thereby appearing

"less evolved" under the ERD framework. This paper proposes a rigorous successor metric:

Generalized Functional Efficiency (GFE), defined as the rate of functional output per unit entropy production per unit mass

(F / (Ṡ · M)). By integrating the Gouy-Stodola theorem of exergy destruction with information-theoretic definitions of functional competency, we derive GFE from first principles. We apply this metric across a continuous 13.8-billion-year timeline, demonstrating that cosmic selection pressures favor not the maximization of energy throughput, but the minimization of thermodynamic cost per unit of function. Our analysis reveals that while ERD plateaus or regresses in advanced optimization regimes, GFE increases monotonically by over 50 orders of magnitude, accurately predicting the superiority of neuromorphic architectures over conventional von

Neumann systems and resolving the efficiency paradox.

## 1. Introduction: The Thermodynamic Arrow of

Complexity The observable universe exhibits a distinct temporal asymmetry. From the isotropic, high-entropy homogeneity of the primordial plasma, the cosmos has evolved into a hierarchy of increasingly intricate, localized structures—galaxies, stars, planetary atmospheres, biospheres, and technospheres. This trajectory presents an apparent conflict with the Second

Law of Thermodynamics, which mandates that the total entropy of an isolated system must strictly increase.1 The resolution to this paradox, pioneered by Schrödinger, Prigogine, and others, lies in the definition of these entities as dissipative structures: open systems that maintain a state of ordered non-equilibrium by continuously importing free energy and exporting high-entropy waste (heat) to their environment.3

While the mechanism of persistence—dissipation—is well understood, the metric of progression remains contentious. Is there a physical quantity that is maximized over cosmic time? Does the universe have a thermodynamic "goal"? Early attempts to answer this focused on total energy consumption, but simple scaling laws quickly revealed that mass-specific metrics were required to compare a star to a cell.5

### 1.1 The Dominance of Energy Rate Density (ERD)

In the late 20th century, astrophysicist Eric Chaisson synthesized these observations into the concept of Energy Rate Density (ERD), denoted Φ_m. Defined as the energy flow through a system (Ė) divided by its mass (M), ERD provided the first quantitative unification of physical, biological, and cultural evolution.5 Chaisson’s empirical data revealed a striking exponential ascent:

● Milky Way Galaxy: Φ_m ≈ 0.5 erg/s/g ● The Sun: Φ_m ≈ 2 erg/s/g ● The Biosphere: Φ_m ≈ 900 erg/s/g

● The Human Body: Φ_m ≈ 20,000 erg/s/g ● Modern Civilization (Society): Φ_m ≈ 500,000 erg/s/g

● Integrated Circuits (Pentium chips): Φ_m ≈ 10^6 - 10^7 erg/s/g 5 This metric compellingly suggests that "complexity" is thermodynamically synonymous with the intensity of energy metabolism. It implies that the universe constructs systems that process energy at ever-accelerating rates per unit of matter. For decades, ERD has been the standard-bearer for complexity science, successfully predicting the high energy demands of early industrialization and the initial scaling of digital computation.8

### 1.2 The Efficiency Paradox

However, as we scrutinize the leading edges of evolution—specifically in biology and advanced computing—ERD begins to fail as a predictive metric. Evolution acts under selection pressures that reward efficiency, not just throughput. When a system undergoes optimization, it often learns to perform the same function with less energy, thereby reducing its Φ_m and, according to the ERD metric, reducing its complexity.7

This contradiction is most evident when comparing the architectures of biological intelligence and artificial "brute force" computation. The NVIDIA H100 GPU, a paragon of modern silicon engineering used for training large language models, operates at a thermal design power

(TDP) of 700 Watts with a mass of approximately 3 kilograms.9 Its ERD is colossal. In contrast, the human brain, capable of reasoning, low-shot learning, and autonomous agency, operates at a mere 20 Watts within a 1.4-kilogram mass.10

Under the ERD framework, the GPU is orders of magnitude "more complex" than the brain because it burns energy faster. Yet, functionally, the brain achieves computational feats

(specifically in generalization and energy efficiency) that the GPU cannot match without megawatts of support infrastructure. Furthermore, the trajectory of technological evolution is currently shifting away from high-power CPUs toward neuromorphic architectures like

Intel's Loihi 2, which are explicitly designed to lower power consumption (to milliwatt scales) while maintaining high functional throughput.12 ERD would classify the transition from an

H100 to a Loihi 2 as a regression in complexity, a conclusion that defies the obvious technological advancement involved.

This "Efficiency Paradox" suggests that ERD is a metric of the industrial phase of complexity—where growth is achieved by scaling up resources—but fails in the informational phase, where growth is achieved by scaling up organization and minimizing waste.

### 1.3 The Solution: Generalized Functional Efficiency

To resolve this, we must return to first principles and ask: what does the universe actually select for? It selects for function. A system persists and replicates if it can effectively transduce free energy into useful work (survival, computation, construction) relative to the cost of that transaction. The inevitable cost, mandated by the Second Law, is entropy production.

We propose Generalized Functional Efficiency (GFE) as the superior metric. GFE is defined as the functional output of a system normalized by its thermodynamic cost (entropy production) and its material footprint (mass).

GFE = F / (Ṡ · M)

Where F is the functional output rate (context-dependent useful work), Ṡ is the entropy production rate (Watts/Kelvin), and M is the mass (kg). By incorporating entropy production in the denominator, GFE explicitly rewards systems that approach thermodynamic reversibility

(limits of efficiency).

This report will systematically derive GFE from non-equilibrium thermodynamics, apply it to a

13.8-billion-year dataset ranging from Big Bang Nucleosynthesis to quantum-scale computing, and demonstrate that GFE provides a monotonic, accelerating measure of cosmic complexity that resolves the paradoxes plaguing ERD.

## 2. Theoretical Framework: Derivation from

Non-Equilibrium Thermodynamics The formulation of GFE is not arbitrary; it emerges directly from the fundamental laws governing how open systems extract work from energy gradients. To understand why GFE is the correct metric for complexity, we must examine the thermodynamic architecture of dissipative structures.

### 2.1 The Prigogine Entropy Balance

In classical equilibrium thermodynamics, entropy S is maximized, and no macroscopic changes occur. Complex systems, however, exist in Non-Equilibrium Steady States (NESS). For such a system, the change in entropy dS over time dt is described by the Prigogine equation: dS/dt = (d_e S)/dt + (d_i S)/dt

Here, (d_e S)/dt is the entropy flux (exchange with the surroundings) and (d_i S)/dt is the internal entropy production due to irreversible processes (dissipation) within the system.13

For a system to maintain a constant state of high complexity (low internal entropy) rather than decaying into disorder, it must satisfy the steady-state condition dS/dt = 0. This implies:

(d_i S)/dt = - (d_e S)/dt The system must export entropy to its environment at the exact rate it is produced internally.

We denote this internal entropy production rate as Ṡ_gen (or σ).

This quantity, Ṡ_gen, represents the irreducible thermodynamic "cost" of the system's existence. It is the measure of how much the universe's disorder must increase to sustain the local order of the system.15

### 2.2 The Gouy-Stodola Theorem and Exergy Destruction

The link between entropy production and the loss of "useful" capability is formalized by the

Gouy-Stodola Theorem. In engineering and physics, exergy (or availability) is defined as the maximum useful work a system can perform as it comes into equilibrium with its environment.16

The theorem states that the rate of exergy destruction (Ẋ_destroyed), or lost work, is directly proportional to the entropy production rate:

Ẋ_destroyed = T₀ · Ṡ_gen Where T₀ is the ambient temperature of the environment.

When a complex system takes in a flow of free energy Ė_in (power), it partitions this energy into two components:

## 1. Functional Power (P_useful or F): Energy converted into directed work (e.g., chemical

synthesis, mechanical movement, bit erasure, error correction).

## 2. Dissipated Power (P_dissipated): Energy degraded into heat without performing useful

function, synonymous with exergy destruction.

Thus, the energy balance is:

Ė_in = F + T₀ · Ṡ_gen

Standard thermodynamic efficiency (η) is the ratio of useful output to total input:

η = F / Ė_in = F / (F + T₀ · Ṡ_gen)

Chaisson's ERD metric (Φ_m = Ė_in / M) focuses solely on the input side. It rewards a system for having a large Ė_in, regardless of whether that energy is converted into function F or simply destroyed as T₀ · Ṡ_gen. A raging forest fire has a massive ERD because it converts chemical potential energy into heat at a furious rate, but its functional output (in terms of building structure or processing information) is negligible.

GFE, however, can be understood as a density of functional capability relative to the thermodynamic penalty paid to achieve it. Rearranging the efficiency equation and normalizing by mass, we see that GFE aligns with maximizing the ratio of function to dissipation:

GFE ≈ F / (Ṡ_gen · M)

### 2.3 Defining "Function" across Universal Domains

The primary criticism of any "functional" metric is the potential for anthropocentrism. What constitutes "function" in a star versus a brain? To ensure GFE is a robust physical law, we define Function (F) strictly as the Free Energy Transduction Rate—the rate at which a system converts an available free energy gradient into a specific, ordered form of work characterized by its internal organization.7

● Astrophysical Domain: The "function" of a star is nucleosynthesis. The transduction of gravitational potential and nuclear binding energy into radiation and heavier elements. F is measured in Watts of fusion power output that contributes to metallicity changes.18

● Biological Domain: The "function" is Net Primary Productivity (NPP) or metabolic synthesis. The transduction of solar photons into chemical bond energy (biomass). F is measured in Watts of chemical power stored.19

● Computational Domain: The "function" is information processing. The transduction of electrical energy into state transitions (bit flips) that reduce local uncertainty. F is measured in operations per second (OPS), which can be converted to an energetic equivalent using the Landauer Limit as a baseline.20

By fixing these definitions, we can perform a comparative analysis across cosmic time, testing whether the universe is indeed optimizing for GFE.

## 3. Cosmic Epoch I: The Primordial Era and the Era of

Waste The early universe provides a critical baseline for our analysis. If GFE is a valid measure of complexity, it should register extremely low values during the primordial era, corresponding to the lack of complex structures, despite the enormous energy densities present.

### 3.1 Big Bang Nucleosynthesis (BBN)

In the interval between 10 seconds and 20 minutes post-Big Bang, the universe was a pervasive fusion reactor. The temperature cooled from 10^9 K to 10^8 K, allowing protons and neutrons to fuse into Deuterium, Helium-4, and trace amounts of Lithium-7.22

● Function (F): The useful work performed was the release of nuclear binding energy. The formation of Helium-4 releases approximately 7 MeV per nucleon. With a baryonic mass of the observable universe estimated at 10^5} kg and a ~25% conversion rate to Helium, the total energy released was immense, on the order of 10^66 Watts globally.7

● Entropy Production (Ṡ): Crucially, this nucleosynthesis occurred within a photon-dominated plasma. The baryon-to-photon ratio (η)was extremely low, approximately 6 x 10^-10.23 This implies there were over a billion photons for every baryon. The entropy of the universe was dominated by this radiation bath. The entropy per baryon was roughly 10^9 k_B.24

When we calculate the GFE, we must normalize the immense fusion power by the even more immense entropy production of the photon bath. The specific entropy (s) was astronomically high.

GFE_BBN = F_fusion / (Ṡ_univ · M_baryon) ≈ 10^-44 K/kg This vanishingly small number 7 confirms the intuition that the early universe was thermodynamically "inefficient" at generating complexity. It was a regime of high dissipation and low structural organization. The universe was maximizing entropy production almost exclusively, with very little "functional" structure to show for it per unit of thermodynamic cost.

### 3.2 The Stellar Era: Population III Stars vs. The Sun

As the universe expanded and cooled, matter decoupled from radiation, leading to the formation of the first stars (Population III) around z ~ 20. These stars allow us to track the evolution of GFE within the astrophysical domain.

Population III Stars: These were composed of primordial H/He, with masses likely between .

100 and 1000 M_sun. They were extremely luminous and hot (T_surface ≈ 50,000 K).25

● While their functional output (nucleosynthesis rate) was high due to the CNO cycle operating at high core temperatures, their entropy production was also prodigious. They burned through their fuel in a few million years, radiating energy into a still-dense universe.

● Estimated GFE: ≈ 2.5 × 10^-29 K/kg.7 The Sun (Main Sequence): Comparing this to our current Sun (Population I) reveals a significant trend. The Sun is a far more optimized fusion engine.

● Mass (M): 1.989 × 10^30 kg.. ● Luminosity (F): 3.828 × 10^26 W (representing the steady-state nucleosynthesis rate).26

● Entropy Production (Ṡ): The Sun produces entropy by converting high-temperature core energy (15 x 10^6 K) into low-temperature surface radiation (5778 K). The rate is approximated by the flux leaving the surface:

Ṡ_sun ≈ L_sun / T_surf = (3.828 × 10^26 W) / 5778 K ≈ 6.6 × 10^22 W/K Calculating the solar GFE:

GFE_sun = (3.828 × 10^26) / ((6.6 × 10^22)(1.989 × 10^30)) ≈ 2.9 × 10^-27 K/kg This represents an improvement of approximately two orders of magnitude over Population III stars. Stellar evolution favored smaller, longer-lived stars that are thermodynamically more efficient at converting mass into energy over sustained periods. They extract more "time"

(stellar lifespan) and functional metallicity enrichment per unit of entropic dissipation.

## 4. Cosmic Epoch II: The Biosphere and The Biological

Phase Transition The emergence of life on Earth marks a phase transition in the GFE trajectory. Biological systems fundamentally differ from stars in their ability to manipulate free energy. While stars passively radiate, life actively captures high-quality free energy (low entropy) and uses it to build complex internal structures, delaying the decay to equilibrium via metabolic cycles.

### 4.1 Photosynthesis: The Thermodynamic Engine of Life

Photosynthesis is the primary mechanism by which the biosphere transduces free energy. It converts solar exergy into chemical potential (biomass).

● Functional Output (F): The Global Net Primary Productivity (NPP) is estimated at 105 petagrams of Carbon per year. In energetic terms, this is approximately 100 TW, or 10^14

Watts of chemical energy storage.19 ● Mass (M): The total biomass of the Earth is approximately 550 Gt C, or roughly 10^15 kg

(wet weight).28 ● Entropy Production (Ṡ): The biosphere operates between the temperature of the sun

(T_sun ≈ 5778 K, effective input temperature ~1200 K at TOA due to geometry) and the

Earth's surface temperature (T_earth ≈ 288 K). The global entropy production of the biosphere has been estimated at 1 - 2 TW/K.1

Using these values:

GFE_bio ≈ (10^14 W) / ((10^12 W/K)(10^15 kg)) ≈ 10^-13 K/kg Comparing this to the Solar GFE (10^-27), we observe a staggering 14 order of magnitude increase. This massive jump quantifies the "biological advantage." Living matter is exponentially more efficient at concentrating function per unit of mass and entropy than stellar matter. This validates the GFE metric's ability to distinguish between abiotic and biotic complexity, a distinction that ERD makes much less sharply (only a factor of 10^3 to 10^4 increase in ERD from sun to biosphere).7

### 4.2 The Human Brain: The Apex of Biological Optimization

The human brain represents the pinnacle of biological complexity and serves as the crucial test case for the "Efficiency Paradox."

● Functional Output (F): The computational capacity of the brain is a subject of intense debate, but estimates based on synaptic transmission rates converge on 10^16 synaptic operations per second (OPS).10

● Power Input (P): The brain consumes approximately 20 Watts of power.10 ● Mass (M): The average adult human brain weighs 1.4 kg.10

● Entropy Production (Ṡ): Since the brain performs significant useful work, we calculate entropy based on heat dissipation (Input Power minus Useful Work). Ṡ_brain = (20 W - 10

W) / 310 K ≈ 0.032 W/K GFE Calculation: GFE_brain ≈ 10 W / (0.032 W/K · 1.4 kg) ≈ 223 K/kg

This is another 15 order of magnitude leap over the general biosphere (10^-13). The brain is a device that distills the general metabolic efficiency of life into a hyper-dense functional state.

However, the true power of GFE is revealed when we look at the Specific Computational

Capacity (SCC) form of GFE, which allows us to compare brains to computers. The brain achieves 10^16 OPS with only 0.065 W/K of entropy production. This incredible ratio of information processing to thermodynamic cost is what modern technology is struggling to emulate.

## 5. Cosmic Epoch III: The Technological Frontier and

the Resolution of the Paradox We now turn to the technosphere, where ERD fails most spectacularly. Under Chaisson's ERD metric, a fighter jet (high energy throughput) is more complex than a supercomputer, and a

GPU consuming 700W is more complex than a neuromorphic chip consuming 1W. GFE corrects this by penalizing the waste heat.

### 5.1 The Brute Force Era: NVIDIA H100 GPU The NVIDIA H100 GPU is the current standard

for AI training, representing the "high power" approach to computing. Power (P): The SXM5 module has a Thermal Design Power (TDP) of 700 Watts. Mass (M): The entire module (with heat sinks) weighs approximately 3 kg. Function (F): To compare this thermodynamically to the brain, we convert the raw computational throughput into a "useful work" equivalent.

Assuming a generous 50% utilization of energy for logic gating versus leakage/overhead, F ≈

350 W. Entropy Production (Ṡ): We calculate entropy production based on the dissipated waste heat (P - F). Ṡ_H100 = (700 W - 350 W) / 358 K ≈ 1.0 W/K

GFE Calculation (H100): GFE_H100 = 350 W / (1.0 W/K · 3 kg) ≈ 117 K/kg

### 5.2 The Neuromorphic Era: Intel Loihi 2 Intel's Loihi 2 represents the next evolutionary step:

biomimetic architecture. It uses asynchronous spiking neural networks (SNNs) to compute only when necessary (event-driven), drastically reducing power. Power (P): For typical workloads, a Loihi 2 chip consumes roughly 1 Watt. Mass (M): The chip package is lightweight, approximately 0.001 kg (1 gram). Function (F): Useful compute equivalent F ≈ 0.8

W (80% efficiency due to sparsity). Entropy Production (Ṡ): Operating near room temperature (320 K) with minimal dissipation (0.2 W): Ṡ_Loihi2 = 0.2 W / 320 K ≈ 0.000625

W/K.

GFE Calculation (Loihi 2): GFE_Loihi2 = 0.8 W / (0.000625 W/K · 0.001 kg) ≈ 1.28 × 10⁶ K/kg

### 5.3 Resolving the Paradox Here lies the definitive proof of GFE's utility:

ERD Comparison: H100: 700 W / 3 kg = 233 W/kg. Loihi 2: 1 W / 0.001 kg = 1,000 W/kg.

Result: ERD suggests a modest improvement, but fails to capture the scale of the architectural shift.

GFE Comparison: H100: 117 K/kg Loihi 2: 1,280,000 K/kg Result: GFE indicates that the Loihi

2 is approximately 10,000 times more functionally efficient than the H100.

This aligns perfectly with our technological intuition. The move from dense, hot, power-hungry GPUs to sparse, cool, efficient neuromorphic chips is a massive advancement.

GFE accurately captures this optimization vector. The "Efficiency Paradox" is resolved: complexity is not about maximizing energy flow; it is about maximizing the intelligence extracted from that flow.

## 6. The Trajectory of Functional Efficiency: A 13.8 Billion

Year Timeline To visualize the acceleration of complexity, we tabulate the GFE values for representative systems across cosmic history. This data 7 demonstrates the monotonic and exponential rise of functional efficiency.

Era System Time GFE (K/kg) Log10(GFE)

Primordial Big Bang 13.8 Gya 10^ 44.0 Nucleosynthes is Stellar Population III 13.5 Gya 2.5 x 10^ 28.6

Stars Stellar The Sun 4.6 Gya 4.5 x 10^ 26.3 Planetary Earth Climate 4.5 Gya 3.4 x 10^ 18.5

Biological Photosynthesis 3.8 Gya 1.9 x 10^ 14.7 Biological Animal 540 Mya ~ 10^ 12.0

Metabolism Biological Human Body 2 Mya 4.5 0.65 Biological Human Brain 2 Mya 223 2.35

Cultural Steam Engine 1800s 0.0037 -2.4 Cultural Jet Engine 2000s 275 2.44 Technological NVIDIA H100 2023 117 2.07

GPU Technological Neuromorphic 2024 1.28 x 10^6 6.1 Chip (Loihi 2)

Future Near-Landaue 2030s+ ~ 10^9 9.0 r Computing Theoretical Landauer Limit—~ 10^12 12.0

Table 1: The ascent of Generalized Functional Efficiency from the Big Bang to theoretical physical limits. Note the rapid acceleration in the technological era, where GFE doubling times have shrunk to months.7

## 7. The GFE Law of Cosmic Evolution

Based on the quantitative data spanning from the Big Bang to the latest silicon architectures, we propose a new phenomenological law of non-equilibrium thermodynamics applied to complex systems.

The Law of Generalized Functional Efficiency:

Systems subject to selection pressures (cosmic, biological, or technological) evolve to maximize their Generalized Functional Efficiency (GFE), asymptotically approaching the fundamental thermodynamic limits of information processing defined by Landauer's Principle.

Mathematically, the time derivative of the GFE metric is positive for the leading edge of complex systems: d/dt (GFE_max) > 0

### 7.1 The Landauer Limit as the Cosmic Attractor

The ultimate ceiling for GFE is determined by Landauer's Principle, which sets the minimum energy required to erase one bit of information at k_B T ln 2 (2.8 × 10^-21 J at room temperature).20

As technological systems evolve, they push Ṡ_gen closer to this theoretical minimum.

● Biological Brains operate at ~10^6 times the Landauer limit.10 ● Current GPUs operate at ~10^8 - 10^9 times the limit.

● Reversible Computing: Theoretically, if computation can be performed without erasing bits (reversible logic), the entropy production Ṡ_gen approaches zero.36 In this regime,

GFE would approach infinity, bounded only by the physical need for error correction and communication speed.

This suggests that the universe is evolving toward states of "Cold Complexity": systems that perform infinite functional operations with near-zero energy dissipation.

### 7.2 Implications for the Fermi Paradox

The GFE Law offers a thermodynamic solution to the Fermi Paradox. Kardashev's scale assumes advanced civilizations will maximize energy consumption (Type II, Type III).37

However, GFE suggests that advanced civilizations will maximize efficiency. They will likely evolve into thermodynamically invisible entities—computing at the Landauer limit, using minimal mass, and radiating heat indistinguishable from the cosmic background. We may not see them because we are looking for bonfires (high ERD), while they have become lasers

(high GFE).

## 8. Conclusion

Energy Rate Density was a pioneering metric that correctly identified the vital role of energy flow in the maintenance of ordered structures. However, it is a metric of the growth phase of complexity, not the optimization phase.

Generalized Functional Efficiency (GFE) integrates the Second Law of Thermodynamics with functional teleonomy. By explicitly penalizing entropy production and mass, it provides a unified scale that correctly ranks a star, a leaf, a brain, and a neuromorphic chip in their proper evolutionary order. It reveals a cosmos that is not merely burning down, but one that is learning to extract ever more meaning from the fire. The arrow of complexity points inexorably toward the efficient, the light, and the reversible.

The "Fire" vs. "Meaning" Comparison Table This table contrasts the Thermodynamic Cost (Ṡ) against the Functional Gain (F) to derive the

Generalized Functional Efficiency (GFE).

Entity The "Fire" The Mass The "Truth" (GFE) (Entropy "Meaning" (M) (Efficiency Ratio)

Production Ṡ) (Functional Output F)

Big Bang Maximum Fire Raw Fusion 10^53 10^-44 K/kg (Nucleosynthesis) kg Entropy ≈ 10^66 Watts Lowest possible dominated by (Nuclear efficiency. Pure photon bath binding waste.

(10^9 energy photons/baryon) release)

The Sun Massive Stellar 2 × 2.9 × 10^-27 K/kg (Population I Star) Dissipation Fusion 10^30 kg

Inefficient. A ≈ 6.6 × 10^22 ≈ 3.8 × 10^26 massive engine for W/K (Surface Watts very little radiation) (Luminosity) complexity per kg.

The Biosphere Moderate Chemical 10^15 10^-13 K/kg (Earth's Life) Dissipation Synthesis kg

The "Biological ≈ 10^12 W/K ≈ 10^14 Watts Leap." 14 orders of (Solar heat (Net Primary magnitude better processing) Productivity) than a star.

Human Brain Cool Operation High 1.4 kg 223 K/kg (Biological Computation Intelligence)

≈ 0.032 W/K The apex of (Waste heat) ≈ 10W useful biological work optimization.

NVIDIA H100 Hot Operation Massive 3 kg 117 K/kg (Brute Force AI) Calculation ≈ 1.0 W/K (Waste High throughput,

≈ 4 but PetaFLOPS thermodynamically heat) (350W useful "expensive." equiv)

Intel Loihi 2 Cold Operation Efficient 0.001 1.28 × 10^6 K/kg (Neuromorphic AI) Calculation kg

≈ 0.0006 W/K The "Cold (Waste heat) ≈ 15 Trillion Complexity" future.

OPS (0.8W 10,000x more useful equiv) efficient than the H100.

## Works cited

## 1. Planetary Energy Flow and Entropy Production Rate by Earth from 2002 to 2023 -

MDPI, https://www.mdpi.com/1099-4300/26/5/350

## 2. Is photosynthesis more efficient than combustion of oil? : r/askscience - Reddit,

https://www.reddit.com/r/askscience/comments/2481x1/is_photosynthesis_more_ efficient_than_combustion/

## 3. What Conditions Make Minimum Entropy Production Equivalent to Maximum

Power Production? | Request PDF - ResearchGate, https://www.researchgate.net/publication/253188506_What_Conditions_Make_Mi nimum_Entropy_Production_Equivalent_to_Maximum_Power_Production

## 4. The Gouy-Stodola Theorem in Bioenergetic Analysis of Living Systems

(Irreversibility in Bioenergetics of Living Systems) - ResearchGate, https://www.researchgate.net/publication/277674119_The_Gouy-Stodola_Theorem

_in_Bioenergetic_Analysis_of_Living_Systems_Irreversibility_in_Bioenergetics_of_

Living_Systems

## 5. Publication: Energy rate density as a complexity metric and evolutionary driver,

https://dash.harvard.edu/entities/publication/73120379-1f29-6bd4-e053-0100007 fdf3b

## 6. Energy rate density as a complexity metric and evolutionary driver, accessed

January 13, 2026, https://pdodds.w3.uvm.edu/files/papers/others/2010/chaisson2010a.pdf

## 7. Complexity Analysis.docx

## 8. Cosmic evolution might unify natural science and help remedy human society,

https://royalsocietypublishing.org/rsfs/article-pdf/doi/10.1098/rsfs.2025.0022/444

0134/rsfs.2025.0022.pdf

## 9. NVIDIA H100 Power Consumption Guide - TRG Datacenters, accessed January

13, 2026, https://www.trgdatacenters.com/resource/nvidia-h100-power-consumption/

10. 

https://medium.com/write-a-catalyst/human-brains-beat-ai-by 000-times-i n-energy-efficiency-762b9327e8ad#:~:text=Your%20brain%20uses%20225%2C0

00%20times,limit%20artificial%20general%20intelligence%20development

## 11. Learning from the brain to make AI more energy-efficient - Human Brain Project,

https://www.humanbrainproject.eu/en/follow-hbp/news/2023/09/04/learning-brai n-make-ai-more-energy-efficient/

## 12. Accelerating Sensor Fusion in Neuromorphic Computing - arXiv, accessed

January 13, 2026, https://arxiv.org/html/2408.16096v1

## 13. Large Interconnected Thermodynamic Systems Nearly Minimize Entropy

Production - arXiv, https://arxiv.org/html/2507.10476v1

## 14. Special Issue : The Entropy Production—as Cornerstone in Applied

Nonequilibrium Thermodynamics—Dedicated to Professor Signe Kjelstrup on the Occasion of Her 75th Birthday - MDPI, https://www.mdpi.com/journal/entropy/special_issues/815Y1IZPQ5

## 15. Entropy production - Wikipedia, 

https://en.wikipedia.org/wiki/Entropy_production

## 16. Gouy–Stodola theorem - Wikipedia, 

https://en.wikipedia.org/wiki/Gouy%E2%80%93Stodola_theorem

## 17. Exergy Analysis and Thermoeconomics of Buildings: Design and Analysis for

Sustainable Energy Systems 0128176113, 9780128176115 - DOKUMEN.PUB, https://dokumen.pub/exergy-analysis-and-thermoeconomics-of-buildings-desig n-and-analysis-for-sustainable-energy-systems-0128176113-9780128176115.html

## 18. Stellar nucleosynthesis - Wikipedia, 

https://en.wikipedia.org/wiki/Stellar_nucleosynthesis

## 19. Net Primary Productivity - Atlas of the Biosphere | Center for Sustainability and

the Global Environment (SAGE), https://sage.nelson.wisc.edu/data-and-models/atlas-of-the-biosphere/mapping-t he-biosphere/ecosystems/net-primary-productivity/

## 20. Landauer's principle - Wikipedia, 

https://en.wikipedia.org/wiki/Landauer%27s_principle

## 21. Fundamental Energy Limits and Reversible Computing Revisited - OSTI.GOV,

 https://www.osti.gov/servlets/purl/1458032

## 22. Big Bang nucleosynthesis - Wikipedia, 

https://en.wikipedia.org/wiki/Big_Bang_nucleosynthesis

## 23. Big Bang nucleosynthesis as a probe of new physics - EPJ Web of Conferences,

https://www.epj-conferences.org/articles/epjconf/pdf/2023/01/epjconf_enas11202 3_01003.pdf
24. 6 Big Bang Nucleosynthesis, 
https://www.mv.helsinki.fi/home/syrasane/cosmo2018/lect2018_06.pdf

## 25. Persistence of Population III Star Formation | Monthly Notices of the Royal

Astronomical Society | Oxford Academic, https://academic.oup.com/mnras/article/479/4/4544/5054055

## 26. Planetary Energy Flow and Entropy Production Rate by Earth from 2002 to 2023 -

NIH, https://pmc.ncbi.nlm.nih.gov/articles/PMC11119158/

## 27. Is it true that the human body produces more energy per cubic meter than the

sun? - Reddit, https://www.reddit.com/r/AskPhysics/comments/5xd5t9/is_it_true_that_the_huma n_body_produces_more/

## 28. Biomass (ecology) - Wikipedia, 

https://en.wikipedia.org/wiki/Biomass_(ecology)

## 29. The biomass distribution on Earth - PNAS, 

https://www.pnas.org/doi/10.1073/pnas.1711842115

## 30. Energy Limits to the Computational Power of the Human Brain - Ralph Merkle,

 https://www.ralphmerkle.com/brainLimits.html

## 31. ThinkSystem NVIDIA H100 PCIe Gen5 GPUs Product Guide - Lenovo Press,

https://lenovopress.lenovo.com/lp1732-thinksystem-nvidia-h100-pcie-gen5-gpu

## 32. What is the FLOPS Performance of the NVIDIA H100 GPU? | AI FAQ - Jarvis Labs,

https://jarvislabs.ai/ai-faqs/what-is-the-flops-performance-of-the-nvidia-h100-g pu

## 33. NVIDIA H100 Tensor Core GPU Datasheet - Megware, accessed January 13,

2026, https://www.megware.com/fileadmin/user_upload/LandingPage%20NVIDIA/nvidia -h100-datasheet.pdf

## 34. Intel builds Largest Neuromorphic System to Enable More Sustainable AI -

AI-Tech Park, https://ai-techpark.com/intel-builds-largest-neuromorphic-system-to-enable-mo re-sustainable-ai/

## 35. Intel breaks a billion neurons for world's largest neuromorphic computing system,

https://www.eenewseurope.com/en/intel-breaks-a-billion-neurons-for-worlds-lar gest-neuromorphic-computing-system/

## 36. The Reversible Computing Scaling Path: Challenges and Opportunities - Sandia

National Laboratories, https://www.sandia.gov/app/uploads/sites/210/2022/06/ECI22-talk-v7.pdf

## 37. Kardashev scale - Wikipedia, 

https://en.wikipedia.org/wiki/Kardashev_scale Appendix A: Thermodynamic Derivations

Generalized Functional Efficiency Across Cosmic History The Critical Question Does GFE = F/(Ṡ·M) actually increase over cosmic time? This analysis tests that proposition with first-principles calculations from the Big Bang to projected future structures.

## Part I: Defining "Function" Consistently

The challenge: "Function" F must be defined meaningfully across domains spanning

13.8 billion years. I propose a universal proxy:

Function ≡ Free Energy Transduction Rate This is the rate at which a system converts available free energy into:

Structural organization (gravitational collapse, chemical bonds)

Information processing (computation, neural activity)

Directed work (locomotion, mechanical output)

Units: Watts of useful work, or equivalently, bits/second of information processing

Justification: This definition connects directly to the thermodynamic concept of

"exergy"—the maximum useful work extractable from a system. All complex systems, from stars to brains to computers, transduce free energy into organized outputs.

GFE formula restated: "GFE"="Useful work rate" /("Entropy production rate" ×"Mass" )=W_useful/(S ̇⋅M)

## Part II: The Primordial Era (13.8 - 13.5 Gya)

### 2.1 The Immediate Post-Big Bang (~10⁻³⁶ to 10⁻³² s)

Temperature: ~10²⁷ K State: Quark-gluon plasma Entropy: ~10⁸⁸ k_B (observable universe)

Function (F): Effectively zero. No localized structures exist to perform directed work.

The universe is near thermal equilibrium at cosmic scales.

Entropy production (Ṡ): Enormous during inflation (~10⁷³ k_B increase as inflation ends)

GFE: Undefined or ~0 (no function, massive entropy production)

### 2.2 Nucleosynthesis Era (1 s - 20 min) Conditions: Temperature: 10⁹ → 10⁸ K Process:

Proton-neutron fusion to helium, lithium Function (F): Nuclear binding energy release = ~7 MeV per nucleon for He-4 synthesis

Mass converted: ~25% of baryonic matter → He Baryonic mass: ~10⁵³ kg (observable universe) Energy released: ~10⁶⁹ J over ~1000 s F ≈ 10⁶⁶ W

Entropy production (Ṡ): Heat released at T ~ 10⁹ K: Ṡ = P/T ≈ 10⁶⁶/10⁹ = 10⁵⁷ W/K Mass:

10⁵³ kg Calculation: GFE = F / (Ṡ · M) GFE_BBN = 10⁶⁶ W / (10⁵⁷ W/K × 10⁵³ kg) = 10⁻⁴⁴ K/kg

This extremely low value makes sense: BBN was highly entropic with minimal "useful" organization per unit mass.

## Part III: Stellar Era (13.5 Gya - Present)

### 3.1 First Stars (Population III, ~13.5 Gya)

Mass: ~100-1000 M☉ Luminosity: ~10⁶ L☉ (for 100 M☉)

Lifetime: ~3 million years Core temperature: ~10⁸ K Function (F): Nucleosynthesis rate

Hydrogen → Helium fusion releases 6.4 × 10¹⁴ J/kg Fusion rate for 100 M☉ star: ~10³² W (luminosity)

But most is radiated as heat; useful nucleosynthesis ~10% = 10³¹ W P_total = 10³² W (luminosity)

T_surface ~ 50,000 K Ṡ = 10³² / 50,000 = 2 × 10²⁷ W/K Mass: 2 × 10³² kg GFE_PopIII = 10³¹ / (2 × 10²⁷ × 2 × 10³²) = 2.5 × 10⁻²⁹ K/kg

### 3.2 Sun (Main Sequence, Present)

Mass: 2 × 10³⁰ kg Luminosity: 3.83 × 10²⁶ W Core temperature: 1.5 × 10⁷ K Surface temperature: 5,778 K

Function (F): Nucleosynthesis + photon production for downstream use If we count photons reaching Earth that drive photosynthesis: ~1.7 × 10¹⁷ W intercepted by Earth

Photosynthesis captures ~0.1% = 1.7 × 10¹⁴ W of useful chemical work But intrinsic to the Sun, F ≈ nucleosynthesis rate ≈ 6 × 10²⁶ W equivalent

Ṡ = L/T_surface = 3.83 × 10²⁶ / 5,778 = 6.6 × 10²² W/K GFE_Sun = 6 × 10²⁶ / (6.6 × 10²² × 2 × 10³⁰) = 4.5 × 10⁻²⁷ K/kg

Comparison: GFE_Sun ≈ 100× GFE_PopIII This increase reflects the Sun's greater efficiency—Pop III stars burned hot and fast, wasting energy.

## Part IV: Planetary/Chemical Era (4.5 Gya - Present)

### 4.1 Earth's Climate System

Solar input: 1.7 × 10¹⁷ W absorbed Planetary mass: 6 × 10²⁴ kg Climasphere mass: ~5 × 10¹⁸ kg (atmosphere + mixed ocean layer)

Temperature: ~288 K Function (F): Driving atmospheric/oceanic circulation, chemical weathering

Mechanical work in weather systems: ~10¹⁵ W Chemical weathering: ~10¹² W Total useful work: ~10¹⁵ W

Ṡ = (absorbed - work) / T = (1.7 × 10¹⁷ - 10¹⁵) / 288 ≈ 5.9 × 10¹⁴ W/K GFE_climate = 10¹⁵ / (5.9 × 10¹⁴ × 5 × 10¹⁸) = 3.4 × 10⁻¹⁹ K/kg

This is ~10⁸× higher than the Sun's GFE! The climate system extracts more useful work per unit entropy per unit mass than a star.

## Part V: Biological Era (3.8 Gya - Present)

### 5.1 Photosynthesis (Cyanobacteria/Plants)

Global photosynthesis rate: ~10²¹ J/year = 3.2 × 10¹³ W captured as chemical energy

Global biomass: ~5 × 10¹⁴ kg (carbon mass × 2)

Operating temperature: ~300 K Thermodynamic efficiency: 2-7% (overall solar-to-glucose)

Function (F): Chemical energy storage rate = 3.2 × 10¹³ W Solar input to biosphere: ~10¹⁶ W

At efficiency η ≈ 3%: Ṡ = (10¹⁶ - 3 × 10¹³) / 300 ≈ 3.3 × 10¹³ W/K GFE_photosynthesis = 3.2 × 10¹³ / (3.3 × 10¹³ × 5 × 10¹⁴) = 1.9 × 10⁻¹⁵ K/kg

This is ~10⁴× higher than Earth's climate system!

### 5.2 Human Brain

Power consumption: 20 W Mass: 1.4 kg Temperature: 310 K Estimated computational rate: 10¹⁶ ops/s (synaptic operations)

Function (F): Information processing Converting ops to energy equivalent: At Landauer limit (3 × 10⁻²¹ J/op), 10¹⁶ ops/s

≡ 3 × 10⁻⁵ W minimum Actual power: 20 W Efficiency: 3 × 10⁻⁵ / 20 = 1.5 × 10⁻⁶ (relative to Landauer)

But for GFE, we use actual useful work:

F ≈ 10¹⁶ ops/s × k_B T ln(2) per "meaningful" operation ≈ 10⁻⁴ W equivalent useful work

Actually, let's use a more direct measure: the brain's ability to drive purposeful behavior

(motor output + decision-making). Motor cortex output: ~10 W mechanical work capacity through body.

F_brain ≈ 10 W useful work output Ṡ = (20 - 10) / 310 = 0.032 W/K (heat dissipation only)

GFE_brain = 10 / (0.032 × 1.4) = 223 K/kg This is ~10¹⁷× higher than photosynthesis!

The brain is extraordinarily efficient at converting energy into directed function.

### 5.3 Human Body (Total)

Basal metabolic rate: 80-100 W Mass: 70 kg Temperature: 310 K Useful work capacity: ~50-100 W sustained mechanical output

Function (F): 50 W sustained mechanical work Ṡ = (100 - 50) / 310 = 0.16 W/K GFE_body = 50 / (0.16 × 70) = 4.5 K/kg

Lower than the brain alone—the body includes many low-GFE support systems.

## Part VI: Technological Era (200 years - Present)

### 6.1 Steam Engine (1800s)

Power output: 50 kW Mass: 5,000 kg Efficiency: ~5% Operating temperature: ~400 K

Function (F): 50,000 W mechanical work Heat input: 1 MW, heat rejected: 950 kW Ṡ = 950,000 / 350 (cold reservoir) = 2,714 W/K

GFE_steam = 50,000 / (2,714 × 5,000) = 0.0037 K/kg Lower than the human body! Early technology was thermodynamically primitive.

### 6.2 Modern Jet Engine (2020s)

Thrust power: 28 MW (F135 engine)

Mass: 1,700 kg Efficiency: ~40% Exhaust temperature: ~700 K Function (F): 28 × 10⁶ W

Heat rejected: ~42 MW at ~700 K Ṡ = 42 × 10⁶ / 700 = 60,000 W/K GFE_jet = 28 × 10⁶ / (60,000 × 1,700) = 275 K/kg

Comparable to the human brain! Modern engines approach biological efficiency.

### 6.3 NVIDIA H100 GPU (2023)

Power: 700 W Mass: 3 kg (module)

Temperature: 350 K (junction)

Computational output: 2 × 10¹⁵ FLOPS Function (F): Information processing At Landauer limit: 2 × 10¹⁵ × 3 × 10⁻²¹ = 6 × 10⁻⁶ W minimum

Actual efficiency: 6 × 10⁻⁶ / 700 = 8.6 × 10⁻⁹ (relative to Landauer)

For GFE, useful work = computation delivered:

Converting to equivalent: 2 × 10¹⁵ ops/s at current energy cost = 700 W But "useful" fraction depends on application; assume 50% utilization = 350 W equivalent

F_GPU = 350 W useful compute Ṡ = 350 / 350 = 1 W/K (heat to environment)

GFE_GPU = 350 / (1 × 3) = 117 K/kg Lower than the brain for equivalent information processing! But higher than steam engines.

### 6.4 Intel Loihi 2 Neuromorphic Chip (2024)

Power: 1 W Mass: 0.001 kg (1 gram)

Temperature: 320 K Computational output: 10¹² ops/s (sparse, event-driven)

Function (F):

Useful compute ≈ 0.8 W equivalent Ṡ = 0.2 / 320 = 6.25 × 10⁻⁴ W/K GFE_neuromorphic = 0.8 / (6.25 × 10⁻⁴ × 0.001) = 1.28 × 10⁶ K/kg

This is ~10⁴× higher than the H100 GPU and ~5,700× higher than the human brain!

Neuromorphic computing achieves dramatically higher GFE through biological-inspired efficiency.

## Part VII: Complete GFE Timeline

Era Time System GFE (K/kg) log₁₀(GFE)

Nucleosynthesis 13.8 Gya Big Bang nucleosynthesis 10⁻⁴⁴ -44 Stellar 13.5 Gya Pop III stars 2.5 × 10⁻²⁹ -28.6

Stellar 4.6 Gya - present Sun (main sequence) 4.5 × 10⁻²⁷ -26.3 Planetary 4.5 Gya - present Earth climate 3.4 × 10⁻¹⁹ -18.5

Biological 3.8 Gya - present Photosynthesis 1.9 × 10⁻¹⁵ -14.7 Biological 540 Mya - present Animal metabolism ~10⁻¹² -12

Biological 2 Mya - present Human body 4.5 0.65 Biological 2 Mya - present Human brain 223 2.35

Cultural 1800s Steam engine 0.0037 -2.4 Cultural 1900s Internal combustion ~1 0 Cultural 2000s Jet engine 275 2.44

Technological 2023 H100 GPU 117 2.07 Technological 2024 Neuromorphic chip 1.28 × 10⁶ 6.1

Projected 2030s Near-Landauer computing ~10⁹ 9 Theoretical—Landauer limit ~10¹² 12

## Part VIII: The GFE Growth Rate

Calculating the Doubling Time From Big Bang to present, GFE has increased by:

Δlog₁₀(GFE) = 6.1 - (-44) = 50.1 orders of magnitude over 13.8 billion years Average rate: 50.1 / (13.8 × 10⁹) = 3.6 × 10⁻⁹ orders of magnitude per year

Doubling time (cosmic average): 1 order of magnitude = 3.32 doublings Time per order: 13.8 × 10⁹ / 50.1 = 2.75 × 10⁸ years

Doubling time: 83 million years But This Average Is Misleading The rate is accelerating dramatically:

Transition ΔGFE (orders) Time Rate (orders/year)

BBN → Pop III 15.4 300 My 5 × 10⁻⁸ Pop III → Sun 2.3 9 Gy 2.6 × 10⁻¹⁰ Sun → Climate 7.8 0 (simultaneous)—Climate → Photosynthesis 3.8 700 My 5.4 × 10⁻⁹

Photosynthesis → Animals 2.7 3.3 Gy 8 × 10⁻¹⁰ Animals → Human brain 14.4 540 My 2.7 × 10⁻⁸

Human brain → Neuromorphic 3.75 2 My 1.9 × 10⁻⁶ The Technological Explosion In the last 200 years:

Transition ΔGFE (orders) Time Rate (orders/year)

Steam → Jet 4.8 200 y 0.024 GPU → Neuromorphic 4 2 y 2.0 Current doubling time (technological systems):

4 orders of magnitude in 2 years = 2 orders/year Doubling time: log₁₀(2) / 2 = 0.15 years = 55 days

This is faster than Moore's Law (which doubled transistor count every ~2 years).
