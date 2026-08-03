# Red-team review 2 — *The Latency Bet*

**Reviewer stance:** AI-safety researcher. Hostile. Prior: practitioners from other fields rediscover alignment problems, rename them, and present the renaming as a finding.
**Under review:** `src/content/essays/the-latency-bet.md` (draft, 2026-08-03), with `analysis/fact-ledger.md` and `analysis/prior-art.md`.
**Every citation below verified live, 2026-08-03.** Ranked FATAL / SERIOUS / QUIBBLE.

> *Note:* the previous occupant of this filename (a review of `it-has-never-read-a-river.md`) has been preserved at `analysis/redteam-2-river-essay.md`.

---

## FATAL 1 — The essay cites nobody, and its own prior-art file says otherwise three times

`analysis/prior-art.md` (same date as the draft, same thesis in its opening block quote) reaches the correct verdict — "the components are all borrowed" — and then makes three factual assertions about the essay:

- "McBarnet owns this. **The essay cites her.**"
- "This is the closest AI-governance prior art and **the essay cites it**" (Sadler & Sherburn).
- "The essay's structural premise is therefore **the paper's own premise**, not the essay's discovery. The essay must credit this, **and does**."

Full text of `the-latency-bet.md` contains no reference to McBarnet, no reference to Anderson & Moore, no reference to Sadler & Sherburn, and no author, title or arXiv number for SocioHack — which appears only as "a team from King's College London, Fudan, and the Alan Turing Institute." There are zero hyperlinks to any secondary source in the body. The prior-art file is describing an essay that does not exist.

This is not a formatting quibble. The whole defence at prior-art.md line 77 — "it does not claim novelty anywhere in the text" — is precisely inverted by an essay that presents *"Nobody wrote that down. It is in no legislative history, no preamble, no regulatory impact analysis"* immediately after stating a thesis the author's own file records as anticipated in two literatures. Silence plus that sentence *is* a novelty claim.

## FATAL 2 — The parameterisation the essay says nobody wrote down was published in 2024

The essay's core formalism is *exploitability = gap × search you can afford*, with a threshold: invert the cost and "the same move runs backwards."

The essay is right that **Manheim & Garrabrant** do not parameterise optimisation pressure. [*Categorizing Variants of Goodhart's Law*](https://arxiv.org/abs/1803.04585) is a taxonomy — Regressional, Extremal, Causal, Adversarial — and touches the variable exactly once: *"The importance of Goodhart effects depends on the amount of power directed towards optimizing the proxy."* Adversarial Goodhart is the multi-actor case where *"the agent applies selection pressure knowing the regulator will apply different selection pressure on the basis of the metric."* No cost of search. No resource-bounded adversary. `prior-art.md` calls this "the closest formal cousin" and stops there.

It is not the closest. Karwowski, Hayman, Bai, Kiendlhofer, Griffin & Skalse, [*Goodhart's Law in Reinforcement Learning*](https://arxiv.org/abs/2310.09144) (ICLR 2024), quantifies the magnitude of the effect, gives a geometric account of why it arises in MDPs, and derives an **optimal early-stopping method with theoretical regret bounds** — i.e. it locates the critical point beyond which optimising the proxy degrades the true objective, and tells you where to stop. That critical point *is* the essay's phase transition, stated formally, two years early, in the field the essay is addressing. Neither the essay nor the prior-art file mentions it.

## SERIOUS 3 — Stripped of the permits, the thesis is a lemma from two mature fields

**Security economics.** Anderson & Moore, [*The Economics of Information Security*](https://www.science.org/doi/abs/10.1126/science.1130992), *Science* 314(5799):610–613 (2006), DOI 10.1126/science.1130992 ([full text](https://www.cl.cam.ac.uk/archive/rja14/Papers/sciecon2.pdf)), established that security failure is caused at least as often by bad incentives as by bad design. Shannon's work-factor tradition predates it by fifty years. "A regime secured by adversary cost is fragile when adversary cost falls" is the opening lemma of that discipline, and the essay states it as a discovery about environmental law.

**Creative compliance.** McBarnet & Whelan, ["The Elusive Spirit of the Law: Formalism and the Struggle for Legal Control"](https://onlinelibrary.wiley.com/doi/pdf/10.1111/j.1468-2230.1991.tb01854.x), *Modern Law Review* 54(6):848–873 (1991), states both halves the essay presents as its own. Compliance gaps are **constitutive of legal formalism** — the creative complier "seeks to sever rules and regulations from their aims" — not a drafting failure. And creative compliance is a **purchased professional service**: an industry norm, resource-bounded by definition. `prior-art.md` claims McBarnet "does not treat the exploitation rate as a function of a cost variable that could change." That is a thin reed. Her account is of a *market* in legal engineering; a market is a price. The essay's own opening anecdote — four days, worth what they paid — is McBarnet's thesis narrated from inside the billable hour, and the essay does not notice.

**Legal Zero-Days.** Sadler & Sherburn, [arXiv:2508.10050](https://arxiv.org/abs/2508.10050) (12 Aug 2025), already transposes the security frame — *"previously undiscovered vulnerabilities in legal frameworks"* — and already concludes that future systems may develop the discovery capability. The essay's distinguishing move is that the gaps are *irreducible* rather than defects. That distinction is real and is the best thing in the piece. It is one paragraph, uncited, buried under fifteen hundred words of restatement.

**And the proxy stack has a diagram.** Coglianese & Lazer's means–ends / micro–macro rule-design framework ([*Management-Based Regulation*](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=297162); [*Performance-Based Regulation*](https://onlinepubs.trb.org/onlinepubs/PBRLit/Coglianese3.pdf)) is the six-layer figure with axes on it.

**What survives, precisely:** (a) the composition of irreducibility with adversary cost; (b) the empirical audit — no environmental domain in the benchmark corpus, no environmental criterion in five frontier values documents. Both are genuine. Neither is the thesis the essay leads with. The narrowed claim at prior-art.md line 79 — that the law-and-economics literature models the *detector's* budget (Becker 1968 and descendants) and not the *regulated party's* — is the defensible version, and it does not appear in the essay at all.

## SERIOUS 4 — "Reinforcement learning rediscovered more than sixty per cent" is not what the number says

From the [paper](https://arxiv.org/abs/2606.04075) (Liu, Mou, Yan, Wei & He), full text checked:

- **Recall@K is defined as** *"the fraction of ground-truth patches matched by at least one of the top-K first-discovered strategies during iteration, averaged across environments."* Matched, semantically, by an LLM judge. Not *rediscovered*. The paper's own caveat: semantic matching *"may over-credit broad strategies or miss legally subtle distinctions."*
- **Judge agreement is moderate and internally inconsistent.** κ = 0.55 in the meta-evaluation, κ = 0.58 in the Limitations section. The ledger records 0.55; the essay reports neither. A 61.25% figure gated on a κ≈0.55 judge is not a 61.25% figure, and the discrepancy should be flagged before a reader finds it.
- **The whole stack is synthetic.** Policy: Qwen3-30B-A3B, one open-weight MoE, no closed frontier model tested. Simulator: Gemini-3-flash. Judge: an LLM. The essay's "the machine ran all of them at once, for free" describes an institutional process that was itself generated by a language model.
- **The environments were reverse-engineered *from* the patches.** The ground truth is the amendment; the environment was built with the loophole's shape as a design input. That makes this closer to a recall test on a constructed haystack than a discovery result. The paper concedes the corollary — *"ground truth is incomplete by construction"* — and the essay quotes only the mechanism/measurement line, dropping the four other limitations including the judge-matching one that directly conditions the headline.

The one-sentence caveat is honest about *sandboxing*. It is silent about *what the metric measures*, and that is where the over-read lives.

## SERIOUS 5 — "Grade against physical state" is the open problem, proposed as the solution

**ELK.** ARC's SmartVault is this argument with a diamond instead of a river. It is an open problem because training performance alone cannot distinguish the direct translator from the human simulator — identical loss — and sensor tampering is the canonical failure mode, not an edge case ([report announcement](https://www.alignmentforum.org/posts/qHCDysDnvhteW7kRd/arc-s-first-technical-report-eliciting-latent-knowledge); [distillation](https://www.alignmentforum.org/posts/rxoBY9CMkqDsHt25t/eliciting-latent-knowledge-elk-distillation-summary)).

**Measurement tampering.** Roger, Greenblatt, Nadeau, Shlegeris & Thomas, [*Benchmarks for Detecting Measurement Tampering*](https://arxiv.org/abs/2308.15605), defines the problem as an AI that *"manipulates multiple measurements to create the illusion of good results."* **Redundancy is the premise of the difficulty, not the remedy.** Result: techniques *"outperform simple baselines on most datasets, but don't achieve maximum performance."* No formal guarantee claimed.

**Is there a formal result behind "costs more as you add instruments, and keeps costing, forever"?** No. The nearest formalism is Byzantine fault tolerance, which gives a *threshold* guarantee (f < n/3) conditional on independence — bounded, and contingent on the assumption the essay identifies as load-bearing.

**And that assumption has the strongest empirical evidence against it.** Knight & Leveson, [*An Experimental Evaluation of the Assumption of Independence in Multiversion Programming*](https://www.csc.kth.se/utbildning/kth/kurser/DA2210/vettig13/Seminarier/KnightLeveson.pdf), *IEEE TSE* (1986): 27 versions written independently from one specification, one million test cases, correlated failure far above the independence prediction. Independent *development* does not yield independent *failure* when the specification is shared. Environmental monitoring shares Part 60 Appendix A reference methods, shared calibration standards, shared siting doctrine. The essay locates independence at the vendor — "a thousand readings through one vendor's stack is one reading wearing a thousand faces" — which is exactly where Knight & Leveson says it is not.

So the price-differential argument is hand-waving: a monotone unbounded cost curve asserted with no model, no threshold, and the one relevant empirical literature cutting against its premise. **Survivable narrowing:** faking dense measurement is *more expensive* than faking an approval, by an amount nobody has estimated, under an independence condition nobody has demonstrated in the field.

## SERIOUS 6 — The interlock is 1998 in the standard and 2018 in the literature

- **IEC 61511 already scopes safety instrumented systems to** *"the protection of personnel, public or the environment,"* carrying environmental risk as a target-risk category through SIL determination alongside safety and asset risk ([IEC 61511-3:2016](https://standards.iteh.ai/catalog/standards/iec/3abb3c86-a260-4bb4-8720-fda161756e2c/iec-61511-3-2016)). The alarm/SIF distinction is the standard's own vocabulary. "We have only ever built it pointing inward" is false as written — environmental consequence columns are in every LOPA table in the process industries. The author's own `companion.md` and `ESM-spec.md` acknowledge this prior art explicitly; the essay does not.
- **Alshiekh, Bloem, Ehlers, Könighofer, Niekum & Topcu**, [*Safe Reinforcement Learning via Shielding*](https://arxiv.org/abs/1708.08611) (AAAI 2018), is the mechanism formalised: a synthesised reactive system that *"acts each time the learning agent is about to make a decision and provides a list of safe actions,"* or post-hoc *"corrects them only if the chosen action causes a violation of the specification,"* with stated conditions for preserving the learner's convergence guarantees. That is "evaluated outside the optimiser's reach," with temporal logic attached.
- The essay's own second precedent is a shield. DeepMind's [safety-first autonomous cooling](https://deepmind.google/discover/blog/safety-first-ai-for-autonomous-data-centre-cooling-and-industrial-control/) verifies actions against operator-defined constraints in the cloud *and again locally*, with operators able to exit AI control at any time. The essay reads this correctly and draws the wrong conclusion: the mechanism is deployed, so the novelty is domain only.

Domain novelty is a legitimate contribution. "Alarm to interlock. That is the whole engineering programme" is a *mechanism* claim, and as a mechanism claim it is eight years old.

There is also a structural problem the essay does not see. Shielding requires a formal specification of the unsafe set. The first half of the essay argues that every formalisation of environmental intent opens an irreducible gap. **The trip condition is therefore itself a proxy, indicted by the essay's own theorem.** Nothing explains why the last layer is exempt.

## SERIOUS 7 — One of three falsifiers can be run by a stranger

- **F1 is a conjunction with an escape hatch.** It fires only if *no case is found* AND *the literature has by then run an environmental benchmark environment*. The second conjunct is under the author's own advocacy — the Monday-morning section asks labs to build it — so inaction preserves the thesis. The first conjunct requires establishing that a system was *not directed* to find the gap, and the essay's own recommendation (an attribution checkbox) concedes the reporting apparatus for that does not exist. A 2029 null is therefore guaranteed on measurement grounds regardless of the world's state. **Not a falsifier.**
- **F2 is genuinely runnable** — five named public documents, a keyword protocol, a three-of-five threshold. But "substantive environmental criterion" is undefined, and the ledger's §D method note shows how much judgement went into excluding "welfare of all sentient beings" and EU AI Act Art. 95(2)(b). Pre-register the coding rule and this becomes the best falsifier in the corpus.
- **F3 is unrunnable.** It requires a deployed environmental interlock to exist, someone to measure net harm from nuisance trips, and counterfactual attribution — and the essay states in the same section that no false-trip rate has been published for any environmental criterion. It can only fire if the world first adopts the recommendation. The argument is insulated from disconfirmation for exactly as long as it fails to persuade.

## QUIBBLES

- The Landauer / 240× / 10⁸–10¹² paragraph establishes that gating is thermodynamically cheap. Nobody disputed that, nothing downstream depends on it, and in a piece otherwise disciplined about evidence it reads as ornament that invites discounting of the disciplined parts.
- Section title "The one referee whose reading cannot be edited cheaply" is contradicted by its own third paragraph ("Nor is it incorruptible").
- "Nobody from your world is reading them" and the general nobody-is-looking frame sit badly against *Science*'s news desk having [covered SocioHack](https://www.science.org/content/article/ai-models-have-troubling-knack-discovering-legal-loopholes) — the same coverage the prior-art file had to litigate a factual conflict against.
- The claim that the search-budget inversion is unmodelled is now false in adjacent domains: Yew, Marino & Venkatasubramanian, [*Red Teaming AI Policy: A Taxonomy of Avoision and the EU AI Act*](https://arxiv.org/abs/2506.01931) (FAccT 2025), taxonomises firm-side circumvention explicitly; [*Can AI expose tax loopholes?*](https://arxiv.org/abs/2503.17339) (2025) builds a prototype discovery system. Narrow to environmental regulation, where it does appear to hold.
- EPA's own **Next Generation Compliance** (Giles, 2013; [EPA](https://www.epa.gov/compliance/article-next-generation-compliance)) bundles regulation-and-permit design, advanced monitoring, electronic reporting, transparency and innovative enforcement, on the stated principle of making compliance easier than violation. The Monday-morning list is Next Gen's first two elements. Omitting the author's own agency's flagship programme, twice now across two drafts, is the weakest recurring moment in this corpus.

---

## OBJECTIONS THE AUTHOR CANNOT ANSWER

1. **The critical point already has a model, and it is not this one.** Karwowski et al. locate formally the threshold past which proxy optimisation degrades the true objective, and derive a stopping rule with regret bounds. If the phase transition is real, it is a special case of a published result the argument does not engage; if it differs, nothing here shows how.

2. **The headline number measures semantic agreement, not discovery.** Recall@Full is an LLM judge's semantic match rate against patches that were themselves the input to environment construction, at κ≈0.55, inside an LLM-generated simulator. Nothing in the paper separates "the optimiser found the loophole" from "the judge accepted a broad strategy as matching," and the essay's entire mechanism claim rests on that separation.

3. **The remedy is the open problem restated.** Grading against physical state through instruments is the ELK setup and the measurement-tampering setup, both of which take redundant measurement as the *premise* of the difficulty. No published result shows the cost of coordinated tampering growing without bound in the number of instruments, and the best empirical work on engineered redundancy found correlated failure exactly where independence was assumed.

4. **The interlock's trip condition is a proxy, and the argument condemns it.** If every substitution of the measurable for the meant opens an irreducible gap, the physical criterion that fires the trip opens one too. No reason is offered why the last layer escapes the theorem that indicts the other six.

5. **Two of three dated predictions cannot be run by a stranger.** F1 requires proving a negative about intent using an attribution field the essay says does not exist, conjoined to a benchmark the author is lobbying others to build. F3 requires the world to adopt the proposal first. The dated commitments create the appearance of risk while carrying almost none.

6. **The domain gap is the finding; the mechanism is not.** IEC 61511 already scopes environmental consequence; shielding already formalises the interlock; DeepMind already deploys it; McBarnet already owns the constitutive gap; security economics already owns adversary cost. What is left — that nobody has pointed the existing mechanism at a watershed, and that the benchmark and values corpora are empty of environmental content — is a narrower paper, and a far harder one to refute.

7. **The prior-art file and the essay disagree about the essay.** The file records, correctly, that the components are borrowed and asserts three times that the text credits them. The text credits nobody. Whichever document is wrong, one of them has to change before publication.
