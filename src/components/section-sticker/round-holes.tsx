import React from "react";
import { SectionHole } from "../icon";

const RoundHoles = () => {
  return (
    <div className="round-holes">
      <SectionHole />
      <div className="holes__center">
        <div className="rouded-hole__gap" />
        {Array.from({ length: 12 }, (_, index) => (
          <>
            <div key={`hole-${index}`} className="rouded-hole" />
            <div key={`gap-${index}`} className="rouded-hole__gap" />
          </>
        ))}
      </div>
      <div className="holes__flipped">
        <SectionHole />
      </div>
    </div>
  );
};

export default RoundHoles;
