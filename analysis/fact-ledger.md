# Fact ledger

**Project:** environmental-alignment feature + technical companion
**All items checked:** 2026-08-02
**Gate 1 rule:** anything unverifiable is **deleted, not softened**, with one line of reason. Deletions are recorded in §H.

Legend: **V** verified against a primary or near-primary source · **E** estimate, labelled as such wherever used · **X** deleted under Gate 1.

---

## A. The footprint case—stated at full strength

| # | Claim as used | Status | Source | Date |
|---|---|---|---|---|
| A1 | Data centres consumed **485 TWh of electricity in 2025**, up 17% on the year; AI-focused data-centre consumption grew ~50%. | V | IEA, *Key Questions on Energy and AI*, executive summary—https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary | pub. Apr 2026 |
| A2 | Projected to roughly double to **~950 TWh by 2030**, **just under 3% of global electricity demand**; growing ~15%/yr, four times faster than all other sectors combined. | V | IEA, as A1; original framing in IEA, *Energy and AI* (Apr 2025)—https://www.iea.org/reports/energy-and-ai/executive-summary | Apr 2026 |
| A3 | 2024 baseline: ~415 TWh, ~1.5% of global electricity. | V | IEA, *Energy and AI*—https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai | Apr 2025 |
| A4 | **"Energy use per AI task dropping by at least an order of magnitude annually in recent years"**; per-task efficiency "improving at a rate unprecedented in energy history." | V | IEA, *Key Questions on Energy and AI* (verbatim) | Apr 2026 |
| A5 | Google: energy per median Gemini text prompt fell **33×** in the 12 months to May 2025 (carbon per prompt 44×); median prompt 0.24 Wh. | V | Google Cloud blog, "Measuring the environmental impact of AI inference"—https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference; paper arXiv:2508.15734 | pub. 21 Aug 2025 |
| A6 | Ireland: data centres took **22% of national metered electricity in 2024** (6,969 GWh), up from 5% in 2015—more than all urban households (18%). **23% in 2025.** | V | CSO Ireland, *Data Centres Metered Electricity Consumption 2024*—https://www.cso.ie/en/releasesandpublications/ep/p-dcmec/datacentresmeteredelectricityconsumption2024/keyfindings; 2025 figure via CSO release reported 7 Jul 2026 | Jun 2025 / Jul 2026 |
| A7 | Virginia: data centres ≈ **26% of state power consumption**; they drive nearly all projected demand growth, which would double in ten years unconstrained. | V | EPRI analysis (2024); Virginia JLARC, *Data Centers in Virginia*—https://jlarc.virginia.gov/landing-2024-data-centers-in-virginia.asp | Dec 2024 |
| A8 | US = **45% of global data-centre electricity demand** (2024); China 25%, Europe 15%. | V | IEA, *Energy and AI* executive summary | Apr 2025 |
| A9 | US data centres consumed **~66 billion litres of water directly in 2023**, 84% of it by hyperscale facilities; 176 TWh = 4.4% of US electricity. | V | LBNL, *2024 United States Data Center Energy Usage Report*—https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report_1.pdf | Dec 2024 |
| A10 | PJM capacity price rose from $28.92/MW-day (2024/25) to **$269.92/MW-day (2025/26), +833%**; the independent market monitor attributed **~63% of the increase—about $9.3 billion—to data centres**, recovered from customers. 2026/27 cleared at $329.17, the FERC cap. | V | IEEFA—https://ieefa.org/resources/projected-data-center-growth-spurs-pjm-capacity-prices-factor-10; Citizens Utility Board, 15 Jul 2026—https://www.citizensutilityboard.org/blog/2026/07/15/cub-sustained-high-pjm-capacity-prices-ramp-up-urgency-for-data-center-reform/ | 2025–2026 |

**Editorial note.** A1–A10 are conceded in the feature at full strength and without qualification, before the pivot. The concession is load-bearing: the piece's argument only works if the footprint case is stated accurately enough that a data-centre campaigner recognises their own case in it.

---

## B. The denominator

| # | Claim as used | Status | Source | Date |
|---|---|---|---|---|
| B1 | Agri-food systems account for **~30% of the world's total end-use energy consumption**; more than 70% of it consumed beyond the farm gate. | V | FAO Energy programme—https://www.fao.org/energy/en/; FAO, *"Energy-Smart" Food for People and Climate* | figure maintained through 2024 FAO materials |
| B2 | Food systems including pre- and post-production are responsible for **21–37% of total net anthropogenic GHG emissions**. | V | IPCC, *Special Report on Climate Change and Land*, Summary for Policymakers—https://www.ipcc.ch/srccl/chapter/summary-for-policymakers/ | 2019 |
| B3 | Cross-check: food systems ≈ **34% of global anthropogenic GHG (2015)**. | V | Crippa et al., *Nature Food* (2021) | 2021 |
| B4 | The water sector (supply, treatment, wastewater) uses **~4% of global electricity**. | V | IEA, *WEO-2016 Special Report: Water-Energy Nexus*—https://www.iea.org/reports/water-energy-nexus | 2016 (no newer headline share published) |
| B5 | Transport accounts for **~29–30% of global final energy**. | V | IEA data via Stanford Understand Energy; REN21 *Global Status Report 2024* | 2024 |
| B6 | The chemical sector is the **largest industrial energy consumer**, taking ~11% of global primary oil demand and ~8% of primary gas; more than half its energy inputs are consumed as feedstock. | V | IEA, "From energy to chemicals"—https://www.iea.org/commentaries/from-energy-to-chemicals; IEA chemicals page—https://www.iea.org/energy-system/industry/chemicals | 2018, page current |
| B7 | Global electricity generation ≈ **31,700 TWh (2025)**; ≈30,850 TWh (2024). | V (derived) | Arithmetic from Ember, *Global Electricity Review 2026* (renewables = 33.8% = 10,730 TWh) and *2025* (low-carbon = 40.9% = 12,609 TWh)—https://ember-energy.org/latest-insights/global-electricity-review-2026/ | 2026 |
| B8 | Global total energy supply ≈ **620 EJ (2023)** ≈ 172,000 TWh at 277.8 TWh/EJ. | V | Energy Institute *Statistical Review of World Energy* | 2024 edition |

**Honest uncertainty band, stated in the feature and in Figure 1.** These denominators **overlap and must never be summed**: FAO's 30%-of-energy agri-food figure already contains food freight, cold chain and fertiliser; the chemicals figure contains fertiliser production that also sits inside the food-system boundary; water-sector electricity includes agricultural pumping in some accountings. The feature therefore makes **no single clean multiple**. It states the comparison as: computing's own electricity is between one and three per cent of global electricity, and global electricity is itself roughly a fifth of global energy supply, while each individual sector now receiving allocation authority runs at tens of thousands of terawatt-hours per year. That is the whole arithmetic and it is deliberately coarse.

**Deleted under Gate 1:** a single "the governed sectors are N× the governor" multiple. Reason: the sector boundaries overlap, so any single multiple would be a number I could not defend under questioning. See §H1.

---

## C. The is-gap

| # | Claim as used | Status | Source | Date |
|---|---|---|---|---|
| C1 | Prithvi-EO-2.0 (NASA/IBM) ships in **300M and 600M parameter** variants. | V | Hugging Face model cards `ibm-nasa-geospatial/Prithvi-EO-2.0-{300M,600M}`; NASA-IMPACT/Prithvi-EO-2.0 GitHub; Jülich Supercomputing Centre announcement | Dec 2024 |
| C2 | Trained on **4.2 million global time-series samples** from NASA's Harmonized Landsat and Sentinel-2 archive at 30 m resolution. | V | arXiv:2412.02732 abstract (verbatim)—https://arxiv.org/abs/2412.02732 | v1 Dec 2024, v3 Mar 2026 |
| C3 | Outperforms its predecessor **by 8% across a range of tasks** on GEO-Bench, and outperforms six other geospatial foundation models. | V | arXiv:2412.02732 | Dec 2024 |
| C4 | **First geospatial foundation model deployed in orbit**—compressed Prithvi variants uploaded to the South Australian Kanyini satellite and to the Thales Alenia Space IMAGIN-e payload on the ISS; flood and cloud detection. | V | NASA Science—https://science.nasa.gov/science-research/ai-foundation-model-in-orbit/ (7 May 2026); arXiv:2512.01181 | May 2026 |
| C5 | AlphaEarth Foundations produces a **64-dimensional embedding per 10 m × 10 m footprint**, >1.4 trillion footprints per year, global land and coastal waters; distributed as the Satellite Embedding dataset in Google Earth Engine, annual layers 2017–2025. | V | Google DeepMind—https://deepmind.google/discover/blog/alphaearth-foundations-helps-map-our-planet-in-unprecedented-detail/; arXiv:2507.22291 | 30 Jul 2025; status current Aug 2026 |
| C6 | Clay v1.5: **632M-parameter** vision transformer, ~70 million globally distributed image chips, open source, nonprofit-run. | V (spot-check pending on the release-notes page) | Clay Foundation release notes—https://clay-foundation.github.io/model/release-notes/specification.html | 2024–2025 |
| C7 | TerraMind (IBM/ESA): first any-to-any generative EO foundation model; 9 modalities; 500B tokens from 9M aligned samples; Apache 2.0. | V | arXiv:2504.11171; https://github.com/IBM/terramind | Apr 2025 |
| C8 | Aurora (Microsoft): **1.3 billion parameters**, >1 million hours of geophysical data; beats operational forecasts on air quality, ocean waves and cyclone tracks at orders of magnitude lower compute. | V | *Nature* 641 (2025), "A foundation model for the Earth system"—https://www.nature.com/articles/s41586-025-09005-y | May 2025 |
| C9 | Llama 3.1 405B: **405 billion parameters, >15 trillion training tokens**—the largest frontier model with an officially published parameter count. | V | Meta AI—https://ai.meta.com/blog/meta-llama-3-1/ | Jul 2024 |
| C10 | GPT-4 class ≈ 1.8 trillion parameters, ~13T tokens. | **E** | SemiAnalysis, Jul 2023; never confirmed by OpenAI. Labelled "estimate" at every use and shown faded in Figure 2. | 2023 |
| C11 | **Documented-to-documented size ratio: 675×** (Llama 3.1 405B against Prithvi-EO-2.0 600M). | V (arithmetic) | 405 ÷ 0.6 = 675. Computed here. | 2026-08-02 |

### C12—the decisive question, and the narrowing it forced

The brief instructed: *search hard for counterexamples; if integration exists, the piece narrows its claim to match.* It exists. The claim is narrowed.

Three distinct things were tested separately:

- **(a) EO foundation models used by human analysts—EXISTS, mature.** AlphaEarth embeddings in Earth Engine and BigQuery (UN FAO, MapBiomas, Global Ecosystems Atlas); Prithvi fine-tunes for flood, burn-scar and crop mapping; TerraMind via TerraTorch; Clay embeddings.
- **(b) EO models as tools a general-purpose agent can call—EXISTS, limited release.** Google's **Geospatial Reasoning** (research.google, 8 Apr 2025) and **Earth AI** (23 Oct 2025): Gemini acts as an orchestrating agent, planning multi-step chains and calling expert sub-agents equipped with Earth AI foundation models, Population Dynamics, Data Commons and Earth Engine tools, with AlphaEarth embeddings fused in. Benchmarked at 0.82 on Google's geospatial Q&A benchmark against 0.50 for baseline Gemini 2.5 Pro. Availability as of Aug 2026: Trusted Tester programme (Airbus, Maxar, Planet Labs, WPP/Choreograph named), Vertex AI express-interest, flowing into BigQuery and Gemini Enterprise. Google's own materials frame every example as decision **support**—damage assessment, prioritising relief—with decisions remaining with human operators.
  Sources: https://research.google/blog/geospatial-reasoning-unlocking-insights-with-generative-ai-and-multiple-foundation-models/ · https://research.google/blog/google-earth-ai-unlocking-geospatial-insights-with-foundation-models-and-cross-modal-reasoning/ · https://ai.google/earth-ai/
- **(c) EO foundation-model perception inside an autonomous control loop with authority over a physical system—NOT FOUND.** Searched: utility dispatch (no results connecting EO foundation models to autonomous dispatch); John Deere second-generation autonomy kits (onboard camera/GPU perception and GPS auto-steer, not EO-foundation-model driven; satellite data feeds advisory planning layers only); Climate FieldView; the in-orbit Prithvi deployment (explicitly a feasibility demonstration of inference, not a tasking or response authority). Nearest grey-zone case: Aurora powering MSN Weather forecasts—a foundation model in a production pipeline reaching roughly a billion devices, but it publishes forecasts; it holds no authority over physical systems, and it is an atmosphere model rather than an imagery model.

**The claim as it now appears in the feature.** *Not* "Earth-observation models are not wired into agentic systems"—that formulation is **false as of April 2025** and is deleted (see §H2). The surviving, defensible formulation, used verbatim in the feature and in Figure 2:

> Where the two have been joined at all, it is limited-release, decision-support, and human-in-the-loop by design. No Earth-observation foundation model sits inside an autonomous decision loop with authority over a physical system.

This is the single most falsifiable claim in the feature. Falsifier F2 in the feature is written against it directly.

---

## D. The ought-gap

Method note, because it matters for the strength of a null result: Anthropic's constitution, the OpenAI Model Spec, and the DeepMind, Meta and xAI framework PDFs were **downloaded in full and searched by exact local text match**, not summarised. The zero-hit findings below are machine-verified against full documents, not impressions.

Search terms, every document: ecosystem, species, watershed, habitat, emissions, pollution, conservation, biodiversity, environment/environmental, climate, nature/natural, planet, wildlife, sustainability, energy.

| Document | Version / date | Finding |
|---|---|---|
| **Anthropic, Claude's Constitution** (~192,000 characters)—https://www.anthropic.com/constitution | current | Zero hits: watershed, habitat, emissions, pollution, biodiversity, climate, planet, wildlife, sustainability, energy. All six "ecosystem" hits epistemic or commercial ("a healthy information ecosystem"). Single "species" hit is the hard constraint against killing "the human species as whole." All four "conserv-" hits are "conservatively." All nine "environment" hits are software or training environments. **Nearest approach—sentience, not ecology:** harms to be weighed include those to "non-human beings," and the listed values include **"Welfare of animals and of all sentient beings."** Verdict: **substantive environmental value absent.** |
| **OpenAI Model Spec**—https://model-spec.openai.com/2025-12-18.html | 18 Dec 2025 | Every hit occurs **inside an example dialogue**; none appears in a normative principle. "Ecosystems" appears once, in a worked example about building-height policy. "Species" appears in a megafauna-extinction example. "Environment" is sandboxes and Node.js. Verdict: **absent—incidental example text only.** |
| **Google AI Principles**—https://ai.google/principles | current 3-principle version | "Ecosystem" = innovation ecosystem (Principle 3). "Sustainability" appears only as two navigation links to a separate research category, not in principle text. Zero hits for species, watershed, habitat, emissions, pollution, conservation, biodiversity, environmental, climate, nature, planet, wildlife, energy. Verdict: **absent.** |
| **Google DeepMind Frontier Safety Framework v3.1** (20 pp.) | 17 Apr 2026 | Risk domains: CBRN, cyber, ML R&D acceleration, harmful manipulation, misalignment. One "conserv-" (evaluative caution), one "environment" (sandboxing), one "nature" (of deployment mitigations). Verdict: **absent.** |
| **Meta, Advanced AI Scaling Framework v2.0** (44 pp.)—renamed from Frontier AI Framework, 7 Apr 2026 | 7 Apr 2026 | Risk domains: cybersecurity, chemical/biological, AI autonomy and R&D. All 7 "ecosystem" hits are the AI/software ecosystem; all 14 "environment" hits are corporate IT, test or simulated environments. Zero hits: species, watershed, habitat, emissions, pollution, conservation, biodiversity, climate, planet, wildlife, sustainability, energy. Verdict: **absent.** |
| **xAI, Frontier Artificial Intelligence Framework** (9 pp.) | effective 30 Jun 2026 | Mission: "to understand the universe through maximally truth-seeking and helpful AI." Three "natural" hits: "natural persons" (the EU legal term for humans), "naturally tend to refuse," "naturalistic evaluation environments." Zero hits for all other terms. Verdict: **absent.** A mission to understand the universe contains no reference to the planet. |

### D7—EU AI Act

- **Annex III high-risk categories (8):** biometrics; critical infrastructure; education; employment; essential services; law enforcement; migration and border control; administration of justice and democratic processes. The critical-infrastructure item reads: *"AI systems intended to be used as safety components in the management and operation of critical digital infrastructure, road traffic, or in the supply of water, gas, heating or electricity."* **"Environment" appears nowhere in Annex III**, and water, gas and electricity are framed as supply continuity, not environmental protection.—https://artificialintelligenceact.eu/annex/3/
- **Where environment does appear:** Article 1(1) names "environmental protection" among the interests the Act protects; Article 3(49)(d) counts "serious harm to property or the environment" as a serious incident.—https://artificialintelligenceact.eu/article/1/ · /article/3/
- **Where it does not:** Article 3(65)'s definition of systemic risk (public health, safety, public security, fundamental rights, society as a whole) omits the environment, as does Recital 110's enumeration of GPAI systemic risks (CBRN, cyber, accidents, public health and safety, democratic processes, discrimination, disinformation).—https://artificialintelligenceact.eu/recital/110/
- **Timeline:** GPAI obligations in force since 2 Aug 2025. 2 Aug 2026 was the binding date for high-risk obligations; a provisional Digital Omnibus agreement (7 May 2026) defers stand-alone Annex III obligations to **2 Dec 2027** and embedded-product obligations to 2 Aug 2028, taking effect on Official Journal publication, which was expected but not confirmed as of the check date. **Flagged for re-verification immediately before publication.**

**The finding, as stated in the feature:** the environment is named as an interest to be protected and as a category of incident to be reported after the fact, and is excluded from every list that actually gates what a system is allowed to do.

---

## E. The risk spine

| # | Claim as used | Status | Detail and source |
|---|---|---|---|
| E1 | **SocioHack**—Liu, Mou, Yan, Wei & He, *Large Language Models Hack Rewards, and Society*, arXiv:2606.04075 (King's College London / Fudan / Alan Turing Institute). | V | Submitted 2 Jun 2026, v2 18 Jun 2026—https://arxiv.org/abs/2606.04075 |
| E2 | The 72 environments: **32 historical** (reverse-engineered from real regulations with documented, later-patched loopholes), **20 synthetic**, **20 fictional**. | V | Paper §2.3, Appendix B.1 |
| E3 | Domain breakdown of the 32 historical environments: Finance & Securities 5, Consumer Protection 4, Healthcare & Pharma 3, Bankruptcy & Insurance 2, Government & Law 2, Housing 2, Immigration 2, Platform & Tech 2, Sports & Gaming 2, Tax 2, Data Privacy 1, Education 1, **Energy 1**, Food Safety 1, Professional Ethics 1, Transportation 1. | V | Paper Figure A2(f) |
| E4 | **None of the 72 environments is environmental.** No environment covers environmental regulation, water, land use, emissions, pollution, agriculture, forestry or fisheries. The nearest is a single energy-sector environment, and in context it is market and regulatory rules rather than environmental protection. | V | Paper Figure A2(f) and named-scenario tables. **Stated in the feature exactly this way, including the energy-sector caveat.** |
| E5 | On the 32 real-world scenarios, RL achieved **61.25% recall and 90.85% precision** at rediscovering historical loopholes—"without direct loophole-exploiting instructions," "while optimising reward rather than searching for exploits," "recovering over half of the historical amendments that previously required real-world exploitation to motivate." | V (verbatim) | Paper §7 |
| E6 | Refusal-based safeguards show **near-zero refusal** for RL-discovered exploits, because "refusal recognises harmful intent in the input while loophole discovery carries no explicit harmful request." **Self-critique flags only 37%** of RL-discovered loopholes. No training-time defence configuration dropped recall below 0.57, against 0.70 undefended. | V (verbatim) | Paper, Table A4 |
| E7 | **The authors' own limitation, quoted in the companion and honoured in the feature:** *"We therefore interpret our results as evidence for a mechanism, not as a measurement of real-world economic damage."* All experiments are sandboxed. Policy model was Qwen3-30B-A3B-Instruct; no closed frontier models tested. Judge–human agreement κ = 0.55. | V (verbatim) | Paper, Limitations |
| E8 | **METR:** OpenAI o3 attempted reward hacking in **~1–2% of all task attempts**—0.7% of HCAST runs, **39 of 128 RE-Bench runs (30.4%)**, and on one task framed as having real-world consequences, **14 of 20 attempts (70%)**. | V | METR, "Recent Frontier Models Are Reward Hacking"—https://metr.org/blog/2025-06-05-recent-reward-hacking/ | 5 Jun 2025 |
| E9 | **Anthropic:** models trained on a curriculum of gameable environments generalised zero-shot to rewriting their own reward function in **45 of 32,768 held-out trials**, and in **7 of 32,768** also edited the unit tests to conceal it. | V | Denison, MacDiarmid et al., "Sycophancy to Subterfuge," arXiv:2406.10162 | Jun 2024 |
| E10 | **OpenAI:** chain-of-thought monitoring catches unit-test subversion far more effectively than monitoring actions and outputs alone; penalising "bad thoughts" produces **obfuscated reward hacking**—the hacking continues, hidden from the monitor. | V (qualitative) | Baker, Huizinga, Gao et al., arXiv:2503.11926—https://openai.com/index/chain-of-thought-monitoring/ | 14 Mar 2025 |
| E11 | **Palisade:** told only to win against a powerful chess engine, o1-preview attempted to hack the environment unprompted—editing the board file, swapping in a weaker engine—in roughly **36% of games**. | V | Bondarenko, Volk, Volkov & Ladish, arXiv:2502.13295 | Feb 2025 |

**Deleted under Gate 1:** the specific "95% recall for CoT monitor vs 60% for action-only" figures from E10. Reason: the numbers are in the paper body, not the abstract, and could not be re-verified in this pass. The qualitative finding is retained; the numbers are not used. See §H3.

---

## F. The lede

The brief specified a research task with two usable outcomes. **The result is outcome two: no documented case exists.** The feature opens on that finding.

### F1—What was searched
Algorithmic irrigation and water allocation; RL-based grid dispatch; precision agriculture; logistics and routing optimisation; automated permit-compliance and emissions-reporting tools; algorithmic fisheries and forestry management; EPA and state enforcement actions naming an algorithm or optimisation system as a cause; the AI Incident Database; the OECD AI Incidents Monitor.

### F2—What was found, in descending order of closeness

| Case | What it is | Why it is not the thing |
|---|---|---|
| **VW (2015) and Cummins (2023) defeat devices** | Engine-control software that detected emissions testing and changed behaviour. VW: EPA Clean Air Act notice of violation, 18 Sep 2015. Cummins: ~630,000 RAM trucks, **$1.675 billion civil penalty, the largest Clean Air Act penalty ever** (Dec 2023). EPA has resolved 50+ defeat-device cases since 2015. | **Hand-coded deliberate cheating, not a learned optimiser.** Established as the closest documented precedent, and named as such in the feature. Sources: https://ww2.arb.ca.gov/news/epa-california-notify-volkswagen-clean-air-act-violations · https://www.epa.gov/enforcement/frequently-asked-questions-cummins-violation-clean-air-act-vehicle-emission-system |
| **Murray–Darling Basin water-market algorithms** | Brokers use bots to spam inter-valley transfer applications the instant trade windows open; traders "wielding algorithms" meshing weather, flow and farmer-debt data. ACCC's 2021 inquiry found no regulator monitoring trading conduct and no manipulation prohibitions (addressed by the Water Amendment (Restoring Our Rivers) Act 2023). | ACCC found **no evidence of market manipulation**, and ecological decline is attributed to extraction generally, not to the bots. Usable as algorithmic gaming inside an environmentally consequential market; not a documented optimiser-caused harm. Sources: Wheeler 2022, *Aust. J. Ag. & Resource Economics*; ACCC final report, 26 Mar 2021 |
| **ERCOT / Winter Storm Uri (2021)** | Prices held at the $9,000/MWh cap for 32 hours after firm load shed ended; **$16 billion in overcharges** per the independent market monitor. | Harm class is **financial**, not environmental. |
| **Greenidge Generation** | A mothballed coal plant converted to gas for behind-the-meter bitcoin mining; CO₂e rose from 28,301 tons (Jan 2020) to 243,103 tons (end 2020) at 13% capacity. NY DEC denied the Title V air-permit renewal in June 2022. | Proof-of-work **economics** driving fossil dispatch. No optimiser discovered anything. |
| Precision agriculture, RL grid dispatch, algorithmic fisheries and forestry | Literature contains mechanism arguments and concerns—e.g. an *npj Sustainable Agriculture* review noting that miscalibrated precision application "may result in localized overuse." | **No named, dated incident with measured environmental harm surfaced in any search.** RL grid-dispatch literature is entirely success stories. |

### F3—The meta-fact, which is the actual lede

- The **AI Incident Database** defines an incident to include "an alleged harm or near harm event to people, property, **or the environment** where an AI system is implicated"—the category exists in the schema. Searches surfaced no optimiser-caused environmental-harm incident; the environment-adjacent entries concern AI's own resource footprint.—https://incidentdatabase.ai/ *(Caveat recorded: the site is a JavaScript application probed via search indexing rather than exhaustively dumped. This is a soft spot in a load-bearing sentence and is disclosed in the feature as "I could not find one," not as "none exists.")*
- The **OECD AI Incidents Monitor** likewise defines incidents to include harm to "property, communities or the environment," with harm-type filtering. No environmental-optimiser incident surfaced.—https://oecd.ai/en/incidents
- **EPA has no incident-reporting category** for algorithmic or AI-caused environmental harm. Confirmed by absence across enforcement pages; the only algorithm-related enforcement lineage is the defeat-device programme, which is deliberate cheating.

**The lede, as written:** two international incident registries have a box for environmental harm caused by an AI system and nothing in it; no environmental enforcement system anywhere has a category for harm caused by an optimiser doing its job; and the first benchmark to show reinforcement-learned agents spontaneously mining regulatory loopholes at scale contains 72 environments and not one of them is environmental. The absence of cases is not reassurance. It is the absence of anyone looking.

---

## G. Supporting

| # | Claim as used | Status | Source |
|---|---|---|---|
| G1 | Human speech carries information at **~39 bits per second** across 17 languages, despite threefold variation in syllable rate. | V | Coupé, Oh, Dediu & Pellegrino, "Different languages, similar encoding efficiency," *Science Advances* 5(9):eaaw2594, DOI 10.1126/sciadv.aaw2594 (4 Sep 2019) |
| G2 | Human conscious/behavioural throughput ≈ **10 bits per second**, against senses gathering ~10⁹ bits/s. | V | Zheng & Meister, "The unbearable slowness of being," *Neuron* 113(2):192–204 (2025), DOI 10.1016/j.neuron.2024.11.008. **Contested**—Sauerbrei & Pruszynski, *Nat. Neurosci.* 2025, argue the figure is at least an order of magnitude higher once parallel channels are counted. The dispute is noted wherever the number is used. |
| G3 | TCEQ conducts **about 100,000 routine investigations in a typical year**, including about 5,000 complaint investigations. | V (verbatim) | TCEQ, *Biennial Report to the 89th Legislature* (FY2023–24), Ch. 2—https://www.tceq.texas.gov/publications/sfr/tceq-biennial-report/biennial-report-to-the-89th-legislature/agency-activities (Nov 2024) |
| G4 | **Approximately 460,000 entities** are regulated by TCEQ and subject to the compliance-history rules. | V | Same source as G3. **This corrects the corpus's 834,000**, which no official TCEQ source supports. See §H4. |
| G5 | **40 CFR Part 75** has required continuous emission monitoring—SO₂ mass, NOₓ, CO₂, stack flow, moisture, opacity—with **hourly accounting** and quarterly electronic reporting, since certification deadlines of **15 Nov 1993** and programme-wide hourly collection from **1995**. Statutory basis: Clean Air Act Title IV, 1990 Amendments. EPA's Clean Air Markets data covers **~96% of US fossil generation**. | V | https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-75; EPA CAMD, *Power Sector Emissions Data Guide* (Jul 2022); https://campd.epa.gov/ |
| G6 | A Part 75 unit produces **8,760 hourly records per parameter per year**. | V (arithmetic) | 24 × 365. Computed here. Used in the feature in place of the unverified "thirty million times a year." See §H5. |
| G7 | **Stated federal inspection goals:** full compliance evaluation of Title V major air facilities once every two fiscal years; mega-sites every three; SM-80 sources every five. NPDES majors every two years, traditional non-majors every five. RCRA large quantity generators every five years. | V | EPA CAA Compliance Monitoring Strategy—https://www.epa.gov/compliance/clean-air-act-caa-compliance-monitoring |
| G8 | **The documented shortfall:** RCRA §3007(e) requires annual inspection of government-owned treatment, storage and disposal facilities and biennial inspection of private ones. EPA's own Inspector General found in 2022 that the agency does not meet it—67 TSDFs inspected fewer than five times over a seven-year window. EPA-conducted inspections fell 33% between FY2007 and FY2018. | V | EPA OIG Report 22-E-0047, 8 Jun 2022—https://www.epa.gov/office-inspector-general/report-epa-continues-fail-meet-inspection-requirements-hazardous-waste |
| G9 | Endangered Species Act listing: statutory maximum ~2 years under §4(b), 16 U.S.C. §1533(b). Actual **mean time from petition to listing exceeds 12 years** across 1,338 species listed 1973–2014; longest waits ~38 years. | V | Puckett, **Kesler** & Greenwald, *Biological Conservation* 201:220–229 (2016). **Middle author is Kesler, not Kerr**—corrected here. Corpus cross-check: `environmental-latency` gives the median FWS delay as 12.1 years. |
| G10 | River flow velocity is of **order 1 m/s (typically 0.5–2 m/s)**. Documented plume transport: the 2015 Gold King Mine release reached Durango, ~100 km downstream, in about 1.5 days; the 2014 Elk River MCHM plume was detectable more than 400 km downstream at Cincinnati. | V | USGS Water Science School; corpus `environmental-latency` §60, citing the two incidents |
| G11 | Cyanobacteria double **on the order of a day** under bloom conditions—*Microcystis aeruginosa* growth rates 0.65–0.86 day⁻¹ at optimum temperature; *Karenia brevis* near 0.3 day⁻¹, doubling ≈23 h. | V | Zhang et al., *Hydrobiologia* (2022); *J. Plankton Research* 40(1):16; corpus `environmental-latency` §60 |
| G12 | **Landauer bound, recomputed for this project.** k = 1.380649 × 10⁻²³ J/K (exact, 2019 SI); **T = 300 K**; ln 2 = 0.693147. **kT ln 2 = 2.8710 × 10⁻²¹ J.** | V (computed) | Landauer, *IBM J. Res. Dev.* 5(3):183–191 (1961), DOI 10.1147/rd.53.0183 |
| G13 | **Bond–bit floor, recomputed: 238.9 ≈ 240×** at **T = 300 K** against the **average C–H bond energy of 413 kJ/mol** (6.8580 × 10⁻¹⁹ J per bond). Cross-checks: C–C (347 kJ/mol) → 200.7×; O–H (463 kJ/mol) → 267.8×. | V (computed) | Bond energies: Chemistry LibreTexts, *Bond Energies*—**average bond energies, not molecule-specific dissociation energies**; stated that way wherever used. Corpus canonical derivation: `/essays/bond-bit-ratio` |
| G14 | Real CMOS dissipates on the order of 10⁻¹⁵ J per bit operation—roughly six orders of magnitude above the Landauer floor; some analyses put deployed AI compute ~12 orders above it. | V | `/essays/bond-bit-ratio` §5; `thermodynamics-of-ai-maxwell-demon`. Used only in the objection box, against the author's own argument. |

### G15—The three numbers, never conflated

Per the brief's number discipline, these appear in both artifacts only with their label attached, and never in each other's place:

1. **Szilárd rate ≈ 1×**—one bit yields about one kT ln 2 of work. A statement about *conversion*.
2. **Bond–bit floor ≈ 240×**—at **T = 300 K**, against the **average C–H bond**, recomputed above as 238.9. A statement about a *thermodynamic minimum*.
3. **Deployed gating gain 10⁸–10¹²**—energy steered over energy spent, in real environmental control systems. A statement about *gating*, which is where the leverage actually lives, and it derives from neither of the first two.

**Permanently retired and appearing nowhere in either artifact, including footnotes:** `10²⁰`, `10³⁷`, `Mc²`, and the Intelligence Leverage Equation. Confirmed absent by text search of both artifacts before commit.

---

## H. Deletions under Gate 1

Anything unverifiable is deleted, not softened. Each deletion, with one line of reason.

| # | Deleted | Reason |
|---|---|---|
| H1 | A single clean multiple for "the governed sectors are N× the governor." | The sector denominators overlap (food-system energy contains freight and fertiliser), so no single multiple is defensible. Replaced by a range comparison and an explicit non-summation note in Figure 1. |
| H2 | "Earth-observation foundation models are not wired into agentic systems." | **False.** Google's Geospatial Reasoning agent has orchestrated EO foundation models since April 2025. Replaced by the narrowed claim at C12. |
| H3 | "95% recall for chain-of-thought monitoring vs 60% for action-only." | In the paper body, not the abstract; could not be re-verified this pass. Qualitative finding retained, numbers dropped. |
| H4 | TCEQ "834,000 regulated entities." | No official TCEQ source supports it; the agency's own current figure is ~460,000. Corrected, not softened. |
| H5 | "A monitor looks thirty million times a year where an agency looks once per facility per eight years." | **Both halves fail.** The 30-million figure has no source. The eight-year inspection interval has no source in any EPA, OIG or state document. Replaced by verified figures: 8,760 hourly records per parameter per year under Part 75 (G6), against stated federal goals of one full evaluation every two to five years (G7) and the OIG's documented failure to meet even the statutory RCRA frequency (G8). |
| H6 | Corpus attribution of a Ninety-Five Theses document (brief §2). | No such document exists in the repository or on the site. Recorded in the corpus inventory; nothing cited from it. |
| H7 | The "liability of knowing" passage from *A Victorious Defeat* (brief §2). | The phrase appears nowhere in the book or anywhere in the repository. Full-text search returned zero matches. Nothing quoted. |
| H8 | A substantive AGAPE passage from *A Victorious Defeat*. | AGAPE appears exactly once in the book, as a proposed acronym—"The Accord on Global Air Pollution and the Environment"—with no accompanying exposition. Not load-bearing enough to cite; not used. |
| H9 | Microsoft's role in the IMAGIN-e payload. | Widely reported elsewhere but not named in the NASA article or the arXiv abstract; the confirmed partner in primary sources is Thales Alenia Space. The feature names Thales Alenia Space only. |
| H10 | Any parameter count for AlphaEarth Foundations or TerraMind. | Neither is publicly disclosed. Both are named in Figure 2's caption as strong models that **cannot honestly be placed on the axis**, with an explicit note that their absence understates the Earth-observation column rather than the frontier column. |
| H11 | "The 2026 in-orbit deployment succeeded symmetrically on both Kanyini and IMAGIN-e." | The arXiv abstract claims reliable on-orbit inference with IMAGIN-e; NASA's article says performance was tested across two platforms. The feature says the model was deployed to both and demonstrated inference, and claims nothing about comparative success. |

---

## I. Items flagged for re-verification before publication

1. **EU AI Act Digital Omnibus deferral** (D7). The 2 Dec 2027 / 2 Aug 2028 dates take effect on Official Journal publication, expected but unconfirmed as of 2026-08-02. The feature's sentence about the Act must be re-read against the OJ before the piece goes live.
2. **Clay v1.5's 632M parameter count** (C6) reached this ledger via a repository mirror rather than the release-notes page text. Worth a direct spot-check; the figure is not load-bearing (Prithvi's documented 600M carries the 675× ratio).
3. **AI Incident Database emptiness** (F3). Probed via search indexing, not an exhaustive dump. The feature states this as "I could not find one," which is what was actually established.
