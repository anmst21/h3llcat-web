"use client";

import Lottie from "lottie-react";
import React from "react";
import animationEQ from "../icon/animationEQ.json";

const Equalizer = () => {
  return (
    <div className="disk-section__radio__eq">
      <Lottie
        style={{ display: "flex", width: 127, height: 119 }}
        animationData={animationEQ}
        loop
        autoPlay
      />
    </div>
  );
};

export default Equalizer;
