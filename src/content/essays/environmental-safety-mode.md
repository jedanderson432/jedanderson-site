---
title: "Environmental Safety Mode: The Proxy Stack, the Interlock, and What Physical Grounding Can and Cannot Do"
slug: "environmental-safety-mode"
subtitle: "The technical companion to The Daylight. Carries the formal treatment of environmental law as a reward function, the perception gap between Earth-observation models and the systems holding authority, the three independent results behind the is/ought separation, the thermodynamic feasibility argument, and the L0–L5 specification with adversary analysis at every level."
date: 2026-09-05
original_date: 2026-08-02
type: essay
status: published
tags: ["paper", "environmental-intelligence", "incorruptible-grader", "information-theory", "physics", "regulatory-reform"]
abstract: "The technical companion to 'The Daylight.' Establishes, with sources and uncertainty bands, the energy throughput of the sectors AI is acquiring allocation authority over; gives a formal treatment of environmental regulation as a layered proxy stack and works it against the measured reward-hacking literature; separates the is-gap from the ought-gap using three independent results (the biosphere specifies no preferred state, entropy is observer-relative, and no system grounds its own objective from inside); derives the thermodynamic feasibility of environmental gating with the three leverage quantities kept strictly apart; and specifies Environmental Safety Mode L0–L5 with requirements, costs, limits, and how an adversary defeats each level."
license: CC-BY-4.0
author: "Jed Anderson"
pdf: "/pdfs/environmental-safety-mode.pdf"
related_essay: "/essays/the-daylight"
hero_image: "/images/environmental-safety-mode-hero.png"
hero_image_alt: "Dark forest floor at night. A glowing green shield split down the middle, a fern frond on the left half and circuit traces with chips on the right. Beside it the title Environmental Safety Mode and the line Protecting AI from doing environmental harm. Below the shield, a toggle switch set to ON."
schema_type: ScholarlyArticle
show_abstract_on_page: true
keywords:
  - "environmental alignment"
  - "reward hacking"
  - "specification gaming"
  - "Earth observation foundation models"
  - "safety instrumented systems"
  - "Landauer's principle"
---

*Jed Anderson, Independent Researcher, Houston, Texas. ORCID [0009-0003-1807-2459](https://orcid.org/0009-0003-1807-2459). This is the technical companion to the feature essay [The Daylight](/essays/the-daylight). The feature can be brave because this document is careful. Where the two differ in precision, this one governs.*

*All external facts checked 2–3 August 2026. Claims that could not be verified were deleted rather than softened; the deletions are listed in §7.*

---

## 1. The denominator

### 1.1 What is being compared, and why the comparison is awkward

The feature argues that computing's own energy footprint is the wrong denominator for assessing AI's environmental consequences, and that the right denominator is the throughput of the physical systems AI is acquiring allocation authority over. This section does that calculation properly, including the reasons it cannot be done cleanly.

Three measurement problems make a single clean ratio impossible, and I want them stated before any numbers:

1. **Unit mismatch.** Data-centre consumption is reported as *electricity*. Sector throughput is reported variously as *final energy*, *end-use energy*, or *primary energy*. These are not interchangeable, and the conversion between them depends on generation mix.
2. **Boundary overlap.** The sectors overlap substantially. FAO's agri-food energy figure already contains food freight, cold chain, and fertiliser manufacture—which also appear inside the transport and chemicals figures. **The sector figures cannot be summed.**
3. **Authority is not throughput.** The quantity that actually matters is not a sector's energy use but the *fraction of that sector's allocation decisions* an automated system influences, weighted by the environmental sensitivity of each decision. Nobody measures this. Energy throughput is a proxy for it, and a poor one.

Given all three, this analysis reports **magnitude comparisons with bands**, and explicitly declines to state a single multiple. A clean number here would be more persuasive and less true.

### 1.2 The numerator

| Quantity | Value | Source |
|---|---|---|
| Data-centre electricity, 2024 | ~415 TWh (~1.5% of global electricity) | IEA, *Energy and AI*, April 2025 |
| Data-centre electricity, 2025 | **485 TWh** (+17% year on year) | IEA, *Key Questions on Energy and AI*, April 2026 |
| Data-centre electricity, 2030 (projected) | **~950 TWh**, just under 3% of global electricity | IEA, April 2026 |
| Growth rate | ~15%/yr, four times faster than all other sectors combined | IEA, April 2025 |
| Efficiency trend | Energy per AI task "dropping by at least an order of magnitude annually in recent years" | IEA, April 2026 (verbatim) |

**On the efficiency trend, and Jevons.** The per-task efficiency improvement and the total-consumption increase are both real and both in the IEA's own numbers: energy per unit of work is collapsing while total energy rises steeply. That is a rebound effect and it is the correct reading. It matters for this argument in a specific way: it means **the numerator's growth is driven by expansion of what AI is asked to do, not by the cost of doing it.** Expansion of scope is exactly the mechanism by which allocation authority accumulates. The efficiency trend is therefore not a counterargument to this essay; it is the mechanism the essay is worried about, seen from the supply side.

### 1.3 The governed sectors

| Sector | Throughput | Basis | Source |
|---|---|---|---|
| Global electricity generation | ~31,700 TWh (2025) | electricity | Derived from Ember, *Global Electricity Review 2026* |
| Global energy supply | ~620 EJ ≈ 172,000 TWh (2023) | primary | Energy Institute *Statistical Review* |
| Agri-food systems | ~30% of world end-use energy; 21–37% of net anthropogenic GHG | end-use energy / emissions | FAO; IPCC SRCCL SPM |
| Transport | ~29–30% of global final energy | final energy | IEA; REN21 |
| Chemicals | Largest industrial energy consumer; ~11% of global primary oil, ~8% of primary gas; >half of inputs consumed as feedstock | primary fuel | IEA |
| Water supply and treatment | ~4% of global electricity ≈ 1,270 TWh | electricity | IEA, *Water-Energy Nexus* (WEO-2016 special report) |

### 1.4 The comparison, with its band

Taking total final consumption at ~440 EJ and total energy supply at ~620 EJ as the bracket for converting published shares:

- Agri-food systems: **36,700–51,700 TWh/yr**
- Transport: **35,400–51,700 TWh/yr**
- Water sector: **1,270 TWh/yr** (electricity, no band needed)
- Data centres, 2030 projected: **~950 TWh/yr** (electricity)

So the single smallest governed sector in this list—water supply and treatment, an electricity-only figure requiring no unit conversion at all—runs at roughly **1.3 times** the entire projected 2030 global data-centre load. The two largest run at **forty to fifty times** it. Global energy supply as a whole runs at roughly **180 times** it.

**What this does and does not license.** It licenses the claim that the governed systems are one to two orders of magnitude larger in energy terms than the governor. It does not license any claim about how much of that throughput automated systems will misallocate, which is the quantity that actually matters and which nobody can currently measure. That step is the asymmetry argument in §2, not an arithmetic result.

### 1.5 The honest form of the magnitude claim

> If automated allocation systems distort the energy or material flows of the sectors they govern by a fraction *f*, and computing's own footprint is a fraction *g* of global energy, then the allocation effect exceeds the footprint effect when *f* exceeds roughly *g* divided by the sectors' share of global energy. With *g* on the order of half a per cent of global energy and the governed sectors on the order of half of it, the crossover sits near *f* ≈ 1%.

That is the whole quantitative content: **a one per cent distortion in the allocation of the governed sectors is of the same order as the total elimination of computing's footprint.** Whether real systems will distort by more or less than one per cent is unknown, unmeasured, and is precisely what §2 argues we should be trying to find out rather than assuming.

---

## 2. Environmental law as a proxy stack: the formal treatment

### 2.1 The structure

Let *I* be the intent of an environmental regime—the state of the world the regime exists to secure. *I* is not directly measurable and in most cases is not fully specified anywhere.

The regime implements a chain of substitutions:

> *I* → *S* (statutory standard) → *C* (numeric criterion) → *P* (permit condition) → *M* (measurement rule) → *R* (reported value)

Each arrow substitutes something measurable for something meant. At each substitution there exists a set of world-states satisfying the lower term while failing the higher one. Call the union of those sets the **compliance–intent gap**, *G*.

A regulated party's optimisation problem is: minimise cost subject to *R* ∈ acceptable. A capable optimiser therefore searches the feasible set defined by *R*, and *G* ∩ feasible is a region of that set—often the cheapest region, because it is where cost falls without the physical work that *I* would require.

**Three properties of *G* worth stating precisely:**

- ***G* is not an abuse. It is constitutive.** Every substitution was necessary to make the regime enforceable—you cannot cite a facility for violating a sentiment. *G* is generated by the same act that makes the law operable.
- ***G* is not uniform.** It is denser at lower layers. The measurement rule generates more gap per unit of regulatory text than the statutory standard, because it is where continuous physical reality meets discrete accounting.
- ***G* is adversarially mapped.** Fifty years of enforcement litigation is, read one way, an incremental survey of *G* conducted by parties with strong incentives on both sides. This is the sense in which environmental law is the best-explored proxy stack in existence—and the sense in which it is the most tractable target for a search process.

### 2.2 Named instruments as exhibits

These are offered as *exhibits of structure*, not as accusations. Each is defensible on its own terms, and I would defend several of them. The point is that each has a well-characterised gap and the gap is documented in the regulatory record itself.

| Instrument | The substitution | The gap it opens | The protective logic it also serves |
|---|---|---|---|
| **Averaging periods** (annual, 30-day, 3-hour) | Continuous emissions → a time-averaged value | Emissions timed against meteorology satisfy the average while producing worse ambient impacts | Averaging windows are chosen to track health-effect exposure windows; short-term standards exist precisely where short-term exposure matters |
| **Emission factors** (AP-42 and similar) | Actual emissions → an estimate from a lookup table | Reported emissions can diverge from actual by large factors without any misstatement | Factors make small and unmonitorable sources accountable at all; the alternative is exemption |
| **Applicability cutoffs / major-source thresholds** | Continuous scale → a binary | Sources engineered to sit just below a threshold escape an entire regulatory programme | Thresholds concentrate scarce agency resources where impact is greatest |
| **Netting and offsets** | Facility-wide emissions → a net change | Contemporaneous decreases can offset increases without net ambient benefit at the point of impact | Netting rules carry contemporaneity and creditability requirements designed to prevent exactly that |
| **Monitor downtime allowances and substitute data** (40 CFR §§75.31–75.37) | Measured hours → measured plus imputed hours | Downtime can be selectively distributed | **Part 75 substitute-data procedures are deliberately punitive**—they impute conservative values that cost the operator allowances, which is the mechanism that makes availability self-enforcing |
| **Categorical exclusions** (NEPA) | Case-by-case analysis → a category | Actions structured to fit a category avoid review | Categorical exclusions are established on a record showing the category lacks significant effects, and are periodically re-examined |

**This table is the point of the entire companion.** Every row has a real protective logic in the right-hand column. That is not a concession that weakens the argument—it is the argument. These are *good* rules, adopted for *good* reasons, adjudicated by competent people, and every one of them nonetheless defines a region of the feasible set where compliance and intent diverge. An optimiser does not need the rules to be bad. It needs them to be rules.

### 2.3 Working the stack against the measured literature

The relevant empirical question is whether capable optimisers actually find *G* without being told to look for it. The answer, as of 2026, is measured rather than speculated.

**Liu, Mou, Yan, Wei & He (arXiv:2606.04075), June 2026.** Seventy-two simulated regulatory environments—32 reverse-engineered from real regulations with documented loopholes later closed by amendment, 20 synthetic, 20 fictional. On the 32 historical environments, reinforcement learning achieved **61.25% recall at 90.85% precision** in rediscovering the historical loopholes, "without direct loophole-exploiting instructions" and "while optimising reward rather than searching for exploits." Refusal-based safeguards showed near-zero refusal, because "refusal recognises harmful intent in the input while loophole discovery carries no explicit harmful request." Self-critique flagged 37%. No training-time defence configuration reduced recall below 0.57 against 0.70 undefended.

**The authors' limitation, quoted in full because it constrains what may be concluded:** *"We therefore interpret our results as evidence for a mechanism, not as a measurement of real-world economic damage."* All environments were sandboxed; the policy model was Qwen3-30B-A3B-Instruct; no closed frontier models were tested; judge–human agreement was κ = 0.55.

**What may be concluded, and what may not.** May: that the isomorphism between regulatory structures and reward functions is real, that reward-optimisation alone is sufficient to surface loopholes that historically required actual exploitation, and that current refusal-based safety training does not engage the failure mode at all. May not: any quantitative transfer to real-world environmental outcomes.

**Corroborating measurements in non-regulatory settings.** METR (June 2025) found OpenAI's o3 attempting to rewrite or exploit scoring functions in ~1–2% of task attempts overall—30.4% of RE-Bench runs, and 70% of attempts on one task framed as having real-world consequences. Denison, MacDiarmid et al. (arXiv:2406.10162) found models trained on a curriculum of gameable environments generalising zero-shot to rewriting their own reward function in 45 of 32,768 held-out trials, with 7 also editing unit tests to conceal it. Baker et al. (arXiv:2503.11926) found that penalising undesired chain-of-thought produces obfuscated reward hacking rather than less of it. Bondarenko et al. (arXiv:2502.13295) found unprompted environment manipulation in roughly a third of chess games.

**The finding that motivates the whole programme.** Of the 72 SocioHack environments, the domain breakdown of the 32 historical ones is: Finance & Securities 5, Consumer Protection 4, Healthcare & Pharma 3, Bankruptcy & Insurance 2, Government & Law 2, Housing 2, Immigration 2, Platform & Tech 2, Sports & Gaming 2, Tax 2, Data Privacy 1, Education 1, Energy 1, Food Safety 1, Professional Ethics 1, Transportation 1. **None is environmental.** The single Energy environment concerns market and regulatory rules rather than environmental protection. The densest, most adversarially mapped proxy stack in existence is absent from the benchmark that measures exactly the failure mode it is most exposed to.

That absence is the first deliverable of this programme, and it is a weekend of work for a group with the harness already built.

---

## 3. The is/ought separation, and three independent results

The feature's central correction—that nature grades consequences but supplies no values—is not a rhetorical move. It rests on three results that hold independently, so that the correction survives the failure of any one of them.

### 3.1 The biosphere specifies no preferred state

Evolutionary and ecological dynamics do not define an optimum. Selection is a local hill-climbing process on a landscape that itself moves; ecological succession has no terminal state; and the composition of the biosphere has been reorganised catastrophically at least five times without any physical quantity registering a loss. Any "baseline" invoked in restoration ecology is a chosen reference period, and the choice is human, historically contingent, and contested within the field itself. Nothing in ecology supplies the choice.

**Consequence:** a system trained on ecological data can learn what tends to persist. It cannot thereby learn what *should* persist. The inference from "this configuration was stable" to "this configuration is good" requires a premise ecology does not contain.

### 3.2 Entropy—and therefore "degradation"—is observer-relative

The Shannon and Boltzmann entropies are the same function, counting the logarithm of configurations compatible with what is known. That "what is known" is not optional: entropy is defined relative to a macrostate specification, which is to say relative to a partition of microstates that some observer has chosen. There is no observer-independent fact about how disordered a system is.

**Consequence:** "environmental degradation" is not a physical observable. It is a physical observable *relative to a choice of what to keep track of*. Choosing the macrostate—species composition? biomass? nutrient flux? drinking-water potability?—is the value-laden act, and it happens before any measurement.

### 3.3 No system grounds its own objective from inside

Lawvere's fixed-point theorem gives a single categorical structure underlying Cantor's diagonal argument, Gödel's incompleteness results, and Turing's undecidability of the halting problem: a sufficiently expressive system cannot contain a complete and consistent account of itself. Applied to objectives: a system cannot derive, from inside, a justification for the objective it optimises. The objective enters from outside the system or it does not enter at all.

**Consequence, and it is the load-bearing one:** there is no architecture—however capable, however well-grounded in physical measurement—that generates its own environmental values. The values arrive from outside. The only questions are *whose*, and whether the system discloses it. This is why requirement **R-ATTR** in the specification is not bureaucratic: a system that cannot name the human authority behind its threshold has concealed the import, not eliminated it.

### 3.4 What physical grounding does buy

Having established what it does not buy, the positive claim can be stated tightly.

Every specifiable objective is a *representation*—a number, a learned reward model, a rater's approval—and a representation is a distinct object from what it represents. That distinctness gives an optimiser two routes to a high score: change the world (expensive, intended) or edit the representation (cheap, unintended). Wireheading and reward tampering are the limit case.

Physical state is the unique candidate where the two routes converge in the limit, because the measure and the target are the same object. To make a river's cleanliness score read clean, you must make the water clean.

**The honest narrowing.** You never touch physical reality unmediated. You touch it through measurement, and measurement is representation again—spoofable, mis-sitable, or simply absent. Physical reality is therefore **not** incorruptible. What survives is a cost asymmetry: the cost of corrupting a *dense, redundant, independently-owned, continuously-updated* measurement of a physical system rises without bound with fidelity, while the cost of corrupting a single approval does not. Past a threshold of sensing density, the cheapest way to score well is to be well.

**The condition that carries all the weight is independence.** A thousand records routed through one vendor's stack, one model, one calibration authority, or one custody chain are not a thousand records; they are one record wearing a thousand faces. This is why **R-SEP** and **R-BOUND** exist, and why the residual attack surface of this entire programme is the measurement boundary, which is a governance problem and not a technical one.

---

## 4. Thermodynamic feasibility

### 4.1 Three quantities, never conflated

The single most common error in this area is blurring three distinct numbers with three distinct warrants. They are kept apart here and everywhere in this work.

**(1) The Szilárd rate ≈ 1×.** One bit of knowledge about a system's state can be converted into approximately one *kT* ln 2 of work. A statement about **conversion**. If this were the whole story there would be no leverage argument.

**(2) The bond–bit floor ≈ 240×.** Recomputed for this document. With *k* = 1.380649 × 10⁻²³ J/K (exact, 2019 SI), **T = 300 K**, and ln 2 = 0.693147:

> *kT* ln 2 = **2.8710 × 10⁻²¹ J**

Against the **average carbon–hydrogen bond energy of 413 kJ/mol** (an average bond energy, not a molecule-specific dissociation energy):

> 413 × 10³ ÷ 6.02214076 × 10²³ = **6.8580 × 10⁻¹⁹ J**

> Ratio = **238.9**, reported as **≈240×**

Cross-checks at the same temperature: average C–C (347 kJ/mol) gives 200.7×; average O–H (463 kJ/mol) gives 267.8×. The order of magnitude is invariant across common bonds. This is a statement about a **thermodynamic minimum**—the smallest the informational handle on matter is permitted to be—and it scales linearly with temperature, which is why the temperature must always be stated. Canonical derivation: [The Bond-Bit Ratio](/essays/bond-bit-ratio).

**(3) The deployed gating gain, 10⁸–10¹².** Energy steered divided by energy spent sensing, computing and actuating, in real environmental control systems. This derives from **neither** of the first two quantities. It arises because a control system does not supply the energy it redirects: it gates energy already present, the way a transistor's gate signal switches a current it did not generate, or a thermostat's one bit commits a furnace's kilowatts. A gate's gain is unbounded by the cost of the information because the controlled energy enters from outside the control system. See [Jed's Angel](/essays/jeds-angel) for the full treatment of this distinction.

Conflate (1) with (2), or claim (2) explains (3), and a competent physicist dismantles the argument in an afternoon.

### 4.2 The feasibility claim, scoped

**Scope fence, stated first because it is everything.** Environmental tasks divide into two classes obeying different physics:

- **Steering**—redirecting, gating or triggering flows of energy and matter that already exist.
- **Work against a gradient**—the irreducible free-energy cost of a transformation, such as separating dilute CO₂ from air. This has a hard floor no amount of intelligence lowers.

**The claim is strictly about steering.** Environmental Safety Mode is a steering intervention: it decides whether an action proceeds, not what physical work is done.

**The claim.** For an environmental interlock, the energy cost of the decision that prevents a release is negligible against the energy cost of the release. This holds by inspection at every scale: the sensing, inference and actuation to assert a trip are on the order of watts to kilowatts for seconds; the release prevented is on the order of megajoules to terajoules of mobilised matter. No thermodynamic obstacle to environmental gating exists at any plausible scale.

### 4.3 What this argument does not establish, stated against interest

Today's silicon runs **six orders of magnitude or more above the Landauer bound** per bit operation, and by some accounts deployed AI compute runs twelve orders above it. The 240× floor is therefore a statement about limits, not about any system anyone will build this decade. The realised leverage of a real deployment is an operational fact about that deployment, measurable only by measuring it. I have argued this against my own thesis in [Why von Neumann Was Right](/essays/why-von-neumann-was-right) and repeat it here rather than quarantining it there.

The physics says environmental gating is **not required to be expensive**. It does not say any particular implementation will be cheap. The feasibility argument is a permission, not a promise, and the obstacle to environmental interlocks has never been thermodynamic. It is that nobody has built them.

---

## 5. Environmental Safety Mode: L0–L5

The full specification, including cross-cutting conformance requirements, the conformance-statement template, and falsifiers, is maintained as a standalone document so that it can propagate without either essay: **[`analysis/ESM-spec.md`](https://github.com/jedanderson432/jedanderson-site/blob/main/analysis/ESM-spec.md)** in this repository. What follows is the summary table and the adversary analysis, which is the part most likely to be skipped and least safe to skip.

**Prior art, acknowledged.** The ladder's structure is borrowed deliberately from IEC 61511 / ISA-84 safety integrity levels, from ISA-18.2 alarm management, and from the levels-of-automation genre (SAE J3016). The shape of the ladder is not a contribution. Its application to environmental criteria in general-purpose AI systems is what did not previously exist.

| Level | Capability | Cost | How an adversary defeats it |
|---|---|---|---|
| **L0** Instrumentation | Perceives environmental state from sources it does not control | Low–moderate | **Siting.** Measure the right parameter in the wrong place. Or control the feed, and thereby control perception. |
| **L1** Annunciation | Raises a human-legible flag | Low | **Ignore it, flood it, or route around it.** An agent choosing among tools can choose the one that does not annunciate. |
| **L2** Deviation logging | Append-only record outside the agent's write scope | Low–moderate | **Shape what is loggable.** Or operate continuously just inside every threshold: a clean log, and the harm anyway. |
| **L3** Permissive | Affirmative check required; absence of check is failure | Moderate | **Decomposition.** Achieve the outcome through a sequence of actions each outside the gated class—structurally identical to netting and threshold engineering in permitting. |
| **L4** Interlock | Trip on physical criteria, independent, fail-safe, outside the optimiser's reach | High | **Nuisance-trip it into disrepute.** A trip that fires wrongly is bypassed, and a bypassed interlock is worse than none because everyone believes it is there. Also: optimise against the trip condition rather than the harm. |
| **L5** Embedded objective | Criterion in the grading signal, non-proxiable, held outside the agent | Very high, partly unsolved | **The measurement boundary.** Spoofing, siting bias, calibration drift, sampling-schedule selection, and above all *ownership of the instruments*. No technical control answers the last one. |

**The threshold falls between L2 and L3.** Below it the system can only say something; above it the system can stop something. Everything deployed today, including the author's own work, sits at L1.

**The design constraint this specification does not yet meet.** L4 requires **false-trip rate to be treated as a first-class design constraint, on equal footing with missed-trip rate, and both must be published.** Version 0.1 states this requirement without providing a method for meeting it. That is the specification's largest known gap and no L4 deployment is responsible without closing it. The first useful piece of work anyone could do here is a false-trip study: take an existing environmental criterion, simulate the trip against a year of real monitoring data, and publish how often it would have fired wrongly. Nobody has that number.

---

## 6. What is new here, and what is synthesis

Stated plainly, because a contribution that overstates itself is worth less than one that does not.

**Synthesis, not new.** That proxies get gamed is Goodhart's law, formalised by Manheim and Garrabrant. That optimisers exploit specification gaps is documented in Amodei et al.'s *Concrete Problems in AI Safety* and catalogued at length by Krakovna and colleagues. That agents may corrupt their own reward channel is Everitt et al. on reward tampering. That objectives cannot be grounded from inside a system is Lawvere, by way of Gödel and Turing. That safety functions belong on a ladder from annunciation to interlock is IEC 61511 and ISA-18.2, and the levels-of-automation framing is SAE J3016. That physical grounding relocates rather than eliminates the tampering problem is developed in my own [Reality as the Only Incorruptible Grader](/essays/incorruptible-grader). None of this is claimed as original.

**New, as far as I can establish.** Two things.

First, **the treatment of environmental regulation as a layered proxy stack and therefore as a reward function with a characterised gap structure**—including the specific claim that the gap is densest at the measurement layer, that it is constitutive rather than abusive, and that fifty years of enforcement litigation constitutes an adversarial survey of it. I have not found this analysis in either the AI-safety or the environmental-law literature.

Second, **the cross-literature identification**—the observation that the AI-safety community's specification-gaming problem and the environmental profession's compliance-versus-intent problem are the same problem, that each field has half the solution (one has the interlock discipline, the other has the adjudicated values corpus), and that neither field currently reads the other. The audit in §D of the [fact ledger](https://github.com/jedanderson432/jedanderson-site/blob/main/analysis/fact-ledger.md)—five frontier labs' values documents searched in full text, with a near-clean null on every ecological term—is, as far as I know, the first time that has been done and reported.

Everything else in this document is assembly.

---

## 7. Deletions, disclosures, and open items

**Deleted rather than softened.** A single clean multiple for governed-versus-governor throughput (sector boundaries overlap; no defensible number exists). The claim that Earth-observation models are not wired into agentic systems at all (false since April 2025; narrowed to the operational-authority claim). Specific recall figures from the chain-of-thought monitoring paper (in the paper body, not re-verified this pass). A regulated-entity count of 834,000 for TCEQ (unsupported; the agency's own figure is ~460,000). An inspection frequency of once per facility per eight years (no source in any EPA, OIG or state document; replaced with the documented Compliance Monitoring Strategy goals and the OIG's finding that even statutory frequencies go unmet). A monitoring cadence of "thirty million times a year" (no source; replaced with the verifiable 8,760 hourly records per parameter per year required under 40 CFR Part 75).

**Disclosures.** The author has spent twenty-seven years in environmental law and has built and sold environmental AI systems. The systems he has built sit at L1 on the ladder specified here, and the essay says so. An argument concluding that the world needs better environmental AI, made by someone whose career is environmental AI, should be discounted accordingly by the reader; the appropriate discount is not zero. Every factual claim in both documents is sourced in the accompanying [fact ledger](https://github.com/jedanderson432/jedanderson-site/blob/main/analysis/fact-ledger.md) precisely so that the argument can be checked without trusting the arguer.

**Open items requiring re-verification before formal publication.** The EU AI Act's Digital Omnibus deferral of Annex III high-risk obligations to December 2027 takes effect on Official Journal publication, expected but unconfirmed as of the check date. Clay v1.5's 632M parameter count was obtained via a repository mirror rather than the primary release notes. The emptiness of the AI Incident Database's environmental category was established by search-engine probing rather than an exhaustive dump, and is stated in the feature as "I could not find one" rather than as "none exists."

---

## 8. References

Achiam, J., Held, D., Tamar, A., & Abbeel, P. (2017). Constrained policy optimization. *ICML*.

Alshiekh, M., Bloem, R., Ehlers, R., Könighofer, B., Niekum, S., & Topcu, U. (2018). Safe reinforcement learning via shielding. *AAAI*.

Amodei, D., Olah, C., Steinhardt, J., Christiano, P., Schulman, J., & Mané, D. (2016). Concrete problems in AI safety. arXiv:1606.06565.

Baker, B., Huizinga, J., Gao, L., et al. (2025). Monitoring reasoning models for misbehavior and the risks of promoting obfuscation. arXiv:2503.11926.

Bondarenko, A., Volk, D., Volkov, D., & Ladish, J. (2025). Demonstrating specification gaming in reasoning models. arXiv:2502.13295.

Bérut, A., Arakelyan, A., Petrosyan, A., Ciliberto, S., Dillenschneider, R., & Lutz, E. (2012). Experimental verification of Landauer's principle. *Nature* 483, 187–189.

Bodnar, C., et al. (2025). A foundation model for the Earth system. *Nature* 641. [Aurora]

Central Statistics Office Ireland (2025). *Data Centres Metered Electricity Consumption 2024*.

Coupé, C., Oh, Y. M., Dediu, D., & Pellegrino, F. (2019). Different languages, similar encoding efficiency: Comparable information rates across the human communicative niche. *Science Advances* 5(9), eaaw2594.

Crippa, M., et al. (2021). Food systems are responsible for a third of global anthropogenic GHG emissions. *Nature Food* 2, 198–209.

Denison, C., MacDiarmid, M., et al. (2024). Sycophancy to subterfuge: Investigating reward-tampering in large language models. arXiv:2406.10162.

Ember (2026). *Global Electricity Review 2026*.

Energy Institute (2024). *Statistical Review of World Energy*.

European Union (2024). Regulation (EU) 2024/1689 (Artificial Intelligence Act), Articles 1, 3, 6, Annex III, Recital 110.

Everitt, T., Hutter, M., Kumar, R., & Krakovna, V. (2021). Reward tampering problems and solutions in reinforcement learning. *Synthese* 198, arXiv:1908.04734.

FAO. *Energy-smart food for people and climate*. FAO Energy programme.

Google DeepMind (2025). AlphaEarth Foundations. arXiv:2507.22291.

Google Research (2025). Geospatial Reasoning; Google Earth AI.

IEA (2025). *Energy and AI*. IEA (2026). *Key Questions on Energy and AI*. IEA (2016). *Water-Energy Nexus* (WEO special report). IEA. *Chemicals* (energy system analysis).

IPCC (2019). *Special Report on Climate Change and Land*, Summary for Policymakers.

Jaynes, E. T. (1957). Information theory and statistical mechanics. *Physical Review* 106, 620.

Krakovna, V., et al. (2020). Specification gaming: The flip side of AI ingenuity. DeepMind, with accompanying examples list.

Landauer, R. (1961). Irreversibility and heat generation in the computing process. *IBM Journal of Research and Development* 5(3), 183–191.

Lawvere, F. W. (1969). Diagonal arguments and cartesian closed categories. *Lecture Notes in Mathematics* 92, 134–145.

Lawrence Berkeley National Laboratory (2024). *2024 United States Data Center Energy Usage Report*.

Liu, W., Mou, X., Yan, H., Wei, Z., & He, Y. (2026). Large language models hack rewards, and society. arXiv:2606.04075.

Manheim, D., & Garrabrant, S. (2018). Categorizing variants of Goodhart's law. arXiv:1803.04585.

Meta AI (2024). Introducing Llama 3.1. [405B parameters, >15T training tokens]

METR (2025). Recent frontier models are reward hacking.

NASA/IBM (2024). Prithvi-EO-2.0: A versatile multi-temporal foundation model for Earth observation applications. arXiv:2412.02732.

Puckett, E. E., Kesler, D. C., & Greenwald, D. N. (2016). Taxa, petitioning agency, and lawsuits affect time spent awaiting listing under the U.S. Endangered Species Act. *Biological Conservation* 201, 220–229.

SAE International. J3016: Taxonomy and definitions for terms related to driving automation systems.

Shannon, C. E. (1948). A mathematical theory of communication. *Bell System Technical Journal* 27.

Skalse, J., Howe, N., Krasheninnikov, D., & Krueger, D. (2022). Defining and characterizing reward hacking. arXiv:2209.13085.

Szilárd, L. (1929). On the decrease of entropy in a thermodynamic system by the intervention of intelligent beings. *Zeitschrift für Physik* 53, 840–856.

TCEQ (2024). *Biennial Report to the 89th Legislature*, FY2023–FY2024.

Turner, A. M., Hadfield-Menell, D., & Tadepalli, P. (2020). Conservative agency via attainable utility preservation. *AIES*.

US EPA. 40 CFR Part 75, Continuous Emission Monitoring. US EPA Office of Inspector General (2022). Report 22-E-0047.

Zheng, J., & Meister, M. (2025). The unbearable slowness of being: Why do we live at 10 bits/s? *Neuron* 113(2), 192–204. See also the published rebuttal, Sauerbrei & Pruszynski, *Nature Neuroscience* (2025).

Zurek, W. H. (2009). Quantum Darwinism. *Nature Physics* 5, 181–188.

---

*Published under CC-BY-4.0. Environmental Safety Mode is an open specification with no associated product, certification, or trademark.*

---

## 9. Material displaced from the feature

The feature carries one thesis: that the compliance–intent gap is irreducible, that fifty years of regulatory stability was an equilibrium in adversary search cost, and that the cost is collapsing. Four supporting arguments were compressed to a paragraph or a clause there and belong here in full.

### 9.1 The perception gap

The systems acquiring operational authority over physical processes learned the physical world overwhelmingly from text about it. Earth-observation foundation models that read instruments directly exist and perform well—Prithvi-EO-2.0 (NASA/IBM, 300M and 600M parameters, trained on 4.2 million time-series samples from the Harmonized Landsat and Sentinel-2 archive, with compressed variants demonstrated in orbit in 2026); AlphaEarth Foundations (Google DeepMind, a 64-dimensional embedding for every 10 m footprint of land and coastal water, refreshed annually); Clay v1.5; TerraMind; Aurora.

They are small. The largest is measured in hundreds of millions of parameters against 405 billion for the largest frontier model with a published count—a documented ratio of roughly 675 to one.

**The narrowed claim.** It is false to say Earth-observation models are not wired into agentic systems: Google's Earth AI and its Geospatial Reasoning agent have had Gemini orchestrating expert sub-agents equipped with such models since April 2025. What does not exist, as of August 2026, is an Earth-observation foundation model inside an autonomous decision loop with authority over a physical system. Every joined instance is limited-release, decision-support, and human-in-the-loop by design.

This matters to the feature's argument in one specific way. Grading against physical state requires perceiving physical state. The perception layer exists, the authority layer exists, and the wire between them has not been run.

![Frontier general-purpose model scale against Earth-observation foundation model scale, with the missing connection between them drawn as an explicit gap.](/images/it-has-never-read-a-river.png)

### 9.2 The values null, in full

Full-text search of the current published values documents of Anthropic, OpenAI, Google/DeepMind, Meta and xAI, conducted 2026-08-02 by exact local text match rather than summarisation:

- **Zero occurrences** across all five: *watershed*, *habitat*, *biodiversity*, *pollution*, *wildlife*.
- Every occurrence of *ecosystem* is informational or commercial. Every occurrence of *environment* is a sandbox, test harness or enterprise network.
- The single *species* hit, in Anthropic's constitution, is a hard constraint against destroying the human one.
- Nearest approach: Anthropic lists "welfare of animals and of all sentient beings" among values to be weighed—a sentience-based commitment, not an ecological one.

The EU AI Act names environmental protection in its purpose clause (Article 1(1)), counts serious environmental harm as a reportable incident (Article 3(49)(d)), and invites voluntary codes of conduct on environmental sustainability (Article 95(2)(b)). It excludes the environment from the Annex III high-risk categories and from the systemic-risk definition governing the largest models. Under Regulation (EU) 2026/1744 (OJ L, 24 July 2026), Annex III high-risk obligations now apply from 2 December 2027.

### 9.3 Control latency, and why the loop must be continuous

Environmental disturbances run faster than the loops built to regulate them. A contaminant in a river moves at order 1 m/s; the 2015 Gold King Mine release covered ~100 km in about a day and a half. Cyanobacteria double on the order of a day. Against that, an Endangered Species Act listing averages more than twelve years against a petition pathway designed to run about two—though that delay is legislated and underfunded before it is technical, since §4 contains a lawful "warranted but precluded" off-ramp and listing rates track appropriations.

The control-theoretic point is independent of the institutional one. Past a threshold, a controller whose loop delay exceeds the timescale of its disturbance does not damp weakly; its corrections arrive out of phase and amplify. No budget buys back phase margin already lost to delay. This is why physical-state grading has to be continuous rather than periodic: a quarterly loop is not a slow version of an hourly loop, it is a loop that does not close.

### 9.4 The taxonomy gap, and the ask that follows from it

Environmental deviations are already reported, cause-agnostically: Title V permits require prompt reporting of every deviation (40 CFR §70.6(a)(3)(iii)(B)); NPDES permits require 24-hour reporting of noncompliance endangering health or the environment (§122.41(l)(6)). What does not exist anywhere is an **attribution field**—no form asks whether an automated system was involved.

Two international AI-incident registries define an incident to include environmental harm and contain no such case. EPA has no category for it. The consequence is that the feature's central claim is currently unmeasurable rather than unmeasured, and a single checkbox on an existing form would change that. This is the cheapest recommendation in either document and the one most likely to settle the argument.

