# Jason Sun — software & curiosity

An editorial React + Vite portfolio. Start with `npm install` and `npm run dev`.

- `npm run build` — production output in `dist/`
- `npm run preview` — inspect the production build
- `npm test` — route resolution and legacy URL tests
- `npm run test:browser` — Chromium navigation, history, responsive, keyboard, and clipboard checks; starts/reuses Vite on port 5174
- `PORTFOLIO_PRODUCTION=1 npm run test:browser` — run the same checks against `dist/` on port 5175 after building
- `npm run lint` — ESLint
- `npm run format` — format the current editorial implementation

Browser tests use `/usr/bin/chromium` when available. Otherwise run `npx playwright install chromium` once. Screenshots are written to the ignored `test-results/` directory.

## Edit the portfolio

**Work, projects, education, skills, links:** `src/data/portfolio.js` is the original content source. Screenshot dimensions live beside their paths to reserve layout space.

**Photos, personal copy, project art captions:** `src/data/editorial.js`. Put actual personal photographs in `public/photos/` and replace the empty `src` values. `position` sets the focal crop. See `public/photos/README.md`.

**Project contributions:** the `contribution` fields in `projectEditorial` are intentionally empty; add verified individual/team contribution details when available. Extra personal interests can be added to `aboutCopy.outside`. Neither field renders when empty.

**Visual system:** `src/index.css` defines the palette, typography, compositions, motion, and responsive rules. Shared SVG motifs, photo fallbacks, and editorial primitives live in `src/components/Editorial.jsx`; independent pages live in `src/pages/`. Fonts are self-hosted from Fontsource. Legacy components/assets are retained but are not imported by the new app.

## Navigation and deployment

Routes are `#home`, `#about`, `#work`, `#projects`, and `#contact`. Individual project links use `#projects/readify` (or another project ID). Legacy `#experience`, `#log`, `#skills`, `#education`, and `#currently` links still resolve. Hash routing keeps deep links and refreshes compatible with a normal static Vite deployment, with no server rewrite requirement.

Page content loads with a 900ms fade from blur into focus; the persistent navbar stays steady. Reduced motion skips these animations. Each page has its own cobalt background composition in `src/components/CyberGraphics.jsx`. Route changes manage focus, browser history, and scroll restoration; header navigation stays available on long pages.

## Content boundaries

The three experiences, four projects, technologies, education, and contact links come from the previous repository content. No additional achievements, metrics, portraits, or employment history were invented. Readify’s existing store links are search URLs, labelled “Find on Chrome/Firefox”; replace them with verified listing URLs when available. The two hand-drawn sketches mentioned in the brief were not attached; the written layout descriptions guided the implementation.

The original `DESIGN.md` and pixel-asset documentation describe an earlier direction. This implementation follows the newer four editorial references: a dark-first theme, expressive serif type, cobalt teddy-with-laptop/ink-and-quill/letter silhouettes, fine trajectories, and restrained collage. All pages support the persistent sun/moon icon toggle; new visits default to dark. The email address is a copy-only button with accessible feedback.
