# Eric — The Archivist

A cinematic identity portfolio for Eric, built as an editorial journey through the Archivist character: **Person → Character → System → Work → Research → Archive → Journal → Exit**.

The opening chapter uses a pinned Canvas sequence driven by GSAP ScrollTrigger. The remaining chapters present selected projects, research notes, experiments, and journal entries in a restrained ink-and-paper visual system.

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

Open `http://localhost:3000` in a browser. Create a production build with `npm run build`, then serve it with `npm run start`.

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
