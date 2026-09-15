# birthdle

Static, single-file browser games. No build step — open any `.html` file directly or deploy the repo as-is.

- `index.html` — Birthdle, a Wordle-style "guess the historical figure's birthdate" game.
- `coveragle.html` — Coveragle, a daily insurance guessing game for [The Insurance Center](https://theinsurancecenter.com). Read a claim scenario, guess which of 47 coverages applies.
- `connections.html` — Coverage Connections, an NYT Connections-style puzzle: sort 16 insurance terms into 4 hidden groups of 4. 28 rotating daily puzzles.

Deployed on Vercel at `tic-games` (linked to this repo's branches for previews).

Both TIC games share TIC's brand colors/fonts/logo, a daily-seeded puzzle (same puzzle for everyone on a given day, based on local date), localStorage-based stats/streaks, and a shareable emoji-grid result with a quote CTA.
