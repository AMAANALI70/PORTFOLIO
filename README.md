# Amaan Ali — The Archivist

A cinematic engineering portfolio for Amaan Ali, told through the Archivist visual identity: **Person → Character → System → Work → Research → Archive → Journal → Exit**.

The opening chapter uses a pinned Canvas sequence driven by GSAP ScrollTrigger. The remaining chapters present verified engineering projects, research, technical skills, and build notes in a restrained ink-and-paper visual system.

## Stack

- Next.js App Router, React, and TypeScript
- GSAP and ScrollTrigger for scroll choreography and editorial reveals
- Canvas for the 240-frame Archivist sequence
- Lucide icons

## Getting started

Use Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a browser. `npm run build` creates the static site in `out/`; serve that folder with a static file server to preview the production export.

## Project structure

- `app/` — App Router page and document layout
- `src/App.tsx` — cinematic experience, Canvas sequence, chapter interactions, and shared motion system
- `src/data/portfolioData.ts` — project, research, archive, and journal content
- `src/index.css` — typography, layout, responsive styles, and motion details
- `frames2/` — canonical 240-frame source sequence
- `public/frames2/` — sequence served by Next.js at `/frames2/`
- `public/` — favicon and other public assets

## Notes

The sequence filenames are zero-padded (`ezgif-frame-001.jpg` through `ezgif-frame-240.jpg`). Keep the source and public copies aligned when updating frames. The experience honors the operating system's reduced-motion preference by showing a still frame and disabling the pinned sequence.

## GitHub Pages deployment

Pushing to main runs .github/workflows/pages.yml, which builds and deploys the static export. The workflow sets the /PORTFOLIO project path and prefixes the Canvas frame URLs for GitHub Pages. After the workflow succeeds, the site is available at https://amaanali70.github.io/PORTFOLIO/.
