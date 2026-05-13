# Constant Contact Ingestion Report (V2 — Rebuild)

Generated: 2026-05-13T14:07:41

This report covers the **rebuild** that followed `docs/CC_DIAGNOSTIC.md`. 
V1 published 544 posts with HTML-entity-leaking slugs, zero markdown image refs, 
and bodies dominated by `| | | --- | --- |` table skeleton. V2 patches the 
extractor with table-flattening, entity-decode, and background-image harvest.

## Summary

- Total CC archive posts: **931**
  - Published: **687**
  - Drafts (quarantined): **244**
- Date range: 2020-02-06 → 2023-08-26

## Quarantine reasons

| reason bucket | count |
|---------------|-------|
| short | 162 |
| dedup | 82 |

## Image-localization success (the key V2 metric)

V1 had 16K image files on disk but **zero** `![]()` references in markdown bodies. 
V2 should now have references that match disk files.

- Total image files on disk: **13732**
- Total `![]()` references in markdown bodies: **9091**
- Posts with at least one image file on disk: **849**
- Posts with at least one markdown image ref: **660**
- Ratio (md-refs / on-disk-files): **66.2%**

## Failure-pattern probes

These should all be zero or near-zero after V2:

- Posts containing HTML entities (`&amp;`, `&quot;`, etc.): **0**
- Posts containing pipe-table skeleton (`| --- |`): **0**

## Published-post word-count distribution

| bucket | count |
|--------|-------|
| <50 | 141 |
| 50-99 | 183 |
| 100-249 | 237 |
| 250-999 | 87 |
| 1000-4999 | 14 |
| 5000+ | 25 |

## Top 25 longest published posts

| date | title | slug | words | md image refs | files on disk |
|------|-------|------|-------|---------------|---------------|
| 2023-07-30 | Whitney Houston . . . and the "Single-Electron Postulate" . . . | `whitney-houston-and-the-single-electron-postulate` | 14678 | 136 | 137 |
| 2023-07-23 | Where there is magic . . . | `where-there-is-magic` | 14168 | 128 | 129 |
| 2023-06-30 | Harbor or open sea? | `harbor-or-open-sea` | 13790 | 116 | 117 |
| 2022-04-10 | It's not the game-board . . . | `its-not-the-game-board` | 12637 | 121 | 122 |
| 2022-04-09 | The amount of space in space is incredible. | `the-amount-of-space-in-space-is-incredible` | 12445 | 136 | 137 |
| 2022-03-27 | If it looks like a duck . . . | `if-it-looks-like-a-duck` | 12375 | 118 | 119 |
| 2022-02-13 | I LOVE OPEN SPACE! . . . MORE ROOM TO ROAM! | `i-love-open-space-more-room-to-roam` | 12311 | 129 | 130 |
| 2021-12-18 | Moving my coffee cup . . . | `moving-my-coffee-cup` | 12186 | 79 | 80 |
| 2023-02-20 | Scientists still "abuzz" . . . news stories still churning . . . | `scientists-still-abuzz-news-stories-still-churning` | 12022 | 123 | 124 |
| 2022-01-31 | . . . our youth are getting so far ahead of us . . . it's awesome! | `our-youth-are-getting-so-far-ahead-of-us-its-awesome` | 11933 | 123 | 124 |
| 2023-02-18 | 74% of universe . . . coming from __________ | `74-of-universe-coming-from` | 11923 | 115 | 116 |
| 2021-12-10 | Exploration . . . Discovery . . . Wonder! | `exploration-discovery-wonder` | 11834 | 69 | 70 |
| 2022-11-24 | Thanksgiving . . . for Black Holes | `thanksgiving-for-black-holes` | 11758 | 112 | 113 |
| 2022-02-22 | Campfires . . . and imagination | `campfires-and-imagination` | 11228 | 93 | 94 |
| 2022-03-20 | Reality . . . my simplest example yet . . . | `reality-my-simplest-example-yet` | 10884 | 83 | 84 |
| 2022-04-24 | Follow-up . . . "World Quantum Day | `follow-up-world-quantum-day` | 10791 | 54 | 55 |
| 2021-11-19 | in the news . . . | `in-the-news` | 10778 | 69 | 70 |
| 2022-05-01 | Entropy . . . Information Theory . . . and the Holographic Principle | `entropy-information-theory-and-the-holographic-principle` | 10675 | 54 | 55 |
| 2022-04-14 | Today is "World Quantum Day" . . . April 14th | `today-is-world-quantum-day-april-14th` | 10513 | 45 | 46 |
| 2021-11-15 | Metaverse . . . will nature get left behind? . . . and left out? | `metaverse-will-nature-get-left-behind-and-left-out` | 10344 | 57 | 58 |
| 2021-11-26 | A Thought Experiment for you . . . | `a-thought-experiment-for-you` | 10238 | 34 | 35 |
| 2022-01-08 | Can I protect you and nature? | `can-i-protect-you-and-nature` | 10195 | 39 | 40 |
| 2022-01-16 | Skill set I work on the most . . . | `skill-set-i-work-on-the-most` | 10187 | 38 | 39 |
| 2021-10-12 | Space-Time" . . . and environmental protection | `space-time-and-environmental-protection` | 8618 | 9 | 10 |
| 2022-05-21 | SO EXCITED . . . about Artificial General Intelligence!!!!!!!!!!!!!!!!!!!!!!!!!! | `so-excited-about-artificial-general-intelligence` | 8362 | 11 | 12 |

## Top 25 published posts by image count

| date | title | slug | words | md image refs | files on disk |
|------|-------|------|-------|---------------|---------------|
| 2022-04-09 | The amount of space in space is incredible. | `the-amount-of-space-in-space-is-incredible` | 12445 | 136 | 137 |
| 2023-07-30 | Whitney Houston . . . and the "Single-Electron Postulate" . . . | `whitney-houston-and-the-single-electron-postulate` | 14678 | 136 | 137 |
| 2022-02-13 | I LOVE OPEN SPACE! . . . MORE ROOM TO ROAM! | `i-love-open-space-more-room-to-roam` | 12311 | 129 | 130 |
| 2023-07-23 | Where there is magic . . . | `where-there-is-magic` | 14168 | 128 | 129 |
| 2022-01-31 | . . . our youth are getting so far ahead of us . . . it's awesome! | `our-youth-are-getting-so-far-ahead-of-us-its-awesome` | 11933 | 123 | 124 |
| 2023-02-20 | Scientists still "abuzz" . . . news stories still churning . . . | `scientists-still-abuzz-news-stories-still-churning` | 12022 | 123 | 124 |
| 2022-04-10 | It's not the game-board . . . | `its-not-the-game-board` | 12637 | 121 | 122 |
| 2022-03-27 | If it looks like a duck . . . | `if-it-looks-like-a-duck` | 12375 | 118 | 119 |
| 2023-06-30 | Harbor or open sea? | `harbor-or-open-sea` | 13790 | 116 | 117 |
| 2023-02-18 | 74% of universe . . . coming from __________ | `74-of-universe-coming-from` | 11923 | 115 | 116 |
| 2022-11-24 | Thanksgiving . . . for Black Holes | `thanksgiving-for-black-holes` | 11758 | 112 | 113 |
| 2022-01-25 | NASA News: "Webb Space Telescope reaches destination . . . 1 million miles from  | `nasa-news-webb-space-telescope-reaches-destination-1-million-miles-from-earth-wh` | 4813 | 101 | 102 |
| 2022-02-20 | . . . staring at the elecromagnetism chart | `staring-at-the-elecromagnetism-chart` | 3596 | 98 | 99 |
| 2022-02-22 | Campfires . . . and imagination | `campfires-and-imagination` | 11228 | 93 | 94 |
| 2022-03-20 | Reality . . . my simplest example yet . . . | `reality-my-simplest-example-yet` | 10884 | 83 | 84 |
| 2022-02-11 | Danger? | `danger` | 3557 | 81 | 82 |
| 2021-12-18 | Moving my coffee cup . . . | `moving-my-coffee-cup` | 12186 | 79 | 80 |
| 2022-07-11 | WOW . . . Look at this picture of the UNIVERSE just released . . . just stare at | `wow-look-at-this-picture-of-the-universe-just-released-just-stare-at-it` | 3105 | 78 | 79 |
| 2022-01-13 | Jed singing to Betty White . . . 30 years ago . . . | `jed-singing-to-betty-white-30-years-ago` | 3735 | 74 | 75 |
| 2021-12-10 | Exploration . . . Discovery . . . Wonder! | `exploration-discovery-wonder` | 11834 | 69 | 70 |
| 2021-11-19 | in the news . . . | `in-the-news` | 10778 | 69 | 70 |
| 2021-10-07 | Why not faster development? | `why-not-faster-development` | 575 | 64 | 65 |
| 2021-10-05 | Haiti . . . and EnviroAI | `haiti-and-enviroai` | 404 | 59 | 60 |
| 2021-11-15 | Metaverse . . . will nature get left behind? . . . and left out? | `metaverse-will-nature-get-left-behind-and-left-out` | 10344 | 57 | 58 |
| 2022-05-01 | Entropy . . . Information Theory . . . and the Holographic Principle | `entropy-information-theory-and-the-holographic-principle` | 10675 | 54 | 55 |
