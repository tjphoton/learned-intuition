# AGENTS.md

Instructions for any AI agent (or future me) picking up work in this repo. Read this before touching files.

## What this project is

**Learned Intuition** — a book + 2-day hands-on workshop, currently in the research/curriculum-building phase. Three converging fields, one question asked three ways:

- **Recognize** — Simulation-Based Inference / Amortized Bayesian Inference (SBI/ABI/PFN). Train on millions of simulated examples so a network learns to recognize an answer instead of computing it fresh every time.
- **Decide** — Bayesian Optimization. Given a handful of expensive real trials, which one do you run next.
- **Who Decides** — Agentic / Autonomous Research. What changes when an LLM agent, not a fixed policy, steers either of the above.

Originating context (pharma Marketing Mix Modeling) is in `research.md`. The project has since broadened well past that single use case into a general treatment of all three fields, with the MMM angle surviving as one specific worked example / identified gap (see Module 05 in `index.html`).

## The three standing documents — what each one is for

| File | Role | Update when |
|---|---|---|
| `research.md` | Raw scoping conversation / transcript. Historical record, **not** curated. | Never edit — it's a record of how the project started. |
| `PAPERS_SUMMARY.md` | Folder-indexed reference. One entry per paper/repo, grouped by where it physically lives on disk. | Every time a paper or repo is added, removed, or reclassified. |
| `index.html` | Sequenced reading path. Same papers, reorganized by learning order into Parts/Modules, with a working progress tracker (localStorage), search, and pillar filters. | Every time `PAPERS_SUMMARY.md` changes — **the two must stay in sync**, see below. |

`index.html` is self-contained (no external fonts, no CDN, no network calls) — it must stay that way so it works offline and is safe to publish as a static page.

## Adding a new paper — the checklist

1. **Verify before filing.** Download the PDF, then check the actual first page against the claimed title/author/venue:
   ```
   pdftotext -f 1 -l 1 -layout "file.pdf" - | head -20
   pdftotext -layout "file.pdf" - | grep -o -E "arXiv:[0-9]+\.[0-9]+v[0-9]+"
   ```
   Never trust a search-result title alone — arXiv IDs get typo'd, and titles get confused with similarly-named papers.
2. **Scrutinize the author block on anything that smells trend-chasing.** If a paper credits individual authors with multiple simultaneous institutional affiliations, or lists an AI system as a co-author attributed to the wrong company, treat it as likely fabricated/satirical and do not add it silently — flag it to the user and, if excluded, **write down why** in both `PAPERS_SUMMARY.md` and here so it isn't re-discovered and re-litigated later. (Precedent: `arXiv:2603.07300`, "AutoResearch-RL," excluded for exactly this reason — see the frontier-card note in `index.html` Module 10.)
3. **Rename** to `Descriptive Title ArxivID-or-Year.pdf` (see existing files for the pattern — e.g. `DO-PFN 2506.06039v3.pdf`). Papers without an arXiv ID get a year instead (e.g. `Efficient Global Optimization of Expensive Black-Box Functions 1998.pdf`).
4. **File into the matching subfolder.** Current taxonomy:
   - `Bayesian-Optimization/` (+ `Causal-Bayesian-Optimization/` subfolder)
   - `Simulation-Based-Inference/01-Foundations-and-Reviews/` … `06-Marketing-and-Econometrics-Applications/`
   - `Agentic-Research-and-Autonomous-Optimization/01-LLM-Augmented-Bayesian-Optimization/`, `02-Autonomous-Research-Agents-and-AI-Co-Scientists/`, `03-Evolutionary-Program-Search-Agents/`
   If nothing fits, that's a signal a new subfolder or even a new Part in `index.html` may be warranted — don't force a bad fit.
5. **Update `PAPERS_SUMMARY.md`**: add a row to the relevant table, write an original 2-4 sentence summary (never copy the abstract verbatim — summarize in your own words).
6. **Update `index.html`** in the matching Module: add a `.card` following the existing markup pattern (`data-card`, `data-pillar`, unique checkbox `id="p-<slug>"`, `.meta` line, `.summary`). Bump the module's total count in the sidebar `data-count-for` span and in the masthead stats row if the grand total changed. **Checkbox IDs are permanent** once a user may have checked them (they're the localStorage key) — never reuse or rename an existing `id="p-*"`.
7. Re-run the verification pass from the "Verify the whole file" section below.

## Adding a code repo

Clone into `repos/<name>/` (flat, one dir per repo — not nested, not a submodule; this project root is not itself expected to track these as submodules, see Git conventions below). Add a row to the `## Code repositories` table in `PAPERS_SUMMARY.md`, and if it's directly tied to a Part/Module theme, add a `.repo-list` line in the matching `index.html` module.

## Verify the whole file (run after any batch of changes)

```bash
# paper/checkbox/card counts must all match each other
grep -o 'data-card data-pillar="[a-z]*"' index.html | wc -l
grep -o 'id="p-[a-zA-Z0-9]*"' index.html | sort -u | wc -l
grep -o 'id="p-[a-zA-Z0-9]*"' index.html | sort | uniq -d   # must be empty — no duplicate ids

# tags must balance
grep -o '<div' index.html | wc -l
grep -o '</div>' index.html | wc -l

# no stray references to the old project folder name
grep -rl "Simulation_Bayesian_Research\|Simulation Bayesian Research" . --include="*.md" --include="*.html"
```

## Git & GitHub conventions

- **PDFs and `repos/` are gitignored — local only, never committed.** Two reasons: (1) size — `repos/` alone is ~570MB of other people's cloned code, PDFs run another ~250MB; (2) redistribution rights — several of these papers (Nature articles, conference proceedings, some arXiv preprints) are not under licenses that permit a third party to republish them, even though they're freely viewable at the source. Only the *original analysis and organization* (this repo's actual content) gets published, not the underlying papers.
- To reconstitute `repos/` on a fresh clone: see the repo URLs in the `## Code repositories` table in `PAPERS_SUMMARY.md`.
- To reconstitute the PDF library: re-run the acquisition process per paper (arXiv ID / DOI is recorded in both `PAPERS_SUMMARY.md` and each card's `.meta` line in `index.html`).
- Commit messages: describe what changed in the library/curriculum (e.g. "add AlphaLab + Barbarians at the Gate to evolutionary-search module"), not generic "update files."
- Never force-push. Never rewrite history on this repo without being asked.

## Working style established in this project (read before making judgment calls)

- When a decision is genuinely the user's taste (naming, which of several plausible papers to prioritize, how to categorize an ambiguous paper), ask — don't guess and silently commit to one branch.
- When a source looks unreliable (see the fabricated-author-block precedent above), say so explicitly rather than quietly including or quietly dropping it.
- Trim summaries for scannability in `index.html` (1-3 sentences); `PAPERS_SUMMARY.md` can run longer since it's a reference doc, not a UI.
- Keep `index.html` dependency-free (no external fonts/CDN/JS libraries) so it keeps working as a static file or GitHub Pages site with zero build step.
