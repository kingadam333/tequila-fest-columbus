# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev server — port 4003 (3000=Willoughby, 4000=Cincinnati, 4001=Cleveland, 4002=USA, 4003=Columbus)
nohup npm run dev -- --port 4003 > /tmp/tequila-col-dev.log 2>&1 &

# Build (always verify before committing)
npm run build

# Lint
npm run lint

# Install dependencies (npm cache is broken at default location — use temp cache)
npm install --cache /tmp/npm-cache
```

## What This Is

A single-page marketing/splash site for **Tequila Fest Columbus** — an annual tequila festival held in Columbus, Ohio (2027 venue TBA). All ticket sales redirect to TequilaFestUSA.com; this site has no e-commerce or auth.

**All three city sites (Cincinnati, Cleveland, Columbus) share identical design, layout, and components. Only the city-specific content differs: event date, venue, logo, hero image, gallery photos, and ticket URLs. Cincinnati (`/Users/adambossin/Sites/tequila-fest-cincinnati`) is the design source of truth.**

**Event details:**
- Date: August 14, 2027, 3:00 PM – 9:00 PM (Saturday)
- Tequila sampling: 4:00 PM – 8:00 PM
- Venue: **TBA** — not yet booked. The site says "Venue TBA · Columbus, OH" in the
  Hero row, the EventDetails strip and the OG/Twitter images, and the Event JSON-LD
  carries the city rather than a Place. All of those need updating together once the
  venue is confirmed. (The 2026 event ran at Gravity, 480 W Broad St — the earlier
  "Greater Columbus Convention Center" in this file was never correct.)
- Ticket URL: `https://www.tequilafestusa.com/events/columbus#tickets`
- Vendor URL: `https://www.tequilafestusa.com/vendors`
- Brand packages URL: `https://www.tequilafestusa.com/brand-packages`

## Architecture

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion

All content lives in `src/app/page.tsx` as a stack of section components imported from `src/components/`. There is no routing — the entire site is one page (`/`).

**Section order (top to bottom):**
1. `OfficialBanner` — sticky top bar (`sticky top-0 z-50`); Código 1530 as presenting sponsor; platinum shimmer sweep; dismissible with ✕ button
2. `Hero` — full-viewport `hero-bg.jpg` with `bg-black/65` overlay; logo; TEQUILA FEST + COLUMBUS headline; live countdown; GET TICKETS button (gold, pulsing); Learn More + Vendors Wanted buttons (grey, smaller, below); confetti canvas; scroll indicator; papel picado bottom border
3. `Highlights` — "LA FIESTA GRANDE" section; 4-card grid (50+ Tequilas gold, Tacos red, Music purple, VIP platinum); below the cards: 3 ticket option cards (GA/DD $5 green, Tequila Sampling $55 gold, VIP $125 platinum) — all link to ticket URL
4. `VIPExperience` — full platinum section; 3D tilt cards on hover; sparkle particles; sweeping spotlight; VIP tequila brand marquee (7 brands duplicated for seamless loop); CTA links to ticket URL
5. `EventDetails` — marigold (`#F5A623`) strip with date/time/venue/admission info
6. `TequilaSpotlight` — "50+ TEQUILAS" section; auto-scrolling brand marquee (24 brands, duplicated); tequila type breakdown grid (Blanco/Reposado/Añejo/Extra Añejo); "Add Your Tequila Brand" button (black + gold border, swaps on hover) linking to brand-packages URL
7. `LiveMusic` — animated equalizer bars; DJ Fusemania card (3–6 PM yellow badge); Apostle Jones Band card (6:30–9 PM red badge); full schedule timeline
8. `Gallery` — masonry grid from `/public/gallery/`; lightbox on click
9. `EmailSignup` — red section; Supabase `email_subscribers` table (null-safe when env vars missing)
10. `TicketsCTA` — spinning decorative rings; pulsing gold CTA button; links to ticket URL
11. `Footer` — social links, legal, 21+ notice; links to ticket URL

## Hero CTA Structure (important — do not revert to side-by-side layout)

```
[GET TICKETS →]          ← gold, large, pulsing glow
[Learn More]  [Vendors Wanted]  ← grey outlined, smaller, side by side below
```

## Ticket Cards in Highlights (La Fiesta Grande)

Three cards below the 4 feature cards:
- **GA / Designated Driver** — Starting at $5 · "Entry + food & entertainment access" · green (#00A878)
- **Tequila Sampling** — Starting at $55 · "Entry + 12 tasting tickets + souvenir item" · gold (#F5A623)
- **VIP Experience** — Starting at $125 · "Private area · 8 ultra-premium pours · build-your-own taco bar" · platinum (#C0C0C0)

All three link to the ticket URL.

## Public Assets

```
/public/hero-bg.jpg                      — hero background photo
/public/tequilafest_columbus_logo.png    — event logo (displayed in hero + OG image)
/public/llms.txt                         — plain-text event summary for AI crawlers
/public/gallery/                         — currently Cincinnati's photos (see Parity section)
```

## OG / Social Image

`src/app/opengraph-image.tsx` — Node.js runtime (NOT edge); reads `hero-bg.jpg` and logo via `fs.readFileSync`, converts to base64, renders as 1200×630 ImageResponse with hero photo background, dark overlay, logo, city name, date, and venue. Do NOT add `export const runtime = "edge"` — it will break `fs`.

## Key Design Details

**Color palette:**
- Gold/warm: `#F5A623` (marigold) — primary festival color
- Red: `#C8102E` (agave red)
- Purple: `#7B2FBE` (fiesta purple)
- Green: `#00A878` (cactus)
- Dark bg: `#0d0500` (tequila barrel)
- Platinum: `#C0C0C0` (VIP)

**CSS shimmer classes** (in `globals.css` — do not remove):
- `.text-shimmer` — gold/red animated gradient (used on "TEQUILA")
- `.text-shimmer-blue` — light blue/turquoise/navy (used on "FEST")
- `.text-shimmer-platinum` — silver/white animated gradient (VIP sections)
- `.animate-pulse-glow` — yellow glow pulse on CTA buttons
- `.animate-float` — gentle float for scroll indicator
- `.papel-picado-border` — Mexican paper-cut SVG border between sections

**Fonts:** Bebas Neue (display/headlines), Playfair Display (subheadings), Source Sans 3 (body) — loaded via Google Fonts `@import` in `globals.css`. The `@import` **must stay above** `@import "tailwindcss"` or the build will warn.

**`Confetti.tsx`** — canvas-based particle animation; automatically disabled when `prefers-reduced-motion` is set.

**`VIPExperience.tsx`** — 3D card tilt via Framer Motion `useMotionValue`/`useTransform`. The `vipTequilas` array **must be duplicated** (7 entries × 2) for the CSS marquee loop to be seamless.

**`TequilaSpotlight.tsx`** — brands array has 24 real brands; duplicated in the render `[...brands, ...brands]` for seamless marquee.

## Tequila Brand Lineup (TequilaSpotlight)

Camerena · Avion · Gran Coramino · 1800 · Jose Cuervo · Gran Centenario · Dobel · Milagro · Del Maguey · Olmeca Altos · Codigo 1530 · El Jimador · Hornitos · El Tesoro · Sauza · Ghost · G4 · Los Linderos · Suavecito · Teremana · Viva Agave · Dolce Vida · Corazon · Authentico

## Content Updates

All content is hardcoded — no CMS. To update:
- **Event date/countdown:** `Hero.tsx` → `eventDate` constant (`new Date("2027-08-14T15:00:00")`)
- **Hero date/venue display:** `Hero.tsx` → the date/time/venue info row below the tagline
- **Event details strip:** `EventDetails.tsx` → `details` array
- **Hero city name:** `Hero.tsx` → the `COLUMBUS` text in the h2
- **Sponsor banner:** `OfficialBanner.tsx` → brand name and label
- **Tequila brands (general):** `TequilaSpotlight.tsx` → `brands` array (keep the render duplicated)
- **VIP tequila brands:** `VIPExperience.tsx` → `vipTequilas` array (keep duplicated for marquee)
- **Music lineup:** `LiveMusic.tsx` → artist cards and schedule timeline
- **Gallery:** drop files into `/public/gallery/`, update `media` array in `Gallery.tsx`
- **All ticket links:** grep for `tequilafestusa.com/events/columbus` to find all instances
- **OG image:** `src/app/opengraph-image.tsx` → date/venue string (and `twitter-image.tsx`, which is a separate edge-runtime variant with a gradient background instead of the hero photo)
- **Page metadata / JSON-LD:** `src/app/layout.tsx` → titles, descriptions, keywords, and the Event + LocalBusiness structured data
- **AI-crawler summary:** `public/llms.txt`

## Parity with Cincinnati/Cleveland

Brought up to Cleveland's level: the Hero date/time/venue row, `opengraph-image.tsx`,
`twitter-image.tsx`, `robots.ts`, `sitemap.ts`, `public/llms.txt`, the sr-only SEO
paragraph in `page.tsx`, and full page metadata with Event + LocalBusiness JSON-LD.

Still different from the other two:
- **Gallery photos are Cincinnati's.** `/public/gallery/` holds the same
  `2024-06-15 *.jpg` files as the Cincinnati site — copied when this site was cloned
  and never replaced. Real Columbus photos should go in and `Gallery.tsx`'s `media`
  array updated to match.
- **No Google Tag Manager.** Cleveland runs GTM (`GTM-MCV8GDVW`) alongside its Meta
  Pixel; Cincinnati and Columbus have only the direct Meta Pixel. Columbus's pixel is
  `312417059684193`. A Columbus GTM container would need to be created in the GTM
  account first — don't reuse Cleveland's ID.
- **No `icon.png` / `apple-icon.png`.** Cleveland has both; Columbus has `favicon.ico` only.

## Ticket Status (2027)

Tickets are **not on sale**. The `columbus` event row on TequilaFestUSA.com is
`coming_soon` with no ticket types configured, so `/events/columbus` shows a
coming-soon state and nothing is purchasable. The Hero and TicketsCTA buttons still
read "GET TICKETS" (same as the other two sites) and link to that page. The ticket
price cards in `Highlights.tsx` still show the 2026 prices ($5 / $55 / $125) — confirm
them before the 2027 on-sale.

## Email Signup → Brevo

`EmailSignup.tsx` posts to `POST /api/subscribe`, which adds the address to **Brevo
list 103** (Cincinnati uses 93, Cleveland 102) and requires `BREVO_API_KEY`. The
Supabase `email_subscribers` insert is the secondary path and is null-safe when its
env vars are missing — but a deploy without `BREVO_API_KEY` silently stops signups
reaching the mailing list.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
BREVO_API_KEY=          # required — without it email signups never reach Brevo list 103
```

Both optional for local dev — Supabase client is null-safe when empty. Only email signup requires them at runtime. Values must be empty (not placeholder text) or Supabase will throw a URL validation error at build time.

## Deployment

- GitHub: `kingadam333/tequila-fest-columbus`
- Hosted on Vercel, domain: `tequilafestcolumbus.com`
- Push to `main` → auto-deploys via Vercel GitHub integration
