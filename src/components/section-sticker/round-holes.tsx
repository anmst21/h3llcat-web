import React from "react";
import { SectionHole } from "../icon";

const RoundHoles = () => {
  return (
    <div className="round-holes">
      <SectionHole />
      <div className="holes__center">
        <div className="rouded-hole__gap" />
        {Array.from({ length: 12 }, (_, index) => {
          return (
            <div
              style={{
                display: "flex",
                height: 24,
                width: "100%",
                maxWidth: 31,
              }}
              key={index}
            >
              <div className="rouded-hole" />
              <div className="rouded-hole__gap" />
            </div>
          );
        })}
      </div>
      <div className="holes__flipped">
        <SectionHole />
      </div>
    </div>
  );
};

export default RoundHoles;
