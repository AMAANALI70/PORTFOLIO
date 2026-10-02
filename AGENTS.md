# Repository Guidelines

## Project Structure

This is a Next.js App Router portfolio using React and TypeScript. Routes and document metadata live in `app/`; the client-side cinematic experience and portfolio data live in `src/App.tsx` and `src/data/portfolioData.ts`. Global visual and motion styles are in `src/index.css`. The canonical 240-frame sequence is in `frames2/` and is also published from `public/frames2/`. Keep large media in the relevant asset directory and use stable, zero-padded frame names.

## Development Commands

- `npm install` installs the dependencies in `package-lock.json`.
- `npm run dev` starts the local Next.js development server.
- `npm run build` creates the production build.
- `npm run start` serves the production build locally.

## Code Style

Use functional React components and strict TypeScript. Follow the existing two-space indentation, PascalCase for components, and camelCase for utilities and local variables. Keep reusable scroll motion in the shared GSAP reveal system rather than adding one-off animations to each section. Use semantic headings, buttons, and links; interactive controls need accessible names and state. Keep the editorial palette and typography consistent with the established ink, ivory, and muted-gold system.

## Testing and Review

No automated test or lint scripts are currently configured. For visual changes, review the relevant chapter at desktop and mobile widths, including pinned scrolling, reduced-motion settings, keyboard access, and image loading. Run `npm run build` before submitting changes.

## Commits and Pull Requests

Use concise imperative commit subjects, optionally scoped (for example, `feat(work): add project selector`). Pull requests should describe the visitor-facing change, list validation performed, link a related issue when available, and include screenshots or a short recording for visual work. Do not commit secrets, local environment files, or generated build output.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
