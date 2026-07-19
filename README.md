# Calvary Road Baptist Church — Website

The website for Calvary Road Baptist Church, New Albany, Indiana. A hand-maintained **static multi-page site** (plain HTML/CSS/JS, no build step, no framework) intended for free hosting on GitHub Pages or Cloudflare Pages with a custom domain.

Built with the `church-website-builder` skill. Given its own visual identity (deep spruce green + antique brass + warm ivory, Playfair Display + Inter, three-crosses ornament) so it does not look like a copy of the other church sites built from the same skill.

## Files

```
index.html     Home (hero, service strip, welcome/mission, verse banner, schedule + ministries, gallery, pastor, visit/contact)
about.html     Our Church (mission, history, leadership, ministries)
beliefs.html   What We Believe (Articles of Faith accordion)
gospel.html    God's Simple Plan (salvation)
watch.html     Watch (BoxCast live + archive, Roku, Facebook, giving)
visit.html     Plan Your Visit (directions, map, contact, prayer request form)
404.html       Not-found page
style.css      All styles
main.js        All shared behavior (mobile nav, scroll offset, verse expand, beliefs accordion, fade-in)
img/           Logo, emblem, pastor photo, gallery photos (real files)
favicon.ico, apple-touch-icon.png, social-preview.jpg
robots.txt, sitemap.xml, CNAME, .nojekyll
```

`img/_raw/` holds the original recovered files and can be deleted; it is not referenced by the site.

## BEFORE GOING LIVE — please confirm with the church

These were recovered from the old site, which had conflicting information. Confirm and correct before launch:

1. **Phone numbers.** The old site showed two: **(812) 945-1943** (used here as the church office) and **(812) 946-3076** (used here as Pastor Mike's direct line, per the old site's "call Pastor Mike... any time day or night"). Confirm which is which. The office number is the canonical NAP number in the footer, structured data, and Google Business Profile.
2. **Email.** The old site showed both `mkleitz@calvaryroadbaptist.net` (staff page) and `mkleitz@me.com` (contact page). This site uses **mkleitz@calvaryroadbaptist.net**. Confirm which inbox is actually monitored, or set up a dedicated office address.
3. **Map / geo coordinates.** The JSON-LD `geo` in `index.html` is approximate. Replace with exact coordinates: right-click the building in Google Maps, "What's here?", copy the lat/long.
4. **Photos are low resolution.** All gallery photos were recovered from the old site's slideshow (600x250). They are usable but not sharp. Replacing them with fresh, higher-resolution photos is the single biggest quality upgrade available.
5. **Logo.** Recreated as a clean transparent-white PNG from the old black JPEG. If the church has the original vector/high-res logo, swap it in for crisper rendering.

## Local preview

No build step. Serve the folder and open it in a browser (use a server, not file://, so paths behave like production):

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Always test on a phone or the browser device emulator (this design was checked for the mobile hamburger menu and iOS dark-mode inversion).

## Deploy (GitHub Pages)

1. Create a public GitHub repo and push these files to `main`.
2. Settings → Pages → deploy from `main`, root folder.
3. The `CNAME` file keeps `calvaryroadbaptist.net` attached; set DNS at the registrar:
   - Four `A` records on `@`: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - One `CNAME` on `www` → `<username>.github.io`
4. Check "Enforce HTTPS."

Cloudflare Pages is an equally good option (see the skill's `deployment.md`), and is preferred if a Cloudflare Worker is added later.

**When you change an image, commit the file in `img/`.** HTML going live without its image files is the most common production bug.

## Integrations

- **Streaming:** BoxCast channel `kqakxvjrylbqtkqstupd`, embedded on `watch.html` via `https://boxcast.tv/channel/…`.
- **Giving:** Tithe.ly (`formId=65976ddc-5d42-11ee-90fc-1260ab546d11`).
- **Prayer request form:** currently composes a `mailto:` (no backend). To make it a true server-side form later, add a Cloudflare Worker endpoint or Formspree and point `visit.html`'s form script at it. (Worker setup intentionally deferred for v1.)

## Off-site (do these, they matter most for a local church)

- Claim/verify the **Google Business Profile**; keep name, address, phone identical to this site.
- Submit `sitemap.xml` in Google Search Console.
- If DNS is routed through Cloudflare, make sure AI crawlers are not blocked.
