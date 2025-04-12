"use client";

import React, { useState, useEffect } from "react";
import { CtaJap, CtaStars } from "../icon";
import StickerBtn from "../section-sticker/sticker-btn";
import { motion } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";
import CtaArtwork from "./cta-artwork";
import { useMediaQuery } from "react-responsive";

const SectionCta = () => {
  const [disableTransform, setDisableTransform] = useState(false);

  useEffect(() => {
    const updateDisableTransform = () => {
      setDisableTransform(window.innerWidth > 1728);
    };

    updateDisableTransform();
    window.addEventListener("resize", updateDisableTransform);
    return () => window.removeEventListener("resize", updateDisableTransform);
  }, []);

  const { ref, transform, handleMouseMove, handleMouseLeave } = useTilt(16);

  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });

  if (isMobile) return null;
  return (
    <div className="section-cta">
      <div className="section-cta__badge section-cta__badge--left">
        <CtaJap />
      </div>
      <div className="section-cta__badge section-cta__badge--right">
        <CtaJap />
      </div>

      <div className="section-cta__container">
        <CtaArtwork />
        <motion.div
          ref={ref}
          onMouseMove={disableTransform ? undefined : handleMouseMove}
          onMouseLeave={disableTransform ? undefined : handleMouseLeave}
          className="section-cta__text"
          style={{
            transformStyle: "preserve-3d",
            transform: disableTransform ? "none" : transform,
          }}
        >
          <h1>HEY, COLLECTORS!</h1>
          <div className="section-cta__stars">
            <CtaStars />
          </div>
          <h2>Get ready to shape the next era of on-chain art.</h2>
          <p>
            Become a part of Display's exclusive Beta and help shape the future
            of on-chain collecting.
          </p>
          <p>
            With our swipe-to-mint design, exploring curated collections and
            building your digital gallery is effortless. Sign up now and be
            among the first to pioneer the next era of NFT art.
          </p>
          <StickerBtn large type="cta" content="Join the beta" />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionCta;
