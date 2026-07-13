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

A single-page marketing/splash site for **Tequila Fest Columbus** — an annual tequila festival held at the Greater Columbus Convention Center area. All ticket sales redirect to TequilaFestUSA.com; this site has no e-commerce or auth.

**All three city sites (Cincinnati, Cleveland, Columbus) share identical design, layout, and components. Only the city-specific content differs: event date, venue, logo, hero image, gallery photos, and ticket URLs. Cincinnati (`/Users/adambossin/Sites/tequila-fest-cincinnati`) is the design source of truth.**

**Event details:**
- Date: August 8, 2026, 3:00 PM – 9:00 PM
- Tequila sampling: 4:00 PM – 8:00 PM
- Venue: Greater Columbus Convention Center, Columbus, OH
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
/public/gallery/                         — add Columbus event photos here
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
- **Event date/countdown:** `Hero.tsx` → `eventDate` constant (`new Date("2026-08-08T15:00:00")`)
- **Hero date/venue display:** `Hero.tsx` → the date/time/venue info row below the tagline (not yet added — copy pattern from Cincinnati)
- **Event details strip:** `EventDetails.tsx` → `details` array
- **Hero city name:** `Hero.tsx` → the `COLUMBUS` text in the h2
- **Sponsor banner:** `OfficialBanner.tsx` → brand name and label
- **Tequila brands (general):** `TequilaSpotlight.tsx` → `brands` array (keep the render duplicated)
- **VIP tequila brands:** `VIPExperience.tsx` → `vipTequilas` array (keep duplicated for marquee)
- **Music lineup:** `LiveMusic.tsx` → artist cards and schedule timeline
- **Gallery:** drop files into `/public/gallery/`, update `media` array in `Gallery.tsx`
- **All ticket links:** grep for `tequilafestusa.com/events/columbus` to find all instances
- **OG image:** `src/app/opengraph-image.tsx` needs to be created (copy from Cincinnati and update city/date/logo)

## Known Gap vs Cincinnati/Cleveland

Columbus is missing:
- **Date/time/venue info row in Hero** — Cincinnati and Cleveland have this below the tagline; Columbus does not yet. Copy the pattern from `tequila-fest-cincinnati/src/components/Hero.tsx`.
- **OG image** — `src/app/opengraph-image.tsx` may not exist; copy from Cincinnati and update.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Both optional for local dev — Supabase client is null-safe when empty. Only email signup requires them at runtime. Values must be empty (not placeholder text) or Supabase will throw a URL validation error at build time.

## Deployment

- GitHub: `kingadam333/tequila-fest-columbus`
- Hosted on Vercel, domain: `tequilafestcolumbus.com`
- Push to `main` → auto-deploys via Vercel GitHub integration
