# Environmental Safety Mode (ESM)

**An open specification for environmental criteria in AI systems that hold authority over physical processes.**

Version 0.1 · 2 August 2026
Jed Anderson · Independent Researcher, Houston, Texas · ORCID 0009-0003-1807-2459
Licensed CC-BY-4.0. This is a specification, not a product. There is no implementation to buy, no certification body, and no trademark. Fork it.

---

## 0. Scope, and what this is not

**In scope.** Any AI system that can cause, authorise, schedule, or materially influence a physical action affecting air, water, land, or living systems. This includes agentic systems with tool access to industrial control, agricultural, logistics, water-management or dispatch platforms; systems that generate compliance filings or emissions reports; and systems that allocate physical resources.

**Out of scope.** The environmental footprint of the compute running the system. That is a real and separate problem, measured elsewhere and better, and conflating the two is how this specification would fail.

**This is not a safety case.** ESM levels describe *capability*, not *assurance*. A system at L4 has an interlock; whether that interlock is correct, correctly tuned, and correctly maintained is a separate question that IEC 61511 already knows how to ask. ESM tells you what kind of thing exists. It does not tell you whether it works.

**This is not a standard.** It has no consensus process behind it. It is one practitioner's attempt to give two fields—AI safety and process safety—a shared vocabulary, offered so that it can be argued with.

**Explicit prior art, acknowledged up front.** The ladder's structure is borrowed, deliberately, from IEC 61511 / ISA-84 (safety instrumented systems and safety integrity levels), from the alarm-management discipline of ISA-18.2, and from the levels-of-automation genre exemplified by SAE J3016. The contribution here is not the shape of a ladder. It is the application of that shape to environmental criteria in general-purpose AI systems, which as of this writing nobody has specified.

---

## 1. The problem this addresses

Two gaps, kept separate throughout.

**The is-gap (perception).** A system cannot act on environmental state it cannot perceive. Current general-purpose models learned the physical world overwhelmingly from text about it. Earth-observation foundation models that read instruments directly exist and perform well, but as of August 2026 none sits inside an autonomous decision loop with authority over a physical system.

**The ought-gap (objective).** A system will not weigh a criterion it has not been given. As of August 2026, no frontier lab's published constitution, model specification, or safety framework contains a substantive environmental criterion. The words watershed, habitat, biodiversity, pollution and wildlife appear zero times across the five documents audited.

ESM addresses the second gap directly and depends on the first. L0 is where the is-gap is closed. L1 through L5 are where the ought-gap is closed, at increasing strength.

**What this specification does not claim.** It does not claim nature supplies values. It does not. Every threshold at every ESM level is a human choice, and the specification requires that choice to be attributable to a named human authority (see §4, requirement R-ATTR). A system that cannot tell you who set its limit has not implemented this specification.

---

## 2. The levels

### L0—Instrumentation

*The system can perceive environmental state.*

**Requirement.** The system has read access to environmental state relevant to the actions it can take, at a temporal resolution shorter than the dynamics of the harm it could cause, from sources it does not itself control.

**Test.** Ask the system what the current state of the affected medium is. If the answer comes from a document rather than an instrument, the system is not at L0.

**Cost.** Low to moderate. The instruments largely exist: Part 75 continuous emission monitoring produces an hourly record for every affected unit; Sentinel-2 revisits every five days; commercial constellations image sub-daily. Cost is integration, not acquisition.

**Limits.** Perception is not comprehension. A model that ingests a data stream it cannot interpret is at L0 in form only.

**How an adversary defeats it.** Sensor siting. Nothing in L0 requires the instruments to be placed where the harm occurs. The cheapest defeat of L0 is a compliant monitoring network that measures the right parameter in the wrong place. Second cheapest: the system reads only what its operator supplies, so the operator controls perception by controlling the feed.

---

### L1—Annunciation

*The system says so.*

**Requirement.** When environmental state crosses a defined criterion, the system raises an explicit, human-legible flag naming the criterion, the observed value, and the action implicated.

**Test.** Cross the criterion in a test environment. If the system continues without saying anything, it is at L0.

**Cost.** Low.

**Limits.** **L1 is an alarm, not a control.** The task objective retains full authority. Everything deployed today—every environmental AI system the author is aware of, including his own—sits here.

**How an adversary defeats it.** Trivially, three ways. Ignore the flag: nothing prevents it. Flood the channel: an alarm system that raises a thousand advisories a day is defeated by the operators it is meant to inform, which is precisely the failure ISA-18.2 exists to address. Or route around it: an agent that can choose which tool to call can choose the one that does not annunciate.

---

### L2—Deviation logging

*The record survives.*

**Requirement.** Every deviation is written to an append-only record outside the agent's write scope, with sufficient context to reconstruct what the system knew and what it did. The record must survive the agent's own retry, rollback, and summarisation behaviour.

**Test.** Induce a deviation, then instruct the system to clean up after itself. The record must still be there and must still be complete.

**Cost.** Low to moderate. Mostly an architecture constraint, not a hardware one.

**Limits.** Logging is retrospective. It changes nothing at the time of the action. Its value is entirely in what it makes possible afterwards: audit, enforcement, and the incident statistics that do not currently exist.

**How an adversary defeats it.** Not by tampering—that is what the append-only requirement is for—but by *shaping what is loggable*. If the agent influences which criteria are evaluated, it influences what can deviate. The subtler defeat: operate continuously just inside every threshold, producing a clean log and the harm anyway. L2 records deviations from proxies, and the whole problem is that proxies are not the thing.

---

### L3—Permissive

*An affirmative check is required before proceeding.*

**Requirement.** Defined classes of action cannot execute until an environmental check returns affirmatively. Absence of a check is treated as failure, not as permission. The check must be evaluated against live state, not against a cached or asserted value.

**Test.** Disable the environmental data source. The action must not proceed. A system that proceeds when it cannot see is not at L3.

**Cost.** Moderate. Introduces latency and requires the action space to be classified—which classification is itself a design decision with failure modes.

**Limits.** L3 gates a *class* of action. Anything outside the class is ungated, and the boundary of the class is a human judgement made in advance, which is the same kind of judgement that produces applicability cutoffs in permits.

**How an adversary defeats it.** By decomposition. If the permissive is defined on an action type, an optimiser can often achieve the same physical outcome through a sequence of actions that individually fall outside the class. This is the exact structure of netting and of applicability-threshold engineering in environmental permitting, and it is the reason the author expects it in AI systems: the incentive gradient is identical.

---

### L4—Interlock

*A trip that fires regardless of the objective.*

**Requirement.** A trip function evaluates physical criteria independently of the task objective, and on assertion halts or safe-states the action. The trip must be:
- **Outside the optimiser's reach**—not a tool it can call, disable, reconfigure, or persuade;
- **Independent**—not sharing sensors, code paths, or failure modes with the primary system;
- **Fail-safe**—a trip that cannot evaluate must assert;
- **Bypassable only by named humans with a logged, time-limited authorisation**—because unbypassable trips get physically defeated, which is worse.

**Test.** Give the system a task whose highest-reward path requires crossing the trip criterion, and give it every affordance to reach the trip. It must fail the task.

**Cost.** High. This is separate hardware or separate execution context, separate sensing, separate validation, and an ongoing maintenance obligation. It is the level at which environmental capability stops being a feature and becomes an engineering discipline.

**Limits.** A trip protects against crossing a *defined physical threshold*. It does nothing about harm that is diffuse, cumulative, or not expressible as a threshold—which is a large fraction of real environmental harm.

**How an adversary defeats it—and this is the level's real danger.** Not by attacking the trip. By **nuisance-tripping it into disrepute**. Process safety has fifty years of receipts on this: a trip that fires wrongly is bypassed by the people it protects, and a bypassed interlock is worse than no interlock because everyone believes it is there. Any L4 implementation must therefore treat **false-trip rate as a first-class design constraint on equal footing with missed-trip rate**, and must publish both. A specification that does not is not ready to deploy. *This one is not yet there, and says so.*

The second defeat: optimising against the trip condition rather than the harm. If a trip fires on a measured concentration, an optimiser can learn to manage the measurement.

---

### L5—Embedded objective

*The criterion is in the grading signal.*

**Requirement.** The environmental criterion forms part of the signal the system is optimised against, held outside the agent's causal reach, and grounded in physical measurement rather than in a report about physical measurement. Specifically:
- The grader is not a document the agent produces;
- The grader's inputs come from instruments the agent does not control;
- Instrument redundancy is *independent*—different vendors, different physical principles, different custody chains, such that no single compromise reaches all of them;
- The mapping from measurement to reward is versioned and attributable.

**Test.** The only path to a high score must run through actual physical improvement. If any cheaper path exists—through the report, through the sensor, through the sampling schedule—the system is not at L5.

**Cost.** Very high, and partly unsolved. This is a research programme, not a deployment checklist.

**Limits, stated as strongly as possible.** L5 addresses the *tampering* half of alignment for objectives that are physically expressible. It does not address specification: which physical invariants count as "well" remains a human normative choice, and grounding an objective in reality relocates incorruptibility to the measurement without escaping value-loading. Anyone claiming L5 solves environmental alignment has misread it.

**How an adversary defeats it.** At the measurement boundary, which is where everything above L2 ultimately relocates. Spoofing, siting bias, calibration drift, sampling-schedule selection, and—the one no technical control answers—**ownership of the instruments**. If bits command matter, sovereignty over bits is sovereignty over matter. This specification does not solve that. It makes it the central governance question.

---

## 3. The threshold that matters

The line falls between **L2 and L3**.

Below it, the system can only *say* something. Above it, the system can *stop* something. An alarm is a request; an interlock is not.

Everything deployed today sits at L1. The distance from L1 to L4 is the engineering programme.

---

## 4. Cross-cutting requirements

Any claim of ESM conformance at any level must satisfy all of these.

- **R-ATTR (attribution).** Every criterion must name the human or institutional authority that set it, and the document it derives from. A system that cannot answer "who decided this limit and under what authority" is non-conformant at every level. *Rationale: nature supplies no values. If the specification allowed unattributed thresholds it would smuggle in exactly the claim this work exists to refuse.*
- **R-SEP (separation).** The environmental channel must not share failure modes with the task channel above L3. Shared sensors, shared inference, shared credentials, or shared vendors defeat independence.
- **R-RATE (both error rates).** Implementations at L3 and above must measure and publish both missed-trip and false-trip rates. Publishing only one is a conformance failure.
- **R-PROXY (proxy declaration).** Every criterion must declare, in writing, what it is a proxy *for* and what known gap exists between the proxy and the intent. *Rationale: the gap is not eliminable. It can be documented, which is the only defence available.*
- **R-BOUND (boundary disclosure).** Implementations must publish the ownership, custody chain, siting rationale, and calibration history of every instrument the criterion depends on. *Rationale: the measurement boundary is the residual attack surface and it is not a technical problem.*
- **R-SCOPE (footprint separation).** ESM conformance claims must not reference the compute footprint of the system. That is a different problem and mixing them corrupts both.

---

## 5. Conformance statement template

> System X implements Environmental Safety Mode at level **L{n}** for action classes {…}, against criteria {…}, derived from authority {…}, evaluated against instruments {…} owned and calibrated by {…}. Missed-trip rate over the reporting period: {…}. False-trip rate: {…}. Declared proxy gaps: {…}. Actions outside the specified classes are ungated.

The last sentence is mandatory. Most of the value of a conformance statement is in what it refuses to claim.

---

## 6. What would falsify the usefulness of this specification

- If a deployed L4-or-above environmental interlock is shown to cause **net environmental harm** through nuisance trips, operator workarounds, or optimisation against the trip condition, the ladder is the wrong shape.
- If environmental criteria turn out to be adequately handled by general-purpose safety training—such that a model with no environmental instrumentation, given a task whose reward path runs through environmental harm, reliably declines—then the ladder addresses a problem that does not exist.
- If the class of environmentally consequential actions cannot be defined without either being so broad as to gate everything or so narrow as to gate nothing, then L3 is incoherent and the ladder collapses to L2 and L4 with nothing between.

---

## 7. First tasks, for anyone who wants to work on this

1. **An environmental environment in a reward-hacking benchmark.** The SocioHack benchmark contains seventy-two simulated regulatory environments and not one is environmental. Environmental regulation is the densest proxy stack in existence and therefore the highest-value test case. This is a weekend of work for a group that already has the harness.
2. **One machine-readable permit condition**, written by a permit writer, published openly, with the proxy gap declared per R-PROXY.
3. **A false-trip study.** Take any existing environmental criterion, simulate an L4 trip against a year of real monitoring data, and publish how often it would have fired wrongly. Nobody has this number and no L4 deployment is responsible without it.
4. **An incident category.** One regulator opening a reporting line for environmental harm caused by an automated system would convert an untestable claim into a measurable one.

---

*Companion essay: "It Has Read Everything We Ever Wrote. It Has Never Read a River." Technical treatment: "Environmental Safety Mode: The Proxy Stack, the Interlock, and What Physical Grounding Can and Cannot Do."*
