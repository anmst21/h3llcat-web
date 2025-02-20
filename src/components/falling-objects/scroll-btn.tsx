"use client";

import React from "react";
import { ScrollChev } from "../icon";

const ScrollToFooterButton = () => {
  const handleClick = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button className="not-found__scroll" onClick={handleClick}>
      <ScrollChev />
    </button>
  );
};

export default ScrollToFooterButton;
