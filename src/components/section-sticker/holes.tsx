import React from "react";
import { SectionHole } from "../icon";

type Props = {};

const Holes = (props: Props) => {
  return (
    <div className="holes back">
      <SectionHole />
      <div className="holes__center">
        <div className="holes__top"></div>
        <div className="holes__bot"></div>
      </div>
      <div className="holes__flipped">
        <SectionHole />
      </div>
    </div>
  );
};

export default Holes;
