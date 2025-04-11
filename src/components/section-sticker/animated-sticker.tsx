"use client";

import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import RoundHoles from "./round-holes";
import { ArrowSticker, StickerJap } from "../icon";

const AnimatedSticker = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <motion.div
      className="section-sticker__jap"
      initial={{ rotate: 0, top: "0px", left: "0px" }}
      whileInView={{ rotate: 30, top: "-9px", left: "2px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      viewport={{ once: true, amount: 1 }}
    >
      <div className="round-holes__bot">
        <RoundHoles />
      </div>

      <div className="section-sticker__works">
        <StickerJap />
        {/* Removed the recursive <StickerJap /> call */}
        <div className="section-sticker__works__arrows">
          <div className="arrow-down">
            <ArrowSticker />
            <ArrowSticker />
            <ArrowSticker />
          </div>
          <div className="arrow-border" />
          <div className="arrow-down">
            <ArrowSticker />
            <ArrowSticker />
            <ArrowSticker />
          </div>
        </div>
      </div>
      <div className="round-holes__top">
        <RoundHoles />
      </div>
    </motion.div>
  );
};

export default AnimatedSticker;
