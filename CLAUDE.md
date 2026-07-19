# CLAUDE.md

Context for working on the Calvary Road Baptist Church website. Read before making changes.

## What this is

The public website for Calvary Road Baptist Church (New Albany, Indiana), an independent, fundamental, **King James Version only** Baptist church. Hand-maintained **static multi-page site**, no backend, no build step. Edit HTML/CSS/JS directly and deploy by pushing to `main` (GitHub Pages) or Cloudflare Pages.

Priorities: loads fast on phones, easy to read, doctrinally accurate, found by Google and AI assistants.

## Tech + design system

- Plain HTML, shared `style.css` + `main.js`, real images in `img/`. Google Fonts (Playfair Display + Inter) is the only external dependency.
- Design tokens at the top of `style.css`. Semantic names, not color names:
  - `--primary` deep spruce green `#26413a`, `--primary-dark` `#1b2f2a`
  - `--accent` antique brass `#b0863c` (use `--accent-deep #8a6631` for accent-colored text on white to keep contrast readable)
  - `--base-tint` warm ivory `#f5f2ea`, `--radius 4px`
- Section-header motif is the **three-crosses ornament + brass underline rule** (from the church logo), not an eyebrow label. Keep it consistent.
- Rhythm is banded: white, warm-ivory (`.section-alt`), and occasional green (`.section-dark`) bands.

This identity is deliberately distinct from the other church sites built with the same skill (Hope = navy, Roanoke = red). Don't drift it back toward navy/gold.

## Critical conventions (do not regress)

1. **Light-mode lock.** Every page has the two `color-scheme` metas, `color-scheme: light only` in `:root`, and a `@media (prefers-color-scheme: dark)` block in `style.css` that forces backgrounds light. If you add a new background class, add it to that dark-mode block. Elements meant to stay green (header, hero, `.section-dark`, `.cta-card`, `.service-strip`, footer) are protected there explicitly.
2. **No em dashes or en dashes** anywhere a visitor can read. Use periods, commas, colons, "at", or parentheses.
3. **Shared shell must stay in sync.** The header, mobile nav, and footer are duplicated in all six pages. Change one, change all. Grep the change across every `.html`.
4. **KJV only.** All Scripture on the site is King James Version. The statement of faith wording in `beliefs.html` is the church's own; do not paraphrase doctrine loosely or swap translations.
5. **Commit `img/` files** whenever images change, or production shows broken images.
6. **Mobile nav.** The hamburger + `#mobileNav` overlay is the only navigation under 940px. Verify it works after header edits.

## Content notes

- Service times: Sun 10:00 / 11:00 / 5:00, Wed 6:30, Sat visitation 10:30.
- Pastor: Mike Kleitz (since 2007). Deacons and clerk listed on `about.html`.
- See `README.md` for the items awaiting the church's confirmation (two phone numbers, two emails, approximate map coordinates, low-res recovered photos, logo source). Reconcile those before launch.

## Local preview

```bash
python -m http.server 8000
```
Test on a phone/emulator and in dark mode.
