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
| `research.md` | Raw scoping conversation / transcript. Historical record, **not** curated. Gitignored — local only, not on GitHub (may reference business context). | Never edit — it's a record of how the project started. |
| `PAPERS_SUMMARY.md` | Folder-indexed reference. One entry per paper/repo, grouped by where it physically lives on disk. | Every time a paper or repo is added, removed, or reclassified. |
| `index.html` | Sequenced reading path. Same papers, reorganized by learning order into Parts/Modules, with a working progress tracker (localStorage), search, and pillar filters. Card titles link out to `papers/<slug>.html`. | Every time `PAPERS_SUMMARY.md` changes — **the two must stay in sync**, see below. |
| `papers/<slug>.html` | One page per paper (51 total). Summary (mirrors the card), a link to the actual PDF in the private `learned-intuition-library` repo, and two sections meant to be filled in over time: **Study Notes** and **Discussion, Section by Section**. | Created once per paper via the generator script (see below); notes/discussion sections get hand-edited as papers actually get read/discussed. |
| `assets/theme.css`, `assets/theme.js`, `assets/paper.css` | Shared design tokens, theme-toggle logic, and paper-page layout — used by `index.html` and every `papers/*.html`. One `localStorage` key (`learned-intuition-theme`) keeps the light/dark choice consistent across all 52 pages. | Only when changing the design system itself — never duplicate these into an individual page. |

All HTML pages in this repo are dependency-free (no external fonts, no CDN, no network calls except the outbound PDF links) — keep it that way so the site works offline and as a zero-build static site.

### The private PDF library

The actual PDFs live in a **separate private repo**, `tjphoton/learned-intuition-library`, not in this (public) repo — see "Git & GitHub conventions" below for why. Its folder structure is an exact mirror of this repo's paper folders (`Bayesian-Optimization/`, `Simulation-Based-Inference/<NN-name>/`, `Agentic-Research-and-Autonomous-Optimization/<NN-name>/`). Each `papers/<slug>.html` page's "Open PDF" button points to:

```
https://github.com/tjphoton/learned-intuition-library/blob/main/<url-encoded-relative-path>
```

Since that repo is private, this link only resolves for whoever is logged into GitHub with access (i.e. the owner) — that's intentional, not a bug.

### Regenerating paper pages

`papers/*.html` are generated, not hand-written, from the card markup already in `index.html` (title, meta line, and summary are extracted directly — never retyped, to avoid drift) plus a slug → PDF-path mapping. When adding a new paper, after step 6 below, also:

1. Add the new PDF to the private library repo (`learned-intuition-library`), same relative path convention as this repo's folders.
2. Add its slug → path entry to the mapping (see git history for `generate_papers.py` if it's not still in the repo — it was run from a scratch location, not committed, since it's a one-shot generator, not a maintained tool. If regenerating many pages at once in the future, it's worth re-creating a small script like it rather than hand-writing pages — the per-card regex extraction from `index.html` is what keeps title/meta/summary text from drifting out of sync between the two.).
3. Generate `papers/<slug>.html` following the existing template pattern (see any existing file in `papers/` for the exact structure: `<!-- NOTES:START -->` / `<!-- NOTES:END -->` and `<!-- DISCUSSION:START -->` / `<!-- DISCUSSION:END -->` HTML comments mark where hand-written content goes later — keep those markers, they're the reliable edit anchors).
4. Wrap the new card's `<h4>Title</h4>` in `index.html` with `<a href="papers/<slug>.html">Title</a>`.

### Filling in Study Notes / Discussion sections

When a paper actually gets read or discussed in a session, edit its `papers/<slug>.html` directly — replace the placeholder `<p class="placeholder">` between the `<!-- NOTES:START -->`/`<!-- DISCUSSION:START -->` markers with real content (use `<h3>` per section/topic, `<p>`/`<ul>` for the actual notes). This is hand-authored per paper as it happens, not batch-generated.

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

- **This repo (`learned-intuition`) is public.** It holds the site (`index.html`, `papers/`, `assets/`), the reference docs, and one `README.md` pointer per cloned repo under `repos/<name>/` — never the actual PDFs or full repo clones.
- **The PDFs live in a separate private repo, `learned-intuition-library`.** Reason: several of these papers (Nature articles, conference proceedings, some arXiv preprints) are not under licenses that permit a third party to *publicly* republish them, even though they're freely viewable at the source — a private repo is personal storage, not publication, which is a meaningfully different act. Its folder structure mirrors this repo's paper folders exactly; see "The private PDF library" above for how `papers/*.html` link to it.
- **`repos/*/` (cloned reference implementations) are trimmed to just `README.md`.** The actual code is other people's, easily re-cloned from the URLs in `PAPERS_SUMMARY.md`'s `## Code repositories` table — no need to republish it either. `.gitignore` enforces this: `repos/*/*` is ignored except `repos/*/README.md`.
- To reconstitute a full local working copy: clone this repo, clone `learned-intuition-library` alongside it (or wherever `papers/*.html`'s links expect it — currently hardcoded to `github.com/tjphoton/learned-intuition-library`), and re-clone each `repos/<name>/` from the URLs in `PAPERS_SUMMARY.md`.
- Commit messages: describe what changed in the library/curriculum (e.g. "add AlphaLab + Barbarians at the Gate to evolutionary-search module"), not generic "update files."
- **Commit and push after every local file update in this repo.** Whenever a file here (`index.html`, `papers/*.html`, `PAPERS_SUMMARY.md`, `README.md`, this file, etc.) is edited — e.g. filling in a paper's Study Notes/Discussion after a reading session — commit that change with a scoped message and push to `origin/main` right away, rather than batching edits across a session. Keeps GitHub Pages and the reading-progress record current as papers actually get read.
- Never force-push. Never rewrite history on this repo without being asked.

## Working style established in this project (read before making judgment calls)

- When a decision is genuinely the user's taste (naming, which of several plausible papers to prioritize, how to categorize an ambiguous paper), ask — don't guess and silently commit to one branch.
- When a source looks unreliable (see the fabricated-author-block precedent above), say so explicitly rather than quietly including or quietly dropping it.
- Trim summaries for scannability in `index.html` (1-3 sentences); `PAPERS_SUMMARY.md` can run longer since it's a reference doc, not a UI.
- Keep `index.html` dependency-free (no external fonts/CDN/JS libraries) so it keeps working as a static file or GitHub Pages site with zero build step.
