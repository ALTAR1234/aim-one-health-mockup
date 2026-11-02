# AiM One Health website mockup

A redesign concept for aimonehealth.com in a liquid-glass style, easy to read, with Daylight/Night themes, an icon sidebar, 3D card flips between pages and a phone layout.

## What's inside

- **Site pages:** Mission (home), Tools, Navigator, Open Research, Resources, Blog, Sample report, Request a Care Pathway.
- **Six blog articles:** every section, table and figure of the originals, with the text condensed; each links to the full original.
- **All 61 Oncology Navigator trainers:** one redesigned trainer page (`trainer.html?t=<id>`) driven by each trainer's data in `trainers/` (pulled from the Navigator's content API). Case inputs, modeled options with their eligibility rules, milestones, trials, honesty rules and the research library.

## Run

Double-click `Open mockup.cmd` (needs Python), or serve the folder with any static web server. Opening the HTML files directly mostly works, but the trainers and the page flip need the server.

Design mockup only: forms don't send anything, and trainer content is for teaching (synthetic patients, not medical advice).
