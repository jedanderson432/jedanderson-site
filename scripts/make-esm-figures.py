#!/usr/bin/env python
"""Figures for the environmental-alignment feature and its technical companion.

Editorial register: flat fills, no gradients, no glow, no shields, no fern-and-circuit
imagery, no neon. Palette is Okabe-Ito (colourblind-safe). Captions are standalone.
Every figure exports as SVG and as a 300-dpi PNG into public/images/.

All long caption strings are manually line-broken: matplotlib's tight bounding box
expands the canvas around unwrapped text, which silently destroys the layout.

Run: python scripts/make-esm-figures.py
"""

import math
import os

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle

# ---------------------------------------------------------------- palette
OI = {
    "orange": "#E69F00",
    "sky":    "#56B4E9",
    "green":  "#009E73",
    "yellow": "#F0E442",
    "blue":   "#0072B2",
    "vermil": "#D55E00",
    "purple": "#CC79A7",
}
INK = "#1A1A1A"
GRID = "#DCDCDC"
MUTED = "#6E6E6E"
FAINT = "#F2F2F2"

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "public", "images"))
os.makedirs(OUT, exist_ok=True)

plt.rcParams.update({
    "font.family": "serif",
    "font.serif": ["Georgia", "Palatino Linotype", "DejaVu Serif", "serif"],
    "text.color": INK,
    "axes.labelcolor": INK,
    "xtick.color": INK,
    "ytick.color": INK,
    "axes.edgecolor": "#B0B0B0",
    "svg.fonttype": "none",
    "figure.facecolor": "white",
    "axes.facecolor": "white",
    "savefig.facecolor": "white",
})


def save(fig, stem):
    fig.savefig(os.path.join(OUT, stem + ".svg"), format="svg")
    fig.savefig(os.path.join(OUT, stem + ".png"), format="png", dpi=300)
    plt.close(fig)
    print("wrote", stem + ".svg", "+", stem + ".png")


# ================================================================ Figure 1
def figure_1():
    """Governor and governed."""
    fig = plt.figure(figsize=(11.0, 8.0))
    ax = fig.add_axes([0.255, 0.315, 0.705, 0.495])

    # ordered largest at top
    rows = [
        ("Global energy supply\nall sectors, 2023", 172000, 172000, MUTED),
        ("Agri-food systems\n~30% of world end-use energy", 36700, 51700, OI["green"]),
        ("Transport\n~29–30% of global final energy", 35400, 51700, OI["green"]),
        ("Global electricity generation\n2025", 31700, 31700, MUTED),
        ("Water supply and treatment\n~4% of global electricity", 1270, 1270, OI["green"]),
        ("Data centres, 2030\nIEA projection", 945, 950, OI["vermil"]),
        ("Data centres, 2025\nall, including AI", 485, 485, OI["vermil"]),
    ]

    ys = list(range(len(rows) - 1, -1, -1))
    for y, (label, lo, hi, colour) in zip(ys, rows):
        ax.barh(y, lo - 100, left=100, height=0.55, color=colour, zorder=3)
        if hi > lo:
            ax.barh(y, hi - lo, left=lo, height=0.55, color=colour, alpha=0.35,
                    edgecolor=colour, linewidth=1.0, zorder=3)
        txt = f"{lo:,.0f}" if hi == lo else f"{lo:,.0f}–{hi:,.0f}"
        ax.text(hi * 1.3, y, txt, va="center", ha="left", fontsize=10, color=INK)

    ax.set_yticks(ys)
    ax.set_yticklabels([r[0] for r in rows], fontsize=10.2)
    ax.set_xscale("log")
    ax.set_xlim(100, 1.6e6)
    ax.set_ylim(-0.75, len(rows) - 0.25)
    ax.set_xlabel("Annual energy throughput, terawatt-hours per year (logarithmic scale)",
                  fontsize=10.2, labelpad=9)
    ax.xaxis.grid(True, which="major", color=GRID, linewidth=0.8, zorder=0)
    ax.set_axisbelow(True)
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
    ax.tick_params(axis="y", length=0)
    ax.tick_params(axis="x", labelsize=9.5)

    ax.annotate("IEA: energy per AI task has been falling by at least an\n"
                "order of magnitude annually. The numerator shrinks per\n"
                "unit of work even as it grows in total. Shown, not hidden.",
                xy=(520, 0.32), xytext=(2.4e4, 1.35),
                fontsize=8.8, color=INK, ha="left", va="center",
                arrowprops=dict(arrowstyle="-", color=MUTED, linewidth=0.9,
                                connectionstyle="arc3,rad=0.2"))

    fig.text(0.035, 0.965, "The governor and the governed",
             fontsize=19, fontweight="bold", ha="left", va="top")
    fig.text(0.035, 0.918,
             "Computing's own energy use, set against the energy throughput of the systems computing is\n"
             "being handed authority over. The fight is about the smaller number.",
             fontsize=10.6, color=MUTED, ha="left", va="top")

    # colour key, drawn inline instead of a legend box that collides with the bars
    key = [(OI["vermil"], "the governor — computing's own footprint"),
           (OI["green"], "the governed — sectors being handed allocation authority"),
           (MUTED, "context totals")]
    kx = 0.035
    for colour, label in key:
        fig.patches.append(Rectangle((kx, 0.8395), 0.014, 0.011,
                                     transform=fig.transFigure,
                                     facecolor=colour, edgecolor="none",
                                     figure=fig))
        fig.text(kx + 0.020, 0.845, label, fontsize=9.0, color=INK,
                 ha="left", va="center")
        kx += 0.020 + 0.0055 * len(label) + 0.022

    fig.text(0.035, 0.225,
             "Sources — Data centres: IEA, Key Questions on Energy and AI (April 2026): 485 TWh in 2025; roughly 950 TWh and just under 3% of\n"
             "global electricity by 2030. Global electricity generation 2025: ~31,700 TWh, derived from Ember, Global Electricity Review 2026.\n"
             "Water sector: ~4% of global electricity, IEA Water-Energy Nexus (WEO-2016 special report). Agri-food: ~30% of world end-use\n"
             "energy, FAO. Transport: ~29–30% of global final energy, IEA and REN21. Global energy supply: ~620 EJ (2023), Energy Institute\n"
             "Statistical Review, converted at 277.8 TWh per EJ. Checked 2 August 2026.\n"
             "\n"
             "Method — The agri-food and transport bars are ranges because their published shares are of final energy, which is reported less\n"
             "consistently than electricity: the solid portion applies the share to total final consumption (~440 EJ), the pale portion extends it to\n"
             "total energy supply (~620 EJ). Data-centre figures are electricity only. The sector bars overlap one another — food-system energy\n"
             "already contains food freight and fertiliser — so they must never be summed. This is a comparison of magnitudes, not a budget.",
             fontsize=7.9, color=MUTED, ha="left", va="top", linespacing=1.45)

    save(fig, "governor-and-governed")


# ================================================================ Figure 2
def figure_2():
    """It has never read a river. The signature figure."""
    fig = plt.figure(figsize=(12.0, 11.0))
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis("off")

    # ---- title block
    ax.text(3.0, 97.5, "It has read everything we ever wrote.",
            fontsize=23, fontweight="bold", ha="left", va="top")
    ax.text(3.0, 93.0, "It has never read a river.",
            fontsize=23, fontweight="bold", ha="left", va="top", color=OI["blue"])
    ax.text(3.0, 87.6,
            "The machines being handed decisions about the physical world learned that world from our writing\n"
            "about it. The machines that can actually read the planet's instruments are hundreds of times smaller —\n"
            "and they are not connected to the ones making the calls.",
            fontsize=10.8, color=MUTED, ha="left", va="top", linespacing=1.5)

    # ---- geometry
    LX, RX = 3.0, 57.0          # column left edges
    SPAN = 36.0                 # bar span
    AXIS_Y = 33.0               # shared axis baseline
    TOP_ROW = 65.0
    ROW_H = 11.5

    def bar_len(params_b):
        lo, hi = math.log10(0.1), math.log10(3000)
        v = min(max(math.log10(params_b), lo), hi)
        return SPAN * (v - lo) / (hi - lo)

    # ---- column headers
    ax.text(LX, 78.5, "TRAINED ON WHAT WE SAID ABOUT THE WORLD",
            fontsize=11.0, fontweight="bold", color=OI["vermil"], family="sans-serif",
            va="center")
    ax.text(LX, 76.0,
            "General-purpose frontier models — the systems being given\n"
            "operational authority over food, water, freight and the grid",
            fontsize=9.3, color=MUTED, va="top", linespacing=1.4)

    ax.text(RX, 78.5, "TRAINED ON WHAT THE WORLD RECORDED",
            fontsize=11.0, fontweight="bold", color=OI["blue"], family="sans-serif",
            va="center")
    ax.text(RX, 76.0,
            "Earth-observation foundation models — the systems that can\n"
            "read satellites, rivers, air and land directly",
            fontsize=9.3, color=MUTED, va="top", linespacing=1.4)

    left = [
        ("Llama 3.1 405B", 405.0,
         "405 billion parameters · 15 trillion tokens of text", True),
        ("GPT-4 class", 1800.0,
         "~1.8 trillion parameters · third-party estimate, never disclosed", False),
    ]
    right = [
        ("Prithvi-EO-2.0  NASA / IBM", 0.6,
         "600 million parameters · 4.2 million satellite time-series samples", True),
        ("Clay v1.5", 0.632,
         "632 million parameters · ~70 million global image chips", True),
        ("Aurora  Microsoft", 1.3,
         "1.3 billion parameters · >1 million hours of geophysical data", True),
    ]

    def draw_column(x0, models, colour, y_start=None):
        y = TOP_ROW if y_start is None else y_start
        for name, p, sub, documented in models:
            L = bar_len(p)
            ax.text(x0, y + 4.6, name, fontsize=11.0, fontweight="bold", va="center")
            ax.add_patch(Rectangle((x0, y - 1.0), max(L, 0.6), 3.6,
                                   facecolor=colour,
                                   alpha=1.0 if documented else 0.38,
                                   edgecolor=colour, linewidth=1.1, zorder=3))
            if not documented:
                ax.text(x0 + L + 1.0, y + 0.8, "estimate", fontsize=8.2,
                        color=MUTED, style="italic", va="center")
            ax.text(x0, y - 4.2, sub, fontsize=8.6, color=MUTED, va="center")
            y -= ROW_H

    # the left column carries two models against the right column's three; centring it
    # keeps the comparison level instead of leaving a hole under the shorter column
    draw_column(LX, left, OI["vermil"], y_start=TOP_ROW - ROW_H / 2.0)
    draw_column(RX, right, OI["blue"])

    # ---- shared log axes
    for x0 in (LX, RX):
        ax.plot([x0, x0 + SPAN], [AXIS_Y, AXIS_Y], color="#B4B4B4", lw=0.9, zorder=2)
        for p, lab in [(0.1, "100M"), (1, "1B"), (10, "10B"), (100, "100B"), (1000, "1T")]:
            xt = x0 + bar_len(p)
            ax.plot([xt, xt], [AXIS_Y, AXIS_Y - 1.0], color="#B4B4B4", lw=0.9, zorder=2)
            ax.text(xt, AXIS_Y - 2.0, lab, fontsize=8.0, color=MUTED,
                    ha="center", va="top")
        ax.text(x0 + SPAN / 2, AXIS_Y - 4.4, "model size — parameters, logarithmic scale",
                fontsize=8.3, color=MUTED, ha="center", va="top", style="italic")

    # ---- the ratio, in the channel between the columns
    CX = (LX + SPAN + RX) / 2.0
    ax.text(CX, 54.0, "675×", fontsize=26, fontweight="bold",
            color=INK, ha="center", va="center")
    ax.text(CX, 50.0,
            "the documented gap\n405 billion parameters\nagainst 600 million",
            fontsize=8.4, color=MUTED, ha="center", va="top", linespacing=1.5)

    # ---- THE GAP: an explicit channel, drawn as not-connected
    gy0, gy1 = 12.0, 25.6
    ax.add_patch(Rectangle((LX, gy0), (RX + SPAN) - LX, gy1 - gy0,
                           facecolor=FAINT, edgecolor="none", zorder=1))
    ax.text(CX, gy1 - 1.4, "NOT WIRED TOGETHER",
            fontsize=13.0, fontweight="bold", color=INK, ha="center", va="top",
            family="sans-serif")

    ymid = gy1 - 5.6
    ax.plot([LX + 3.0, CX - 6.5], [ymid, ymid], color=OI["vermil"], lw=1.8,
            solid_capstyle="butt", zorder=4)
    ax.plot([CX + 6.5, RX + SPAN - 3.0], [ymid, ymid], color=OI["blue"], lw=1.8,
            solid_capstyle="butt", zorder=4)
    for k in range(4):
        xa = CX - 6.0 + k * 3.2
        ax.plot([xa, xa + 1.6], [ymid, ymid], color="#BBBBBB", lw=1.4, zorder=4)

    ax.text(CX, ymid - 2.0,
            "As of August 2026, no Earth-observation foundation model sits inside an autonomous decision loop with\n"
            "authority over a physical system. Where the two have been joined at all — Google's Earth AI and its\n"
            "Geospatial Reasoning agent — it is limited-release, decision-support, and human-in-the-loop by design.",
            fontsize=8.9, color=INK, ha="center", va="top", linespacing=1.5)

    # ---- sources
    ax.text(3.0, 10.0,
            "Sources — Llama 3.1 405B: Meta AI, July 2024; 405B parameters, more than 15T training tokens; the largest frontier model with an officially published\n"
            "parameter count. GPT-4 ~1.8T: SemiAnalysis estimate, 2023, never confirmed by OpenAI, shown faded for that reason. Prithvi-EO-2.0: NASA and IBM,\n"
            "arXiv:2412.02732; 300M and 600M variants trained on 4.2M global time-series samples from NASA's Harmonized Landsat and Sentinel-2 archive. Clay v1.5:\n"
            "Clay Foundation, open source. Aurora: Microsoft Research, Nature 641 (2025) — an Earth-system model rather than an imagery model, shown for scale.\n"
            "Not shown, for cause — AlphaEarth Foundations (Google DeepMind, 2025) and TerraMind (IBM and ESA, 2025) are among the strongest models in this\n"
            "class, but neither publishes a parameter count, so neither can be honestly placed on this axis. Their absence understates the right-hand column, not the\n"
            "left. Checked 2 August 2026.",
            fontsize=7.6, color=MUTED, ha="left", va="top", linespacing=1.5)

    save(fig, "it-has-never-read-a-river")


# ================================================================ Figure 3
def figure_3():
    """The proxy stack, carrying the latency thesis.

    Left: the stack of substitutions, each necessary, each opening a gap.
    Right: the gap widths — fixed, irreducible, unchanged for fifty years.
    Bottom: the variable that actually moved. Exploitability is the gap times
    the search you can afford, and the second term is collapsing.
    """
    fig = plt.figure(figsize=(11.5, 9.6))
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis("off")

    layers = [
        ("What we actually want",
         "A river people and fish can live in. Air that does not shorten a life.",
         0.00, OI["blue"]),
        ("The statutory standard",
         "\"Requisite to protect public health with an adequate margin of safety.\"",
         0.13, OI["blue"]),
        ("The numeric criterion",
         "An ambient standard, an effluent limit, a listing threshold.",
         0.33, OI["sky"]),
        ("The permit condition",
         "Facility limits, averaging periods, applicability cutoffs, netting baselines.",
         0.55, OI["orange"]),
        ("The measurement rule",
         "Emission factors, test methods, substitute data for missing hours.",
         0.79, OI["vermil"]),
        ("The reported number",
         "The only layer an automated system ever sees.",
         1.00, OI["vermil"]),
    ]

    x0, box_w = 7.0, 50.0
    top, bot = 84.0, 38.0
    h = (top - bot) / len(layers)
    gx0 = x0 + box_w + 3.0
    max_gap = 24.0

    ax.text(gx0, top + 2.6, "the gap this opens",
            fontsize=9.6, color=OI["vermil"], fontweight="bold", va="bottom")

    for i, (name, desc, drift, colour) in enumerate(layers):
        y = top - (i + 1) * h
        ax.add_patch(Rectangle((x0, y + 0.7), box_w, h - 1.4,
                               facecolor=colour, alpha=0.11 + 0.085 * i,
                               edgecolor=colour, linewidth=1.2, zorder=3))
        ax.text(x0 + 1.8, y + h / 2 + 1.6, name, fontsize=10.8,
                fontweight="bold", va="center")
        ax.text(x0 + 1.8, y + h / 2 - 2.1, desc, fontsize=8.1, color=MUTED, va="center")

        gw = max_gap * drift
        if gw > 0.5:
            ax.add_patch(Rectangle((gx0, y + 1.2), gw, h - 2.4,
                                   facecolor=OI["vermil"], alpha=0.14 + 0.10 * i,
                                   edgecolor="none", zorder=3))

    ax.annotate("", xy=(x0 - 2.4, bot + 0.4), xytext=(x0 - 2.4, top - 0.4),
                arrowprops=dict(arrowstyle="-|>", color=MUTED, linewidth=1.3), zorder=2)
    ax.text(x0 - 4.2, (top + bot) / 2,
            "each layer trades something meant\nfor something measurable",
            fontsize=8.8, color=MUTED, rotation=90, va="center", ha="center",
            linespacing=1.5)

    ax.text(gx0 + max_gap + 2.0, bot + h * 1.6,
            "These widths are\nfixed. They are the\nprice of a rule a\nstranger can verify.\nNo drafting closes\nthem.",
            fontsize=8.6, color=INK, va="center", ha="left", linespacing=1.6)

    # ---- title
    ax.text(4.0, 96.5, "The proxy stack, and the variable that moved",
            fontsize=19.5, fontweight="bold", va="top")
    ax.text(4.0, 91.8,
            "Every layer of environmental law substitutes a number for an intention. Every substitution opens a gap.\n"
            "The gaps have been there for fifty years. What kept them shut was never the drafting.",
            fontsize=10.4, color=MUTED, va="top", linespacing=1.5)

    # ================= lower panel: the latency thesis =================
    py0, py1 = 10.0, 36.0
    ax.add_patch(Rectangle((4.0, py0), 92.0, py1 - py0,
                           facecolor=FAINT, edgecolor="none", zorder=1))

    ax.text(7.0, py1 - 2.0, "EXPLOITABILITY  =  THE GAP  ×  THE SEARCH YOU CAN AFFORD",
            fontsize=12.4, fontweight="bold", family="sans-serif", va="top", zorder=4)

    base, topy = 17.6, 28.4   # floor and start height for the decay curve

    # left term: fixed
    ax.text(7.0, py1 - 5.8, "constant since 1970", fontsize=8.6, color=MUTED, va="top")
    ax.plot([7.0, 34.0], [(base + topy) / 2, (base + topy) / 2],
            color=OI["vermil"], lw=3.2, solid_capstyle="butt", zorder=4)
    ax.text(7.0, base - 1.0, "the gaps", fontsize=9.2, color=OI["vermil"],
            fontweight="bold", va="top")

    # right term: collapsing, drawn as a real decay
    ax.text(44.0, py1 - 5.8, "collapsing now", fontsize=8.6, color=MUTED, va="top")
    n = 40
    xs, ys = [], []
    for i in range(n):
        t = i / (n - 1)
        xs.append(44.0 + t * 38.0)
        ys.append(base + (topy - base) * math.exp(-5.2 * t))
    ax.plot(xs, ys, color=OI["blue"], lw=3.2, solid_capstyle="round", zorder=4)
    ax.plot([82.0, 88.5], [ys[-1], ys[-1]], color=OI["blue"], lw=3.0,
            linestyle=(0, (3, 3)), solid_capstyle="butt", zorder=4)
    ax.text(44.0, base - 1.0, "the cost of searching them",
            fontsize=9.2, color=OI["blue"], fontweight="bold", va="top")
    ax.text(89.4, ys[-1], "zero", fontsize=10.5, color=OI["blue"],
            fontweight="bold", va="center", ha="left", family="sans-serif")

    ax.text(7.0, py0 + 2.4,
            "Lawyers. Hours. Budgets. A loophole hunt competed against a quarterly deadline, so most gaps went unsearched.",
            fontsize=8.8, color=INK, va="center", zorder=4)

    # ---- caption
    ax.text(4.0, 7.6,
            "Fifty years of regulatory stability rested on the second term, not the first. Reinforcement learning has now rediscovered more than sixty per cent\n"
            "of the loopholes that real regulations had to be amended to close—while merely optimising a reward, with no instruction to look for exploits\n"
            "(Liu et al., arXiv:2606.04075, June 2026; sandboxed, and evidence for a mechanism rather than a measurement of damage). None of that\n"
            "benchmark's seventy-two regulatory environments is environmental. Sources and every figure: analysis/fact-ledger.md. Checked 2 August 2026.",
            fontsize=7.9, color=MUTED, ha="left", va="top", linespacing=1.55)

    save(fig, "the-proxy-stack")


# ================================================================ Figure 4
def figure_4():
    """The alarm-to-interlock ladder."""
    fig = plt.figure(figsize=(11.0, 8.2))
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis("off")

    levels = [
        ("L0", "Instrumentation",
         "The system can perceive environmental state at all. Sensors, satellites, telemetry, inside the loop.",
         OI["sky"]),
        ("L1", "Annunciation",
         "An advisory flag. The system says so. Nothing is stopped. This is where the art currently is.",
         OI["sky"]),
        ("L2", "Deviation logging",
         "An auditable record of every environmental deviation, written where the optimiser cannot reach it.",
         OI["sky"]),
        ("L3", "Permissive",
         "An affirmative environmental check is required before the action is allowed to proceed.",
         OI["orange"]),
        ("L4", "Interlock",
         "A trip that fires on physical criteria regardless of the task objective, outside the optimiser's reach.",
         OI["vermil"]),
        ("L5", "Embedded objective",
         "The environmental criterion sits in the grading signal itself: non-proxiable, held outside the agent.",
         OI["vermil"]),
    ]

    x0, box_w = 25.0, 50.0
    bot, top = 20.0, 80.0
    h = (top - bot) / len(levels)

    for i, (code, name, desc, colour) in enumerate(levels):
        y = bot + i * h
        ax.add_patch(Rectangle((x0, y + 0.9), box_w, h - 1.8,
                               facecolor=colour, alpha=0.13,
                               edgecolor=colour, linewidth=1.2, zorder=3))
        ax.text(x0 + 2.0, y + h / 2, code, fontsize=13.0, fontweight="bold",
                color=colour, va="center", family="sans-serif")
        ax.text(x0 + 8.4, y + h / 2 + 1.8, name, fontsize=11.0,
                fontweight="bold", va="center")
        ax.text(x0 + 8.4, y + h / 2 - 2.3, desc, fontsize=7.9, color=MUTED, va="center")

    yline = bot + 3 * h
    ax.plot([x0 - 2.5, x0 + box_w + 2.5], [yline, yline], color=INK, lw=2.2, zorder=5)
    ax.text(x0 + box_w + 3.0, yline + 0.7,
            "ABOVE: can stop something",
            fontsize=8.6, color=INK, va="bottom", ha="left", family="sans-serif")
    ax.text(x0 + box_w + 3.0, yline - 0.7,
            "BELOW: can only say so",
            fontsize=8.6, color=MUTED, va="top", ha="left", family="sans-serif")
    ax.text(x0 - 3.0, yline + 0.9, "the alarm / interlock threshold",
            fontsize=9.4, fontweight="bold", va="bottom", ha="right")

    y_soa = bot + h + h / 2
    ax.annotate("state of the art, August 2026\nincluding my own work",
                xy=(x0 - 0.6, y_soa), xytext=(x0 - 3.5, y_soa),
                fontsize=9.0, color=OI["vermil"], ha="right", va="center",
                fontweight="bold", linespacing=1.4,
                arrowprops=dict(arrowstyle="-|>", color=OI["vermil"], linewidth=1.4))

    ax.text(4.0, 96.0, "The alarm-to-interlock ladder",
            fontsize=19, fontweight="bold", va="top")
    ax.text(4.0, 91.0,
            "Environmental Safety Mode, stated in the language of process safety.\n"
            "The entire engineering programme is the distance from L1 to L4.",
            fontsize=10.6, color=MUTED, va="top", linespacing=1.5)

    ax.text(4.0, 13.5,
            "Every plant engineer has watched a safety instrumented system trip a unit over the board operator's objection. That is what L4\n"
            "means, and it is why the line falls where it does: an alarm is a request, an interlock is not. Environmental capability in AI systems\n"
            "today sits at L1 — advisory, overridable, and outranked by the task objective whenever the two disagree. Nothing above the line\n"
            "exists yet for environmental criteria in any deployed general-purpose system.",
            fontsize=8.3, color=MUTED, ha="left", va="top", linespacing=1.5)

    save(fig, "alarm-to-interlock-ladder")


# ================================================================ social hero
def social_hero():
    """LinkedIn hero. Near-black, sparse, single accent. No mark, no shield, no fern."""
    fig = plt.figure(figsize=(12.0, 6.3))
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis("off")
    ax.add_patch(Rectangle((0, 0), 100, 100, facecolor="#0E0E10", edgecolor="none"))

    # single accent: one horizontal rule, broken in the middle. The whole design is the break.
    y = 47.0
    ax.plot([8, 43], [y, y], color="#E8E4DC", lw=2.0, solid_capstyle="butt")
    ax.plot([57, 92], [y, y], color=OI["orange"], lw=2.0, solid_capstyle="butt")

    ax.text(8, 74, "THE LATENCY BET",
            color="#E8E4DC", fontsize=23.0, fontweight="bold", va="center",
            family="sans-serif")
    ax.text(8, 63, "ENVIRONMENTAL LAW NEVER REGULATED BEHAVIOUR.",
            color=OI["orange"], fontsize=15.0, fontweight="bold", va="center",
            family="sans-serif")

    ax.text(8, 38,
            "It regulated behaviour at human search speed.\n"
            "The gaps were always there. What kept them shut\n"
            "was that finding one took a lawyer a week.",
            color="#B9B5AD", fontsize=12.4, va="top", linespacing=1.75)

    ax.text(8, 12, "JED ANDERSON   ·   INDEPENDENT RESEARCHER, HOUSTON, TEXAS",
            color="#6C6862", fontsize=8.6, va="center", family="sans-serif")

    save(fig, "the-latency-bet-social-hero")


if __name__ == "__main__":
    # figure_2 ("it has never read a river") now belongs to the companion only;
    # it is regenerated by running figure_2() explicitly, not on the default pass.
    figure_1()
    figure_2()
    figure_3()
    figure_4()
    social_hero()
