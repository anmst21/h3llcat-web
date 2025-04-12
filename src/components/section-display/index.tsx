import { SideJap } from "../icon";

import RombusCarousel from "./rombus-carousel";
import DisplayCarousel from "./display-carousel";
import DiskSection from "./disk-section";

const SectionDisplay = () => {
  //100
  return (
    <div id="hero" className="section-display">
      <div className="section-display__top">
        <div className="section-display__top__right">
          <span>Display by N3xus</span>
        </div>
      </div>

      <div className="section-display__center">
        <DiskSection />
        <RombusCarousel type="desktop" />
        <div className="section-display__right">
          <SideJap />
        </div>
      </div>
      <DisplayCarousel type="desktop" />
    </div>
  );
};

export default SectionDisplay;
