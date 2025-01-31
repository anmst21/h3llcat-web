import CornerGrid from "./corner-grid";
import CollectionsCarousel from "./carousel";

export default function SectionCollections() {
  return (
    <div className="section-collections">
      <div className="section-collections__header">
        <span>Explore all</span>
        <h1>Collections</h1>
        <CornerGrid />
      </div>
      <CollectionsCarousel />
    </div>
  );
}
