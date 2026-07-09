---
title: "The Bond-Bit Ratio"
subtitle: "A derivation of why information is at least 240× cheaper than force"
slug: "bond-bit-ratio"
date: 2026-05-23
type: essay
status: published
tags: ["foundational", "physics", "information-theory", "landauer", "bond-bit-asymmetry", "enviroai", "causal-sovereignty"]
abstract: "Information is at least 240 times cheaper than force, as a matter of physical law. This page derives the floor ratio between Landauer's bound at 300 K and the C–H bond enthalpy, fixes the constants, and exists to be cited."
license: CC-BY-4.0
pdf: "/pdfs/bond-bit-ratio.pdf"
hero_image: "/images/bond-bit-ratio-hero.jpg"
hero_image_alt: "Landscape hero for The Bond-Bit Ratio—deep navy background with cyan, gold, and cream typography. Eyebrow: An essay by Jed Anderson. Two-line serif title: 'THE BOND-BIT' set in gold, italic cyan 'Ratio' beneath. The visual hero is a large cream '≥ 240×' marked 'THE FLOOR.' Subtitle: Why information is, as a matter of physical law, at least 240 times cheaper than force. Footer: No. 02 · Foundational · jedanderson.org · Houston · 2026."
pdf_canonical: true
schema_type: ScholarlyArticle
doi: "10.5281/zenodo.20723029"
ssrn_url: "https://ssrn.com/abstract=6958708"
show_abstract_on_page: true
date_modified: 2026-05-24
keywords:
  - "Landauer's principle"
  - "bond-bit asymmetry"
  - "information physics"
  - "environmental superintelligence"
  - "thermodynamics"
about:
  - "Landauer's principle"
  - "chemical bond energy"
  - "information theory"
---

*Version 1.1—May 24, 2026 (originally published May 23, 2026). Permanent URL. Revisions logged in the "Revision history" section at the bottom of this page; the URL and slug never change.*

> **Plain-language summary.** Erasing one bit of information costs at least 240 times less energy than breaking one chemical bond. This is a floor set by the second law of thermodynamics—no future engineering can push the ratio below it. In deployed systems the gap is already 10⁸ to 10¹² times wider. The number is set by physics and cannot be argued down.

## 1. The question

A single number sits underneath nearly every claim about information physics, environmental superintelligence, and the long-run economics of stewardship: the ratio between the thermodynamic cost of moving one bit of information and the energy required to break one chemical bond. The number is widely quoted, rarely derived in one place, and almost never pinned to its conventions. This essay derives it, fixes the constants, and exists to be cited.

## 2. The Landauer derivation

In 1961, Rolf Landauer proved that any logically irreversible operation—canonically, the erasure of a single bit—must dissipate a minimum heat into its surroundings of

E_bit ≥ kT ln 2

where k is Boltzmann's constant and T is the absolute temperature of the surrounding heat bath. The bound was experimentally verified by Bérut and colleagues in 2012 using a colloidal particle in a modulated double-well trap, and has since been reproduced across nanomagnetic, superconducting, and biological substrates.

Evaluate at planetary surface temperature:

- k = 1.380649 × 10⁻²³ J/K (exact, 2019 SI redefinition)
- T = 300 K (≈ 27 °C; close to global mean surface temperature)
- ln 2 ≈ 0.6931

E_bit ≈ (1.380649 × 10⁻²³ J/K) × (300 K) × (0.6931)
      ≈ **2.870 × 10⁻²¹ J/bit**

This is the *Landauer bound at 300 K*. It is the floor—the smallest physically possible energetic cost of irreversibly handling one bit of information in our atmosphere.

**A note on conventions.** Landauer's bound applies strictly to logically irreversible operations; reversible computation in principle has no such floor, which would only widen the asymmetry further. The bound also scales linearly with temperature—at cryogenic temperatures (4 K) the floor drops by roughly 75×. We evaluate at 300 K because every chemical transformation a biosphere cares about happens near planetary surface temperature, which is the relevant regime for environmental claims.

## 3. The bond comparison

The natural physical baseline for matter-state change is the energy required to break a chemical bond. Every transformation in industrial chemistry, agriculture, metabolism, and remediation is, at base, a sequence of bond breaks and bond formations. The energy budget of the physical world is denominated in bonds.

The carbon–hydrogen bond is the canonical reference: it is the most common bond in organic chemistry, the foundation of hydrocarbon combustion, and present in virtually every biological molecule. Its mean bond dissociation enthalpy is approximately 413 kJ/mol. Dividing by Avogadro's number gives the per-bond energy:

- ΔH_C–H ≈ 413 × 10³ J/mol
- N_A = 6.02214 × 10²³ /mol

E_bond ≈ (413 × 10³ J/mol) / (6.02214 × 10²³ /mol)
       ≈ **6.86 × 10⁻¹⁹ J/bond**

## 4. The ratio

Divide:

R = E_bond / E_bit ≈ (6.86 × 10⁻¹⁹ J) / (2.870 × 10⁻²¹ J) ≈ **239**

To the round number: **approximately 240×**. At the thermodynamic floor, breaking a single C–H bond costs at least 240 times the energy of erasing a single bit of information.

The ratio is robust to bond choice within an order of magnitude. For a stronger reference bond (O–H, ~463 kJ/mol) the ratio rises to ~270×; for a weaker one (C–C, ~347 kJ/mol) it falls to ~200×. Any common chemical bond, divided by Landauer's bound at 300 K, lands in the 200–300× window. The order of magnitude is invariant: information, at the limit, is two orders of magnitude cheaper than matter.

## 5. What the ratio is, and what it is not

The 240× figure is a **floor ratio**. It compares two theoretical lower bounds:

- *Numerator:* the minimum energy to dissociate one chemical bond, set by chemistry.
- *Denominator:* the minimum dissipation of one irreversible bit operation, set by the second law.

Neither bound describes what real systems pay. Real CMOS computation as of 2024 dissipates on the order of 10⁻¹⁵ J per bit operation—roughly six orders of magnitude above Landauer. Real industrial chemistry typically expends 10² to 10³ times the bare bond enthalpy on activation energy, heat losses, and process inefficiencies. The two real-world gaps do not cancel; they compound in information's favor.

The end-to-end *operational* ratio of "real cost to move a bit" versus "real cost to break a bond" is therefore not 240. In deployed systems it is typically in the range of **10⁸ to 10¹²**—eight to twelve orders of magnitude. The 240× figure is the **narrowest, most conservative, irreducible version** of the bond-bit asymmetry.

It is the version that cannot be argued away. No engineering improvement in computing hardware can take the ratio below 240×, because the denominator is fixed by the second law of thermodynamics and the numerator is fixed by the energetics of chemical bonding. Future improvements in computational efficiency only widen the gap.

This is the strict, defensible, citation-grade form of the asymmetry: **information is, as a matter of physical law, at least 240 times cheaper than force.**

## 6. How to cite this page

If you cite the 240× figure in a paper, talk, model, or argument, please cite this derivation as the canonical source:

```bibtex
@misc{anderson2026bondbit,
  author = {Anderson, Jed},
  title  = {The Bond-Bit Ratio: A derivation of why information is at least 240{\texttimes} cheaper than force},
  year   = {2026},
  url    = {https://jedanderson.org/essays/bond-bit-ratio},
  note   = {Derives the floor ratio between Landauer's bound at 300 K and one C--H bond enthalpy.}
}
```

APA and MLA forms are rendered in the *Cite this* block below.

A formal working-paper version is posted at SSRN: https://ssrn.com/abstract=6958708 (posted July 2026).

## 7. Where this ratio is used in the corpus

This page is the canonical derivation. The 240× figure is load-bearing in:

- [Bits Protect Its](/essays/bits-protect-its)—the full treatise behind the site's thesis
- [The Intelligence Leverage Equation](/essays/intelligence-leverage-equation)—Λ = Mc² / (I·k_BT·ln 2), the dimensionless form of the asymmetry
- [AI Is Now Writing More of Reality Than We Are](/essays/ai-is-now-writing-more-of-reality)—bit-rate estimates built on the Landauer floor
- [The Missing $Quadrillion](/essays/missing-quadrillion)—the economic channel that the bond-bit asymmetry opens
- [The Physics of Zero-Cost Stewardship](/essays/the-physics-of-zero-cost-stewardship)—the asymptotic case
- [The Thermodynamic Foundations of Entropic Shepherding](/essays/thermodynamic-foundations-of-entropic-shepherding)—the first-principles derivation of the leverage equation

## Revision history

- **v1.1—2026-05-24.** Clarifications and forward-reference section. Tightened the plain-language summary to specify bits and bonds explicitly and to surface the 10⁸–10¹² operational gap. Added a *note on conventions* at the end of section 2 covering reversible computation and the temperature dependence of the bound. Added section 7 listing the essays in which the 240× figure is load-bearing.
- **v1.0—2026-05-23.** Initial publication.
