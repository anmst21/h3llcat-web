import NexusHeader from "@/components/header/nexus-header";
import SectionFuture from "@/components/nexus/section-future";
import SectionLogo from "@/components/nexus/section-logo";

export default function Nexus() {
  return (
    <div className="nexus">
      <NexusHeader />
      <SectionLogo />
      <SectionFuture />
    </div>
  );
}
