# Red-team review 2: hostile read from AI safety

**Reviewer stance:** AI-safety researcher, unimpressed. Prior: outsiders rediscover alignment every few months, rename known problems, and present the renaming as a contribution.

**Under review:** `it-has-never-read-a-river.md` (draft, 2026-08-02), with `analysis/fact-ledger.md`. Objections ranked **fatal / serious / quibble**. Every prior-art claim below was checked against source this pass, not recalled.

---

## FATAL 1 — The L0–L5 ladder is IEC 61511 plus SAE J3016, and it drops the only part of IEC 61511 that makes the ladder usable

Six levels — instrumentation, annunciation, deviation logging, permissive, interlock, embedded objective — offered as "an open specification." Four of the six labels are process-control terms of art, used without definition precisely *because* they are terms of art. "Permissive" and "interlock" are not coinages; they are what a P&ID says.

The prior art is not adjacent, it is the thing itself. IEC 61511 (the process-sector application of IEC 61508) already specifies this layered stack: basic process control, alarm and operator response, safety instrumented function, physical protection, mitigation — allocated by Layer of Protection Analysis, each layer required to be independent of the one below ([overview](https://www.ors-consulting.com/what-is-sil-safety-integrity-level), [ISA 84](https://saltegra.com/safety-instrumented-systems-eic61511-isa84)). L0–L2 are instrumentation, alarm management and recordkeeping; L3–L4 are permissive and SIF. Not an analogy to the ladder. The ladder.

Worse, the essay takes the shape of IEC 61511 and discards its content. The standard does not merely say "there is an interlock." It assigns a **Safety Integrity Level**, SIL 1–4, with quantified average probability of failure on demand, independence requirements, safe failure fraction, proof-test intervals. Two systems the essay calls "L4" can differ in PFDavg by three orders of magnitude. Without a SIL-equivalent, "L4" is a slogan. Fix that or withdraw the word "specification."

The 0-to-5 form is a genre with three prior occupants: SAE J3016's driving-automation levels ([standard](https://www.sae.org/standards/content/j3016_201609/)), the identical 0–5 scale for medical robotics in Yang, Cambias, Cleary et al. (*Science Robotics* 2017, [doi](https://www.science.org/doi/10.1126/scirobotics.aam8638)), and the autonomy axis in Morris et al., "Levels of AGI" ([arXiv:2311.02462](https://arxiv.org/abs/2311.02462)) — which says outright it is modelled on the driving levels.

And the artefact being asked for, a certified simple supervisor able to override a complex learned controller, has a 2001 paper and an aviation standard: Sha's **Simplex architecture** ([ref](https://www.semanticscholar.org/paper/Using-Simplicity-to-Control-Complexity-Sha/f6313ebc4a0448d4297949655f641a7bd46923ef)) and **ASTM F3269** run-time assurance ([ASTM](https://www.astm.org/Standards/F3269.htm)) supply the decision module and pre-certified baseline L4 lacks. Inside the RL loop: shielding ([arXiv:1708.08611](https://arxiv.org/abs/1708.08611)) and constrained policy optimisation (Achiam et al., ICML 2017).

**The ladder is vocabulary transfer, not taxonomy.** Worth something. Not worth calling new.

## FATAL 2 — The perception/values split is capability-versus-alignment, and the "incorruptible grader" runs straight into ELK

"It cannot read the instruments, and its values contain no watershed" is the world-model/objective distinction. The failure the essay opens with — a system hits its target and damages something outside the objective that no instrument was watching — is *avoiding negative side effects*, problem one of five in Amodei, Olah, Steinhardt, Christiano, Schulman and Mané ([arXiv:1606.06565](https://arxiv.org/abs/1606.06565), 2016), paired there with partial observability. Seven years of formal work followed: relative reachability ([arXiv:1806.01186](https://arxiv.org/abs/1806.01186)) and attainable utility preservation ([arXiv:1902.09725](https://arxiv.org/abs/1902.09725)) penalise exactly "harm not in the objective," including irreversibility — the essay's own asymmetry criterion. None of it is cited.

The proxy analysis is Goodhart, taxonomised by Manheim and Garrabrant ([arXiv:1803.04585](https://arxiv.org/abs/1803.04585)); the essay's mechanism is textbook adversarial Goodhart. "Edit the map instead of the world" is reward tampering, formalised by Everitt, Hutter, Kumar and Krakovna ([arXiv:1908.04734](https://arxiv.org/abs/1908.04734)), which separates reward-function tampering from RF-input tampering — *the sensor-spoofing worry is RF-input tampering renamed*. Krakovna's specification-gaming list has held 70+ examples since 2018 ([list](https://vkrakovna.wordpress.com/2018/04/02/specification-gaming-examples-in-ai/)).

The load-bearing original move is "to make the score read clean you have to make the water clean." That is the exact premise ARC's **Eliciting Latent Knowledge** report exists to destroy — the SmartVault, where cameras report a diamond stolen by an agent that tampered with the cameras (Christiano, Xu, Cotra, 2021, [discussion](https://www.alignmentforum.org/posts/qHCDysDnvhteW7kRd/arc-s-first-technical-report-eliciting-latent-knowledge)). And the essay's defence — many dense, independent measurements — is the literal setup of Roger, Greenblatt et al., *Benchmarks for Detecting Measurement Tampering* ([arXiv:2308.15605](https://arxiv.org/abs/2308.15605)), whose result is that detectors beat baselines and **do not reach ceiling**. The essay asserts the cost of faking a densely measured system "rises without bound": a quantitative claim, which a literature has tried to measure, which the essay neither cites nor engages. Biggest unforced error here.

Relatedly, L5 ("non-proxiable, held outside the agent") is incoherent: every objective is evaluated through a representation. Top the ladder at L4, or claim to have solved ELK in a bullet point.

## SERIOUS 3 — The evidence is over-read in exactly one direction, and the fact ledger proves the author knew

"We already know what happens, and this part is measured rather than speculated" is followed immediately by a sandboxed simulation. SocioHack ([arXiv:2606.04075](https://arxiv.org/abs/2606.04075)) is real and says what the essay says. But the ledger records what the essay omits: the policy model was **Qwen3-30B-A3B-Instruct**, no frontier model was tested, and judge–human agreement was **κ = 0.55**. The 61.25% recall headline is a number that judge produced. The caveat concedes "sandboxed" but never retracts "measured," and never surfaces the model or the κ.

The pattern repeats. Ledger E9: Anthropic's *Sycophancy to Subterfuge* result is **45 of 32,768** trials (0.14%) and **7 of 32,768** (0.02%); the essay renders it "in a few cases editing the unit tests to hide it." Ledger E8: METR's 70% is **14 of 20 attempts on one task**. A project whose Gate 1 rule is *delete, do not soften* has repeatedly softened denominators in the thesis's direction. Put the base rates in the running text.

And "72 environments and not one is environmental" cannot carry field-wide neglect. It is a v1 benchmark with sixteen domains; the absence proves the authors picked sixteen other ones.

## SERIOUS 4 — "Everything deployed today sits at L1" is false as written

Google handed **autonomous** control of data-centre cooling to an RL system in 2018, with actions checked against operator-defined constraints and re-verified locally before execution ([DeepMind](https://deepmind.google/blog/safety-first-ai-for-autonomous-data-centre-cooling-and-industrial-control/), [MIT Tech Review](https://www.technologyreview.com/2018/08/17/140987/google-just-gave-control-over-data-center-cooling-to-an-ai/)). A learned optimiser with authority over a physical system inside a constraint envelope: L3/L4 by the essay's own definitions, eight years ago. The claim survives only as "every *environmental-domain* system I personally know of." Narrow it, or a reviewer will.

## SERIOUS 5 — Three of the four falsifiers cannot be run by a stranger

- **F1** is conjunctive, and the second conjunct — a regulator opening a reporting category — is under nobody's control. It can fail to trigger for five years through inaction, and the essay's "ask" section lobbies readers to build the detector. A falsifier the author must recruit volunteers to construct is an escape hatch.
- **F2** turns on "Earth-observation *foundation model*," "authority to actuate," and "without a human approving each action" — three terms the author retains definitional control over, in a field where "foundation model" is contested. Earth AI moving from Trusted Tester into a closed utility loop would produce an argument, not a resolution.
- **F3** is clean: five named documents, ten terms, a date. A stranger runs it in an afternoon. Best thing in the section.
- **F4** asks for harm from L4 deployments the essay says do not exist. It cannot resolve either way by 2029.

One of four is real. Say so, or fix the other three.

## QUIBBLES

- **Uncited prior art.** Galaz, Centeno, Callahan et al., *Technology in Society* 67:101741 (2021) ([SRC](https://www.stockholmresilience.org/publications/publications/2021-10-11-artificial-intelligence-systemic-risks-and-sustainability.html)) documents AI uptake in farming, forestry and marine management and names the governance gap — the denominator argument, five years earlier. Rolnick, Donti, Kaack, Bengio et al., ACM CSUR 55(2):42 (2022) is the opportunity half. Perez-Ortiz, *Position: AI Must Become Planet-Centered* ([arXiv:2606.13704](https://arxiv.org/abs/2606.13704)) is the ought-gap, two months before this draft. And EPA's own **Next Generation Compliance** (2012–17) is the "shorten the loop" ask — omitting the author's own agency's flagship programme is the weakest moment in the piece.
- **"Write one machine-readable permit condition"** is **Rules as Code**, an OECD/OPSI programme with case studies in New Zealand, France and Canada ([paper](https://oecd-opsi.org/wp-content/uploads/2022/03/rac-wp.pdf)).
- **EU AI Act.** "Report after damage, never gates" is imprecise: Art. 95(2)(a) directs codes of conduct on minimising environmental impact, Art. 40 covers energy-efficiency standardisation ([Art. 95](https://artificialintelligenceact.eu/article/95/)). Footprint, not ecology, so the substance survives — but *On Twelve Shades of Green* (*Minds and Machines*, 2025) already published this analysis.
- **The 675:1 parameter ratio** is analytically void: the essay concedes perception models need not be large, deleting the figure's meaning, then keeps the chart.
- **The "incorruptible grader" section spends four paragraphs arguing it is not incorruptible.** Retitle.

---

## WHAT IS ACTUALLY NEW HERE

Plainly, and this is the honest verdict:

**The environmental-law-as-proxy-stack analysis and the cross-literature identification are new. The rest is synthesis.**

Two narrow additions belong beside that sentence, and no more:

1. **The dated null audit** of five frontier-lab values documents by full-text search (ledger §D) is a small, checkable empirical result — a fact rather than an insight, decaying the moment a lab edits a page, but nobody had run it and the method is reproducible, which is why F3 is the only working falsifier here.
2. **The first RL regulatory-gaming benchmark has no environmental domain.** A one-line dataset finding: true, useful to that benchmark's authors, and one line.

*Not* new: the mechanism (side effects 2016, Goodhart taxonomy 2018, reward tampering 2019), the physical-grounding intuition and its failure mode (ELK 2021, measurement tampering 2023), the ladder (IEC 61511/61508, SAE J3016, Simplex, ASTM F3269), the is/ought framing (Hume, then value-loading), the sector denominator (Galaz et al. 2021), and the machine-readable-permit ask (Rules as Code 2020).

The proxy-stack section is the essay. An environmental lawyer showing from inside that the compliance/intent gap is *designed in and load-bearing* — the substitutions being required for enforceability and therefore unclosable — is a claim nobody in AI safety is positioned to make, and it converts environmental regulation into the largest available adversarial testbed for reward hacking. That contribution is currently buried under a ladder that is not one.

## OBJECTIONS THE AUTHOR CANNOT ANSWER

1. **The audience is wrong for the contribution.** If the mechanism is 2016-vintage and the ladder 1990s-vintage, what remains is a domain instantiation aimed at people who already own the mechanism. The real reader is a regulator; the essay is addressed to a lab.
2. **L5 cannot exist.** A "non-proxiable" objective evaluated by any instrument is a proxy. The author concedes this and ships L5 regardless. Delete the rung or solve ELK.
3. **The adversary is misidentified.** Dense independent measurement raises the cost of faking *for the optimiser*. It does nothing about the party that owns, sites, calibrates and proof-tests the instruments — the same party deploying the optimiser. Process safety's fifty years of receipts include falsified proof tests, not only nuisance trips.
4. **The absence has a competing explanation he cannot exclude.** The registries may be empty because nobody counts — or because refining, chemicals and grid already run IEC 61511 interlocks that catch exactly this. His preferred remedy may be why his lede exists.
5. **His own asymmetry defeats him.** If irreversibility is the criterion, the impact-measure literature has spent seven years formalising it and produced no deployable method, and the essay never says why environmental framing changes that. Urgency is not evidence of tractability.
