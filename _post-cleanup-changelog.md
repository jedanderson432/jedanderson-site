# Post encoding cleanup changelog

Run: 2026-05-29 11:30 UTC
Scope: `src/content/posts/*.md` only (1235 files scanned).
Files modified: **84**.

Operations applied (posts only):
1. Windows-1252-as-UTF-8 mojibake repair (signature-gated round-trip).
2. HTML entity decode (semicolon-terminated `&name;` / `&#nnn;` only).
3. Spaced em-dash → unspaced (`word—word`).

Originals of every modified file are in `_post-cleanup-backup/` (gitignored).

## Files touched

### 74-of-universe-coming-from.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### a-thought-experiment-for-you.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### be-light.md

```diff
-"From within or from behind, a light shines through us upon things, and makes us aware that we are nothing, but the light is all." —Ralph Waldo Emerson
+"From within or from behind, a light shines through us upon things, and makes us aware that we are nothing, but the light is all."—Ralph Waldo Emerson
```

### best-quotes-about-the-clean-air-act.md

```diff
-> —-**“The Court helped out a stupid statute, but we still have a stupid statute.”**—David Schoenbrod
+>—-**“The Court helped out a stupid statute, but we still have a stupid statute.”**—David Schoenbrod
-> —-**“The Court really had to ‘shoehorn’ this result into this antique statute.”**—David Schoenbrod
+>—-**“The Court really had to ‘shoehorn’ this result into this antique statute.”**—David Schoenbrod
-> —-**“The Clean Air Act as it was enacted in 1970 is no good whatsoever with dealing with pollutants that go across State lines.**“—David Schoenbrod
+>—-**“The Clean Air Act as it was enacted in 1970 is no good whatsoever with dealing with pollutants that go across State lines.**“—David Schoenbrod
-> —-**“It [the Clean Air Act] was designed with the thought in mind that most pollution that we breathe in comes from sources in our State.  Therefore, Congress could tell the States to clean up their acts and everything would be fine.  The problem is today the vast bulk of pollution comes from many, many hundreds, if not thousands of miles away, so it’s really a national problem.  So it’s kind of nuts to have the Federal Government telling the States to regulate pollution.”**—David Schoenbrod
+>—-**“It [the Clean Air Act] was designed with the thought in mind that most pollution that we breathe in comes from sources in our State.  Therefore, Congress could tell the States to clean up their acts and everything would be fine.  The problem is today the vast bulk of pollution comes from many, many hundreds, if not thousands of miles away, so it’s really a national problem.  So it’s kind of nuts to have the Federal Government telling the States to regulate pollution.”**—David Schoenbrod
… (+2 more changed lines)
```

### bruce-lee-and-the-clean-air-act.md

```diff
-- “The Clean Air Act is complicated and contentious”. —Senate Environment and Public Works Committee
+- “The Clean Air Act is complicated and contentious”.—Senate Environment and Public Works Committee
-- “The statute and its regulatory offshoots are very complicated.”  —U.S. Department of Justice
+- “The statute and its regulatory offshoots are very complicated.”—U.S. Department of Justice
```

### campfires-and-imagination.md

```diff
+---“The true sign of intelligence is not knowledge, but imagination.”—Albert Einstein
-
-
+---“Creativity is seeing something that doesn’t exist already. You need to find out how you can bring it into bein[g](https://r20.rs6.net/tn.jsp?f=0018TvEIJxjPjVkaQA19nxCjBCS0-m3TYKRCCbZKqJ4CylqmUHNu5Y9rRE6g0nlg6JA8SLRuSLBj44zN6NKr-pZNVtNXIuP_LwgoE4nFdM8xXtO6HstVnHzOjn4lxaGiFUzUlxaiCFCLt1uJUjhC89p7G03yvOCeUsuUfow3alXdYieydUzIjylX1V9stSZ57UYBKiblkFAWLI=&c=&ch=) and that way be a playmate with God.”—Michele Shea
+
+---“Creativity can solve almost any problem. The creative act, the defeat of habit by originality, overcomes everything.”—George Lois
+
+---“Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn’t really do it, they just saw something. It seemed obvious to them after a while.”—Steve Jobs
… (+10 more changed lines)
```

### can-i-protect-you-and-nature.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### checking-in-on-you.md

```diff
-- “Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, ambition inspired, and success achieved.”— Helen Keller
+- “Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, ambition inspired, and success achieved.”—Helen Keller
-- “Never to suffer would never to have been blessed.”— Edgar Allan Poe
+- “Never to suffer would never to have been blessed.”—Edgar Allan Poe
```

### clean-air-act-headed-for-simplicity.md

```diff
-- **“I’ll tell you what you need to be a great scientist. You don’t have to be ableunderstand very complicated things. It’s just the opposite. You have to be able to see what looks like the most complicated thing in the world and, in a flash, find the underlying simplicity. That’s what you need: a talent for simplicity.”— *Mitchell Wilson***
-- **“Sciencemay be described as the art of systematic over-simplification.”— *Karl Popper***
+- **“I’ll tell you what you need to be a great scientist. You don’t have to be ableunderstand very complicated things. It’s just the opposite. You have to be able to see what looks like the most complicated thing in the world and, in a flash, find the underlying simplicity. That’s what you need: a talent for simplicity.”—*Mitchell Wilson***
+- **“Sciencemay be described as the art of systematic over-simplification.”—*Karl Popper***
```

### creative-professional.md

```diff
+---“The true sign of intelligence is not knowledge, but imagination.”—Albert Einstein
+---“Creativity is seeing something that doesn’t exist already. You need to find out how you can bring it into bein[g](https://r20.rs6.net/tn.jsp?f=001YAAi5nhFqc0RL_k67uFu4dmNdyWJj9V8_w6r-sR3uKnVBcQB0k7qYCez72XcV8rwcDup90xFdtOMqcETgCEO5cADVSOZvFfy1MgDjLUdwu3m-1czAqykLWCCGviCcCHpfhocODE2gA000hZ_ZlWUNG8sG8IjvHeZ5pW7pOS7CwPHLCK4kbbl_VWkwb8WigcXiwmC3a66RKw=&c=&ch=) and that way be a playmate with God.”—Michele Shea
+---“Creativity can solve almost any problem. The creative act, the defeat of habit by originality, overcomes everything.”—George Lois
+---“Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn’t really do it, they just saw something. It seemed obvious to them after a while.”—Steve Jobs
```

### danger.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### digital-twin-and-machine-to-protect-earth.md

```diff
-abstract: "BUILDING A MACHINE TO PROTECT EARTH ‌ Approach (click here) Game-Plan (click here) ---\"The earth is what we all have in common.” —Wendell Berry"
+abstract: "BUILDING A MACHINE TO PROTECT EARTH ‌ Approach (click here) Game-Plan (click here) ---\"The earth is what we all have in common.”—Wendell Berry"
```

### distinction-between-ozone-attainment-and-nonattainment-areas-disappearing.md

```diff
-Our world is changing.  Geographical attainment distinctions are becoming less important and less helpful to improving air quality.  We can either continue spending considerable amounts of time and money trying to work around these distinctions under the current Clean Air Act. . . or we can try something else.   ***“Do something.  If it works, do more of it.  If it doesn’t, do something else.” —Franklin Delano Roosevelt***
+Our world is changing.  Geographical attainment distinctions are becoming less important and less helpful to improving air quality.  We can either continue spending considerable amounts of time and money trying to work around these distinctions under the current Clean Air Act. . . or we can try something else.   ***“Do something.  If it works, do more of it.  If it doesn’t, do something else.”—Franklin Delano Roosevelt***
```

### easiest-way-to-avoid-environmental-laws.md

```diff
-abstract: '> —“The easiest way to avoid environmental regulation is to create more of them.”'
+abstract: '>—“The easiest way to avoid environmental regulation is to create more of them.”'
-> —“The easiest way to avoid environmental regulation is to create more of them.”
+>—“The easiest way to avoid environmental regulation is to create more of them.”
```

### einstein-and-the-clean-air-act.md

```diff
-- “The Clean Air Act is complicated and contentious”. —Senate Environment and Public Works Committee
+- “The Clean Air Act is complicated and contentious”.—Senate Environment and Public Works Committee
-- “The statute and its regulatory offshoots are very complicated.”  —U.S. Department of Justice
+- “The statute and its regulatory offshoots are very complicated.”—U.S. Department of Justice
```

### encouraging-you.md

```diff
-“The true sign of intelligence is not knowledge, but imagination.” —Albert Einstein
+“The true sign of intelligence is not knowledge, but imagination.”—Albert Einstein
-“Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn’t really do it, they just saw something. It seemed obvious to them after a while.” —Steve Jobs
+“Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn’t really do it, they just saw something. It seemed obvious to them after a while.”—Steve Jobs
-“There is no doubt that creativity is the most important human resource of all. Without creativity, there would be no progress, and we would be forever repeating the same patterns.” —Edward de Bono
+“There is no doubt that creativity is the most important human resource of all. Without creativity, there would be no progress, and we would be forever repeating the same patterns.”—Edward de Bono
-“Creativity is… seeing something that doesn’t exist already. You need to find out how you can bring into being and that way be a playmate with God.” —Michele Shea
+“Creativity is… seeing something that doesn’t exist already. You need to find out how you can bring into being and that way be a playmate with God.”—Michele Shea
```

### energy-and-clean-air-act.md

```diff
->  —“Progress lies not in enhancing what is, but in advancing toward what will be.”—Kahlil Gibran
+>—“Progress lies not in enhancing what is, but in advancing toward what will be.”—Kahlil Gibran
```

### entropy-information-theory-and-the-holographic-principle.md

```diff
-“The universe computes. The computing universe is not a metaphor, but a mathematical fact: the universe is a physical system that can be programmed at its most microscopic level to perform universal digital computation. Moreover, the universe is not just a computer: it is a quantum computer. Quantum mechanics is constantly injecting fresh, random bits into the universe. Because of its computational nature, the universe processes and interprets those bits, naturally giving rise to all sorts of complex order and structure.”— Paul Davies
+“The universe computes. The computing universe is not a metaphor, but a mathematical fact: the universe is a physical system that can be programmed at its most microscopic level to perform universal digital computation. Moreover, the universe is not just a computer: it is a quantum computer. Quantum mechanics is constantly injecting fresh, random bits into the universe. Because of its computational nature, the universe processes and interprets those bits, naturally giving rise to all sorts of complex order and structure.”—Paul Davies
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
… (+18 more changed lines)
```

### epa-indicates-willingness-to-acknowledge-foreign-pollution-impacts-on-states.md

```diff
->  —–“**EPA has indicated its willingness to begin a process**through the 2015 conference described below to develop policy that enables regions that can scientifically quantify TAO [**Transboundary Anthropogenic Ozone**] impacts to **incorporate those estimated impacts into their SIP modeling**. The policy-related outcome of this incorporation will be to refine ozone design values for Valley ozone monitors based on impacts from TAO. **This will result in reduced ozone monitor design values**.” .”—San Joaquin Valley Air Quality Management District (April 17, 2014 Board Meeting, see [link](http://www.valleyair.org/Board_meetings/GB/agenda_minutes/Agenda/2014/April/final/09.pdf))
+>—–“**EPA has indicated its willingness to begin a process**through the 2015 conference described below to develop policy that enables regions that can scientifically quantify TAO [**Transboundary Anthropogenic Ozone**] impacts to **incorporate those estimated impacts into their SIP modeling**. The policy-related outcome of this incorporation will be to refine ozone design values for Valley ozone monitors based on impacts from TAO. **This will result in reduced ozone monitor design values**.” .”—San Joaquin Valley Air Quality Management District (April 17, 2014 Board Meeting, see [link](http://www.valleyair.org/Board_meetings/GB/agenda_minutes/Agenda/2014/April/final/09.pdf))
```

### exploration-discovery-wonder.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### follow-up-world-quantum-day.md

```diff
-“The universe computes. The computing universe is not a metaphor, but a mathematical fact: the universe is a physical system that can be programmed at its most microscopic level to perform universal digital computation. Moreover, the universe is not just a computer: it is a quantum computer. Quantum mechanics is constantly injecting fresh, random bits into the universe. Because of its computational nature, the universe processes and interprets those bits, naturally giving rise to all sorts of complex order and structure.”— Paul Davies
+“The universe computes. The computing universe is not a metaphor, but a mathematical fact: the universe is a physical system that can be programmed at its most microscopic level to perform universal digital computation. Moreover, the universe is not just a computer: it is a quantum computer. Quantum mechanics is constantly injecting fresh, random bits into the universe. Because of its computational nature, the universe processes and interprets those bits, naturally giving rise to all sorts of complex order and structure.”—Paul Davies
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
… (+18 more changed lines)
```

### forbes-article-today-artificial-intelligence-is-improving-energy-companies-not-r.md

```diff
-title: "Forbes article today: \"Artificial Intelligence Is Improving Energy Companies — Not Replacing Workers"
+title: "Forbes article today: \"Artificial Intelligence Is Improving Energy Companies—Not Replacing Workers"
```

### foreign-pollution-accepting-the-truth.md

```diff
-> **“Fiction is obliged to stick to possibilities.  Truth isn’t.”** —-Mark Twain
+> **“Fiction is obliged to stick to possibilities.  Truth isn’t.”**—-Mark Twain
```

### forgiveness.md

```diff
-"To forgive is to set a prisoner free and discover that the prisoner was you."— Lewis B. Smedes
+"To forgive is to set a prisoner free and discover that the prisoner was you."—Lewis B. Smedes
-— Tyler Perry
+—Tyler Perry
-"You can’t forgive without loving. And I don’t mean sentimentality. I don’t mean mush. I mean having enough courage to stand up and say, ‘I forgive. I’m finished with it.’— [Maya Angelou](https://r20.rs6.net/tn.jsp?f=001L9L8DXOkR6ju0uGa7xhmWn_Jm7rH4W7Pd-lYwt6-KtX-abhdqYnzDThttRZKB4QGhYMHtQFnI2XsocNxpug8afC86bp8BUIMi5wBpUjDSYFxr9p6qnt50QUFS26U7WV8J1UW9YkW9zy3rpmeCVTtj7oOHr1ysTx1C0uEpt1-Az0q4UecAXaer-yOGFi42xU4wH0sjb_eQ8WNjkoL-UFuYYNLEqjsvxt3&c=&ch=)
+"You can’t forgive without loving. And I don’t mean sentimentality. I don’t mean mush. I mean having enough courage to stand up and say, ‘I forgive. I’m finished with it.’—[Maya Angelou](https://r20.rs6.net/tn.jsp?f=001L9L8DXOkR6ju0uGa7xhmWn_Jm7rH4W7Pd-lYwt6-KtX-abhdqYnzDThttRZKB4QGhYMHtQFnI2XsocNxpug8afC86bp8BUIMi5wBpUjDSYFxr9p6qnt50QUFS26U7WV8J1UW9YkW9zy3rpmeCVTtj7oOHr1ysTx1C0uEpt1-Az0q4UecAXaer-yOGFi42xU4wH0sjb_eQ8WNjkoL-UFuYYNLEqjsvxt3&c=&ch=)
```

### gina-mccarthy-and-congress-talk-foreign-pollution.md

```diff
-> #### —Gina McCarthy, U.S. EPA Administrator
+> ####—Gina McCarthy, U.S. EPA Administrator
```

### harbor-or-open-sea.md

```diff
-"Everything that comes together falls apart. Everything. The chair I’m sitting on. It was built, and so it will fall apart. I’m gonna fall apart, probably before this chair. And you’re gonna fall apart. The cells and organs and systems that make you you—they came together, grew together, and so must fall apart. The Buddha knew one thing science didn’t prove for millennia after his death: Entropy increases. Things fall apart."— [J](https://r20.rs6.net/tn.jsp?f=001cQ9tb9JOl4N_0eGChevox6EienhGA1aLUpp5pknhAMRIScUIVRr8EJ3jif5UEDDY3l3vY2R6IUxUSiEai7nQJ7P5JvdhDHsOT9E9GJneo5RY7f1RdUhnihpYPgj9D0Y15mUkcFcBoOhaPqwaOTt2dDp0JxTBPgPu&c=&ch=)ohn Green
-
-"Life, this anti-entropy, ceaselessly reloaded with energy, is a climbing force, toward order amidst chaos, toward light, among the darkness of the indefinite, toward the mystic dream of Love, between the fire which devours itself and the silence of the Cold."— Albert Claude
-
-"Entropy shakes its angry fist at you for being clever enough to organize the world."— Brandon Sanderson
+"Everything that comes together falls apart. Everything. The chair I’m sitting on. It was built, and so it will fall apart. I’m gonna fall apart, probably before this chair. And you’re gonna fall apart. The cells and organs and systems that make you you—they came together, grew together, and so must fall apart. The Buddha knew one thing science didn’t prove for millennia after his death: Entropy increases. Things fall apart."—[J](https://r20.rs6.net/tn.jsp?f=001cQ9tb9JOl4N_0eGChevox6EienhGA1aLUpp5pknhAMRIScUIVRr8EJ3jif5UEDDY3l3vY2R6IUxUSiEai7nQJ7P5JvdhDHsOT9E9GJneo5RY7f1RdUhnihpYPgj9D0Y15mUkcFcBoOhaPqwaOTt2dDp0JxTBPgPu&c=&ch=)ohn Green
+
+"Life, this anti-entropy, ceaselessly reloaded with energy, is a climbing force, toward order amidst chaos, toward light, among the darkness of the indefinite, toward the mystic dream of Love, between the fire which devours itself and the silence of the Cold."—Albert Claude
… (+62 more changed lines)
```

### how-a-green-lizard-could-save-us-millions-of-pounds-on-air-pollution.md

```diff
-##### *— Steve Jobs*
+##### *—Steve Jobs*
```

### how-can-foreign-pollution-blow-into-the-u-s-without-blowing-into-a-state.md

```diff
-> “Truth, like surgery, may hurt, but it cures.” —Hans Suyin
+> “Truth, like surgery, may hurt, but it cures.”—Hans Suyin
```

### how-to-reduce-clean-air-act-litigation.md

```diff
-> “*Any intelligent fool can make things bigger, more complex, and more violent.  It takes a touch of genius—and a lot of courage—to move in the opposite direction.*” ——E.F Schumacher
+> “*Any intelligent fool can make things bigger, more complex, and more violent.  It takes a touch of genius—and a lot of courage—to move in the opposite direction.*”——E.F Schumacher
```

### i-love-open-space-more-room-to-roam.md

```diff
-Cosmologists usually determine the composition of the universe by observing as much of it as possible.But these researchers have found that a machine learning algorithm can scrutinize a single simulated galaxy and predict the overall makeup of the digital universe in which it exists— a feat analogous to analyzing a random grain of sand under a microscope and working out the mass of Eurasia. The machines appear to have found a pattern that might someday allow astronomers to draw sweeping conclusions about the real cosmos merely by studying its elemental building blocks.
+Cosmologists usually determine the composition of the universe by observing as much of it as possible.But these researchers have found that a machine learning algorithm can scrutinize a single simulated galaxy and predict the overall makeup of the digital universe in which it exists—a feat analogous to analyzing a random grain of sand under a microscope and working out the mass of Eurasia. The machines appear to have found a pattern that might someday allow astronomers to draw sweeping conclusions about the real cosmos merely by studying its elemental building blocks.
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
… (+18 more changed lines)
```

### if-it-looks-like-a-duck.md

```diff
-Cosmologists usually determine the composition of the universe by observing as much of it as possible.But these researchers have found that a machine learning algorithm can scrutinize a single simulated galaxy and predict the overall makeup of the digital universe in which it exists— a feat analogous to analyzing a random grain of sand under a microscope and working out the mass of Eurasia. The machines appear to have found a pattern that might someday allow astronomers to draw sweeping conclusions about the real cosmos merely by studying its elemental building blocks.
+Cosmologists usually determine the composition of the universe by observing as much of it as possible.But these researchers have found that a machine learning algorithm can scrutinize a single simulated galaxy and predict the overall makeup of the digital universe in which it exists—a feat analogous to analyzing a random grain of sand under a microscope and working out the mass of Eurasia. The machines appear to have found a pattern that might someday allow astronomers to draw sweeping conclusions about the real cosmos merely by studying its elemental building blocks.
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
… (+18 more changed lines)
```

### in-the-news.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### isaac-newton-and-the-clean-air-act.md

```diff
-- “The Clean Air Act is complicated and contentious”. —Senate Environment and Public Works Committee
+- “The Clean Air Act is complicated and contentious”.—Senate Environment and Public Works Committee
-- “The statute and its regulatory offshoots are very complicated.”  —U.S. Department of Justice
+- “The statute and its regulatory offshoots are very complicated.”—U.S. Department of Justice
```

### its-not-the-game-board.md

```diff
-Cosmologists usually determine the composition of the universe by observing as much of it as possible.But these researchers have found that a machine learning algorithm can scrutinize a single simulated galaxy and predict the overall makeup of the digital universe in which it exists— a feat analogous to analyzing a random grain of sand under a microscope and working out the mass of Eurasia. The machines appear to have found a pattern that might someday allow astronomers to draw sweeping conclusions about the real cosmos merely by studying its elemental building blocks.
+Cosmologists usually determine the composition of the universe by observing as much of it as possible.But these researchers have found that a machine learning algorithm can scrutinize a single simulated galaxy and predict the overall makeup of the digital universe in which it exists—a feat analogous to analyzing a random grain of sand under a microscope and working out the mass of Eurasia. The machines appear to have found a pattern that might someday allow astronomers to draw sweeping conclusions about the real cosmos merely by studying its elemental building blocks.
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
… (+18 more changed lines)
```

### jed-singing-to-betty-white-30-years-ago.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### metaverse-will-nature-get-left-behind-and-left-out.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### moving-my-coffee-cup.md

```diff
-“Two billion years ago, our ancestors were microbes; a half-billion years ago, fish; a hundred million years ago, something like mice; ten million years ago, arboreal apes; and a million years ago, proto-humans puzzling out the taming of fire. Our evolutionary lineage is marked by mastery of change. In our time, the pace is quickening." —CARL SAGAN
+“Two billion years ago, our ancestors were microbes; a half-billion years ago, fish; a hundred million years ago, something like mice; ten million years ago, arboreal apes; and a million years ago, proto-humans puzzling out the taming of fire. Our evolutionary lineage is marked by mastery of change. In our time, the pace is quickening."—CARL SAGAN
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
… (+18 more changed lines)
```

### nasa-news-webb-space-telescope-reaches-destination-1-million-miles-from-earth-wh.md

```diff
-Cosmologists usually determine the composition of the universe by observing as much of it as possible.But these researchers have found that a machine learning algorithm can scrutinize a single simulated galaxy and predict the overall makeup of the digital universe in which it exists— a feat analogous to analyzing a random grain of sand under a microscope and working out the mass of Eurasia. The machines appear to have found a pattern that might someday allow astronomers to draw sweeping conclusions about the real cosmos merely by studying its elemental building blocks.
+Cosmologists usually determine the composition of the universe by observing as much of it as possible.But these researchers have found that a machine learning algorithm can scrutinize a single simulated galaxy and predict the overall makeup of the digital universe in which it exists—a feat analogous to analyzing a random grain of sand under a microscope and working out the mass of Eurasia. The machines appear to have found a pattern that might someday allow astronomers to draw sweeping conclusions about the real cosmos merely by studying its elemental building blocks.
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
… (+18 more changed lines)
```

### only-1-career.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### our-youth-are-getting-so-far-ahead-of-us-its-awesome.md

```diff
-Cosmologists usually determine the composition of the universe by observing as much of it as possible.But these researchers have found that a machine learning algorithm can scrutinize a single simulated galaxy and predict the overall makeup of the digital universe in which it exists— a feat analogous to analyzing a random grain of sand under a microscope and working out the mass of Eurasia. The machines appear to have found a pattern that might someday allow astronomers to draw sweeping conclusions about the real cosmos merely by studying its elemental building blocks.
+Cosmologists usually determine the composition of the universe by observing as much of it as possible.But these researchers have found that a machine learning algorithm can scrutinize a single simulated galaxy and predict the overall makeup of the digital universe in which it exists—a feat analogous to analyzing a random grain of sand under a microscope and working out the mass of Eurasia. The machines appear to have found a pattern that might someday allow astronomers to draw sweeping conclusions about the real cosmos merely by studying its elemental building blocks.
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
… (+18 more changed lines)
```

### punishing-u-s-citizens-for-pollution-blowing-in-from-other-countries.md

```diff
-> **———****“[T]he EPA will not hold States responsible for developing strategies to “compensate” for the effects of emissions from foreign sources”.** —-U.S. EPA (64  Fed. Reg. 35714).
+> **———****“[T]he EPA will not hold States responsible for developing strategies to “compensate” for the effects of emissions from foreign sources”.**—-U.S. EPA (64  Fed. Reg. 35714).
-> **———“Congress clearly wanted to avoid penalizing such areas by not making them responsible for control of emissions emanating from a foreign country over which they have no jurisdiction.”**  —U.S. EPA (see <http://www.epa.gov/ttncaaa1/t1/fr_notices/pm-add.pdf>)
+> **———“Congress clearly wanted to avoid penalizing such areas by not making them responsible for control of emissions emanating from a foreign country over which they have no jurisdiction.”**—U.S. EPA (see <http://www.epa.gov/ttncaaa1/t1/fr_notices/pm-add.pdf>)
```

### reality-my-simplest-example-yet.md

```diff
-— Victor Frederick Weisskopf
+—Victor Frederick Weisskopf
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
… (+4 more changed lines)
```

### recommendation-set-the-ozone-standard-at-0-0-ppb.md

```diff
-> **— “Our public health scientists and doctors have told us [in 1970] that there is no threshold, that any air pollution is harmful. The Clean Air Act is based on the assumption, *although we knew at the time it was inaccurate*, that there is a threshold.”**—Senator Edmund Muskie, 1977
+> **—“Our public health scientists and doctors have told us [in 1970] that there is no threshold, that any air pollution is harmful. The Clean Air Act is based on the assumption, *although we knew at the time it was inaccurate*, that there is a threshold.”**—Senator Edmund Muskie, 1977
```

### reevaluating-the-caa-would-prove-disastrous.md

```diff
-> —-“In a battle, or in mountain climbing, there is often one thing which it takes a lot of pluck to do; but it is also, in the long run, the safest thing to do. If you funk it, you will find yourself, hours later, in far worse danger. The cowardly thing is also the most dangerous thing.— **C.S. Lewis**, Mere Christianity
+>—-“In a battle, or in mountain climbing, there is often one thing which it takes a lot of pluck to do; but it is also, in the long run, the safest thing to do. If you funk it, you will find yourself, hours later, in far worse danger. The cowardly thing is also the most dangerous thing.—**C.S. Lewis**, Mere Christianity
-> —“Take the case of courage.  No quality has ever so much addled the brains and tangled the definitions of merely rational sages.  Courage is almost a contradiction in terms.  It means a strong desire to live taking the form of a readiness to die.  ‘He that will lose his life, the same shall save it,’ is not a piece of mysticism for saints and heroes.  It is a piece of everyday advice for sailors or mountaineers.  It might be printed in an Alpine guide or a drill book.  This paradox is the whole principle of courage; even of quite earthly or brutal courage.  A man cut off by the sea may save his life if we will risk it on the precipice.
+>—“Take the case of courage.  No quality has ever so much addled the brains and tangled the definitions of merely rational sages.  Courage is almost a contradiction in terms.  It means a strong desire to live taking the form of a readiness to die.  ‘He that will lose his life, the same shall save it,’ is not a piece of mysticism for saints and heroes.  It is a piece of everyday advice for sailors or mountaineers.  It might be printed in an Alpine guide or a drill book.  This paradox is the whole principle of courage; even of quite earthly or brutal courage.  A man cut off by the sea may save his life if we will risk it on the precipice.
```

### reforming-the-clean-air-act-a-new-approach-to-addressing-stationary-sources.md

```diff
-*—–“Progress lies not in enhancing what is, but in advancing toward what will be.”* —-Kahlil Gibran
+*—–“Progress lies not in enhancing what is, but in advancing toward what will be.”*—-Kahlil Gibran
```

### relatively-wrong-vs-absolutely-wrong-foreign-pollution-and-the-clean-air-act.md

```diff
-> **——–“The EPA does not expect States to restrict emissions from domestic sources to offset the impacts of international transport of pollution.”** —–U.S. EPA (64  Fed. Reg. 35714)
+> **——–“The EPA does not expect States to restrict emissions from domestic sources to offset the impacts of international transport of pollution.”**—–U.S. EPA (64  Fed. Reg. 35714)
-> **——–“T]he EPA will not hold States responsible for developing strategies to “compensate” for the effects of emissions from foreign sources”.   —-U.S. EPA** (64  Fed. Reg. 35714).
+> **——–“T]he EPA will not hold States responsible for developing strategies to “compensate” for the effects of emissions from foreign sources”.—-U.S. EPA** (64  Fed. Reg. 35714).
-> **——– “Congress clearly wanted to avoid penalizing such areas by not making them responsible for control of emissions emanating from a foreign country over which they have no jurisdiction.”**  —U.S. EPA (see <http://www.gpo.gov/fdsys/pkg/FR-1994-08-16/html/94-19884.htm>).
+> **——– “Congress clearly wanted to avoid penalizing such areas by not making them responsible for control of emissions emanating from a foreign country over which they have no jurisdiction.”**—U.S. EPA (see <http://www.gpo.gov/fdsys/pkg/FR-1994-08-16/html/94-19884.htm>).
```

### rock-smart.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### schoenbrods-latest-book-dc-confidential-explains-why-the-controversies-and-conflicts-are-occurring-with-the-clean-air-act.md

```diff
-> ## —“This is an alarming book, and indeed we should be alarmed.”—Governor Howard Dean
+> ##—“This is an alarming book, and indeed we should be alarmed.”—Governor Howard Dean
```

### scientists-still-abuzz-news-stories-still-churning.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### simple-equations-simple-computations.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### simplicity-and-the-clean-air-act.md

```diff
-> - “The Clean Air Act is complicated and contentious”. —Senate Environment and Public Works Committee
+> - “The Clean Air Act is complicated and contentious”.—Senate Environment and Public Works Committee
-> - “The law is long and complicated”. —Andrew Restuccia
-> - “The statute and its regulatory offshoots are very complicated.”  —U.S. Department of Justice
+> - “The law is long and complicated”.—Andrew Restuccia
+> - “The statute and its regulatory offshoots are very complicated.”—U.S. Department of Justice
-> - “The ability to simplify means to eliminate the unnecessary so that the necessary may speak.”  —-Hans Hofmann
+> - “The ability to simplify means to eliminate the unnecessary so that the necessary may speak.”—-Hans Hofmann
```

### simplicity-joy.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### skill-set-i-work-on-the-most.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### space-time-and-environmental-protection.md

```diff
-— Richard P. Feynman
+—Richard P. Feynman
-— Richard P. Feynman
+—Richard P. Feynman
```

### standing-my-ground-for-regulatory-simplification-on-wednesday.md

```diff
-- *“All the great things are simple.” —Winston Churchill*
+- *“All the great things are simple.”—Winston Churchill*
```

### staring-at-the-elecromagnetism-chart.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### states-making-citizens-offset-climate-change-impacts-from-china-and-india.md

```diff
-- **“[T]he EPA will not hold States responsible for developing strategies to “compensate” for the effects of emissions from foreign sources”.** —-U.S. EPA (64  Fed. Reg. 35714).
-- **“Congress clearly wanted to avoid penalizing such areas by not making them responsible for control of emissions emanating from a foreign country over which they have no jurisdiction.”**  —U.S. EPA (see <http://www.epa.gov/ttncaaa1/t1/fr_notices/pm-add.pdf>)
+- **“[T]he EPA will not hold States responsible for developing strategies to “compensate” for the effects of emissions from foreign sources”.**—-U.S. EPA (64  Fed. Reg. 35714).
+- **“Congress clearly wanted to avoid penalizing such areas by not making them responsible for control of emissions emanating from a foreign country over which they have no jurisdiction.”**—U.S. EPA (see <http://www.epa.gov/ttncaaa1/t1/fr_notices/pm-add.pdf>)
```

### steve-jobs-and-the-clean-air-act-2.md

```diff
-- “The Clean Air Act is complicated and contentious”. —Senate Environment and Public Works Committee
+- “The Clean Air Act is complicated and contentious”.—Senate Environment and Public Works Committee
-- “The statute and its regulatory offshoots are very complicated.”  —U.S. Department of Justice
+- “The statute and its regulatory offshoots are very complicated.”—U.S. Department of Justice
```

### suffering-and-the-clean-air-act.md

```diff
-- “Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, ambition inspired, and success achieved.”— Helen Keller
+- “Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, ambition inspired, and success achieved.”—Helen Keller
```

### suffering.md

```diff
-- “Never to suffer would never to have been blessed.”— Edgar Allan Poe
+- “Never to suffer would never to have been blessed.”—Edgar Allan Poe
-- “Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, ambition inspired, and success achieved.”— Helen Keller
+- “Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, ambition inspired, and success achieved.”—Helen Keller
```

### summiting-climate-change-and-air-pollution-problems.md

```diff
-> —“That’s been one of my mantras – focus and simplicity. Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple. But it’s worth it in the end because once you get there, you can move mountains.” ***—Steve Jobs***
+>—“That’s been one of my mantras – focus and simplicity. Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple. But it’s worth it in the end because once you get there, you can move mountains.” ***—Steve Jobs***
```

### tceq-out-of-touch-with-simplicity.md

```diff
-> “I’ll tell you what you need to be a great scientist. You don’t have to be able to understand very complicated things. It’s just the opposite. You have to be able to see what looks like the most complicated thing in the world and, in a flash, find the underlying simplicity. That’s what you need: a talent for simplicity.”— *Mitchell Wilson*
+> “I’ll tell you what you need to be a great scientist. You don’t have to be able to understand very complicated things. It’s just the opposite. You have to be able to see what looks like the most complicated thing in the world and, in a flash, find the underlying simplicity. That’s what you need: a talent for simplicity.”—*Mitchell Wilson*
-> “Science may be described as the art of systematic over-simplification.”— *Karl Popper*
+> “Science may be described as the art of systematic over-simplification.”—*Karl Popper*
-I cannot tell you  what the result will be on June 7th when the TCEQ Commissioners consider my [petition](http://——-“The whole world is certainly heading for a great simplicity, not deliberately, but rather inevitably.      The simplicity towards which the world is driving is the necessary outcome of all our systems and speculations and of our deep and continuous contemplation of things. For the universe is like everything in it; we have to look at it repeatedly and habitually before we see it. It is only when we have seen it for the hundredth time that we see it for the first time. The more consistently things are contemplated, the more they tend to unify themselves and therefore to simplify themselves. The simplification of anything is always sensational. [. . .]      Few people will dispute that all the typical movements of our time are upon this road towards simplification. Each system seeks to be more fundamental than the other; each seeks, in the literal sense, to undermine the other. In art, for example, the old conception of man, classic as the Apollo Belvedere, has first been attacked by the realist, who asserts that man, as a fact of natural history, is a creature with colourless hair and a freckled face. Then comes the Impressionist, going yet deeper, who asserts that to his physical eye, which alone is certain, man is a creature with purple hair and a grey face. Then comes the Symbolist, and says that to his soul, which alone is certain, man is a creature with green hair and a blue face. And all the great writers of our time represent in one form or another this attempt to reestablish communication with the elemental, or, as it is sometimes more roughly and fallaciously expressed, to return to nature.  [. . .]      But the giants of our time are undoubtedly alike in that they approach by very different roads this conception of the return to simplicity. Ibsen returns to nature by the angular exterior of fact, Maeterlinck by the eternal tendencies of fable. Whitman returns to nature by seeing how much he can accept, Tolstoy by seeing how much he can reject.”― G.K. Chesterton      “The main purpose of science is simplicity and as we understand more things, everything is becoming simpler.” – Edward Teller     “I’ll tell you what you need to be a great scientist. You don’t have to be ableunderstand very complicated things. It’s just the opposite. You have to be able to see what looks like the most complicated thing in the world and, in a flash, find the underlying simplicity. That’s what you need: a talent for simplicity.”— Mitchell Wilson     “Sciencemay be described as the art of systematic over-simplification.”— Karl Popper     “[T]he grand aim of all science…is to cover the greatest possible number of empirical facts by logical deductions from the smallest possible number of hypotheses or axioms.”—Albert Einstein     “Simplicity does not precede complexity, but follows it.”- Alan J. Perlis) to begin a concerted effort toward regulatory simplicity.  But I can tell you that eventually it will succeed.  Simplicity always does.
+I cannot tell you  what the result will be on June 7th when the TCEQ Commissioners consider my [petition](http://——-“The whole world is certainly heading for a great simplicity, not deliberately, but rather inevitably.      The simplicity towards which the world is driving is the necessary outcome of all our systems and speculations and of our deep and continuous contemplation of things. For the universe is like everything in it; we have to look at it repeatedly and habitually before we see it. It is only when we have seen it for the hundredth time that we see it for the first time. The more consistently things are contemplated, the more they tend to unify themselves and therefore to simplify themselves. The simplification of anything is always sensational. [. . .]      Few people will dispute that all the typical movements of our time are upon this road towards simplification. Each system seeks to be more fundamental than the other; each seeks, in the literal sense, to undermine the other. In art, for example, the old conception of man, classic as the Apollo Belvedere, has first been attacked by the realist, who asserts that man, as a fact of natural history, is a creature with colourless hair and a freckled face. Then comes the Impressionist, going yet deeper, who asserts that to his physical eye, which alone is certain, man is a creature with purple hair and a grey face. Then comes the Symbolist, and says that to his soul, which alone is certain, man is a creature with green hair and a blue face. And all the great writers of our time represent in one form or another this attempt to reestablish communication with the elemental, or, as it is sometimes more roughly and fallaciously expressed, to return to nature.  [. . .]      But the giants of our time are undoubtedly alike in that they approach by very different roads this conception of the return to simplicity. Ibsen returns to nature by the angular exterior of fact, Maeterlinck by the eternal tendencies of fable. Whitman returns to nature by seeing how much he can accept, Tolstoy by seeing how much he can reject.”― G.K. Chesterton      “The main purpose of science is simplicity and as we understand more things, everything is becoming simpler.” – Edward Teller     “I’ll tell you what you need to be a great scientist. You don’t have to be ableunderstand very complicated things. It’s just the opposite. You have to be able to see what looks like the most complicated thing in the world and, in a flash, find the underlying simplicity. That’s what you need: a talent for simplicity.”—Mitchell Wilson     “Sciencemay be described as the art of systematic over-simplification.”—Karl Popper     “[T]he grand aim of all science…is to cover the greatest possible number of empirical facts by logical deductions from the smallest possible number of hypotheses or axioms.”—Albert Einstein     “Simplicity does not precede complexity, but follows it.”- Alan J. Perlis) to begin a concerted effort toward regulatory simplicity.  But I can tell you that eventually it will succeed.  Simplicity always does.
```

### tceq-staff-recommend-not-seeking-potential-relief-from-offsetting-foreign-greenhouse-gas-pollution.md

```diff
-> ### **— “[P]redicted effects of climate change on a local area are uncertain.”**–TCEQ
+> ### **—“[P]redicted effects of climate change on a local area are uncertain.”**–TCEQ
-> ### **— “The petitioner does not indicate specifically how Texas’ current or future ozone regulations will unfairly or unequally burden its citizens or businesses due to greenhouse gas emissions emanating from outside the state.”**–-TCEQ
+> ### **—“The petitioner does not indicate specifically how Texas’ current or future ozone regulations will unfairly or unequally burden its citizens or businesses due to greenhouse gas emissions emanating from outside the state.”**–-TCEQ
```

### thankful-for.md

```diff
-- “Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, ambition inspired, and success achieved.”— Helen Keller
+- “Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, ambition inspired, and success achieved.”—Helen Keller
-- “Never to suffer would never to have been blessed.”— Edgar Allan Poe
+- “Never to suffer would never to have been blessed.”—Edgar Allan Poe
```

### thanksgiving-for-black-holes.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### the-amount-of-space-in-space-is-incredible.md

```diff
-Cosmologists usually determine the composition of the universe by observing as much of it as possible.But these researchers have found that a machine learning algorithm can scrutinize a single simulated galaxy and predict the overall makeup of the digital universe in which it exists— a feat analogous to analyzing a random grain of sand under a microscope and working out the mass of Eurasia. The machines appear to have found a pattern that might someday allow astronomers to draw sweeping conclusions about the real cosmos merely by studying its elemental building blocks.
+Cosmologists usually determine the composition of the universe by observing as much of it as possible.But these researchers have found that a machine learning algorithm can scrutinize a single simulated galaxy and predict the overall makeup of the digital universe in which it exists—a feat analogous to analyzing a random grain of sand under a microscope and working out the mass of Eurasia. The machines appear to have found a pattern that might someday allow astronomers to draw sweeping conclusions about the real cosmos merely by studying its elemental building blocks.
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
… (+18 more changed lines)
```

### the-most-complicated-law-in-human-history.md

```diff
-- “Hugely complicated and very technical.” —President Obama
+- “Hugely complicated and very technical.”—President Obama
-- “The statute and its regulatory offshoots are very complicated.”  —U.S. Department of Justice
-- “The Clean Air Act is complicated and contentious”. —Senate Environment and Public Works Committee
+- “The statute and its regulatory offshoots are very complicated.”—U.S. Department of Justice
+- “The Clean Air Act is complicated and contentious”.—Senate Environment and Public Works Committee
-- “The Act itself has often been called “unreadable” and “incomprehensible.” —John Quarles and Bill Lewis, Morgan & Lewis
+- “The Act itself has often been called “unreadable” and “incomprehensible.”—John Quarles and Bill Lewis, Morgan & Lewis
```

### the-power-of-data-visualization.md

```diff
+---“Visualization gives you answers to questions you didn’t know you had.”—Ben Schneiderman
```

### the-worlds-judgment-and-the-clean-air-act.md

```diff
-> ——“The world is not so excellent that its judgment of greatness unequivocally has great significance – except as unconscious sarcasm.”—**Soren Kierkegaard**
+>——“The world is not so excellent that its judgment of greatness unequivocally has great significance – except as unconscious sarcasm.”—**Soren Kierkegaard**
```

### thoreau-and-the-clean-air-act.md

```diff
-- “The Clean Air Act is complicated and contentious”. —Senate Environment and Public Works Committee
+- “The Clean Air Act is complicated and contentious”.—Senate Environment and Public Works Committee
-- “The statute and its regulatory offshoots are very complicated.”  —U.S. Department of Justice
+- “The statute and its regulatory offshoots are very complicated.”—U.S. Department of Justice
```

### tired-of-pulling-kids-out-of-floods.md

```diff
-> "Fear knocked at the door. Faith answered. There was nobody there." — MLK, *A Strength to Love*
+> "Fear knocked at the door. Faith answered. There was nobody there."—MLK, *A Strength to Love*
```

### today-is-world-quantum-day-april-14th.md

```diff
-“The universe computes. The computing universe is not a metaphor, but a mathematical fact: the universe is a physical system that can be programmed at its most microscopic level to perform universal digital computation. Moreover, the universe is not just a computer: it is a quantum computer. Quantum mechanics is constantly injecting fresh, random bits into the universe. Because of its computational nature, the universe processes and interprets those bits, naturally giving rise to all sorts of complex order and structure.”— Paul Davies
+“The universe computes. The computing universe is not a metaphor, but a mathematical fact: the universe is a physical system that can be programmed at its most microscopic level to perform universal digital computation. Moreover, the universe is not just a computer: it is a quantum computer. Quantum mechanics is constantly injecting fresh, random bits into the universe. Because of its computational nature, the universe processes and interprets those bits, naturally giving rise to all sorts of complex order and structure.”—Paul Davies
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
… (+18 more changed lines)
```

### todays-taep-event-bezos-musk-zuckerberg-anderson-ai-is-solving-environmental-pro.md

```diff
+---“David could bear persecution and murmuring, but when he came to prosperity he could not turn his eyes away from vanity.”—Sir Richard Baker
```

### trump-air-regulations-will-2-out-for-every-1-in-become-3-in-for-every-1-out-in-four-more-years.md

```diff
-- *“When the solution is simple, God is answering.” —Albert Ein**![new-clean-air-act](/images/sip/new-clean-air-act.png)**stein*
+- *“When the solution is simple, God is answering.”—Albert Ein**![new-clean-air-act](/images/sip/new-clean-air-act.png)**stein*
-- *“Youknow you’ve achieved perfection in design, not when you have nothing more to add, but when you have nothing more to take away.’— Antoine de Saint-Exupéry*
+- *“Youknow you’ve achieved perfection in design, not when you have nothing more to add, but when you have nothing more to take away.’—Antoine de Saint-Exupéry*
-- *“The definition of genius is taking the complex and making it simple.” —Albert Einstein*
+- *“The definition of genius is taking the complex and making it simple.”—Albert Einstein*
-- *“Out of clutter, find simplicity.” —Albert Einstein*
-- *“Any intelligent fool can make things bigger, more complex, and more violent.  It takes a touch of genius—and a lot of courage—to move in the opposite direction.” ——E.F Schumacher*
… (+26 more changed lines)
```

### u-s-advice-to-china-on-creating-a-clean-air-act.md

```diff
-> “It is a good divine that follows his own instructions.” —William Shakespeare
+> “It is a good divine that follows his own instructions.”—William Shakespeare
```

### want-cleaner-air-simplify-the-clean-air-act.md

```diff
-- “The Clean Air Act is complicated and contentious”. —Senate Environment and Public Works Committee
+- “The Clean Air Act is complicated and contentious”.—Senate Environment and Public Works Committee
-- “The law is long and complicated”. —Andrew Restuccia
-- “The statute and its regulatory offshoots are very complicated.”  —U.S. Department of Justice
+- “The law is long and complicated”.—Andrew Restuccia
+- “The statute and its regulatory offshoots are very complicated.”—U.S. Department of Justice
-- “The ability to simplify means to eliminate the unnecessary so that the necessary may speak.”  —-Hans Hofmann
+- “The ability to simplify means to eliminate the unnecessary so that the necessary may speak.”—-Hans Hofmann
```

### were-inside-the-fence.md

```diff
+---“The greatest value of a picture is when it forces us to notice what we never expected to see.”—John W. Tukey
```

### whats-in-this-clean-air-act-reform-effort-for-us-personally.md

```diff
->  —“To be made greater than one’s fellows is the offered reward of hell, and involves no greatness; to be made greater than one’s self, is the divine reward, and involves a real greatness.”—George MacDonald
+>—“To be made greater than one’s fellows is the offered reward of hell, and involves no greatness; to be made greater than one’s self, is the divine reward, and involves a real greatness.”—George MacDonald
```

### where-there-is-magic.md

```diff
-"Everything that comes together falls apart. Everything. The chair I’m sitting on. It was built, and so it will fall apart. I’m gonna fall apart, probably before this chair. And you’re gonna fall apart. The cells and organs and systems that make you you—they came together, grew together, and so must fall apart. The Buddha knew one thing science didn’t prove for millennia after his death: Entropy increases. Things fall apart."— [J](https://r20.rs6.net/tn.jsp?f=001p69XCy0K1NDNrAZUv4F6wG9ChyI7WlTsJzP_qonHW9yeQoDRr6lPwi8tTh3PYPw072ADpfE35z4w6HOCFC5oq_Zdp_ICVRe94otCUJtaesKv3ku-yrhUdbSzEOxdvtxcbnpKpETGVJUoRwoiHhSlx_mI6fB4TvYo&c=&ch=)ohn Green
-
-"Life, this anti-entropy, ceaselessly reloaded with energy, is a climbing force, toward order amidst chaos, toward light, among the darkness of the indefinite, toward the mystic dream of Love, between the fire which devours itself and the silence of the Cold."— Albert Claude
-
-"Entropy shakes its angry fist at you for being clever enough to organize the world."— Brandon Sanderson
+"Everything that comes together falls apart. Everything. The chair I’m sitting on. It was built, and so it will fall apart. I’m gonna fall apart, probably before this chair. And you’re gonna fall apart. The cells and organs and systems that make you you—they came together, grew together, and so must fall apart. The Buddha knew one thing science didn’t prove for millennia after his death: Entropy increases. Things fall apart."—[J](https://r20.rs6.net/tn.jsp?f=001p69XCy0K1NDNrAZUv4F6wG9ChyI7WlTsJzP_qonHW9yeQoDRr6lPwi8tTh3PYPw072ADpfE35z4w6HOCFC5oq_Zdp_ICVRe94otCUJtaesKv3ku-yrhUdbSzEOxdvtxcbnpKpETGVJUoRwoiHhSlx_mI6fB4TvYo&c=&ch=)ohn Green
+
+"Life, this anti-entropy, ceaselessly reloaded with energy, is a climbing force, toward order amidst chaos, toward light, among the darkness of the indefinite, toward the mystic dream of Love, between the fire which devours itself and the silence of the Cold."—Albert Claude
… (+62 more changed lines)
```

### whitney-houston-and-the-single-electron-postulate.md

```diff
-"Everything that comes together falls apart. Everything. The chair I’m sitting on. It was built, and so it will fall apart. I’m gonna fall apart, probably before this chair. And you’re gonna fall apart. The cells and organs and systems that make you you—they came together, grew together, and so must fall apart. The Buddha knew one thing science didn’t prove for millennia after his death: Entropy increases. Things fall apart."— [J](https://r20.rs6.net/tn.jsp?f=001pHpt3HWFnNNFdOVtv4WWQlKrYCQ_giz3ScJMtHrdakfBWGgXVLhr2eeSg7MRBcRwE-flwLLlZUw980G8ewAN0PyaECMH-S_Cb5SGu3GuIxccvrSKK12AuH8719oiFubSB08l2gDVTIVVn282wnw8T7kh6mQjREsD&c=&ch=)ohn Green
-
-"Life, this anti-entropy, ceaselessly reloaded with energy, is a climbing force, toward order amidst chaos, toward light, among the darkness of the indefinite, toward the mystic dream of Love, between the fire which devours itself and the silence of the Cold."— Albert Claude
-
-"Entropy shakes its angry fist at you for being clever enough to organize the world."— Brandon Sanderson
+"Everything that comes together falls apart. Everything. The chair I’m sitting on. It was built, and so it will fall apart. I’m gonna fall apart, probably before this chair. And you’re gonna fall apart. The cells and organs and systems that make you you—they came together, grew together, and so must fall apart. The Buddha knew one thing science didn’t prove for millennia after his death: Entropy increases. Things fall apart."—[J](https://r20.rs6.net/tn.jsp?f=001pHpt3HWFnNNFdOVtv4WWQlKrYCQ_giz3ScJMtHrdakfBWGgXVLhr2eeSg7MRBcRwE-flwLLlZUw980G8ewAN0PyaECMH-S_Cb5SGu3GuIxccvrSKK12AuH8719oiFubSB08l2gDVTIVVn282wnw8T7kh6mQjREsD&c=&ch=)ohn Green
+
+"Life, this anti-entropy, ceaselessly reloaded with energy, is a climbing force, toward order amidst chaos, toward light, among the darkness of the indefinite, toward the mystic dream of Love, between the fire which devours itself and the silence of the Cold."—Albert Claude
… (+62 more changed lines)
```

### who-is-telling-the-truth-about-the-clean-air-act-gina-mccarthy-or-the-san-joaquin-valley-air-district.md

```diff
-*——-“Truth, like surgery, may hurt, but it cures.” —Hans Suyin*
+*——-“Truth, like surgery, may hurt, but it cures.”—Hans Suyin*
```

### winston-churchill-and-the-clean-air-act.md

```diff
-> **►   “All the great things are simple.” —Winston Churchill**
+> **►   “All the great things are simple.”—Winston Churchill**
-> **►   “If you have 10,000 regulations you destroy all respect for the law.” —Winston Churchill**
+> **►   “If you have 10,000 regulations you destroy all respect for the law.”—Winston Churchill**
-> **►   “Out of intense complexities, intense simplicities emerge.” —Winston Churchill**
+> **►   “Out of intense complexities, intense simplicities emerge.”—Winston Churchill**
-- “The Clean Air Act is complicated and contentious”. —Senate Environment and Public Works Committee
+- “The Clean Air Act is complicated and contentious”.—Senate Environment and Public Works Committee
… (+2 more changed lines)
```

### wow-look-at-this-picture-of-the-universe-just-released-just-stare-at-it.md

```diff
-- “When the solution is simple, God is answering.” —Albert Einstein
+- “When the solution is simple, God is answering.”—Albert Einstein
-- “Rudiments or principles must not be unnecessarily multiplied —Immanuel Kant
+- “Rudiments or principles must not be unnecessarily multiplied—Immanuel Kant
-- “All the great things are simple.” —Winston Churchill
-- “Out of clutter, find simplicity.” —Albert Einstein
+- “All the great things are simple.”—Winston Churchill
+- “Out of clutter, find simplicity.”—Albert Einstein
… (+16 more changed lines)
```

### you-can-always-shoot-the-cow-why-a-strict-but-for-interpretation-of-section-179b-is-nonsensical.md

```diff
-- “The EPA does not expect States to restrict emissions from domestic sources to offset the impacts of international transport of pollution.”  —–U.S. EPA (64  Fed. Reg. 35714)
-- “[T]he EPA will not hold States responsible for developing strategies to “compensate” for the effects of emissions from foreign sources”.  —-U.S. EPA (64  Fed. Reg. 35714).
-- “Congress clearly wanted to avoid penalizing such areas by not making them responsible for control of emissions emanating from a foreign country over which they have no jurisdiction.” —U.S. EPA (see <http://www.epa.gov/ttncaaa1/t1/fr_notices/pm-add.pdf>)
+- “The EPA does not expect States to restrict emissions from domestic sources to offset the impacts of international transport of pollution.”—–U.S. EPA (64  Fed. Reg. 35714)
+- “[T]he EPA will not hold States responsible for developing strategies to “compensate” for the effects of emissions from foreign sources”.—-U.S. EPA (64  Fed. Reg. 35714).
+- “Congress clearly wanted to avoid penalizing such areas by not making them responsible for control of emissions emanating from a foreign country over which they have no jurisdiction.”—U.S. EPA (see <http://www.epa.gov/ttncaaa1/t1/fr_notices/pm-add.pdf>)
```

