import React from "react";
import Holes from "./holes";

function SectionSticker() {
  return (
    <div className="section-sticker">
      <div className="section-sticker__hollow"></div>
      <Holes />
      <div className="section-sticker__reimagine">
        <h3>Reimagine How You Mint On Chain</h3>
        <span>Swipe. Collect. Repeat. </span>
      </div>
      <Holes />
      <div className="section-sticker__works">
        <span>How it works?</span>
        <p>
          With Display, minting on-chain has never been easier. Swipe through
          curated collections, mint what inspires you, and build your digital
          gallery—all in one seamless experience.
        </p>
      </div>
      <Holes />
      <div className="section-sticker__newsletter">
        <h3>Never Miss a Drop: Sign Up for Display's Newsletter</h3>
      </div>
      <Holes />
    </div>
  );
}

export default SectionSticker;
