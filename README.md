# EJADA website (front end)

Static, multi-page, bilingual (English / Arabic RTL) site. No build step — open `index.html` in a browser, or upload the folder to any static host.

## Run with Docker
```bash
docker compose up -d --build   # http://localhost:8080
docker compose down            # stop
```
Served by nginx (`nginx.conf`): gzip, 7-day asset caching, and clean URLs (`/about` → `about.html`).
After editing files, re-run `docker compose up -d --build` to rebuild.

## Pages
`index.html` · `about.html` · `services.html` · `training.html` · `clients.html` · `contact.html`

## Structure
- `assets/css/style.css` — all styles. Brand tokens are at the top (`--teal`, `--deep`, `--aqua`…).
- `assets/js/i18n.js` — Arabic text, keyed by each element's `data-i18n` attribute. English lives inline in the HTML.
- `assets/js/main.js` — shared header/footer (edit the nav once here), mobile menu, language toggle, animations, contact form.
- `assets/img/` — logo/icon SVGs from the brand file; `clients/` holds partner logos.

## Editing text
1. Change the English directly in the HTML.
2. Change the Arabic for the same `data-i18n` key in `assets/js/i18n.js`.

## Language
The toggle in the header remembers the choice. Links can force a language: `index.html?lang=ar` or `?lang=en`.

## Libraries (CDN)
GSAP 3.12.5 + ScrollTrigger (scroll animations), Lenis 1.1.13 (smooth scrolling), Google Fonts (Montserrat, Alexandria).
The site still works without them — content just appears without the scroll effects. Animations are disabled for users who prefer reduced motion.

## Contact form
There is no backend. After validation it opens the visitor's email app with a pre-filled message to `info@ejada.org`.
To receive submissions directly, point the form at a service such as Formspree or Netlify Forms.
