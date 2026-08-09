# Learned Intuition

*Simulation-Based Inference, Bayesian Optimization, and the Rise of Agentic Research*

A book + 2-day hands-on workshop, currently in the research and curriculum-building phase. Three converging fields, one question asked three ways:

- **Recognize** — Simulation-Based Inference / Amortized Bayesian Inference. Train on millions of simulated examples so a network learns to recognize an answer instead of computing it fresh every time.
- **Decide** — Bayesian Optimization. Given a handful of expensive real trials, which one do you run next.
- **Who Decides** — Agentic / Autonomous Research. What changes when an LLM agent, not a fixed policy, steers either of the above.

**[Read the study plan →](https://tjphoton.github.io/learned-intuition/)** — a sequenced reading path through 51 papers and 4 reference implementations, with a search box, field filters, and a progress tracker that saves in your browser.

## In this repo

- **`index.html`** — the study plan (the page linked above). Self-contained, no build step, no external dependencies.
- **`PAPERS_SUMMARY.md`** — the same library indexed by folder instead of by reading order, with fuller per-paper notes.
- **`AGENTS.md`** — conventions for extending this library (paper naming, verification checklist, how the files stay in sync).

## Not in this repo

The PDFs themselves and a handful of cloned reference implementations (`sbi`, PFNs, Karpathy's `autoresearch`, etc.) are kept local-only — partly size (~800MB combined), partly because not every paper here is under a license that permits third-party redistribution, even where it's freely readable at the source. `PAPERS_SUMMARY.md` has the arXiv ID / DOI for every entry, and `AGENTS.md` has the repo URLs, so the full local library is reproducible from what's committed here.
