"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import RoundHoles from "./round-holes";
import { ArrowSticker, StickerJap } from "../icon";

const AnimatedSticker = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  // Define animation props only if not on mobile
  const animationProps = isMobile
    ? {} // No animation properties on mobile
    : {
        initial: { rotate: 0, top: "0px", left: "0px" },
        whileInView: { rotate: 30, top: "-9px", left: "2px" },
        transition: { type: "spring", stiffness: 100, damping: 10 },
        viewport: { once: true, amount: 1 },
      };

  return (
    <motion.div className="section-sticker__jap" {...animationProps}>
      <div className="round-holes__bot remove-on-mobile">
        <RoundHoles />
      </div>
      <div className="section-sticker__works">
        <StickerJap />
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
