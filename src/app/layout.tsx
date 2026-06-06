import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tequila Fest Columbus | 50+ Tequilas · Tacos · Live Music",
  description:
    "Columbus's biggest tequila celebration. Sample 50+ premium tequilas, enjoy authentic tacos, live music, and more. Get your tickets now!",
  openGraph: {
    title: "Tequila Fest Columbus",
    description: "50+ tequilas, tacos, live music & more. La fiesta grande is coming to Columbus!",
    siteName: "Tequila Fest Columbus",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
