import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://tequilafestcolumbus.com";
const OG_IMAGE = `${SITE_URL}/opengraph-image`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tequila Fest Columbus 2027 | August 14 · Columbus, Ohio",
    template: "%s | Tequila Fest Columbus",
  },
  description:
    "Columbus's biggest tequila festival. August 14, 2027 in Columbus, OH — venue announcing soon. Sample 50+ premium tequilas, enjoy authentic tacos, live music by Apostle Jones Band & DJ Fusemania. VIP packages available.",
  keywords: [
    "tequila near me",
    "tequila columbus",
    "tequila fest",
    "tequila festival columbus",
    "tequila festival",
    "Tequila Fest Columbus",
    "tequila festival Columbus Ohio",
    "Columbus tequila event 2027",
    "tequila tasting near me",
    "tequila tasting Columbus",
    "tequila festival near me",
    "tequila sampling Ohio",
    "tequila event Columbus",
    "Columbus Ohio festival",
    "Columbus food and drink festival",
    "Columbus summer festival 2027",
    "things to do in Columbus August 2027",
    "Apostle Jones Band",
    "DJ Fusemania",
    "VIP tequila experience",
    "tacos Columbus",
    "tequila fest USA",
    "tequila brands Ohio",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Tequila Fest Columbus 2027 | August 14 · Columbus, Ohio",
    description:
      "Sample 50+ premium tequilas, enjoy authentic tacos & live music at Columbus's biggest tequila festival. August 14, 2027 · Columbus, OH. Venue announcing soon!",
    siteName: "Tequila Fest Columbus",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Tequila Fest Columbus 2027 – August 14 in Columbus, Ohio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tequila Fest Columbus 2027 | August 14 · Columbus, OH",
    description:
      "50+ tequilas · tacos · live music. Columbus's biggest tequila festival is August 14, 2027. Venue announcing soon!",
    images: [OG_IMAGE],
    creator: "@TequilaFestUSA",
    site: "@TequilaFestUSA",
  },
  other: {
    "geo.region": "US-OH",
    "geo.placename": "Columbus, Ohio",
    "geo.position": "39.9612;-82.9988",
    ICBM: "39.9612, -82.9988",
    "theme-color": "#F5A623",
  },
};

// The 2027 venue is still TBA, so `location` carries the city rather than a
// specific Place, and tickets are PreOrder rather than InStock — the event is
// `coming_soon` on TequilaFestUSA.com and nothing is purchasable yet. Both
// need updating the moment the venue is booked and tickets go on sale.
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Tequila Fest Columbus 2027",
  description:
    "Columbus's biggest tequila festival featuring 50+ premium tequila brands, authentic tacos, live music, and VIP experiences. Presented by Código 1530.",
  url: SITE_URL,
  startDate: "2027-08-14T15:00:00-04:00",
  endDate: "2027-08-14T21:00:00-04:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Venue TBA — Columbus, Ohio",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Columbus",
      addressRegion: "OH",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.9612,
      longitude: -82.9988,
    },
  },
  image: [OG_IMAGE],
  organizer: {
    "@type": "Organization",
    name: "Tequila Fest USA",
    url: "https://tequilafestusa.com",
  },
  offers: [
    {
      "@type": "Offer",
      name: "General Admission",
      url: "https://www.tequilafestusa.com/events/columbus#tickets",
      availability: "https://schema.org/PreOrder",
      validFrom: "2026-01-01",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "VIP Experience",
      url: "https://www.tequilafestusa.com/events/columbus#tickets",
      availability: "https://schema.org/PreOrder",
      validFrom: "2026-01-01",
      priceCurrency: "USD",
    },
  ],
  performer: [
    {
      "@type": "MusicGroup",
      name: "Apostle Jones Band",
    },
    {
      "@type": "Person",
      name: "DJ Fusemania",
    },
  ],
  sponsor: {
    "@type": "Organization",
    name: "Código 1530",
  },
  keywords:
    "tequila festival, Columbus, Columbus Ohio, tequila tasting, live music, tacos, VIP experience",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Tequila Fest Columbus",
  description: "Annual tequila festival in Columbus, Ohio.",
  url: SITE_URL,
  telephone: "",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Columbus",
    addressRegion: "OH",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.9612,
    longitude: -82.9988,
  },
  sameAs: ["https://tequilafestusa.com"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <Script
          id="event-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        <Script
          id="localbusiness-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '312417059684193');
          fbq('track', 'PageView');
        `}</Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=312417059684193&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
