# Surrey Strata &amp; Commercial Care — website

Static marketing site for Surrey Strata &amp; Commercial Care (Mission, BC): strata common-area cleaning, rental turnovers, and post-construction detail cleans.

## Structure

```
index.html            Home
services.html         Three service lines + add-ons + standards
service-area.html     Corridor coverage and response times
about.html            Owner and operating standards
contact.html          Contact details + quote form
404.html              Not-found page
assets/css/site.css   All styling (no framework)
assets/js/site.js     Nav toggle, scroll reveal, quote form (sms / WhatsApp compose)
assets/img/           Logo lockups (SVG) and favicon
assets/img/photos/    Site photography (JPEG + WebP), sourced from Pexels under the Pexels licence (free for commercial use, no attribution required)
```

No build step, no dependencies, no backend. The quote form composes a text or WhatsApp message locally — nothing is stored or transmitted by the site.

## Local preview

```powershell
python -m http.server 8080
# open http://localhost:8080
```

## Deploy

Served by GitHub Pages from the `main` branch root. Push to `main` and the site rebuilds.

## Brand

Navy `#1F3B63` · Aqua `#14A89C` · Off-white `#F5F8FA`. Logo files live in `07_Brand_Assets` in the client folder (mark, horizontal lockup, reverse lockup, 1024/256px exports).
