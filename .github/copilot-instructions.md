# Copilot Instructions for London Geek

## Repository Overview

London Geek (`londongeek.org`) is a **pure static website** that lists London tech events and meetups. It aggregates public calendars from London's tech and maker communities into a single, low-noise events index.

## Repository Structure

```
.
├── CNAME                        # Custom domain: londongeek.org
├── .github/
│   ├── copilot-instructions.md  # This file
│   └── workflows/
│       └── static.yml           # GitHub Pages deployment workflow
└── src/                         # All deployable files (deployed as-is)
    ├── index.html               # Main (and only) page
    ├── style.css                # All styles
    ├── favicon.svg              # SVG favicon
    ├── robots.txt               # Robots exclusion file
    └── sitemap.xml              # XML sitemap
```

## Technology Stack

- **Vanilla HTML and CSS only** — no JavaScript framework, no npm, no build step, no bundler, no dependencies
- The `src/` directory is deployed directly to GitHub Pages exactly as-is
- The one small inline `<script>` in `index.html` displays a live "Updated …" timestamp using the browser locale

## Deployment

- Deployed via GitHub Actions (`.github/workflows/static.yml`) to **GitHub Pages**
- Triggered on every push to `main` or via manual `workflow_dispatch`
- The workflow uploads the `src/` directory as the Pages artifact
- Live at: **https://londongeek.org/**

## Development Workflow

There is **no build step**. To work on the site:

1. Edit files directly in `src/`
2. Open `src/index.html` in a browser to preview (or use any local static file server, e.g. `python3 -m http.server 8080 --directory src`)
3. Push to `main` — GitHub Actions deploys automatically

## Linting, Building, and Testing

- **No linting tools** are configured in this repository
- **No build process** — files are static
- **No automated tests** — there is no test suite
- Validation is done by visual inspection in a browser and checking that the GitHub Actions deployment succeeds

## Adding New Event Sources

Event sources are embedded as Google Calendar iframes inside `src/index.html`. To add a new calendar:

1. Add an `<iframe>` in the `#events` section (or a new card) with the public Google Calendar embed URL
2. Update the `#sources` list to credit the new source
3. Keep iframes using `loading="lazy"` and include a descriptive `title` attribute for accessibility

Calendars can also be iCal/RSS feeds in future — see the "Add your calendar" card in the sidebar.

## Style Conventions

- CSS custom properties (variables) are defined in `:root` in `style.css` — always use them rather than hard-coded values
- Layout uses CSS Grid (`.grid`) for the two-column desktop layout
- Mobile-first: single column by default, two columns at `min-width: 900px`
- Card component (`.card`) is the main UI building block
- Colour palette: `--bg` (page background), `--panel` (card background), `--text`, `--muted`, `--subtle`, `--border`
- Indentation: 2 spaces in HTML and CSS

## SEO and Metadata

- `<title>`, `<meta name="description">`, Open Graph tags, and Twitter Card tags are all maintained in `<head>` of `index.html`
- Canonical URL is `https://londongeek.org/`
- Structured data (JSON-LD) for `WebSite` and `CollectionPage` is embedded in a `<script type="application/ld+json">` block
- `src/sitemap.xml` lists the single canonical URL
- `src/robots.txt` allows all bots and points to the sitemap

## Known Notes

- An OG image (`/og.png`, 1200×630) is commented out in `index.html` — it can be enabled once the image is added to `src/`.
- Google Analytics (GA4) tag `G-HEWVW1T81G` is included via gtag.js in the `<head>`.
- The `<link rel="me" href="https://github.com/davorg" />` tag links the site to the owner's GitHub profile (used by Mastodon/IndieWeb identity verification).
