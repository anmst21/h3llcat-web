import SectionDisplay from "@/components/section-display";
import SectionMint from "@/components/section-mint";
import SectionCollections from "@/components/section-collections";
import SectionApp from "@/components/section-app";
import SectionSticker from "@/components/section-sticker";
import { LandingWelcome } from "@/components/icon";
import SectionFeatures from "@/components/section-features";
import SectionMockups from "@/components/section-mockups";
import JoinCarousel from "@/components/join-carousel";

export default function Home() {
  return (
    <div className="home">
      <div className="section-display__welcome">
        <LandingWelcome />
      </div>
      <SectionSticker />
      <SectionDisplay />
      <SectionMint />
      {/* <SectionCollections /> */}
      <SectionFeatures />
      <JoinCarousel />
      <SectionMockups />
      {/* <SectionApp /> */}
      {/*  
      <SectionCollections />
      */}
    </div>
  );
}

// <Link href="/">Hero</Link>
//         <Link href="/">Collections</Link>
//         <Link href="/">Explore</Link>
//         <Link href="/">About</Link>
//         <Link href="/">Features</Link>
//         <Link href="/">Join</Link>
