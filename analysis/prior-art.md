# Prior-art check: regulatory stability as an equilibrium in adversary search cost

**Checked:** 2026-08-03. Searches run directly (the delegated sweep stalled twice; this is the hand-run replacement).

## The thesis under test

> Environmental regulation substitutes measurable proxies for unmeasurable intent at every layer. Each substitution necessarily opens a gap between compliance and intent. The gaps are **irreducible**—they are the price of a rule a third party can verify. Therefore regulatory stability never rested on the absence of exploitable gaps; it rested on the **cost of searching for them**. The regime is an equilibrium in adversary search cost, and that cost is now collapsing.

Three components, tested separately, because they have different prior art:

- **(A)** Compliance-intent gaps exist and are exploited by skilled legal engineering.
- **(B)** Stability of a rule system is a function of adversary *cost*, not rule quality.
- **(C)** AI is now collapsing legal search cost specifically, with systemic consequences.

---

## (A) The gap, and its exploitation—SUBSTANTIALLY ANTICIPATED

**Doreen McBarnet, "creative compliance."** This is the closest and most important prior art, and the essay must not pretend otherwise.

- McBarnet & Whelan, "The Elusive Spirit of the Law: Formalism and the Struggle for Legal Control," *Modern Law Review* 54(6) (1991).
- McBarnet, *Crime, Compliance and Control* (Routledge, 2004). https://www.routledge.com/Crime-Compliance-and-Control/McBarnet/p/book/9780754623496
- McBarnet, "After Enron: Will 'Whiter than White Collar Crime' Still Wash?" *British Journal of Criminology* (2006).

Her account: corporate actors use "the practice of using the letter of the law to defeat its spirit." Adopting excessive legal formalism, the creative complier "seeks to sever rules and regulations from their aims," staying on "the right side of the boundary between lawfulness and illegality." She documents legal engineering in financial services as an industry norm rather than deviance.

**Verdict on (A): already published, and better than a paraphrase.** McBarnet owns this, and the essay names her in the body.

What McBarnet does *not* do: treat the exploitation rate as a function of a cost variable that could change. Her account is sociological and institutional—creative compliance is a professional practice and a culture. It is not modelled as an equilibrium with a price term that technology could move.

**Adjacent, on why gaps are constitutive:**
- Kaplow, "Rules versus Standards: An Economic Analysis," *Duke Law Journal* 42 (1992)—the trade-off between the cost of promulgating precision in advance and the cost of applying standards later. This is about *the lawmaker's* costs, not the adversary's search cost. Adjacent, not the same.
- Diver, "The Optimal Precision of Administrative Rules," *Yale Law Journal* 93 (1983)—transparency, accessibility, congruence; more precision is not monotonically better. Supports the irreducibility intuition without stating it as this essay does.
- Ehrlich & Posner, "An Economic Analysis of Legal Rulemaking," *Journal of Legal Studies* 3 (1974).

---

## (B) Stability as a function of adversary cost—ANTICIPATED IN A DIFFERENT FIELD

The framing "the security of a system is a property of attacker cost, not defence quality" is standard in **security economics**, and the essay should not present it as novel.

- Anderson & Moore, "The Economics of Information Security," *Science* 314 (2006).
- The entire work-factor tradition in cryptography: a cipher is not "unbreakable," it has a cost to break, and the system is secure only while that cost exceeds the attacker's budget. Shannon's 1949 "work characteristic" is the canonical statement.

**Verdict on (B): the structural idea is old and well established—in security, not in regulation.** The contribution, if any, is transposition: nobody located appears to have modelled *regulatory* stability the way cryptographers model cipher strength, as a work factor that technology erodes.

Also relevant and honestly adjacent:
- Manheim & Garrabrant, "Categorizing Variants of Goodhart's Law," arXiv:1803.04585 (2018)—Goodhart failure modes. They do treat optimisation pressure as the thing that breaks proxies, which is the same shape of claim in the ML setting. This is the closest formal cousin.
- Liu, Mou, Yan, Wei & He, arXiv:2606.04075 (2026)—states the regulation-as-reward-function isomorphism explicitly: *"societal regulations are structurally similar to reward functions. They define measurable outcomes, thresholds, and exceptions, while often leaving institutional intent only partially specified."* The essay's structural premise is therefore **the paper's own premise**, not the essay's discovery. The essay attributes the finding to the team by institution in the body and cites the paper in the ledger and companion.

---

## (C) AI collapsing legal search cost—PARTIALLY ANTICIPATED, RECENTLY

**Sadler & Sherburn, "Legal Zero-Days: A Novel Risk Vector for Advanced AI Systems," arXiv:2508.10050 (12 August 2025).** https://arxiv.org/abs/2508.10050

Abstract, verbatim in relevant part: *"We introduce the concept of 'Legal Zero-Days' as a novel risk vector for advanced AI systems. Legal Zero-Days are previously undiscovered vulnerabilities in legal frameworks that, when exploited, can cause immediate and significant societal disruption... Our findings suggest that while current AI models may not reliably find impactful Legal Zero-Days, future systems may develop this capability."*

This is the closest AI-governance prior art. It is **not** named in the essay body—the feature carries no citation apparatus by design—but it is recorded here and in the fact ledger, and the companion carries the reference. The framing is deliberately borrowed from security ("zero-day"), which is the same transposition move noted at (B). What it does *not* do: argue that existing regulatory stability has been resting on search cost all along, or that the gaps are irreducible in principle. It treats legal vulnerabilities as *undiscovered defects*—findable, and by implication fixable once found. This essay's claim is the stronger and less comfortable one: the vulnerabilities are not defects, they cannot be fixed, and only the search cost was ever holding.

Also found:
- Popular coverage of the SocioHack result (Science news, June 2026; The Print) framing AI loophole discovery as a governance problem. Journalism, not a thesis.
- Commentary noting AI may not reduce net legal cost because parties enter an arms race of increasing legal work. Cuts *against* this essay's central mechanism and is recorded in the ledger as a live objection.

---

## Verdict

**Partially anticipated, and the honest statement is: the components are all borrowed; the combination is not one I could find stated anywhere.**

- (A) is McBarnet's, squarely.
- (B) is security economics', squarely, and Manheim & Garrabrant have the ML-side cousin.
- (C) is Sadler & Sherburn's nearest neighbour, from August 2025, and the SocioHack authors supply the regulation-as-reward-function premise themselves.

What I could not find stated anywhere: that (A) and (B) compose—that **the compliance-intent gap is irreducible because substitution is constitutive of enforceability, and therefore fifty years of regulatory stability was never a property of drafting quality but an equilibrium in adversary search cost, now being disrupted without anyone having priced it.** Nor did I find the environmental instantiation: environmental law as the densest available proxy stack and therefore the most exposed.

**Consequence for the essay.** It names McBarnet and the cryptographic work-factor framing in the body, attributes the benchmark result to its authors, and claims novelty nowhere in the text. Sadler & Sherburn, Karwowski et al. and the security-economics citation live in the companion and the ledger rather than the feature, which carries no reference list. If the composition is obvious in hindsight, that is what a good synthesis looks like from the far side, and the argument stands or falls on whether it is right rather than whether it is first.

**Searched and not found:** any law-and-economics treatment modelling the *regulated party's* search budget (as opposed to the regulator's enforcement budget) as the variable determining regime stability. Enforcement-side resource-constraint literature is extensive—Becker (1968) and its descendants, agency-capacity work—and consistently models the *detector's* cost. The inversion appears to be open.

---

## Note recorded during this search—a factual conflict, resolved

Science's news coverage of the SocioHack paper described the 72 environments as ranging "from credit-card reward schemes and school-funding formulas to environmental and patent regulations." That phrasing would falsify the essay's claim that none of the 72 is environmental.

Resolved against the news summary, on three independent grounds:
1. Full-text search of the paper's HTML version (arXiv:2606.04075v2) returns **zero occurrences** of "environmental," "pollution," "emission," "water," "EPA," or "climate."
2. The appendix domain breakdown for the 32 historical environments enumerates: Finance & Securities, Consumer Protection, Healthcare & Pharma, Bankruptcy & Insurance, Government & Law, Housing, Immigration, Platform & Tech, Sports & Gaming, Tax, Data Privacy, Education, Energy, Food Safety, Professional Ethics, Transportation. No environmental-regulation domain.
3. An independent Cloud Security Alliance research note on the paper lists the domains as finance, healthcare, immigration, pharmaceutical patents, airline pricing, social media governance, insurance, credit systems, bankruptcy law and intellectual property.

The essay's sentence is written to be defensible against the paper's own enumeration. The discrepancy is logged in the fact ledger so it is not a surprise if a reader raises it.
