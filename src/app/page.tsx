import OfficialBanner from "@/components/OfficialBanner";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import VIPExperience from "@/components/VIPExperience";
import EventDetails from "@/components/EventDetails";
import TequilaSpotlight from "@/components/TequilaSpotlight";
import LiveMusic from "@/components/LiveMusic";
import Gallery from "@/components/Gallery";
import EmailSignup from "@/components/EmailSignup";
import TicketsCTA from "@/components/TicketsCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      {/* SEO: keyword-rich description for search engines and AI crawlers */}
      <p className="sr-only">
        Tequila Fest Columbus is the premier tequila festival in Columbus, Ohio — the ultimate
        tequila event for anyone searching for tequila near me in the greater Columbus area.
        Join us August 14, 2027 in Columbus, OH for a tequila festival featuring 50+ tequila
        brands, authentic tacos, live music, and VIP tequila experiences. Whether you&apos;re
        looking for a tequila tasting near me, a tequila festival near me, or the best tequila
        event in Columbus, Tequila Fest Columbus is the answer.
      </p>
      <OfficialBanner />
      <Hero />
      <Highlights />
      <VIPExperience />
      <EventDetails />
      <TequilaSpotlight />
      <LiveMusic />
      <Gallery />
      <EmailSignup />
      <TicketsCTA />
      <Footer />
    </main>
  );
}
