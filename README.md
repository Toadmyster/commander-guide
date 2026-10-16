# Squadron Commander Guide (CAP)

A small, installable web app (plain HTML/CSS/JS, no build step) that helps new Civil Air Patrol squadron commanders get oriented.

**Pages:** Home · Welcome to Squadron Command · Checklist · Progress Report (email)
**Navigation:** bottom tabs, finger-following swipe left/right, sliding transitions (arrow keys on desktop).
**Login:** CAP ID only (not security), remembered with a cookie + localStorage.

## Run it
Any static host works (open `index.html` through a web server; the service worker needs http/https).
- Local test: `python3 -m http.server 8000` then open http://localhost:8000
- Free hosting: GitHub Pages, Cloudflare Pages, Netlify, or Firebase Hosting. Upload the folder as-is.

## Edit content
- `js/content.js`: welcome text, checklist groups/items, and resource links. **The checklist and regulation references are starter content — verify against current CAP publications and your wing's requirements.**
- `js/config.js`: optional sync URL and default report email.
- `css/styles.css`: colors at the top (`--navy`, `--red`, `--gold`).
- Bump `VERSION` in `sw.js` after changes so installed copies refresh.

## Free checklist storage options (by CAP ID)

| Option | Cost | Cross-device | Effort | Notes |
|---|---|---|---|---|
| **A. localStorage (default, built in)** | Free | No (one browser/device) | None | Works offline. Cleared if browser data is cleared. |
| **B. Google Sheet + Apps Script (included)** | Free | Yes | ~10 min | Recommended. One row per CAP ID. Script in `apps-script/Code.gs`. |
| **C. Firebase Firestore (Spark plan)** | Free tier | Yes, realtime | ~30 min | Best if you later package for app stores. |
| **D. Supabase / Cloudflare Workers KV / D1** | Free tier | Yes | ~30 min | Good if you want a real database or admin view. |

Because the CAP ID is not a password, anyone who knows an ID could read or overwrite that checklist. Store only checklist ticks (as this app does) — no personal data.

### Setup for option B
1. Create a new Google Sheet.
2. Extensions → Apps Script → paste `apps-script/Code.gs`.
3. Deploy → New deployment → Web app → Execute as **Me**, access **Anyone** → Deploy.
4. Copy the Web App URL into `SYNC_URL` in `js/config.js`.
The app then syncs on open and after each change, and falls back to local storage when offline. Newest change wins.

## Progress report
The Report tab builds a plain-text summary and opens the user's email app via `mailto:` (works on every device, free, no server). A "Copy" button is included as backup. The recipient address and name are remembered on the device.

## Packaging for app stores later
The app is a PWA (manifest + service worker + icons). Options:
- **Android:** Trusted Web Activity via [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) or PWABuilder → Play Store.
- **iOS / Android:** wrap with [Capacitor](https://capacitorjs.com/) (`npx cap add ios android`), pointing at this folder.
- Note: in a wrapped app `mailto:` still works; if you use cookies, localStorage is also used as a fallback (already built in).

## Branding note
Colors are inspired by CAP's navy/red/gold. The included star icon is a generic placeholder — it is **not** the official CAP emblem. Official CAP logos and emblems are controlled; get approved artwork and usage permission through CAP National Headquarters / your wing public affairs before using them, and consider adding the standard "not an official CAP product" disclaimer if this is not officially sanctioned.
