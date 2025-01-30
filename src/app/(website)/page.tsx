import SectionDisplay from "@/components/section-display";
import SectionMint from "@/components/section-mint";
import SectionCollections from "@/components/section-collections";
import SectionApp from "@/components/section-app";

export default function Home() {
  return (
    <div className="home">
      <SectionDisplay />
      <SectionMint />
      <SectionCollections />
      <SectionApp />
    </div>
  );
}
//  <button onClick={async () => await subscribeUser("anmstudios21c@gmail.com")}>
//    Subscribe
//  </button>;
