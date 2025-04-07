"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  CtaEth,
  CtaIlluminati,
  CtaJap,
  CtaLogo,
  CtaNft,
  CtaStar,
  CtaStars,
  CtaTryNow,
  CtaWeb,
} from "../icon";
import StickerBtn from "../section-sticker/sticker-btn";
import Image from "next/image";
import Game from "./game";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

const SectionCta = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [disableTransform, setDisableTransform] = useState(false);

  useEffect(() => {
    const updateDisableTransform = () => {
      setDisableTransform(window.innerWidth > 1728);
    };

    updateDisableTransform();
    window.addEventListener("resize", updateDisableTransform);
    return () => window.removeEventListener("resize", updateDisableTransform);
  }, []);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Combine the tilt transforms into one style
  const transform = useMotionTemplate`
    rotateX(${xSpring}deg) 
    rotateY(${ySpring}deg) 
    translateX(-50%) 
    translateZ(75px)
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableTransform || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate tilt values based on mouse position
    const tiltX = (mouseY / height - 0.5) * 16 * -1;
    const tiltY = (mouseX / width - 0.5) * 16;
    x.set(tiltX);
    y.set(tiltY);
  };

  const handleMouseLeave = () => {
    if (disableTransform) return;
    x.set(0);
    y.set(0);
  };

  return (
    <div className="section-cta">
      <div className="section-cta__badge section-cta__badge--left">
        <CtaJap />
      </div>
      <div className="section-cta__badge section-cta__badge--right">
        <CtaJap />
      </div>

      <div className="section-cta__container">
        <div className="section-cta__artwork">
          <div className="cta-illuminati__wrapper">
            <CtaIlluminati />
          </div>
          <CtaStar color={"#FFCC00"} index={3} width={27} height={60} />
          <div className="cta-game-boy__wrapper">
            <div className="cta-game-boy">
              <Image
                src={"/section-main/game-boy.png"}
                width={467}
                height={743}
                alt="game boy image"
              />
              <Game />
            </div>
          </div>
          <div className="cta-logo__wrapper">
            <CtaLogo />
          </div>
          <div className="cta-try-now__wrapper">
            <CtaTryNow />
          </div>
          <div className="cta-web__wrapper">
            <CtaWeb />
          </div>
          <CtaStar color={"white"} index={6} width={28} height={60} />

          <div className="cta-nft__wrapper">
            <CtaNft />
          </div>
          <div className="cta-eth__wrapper">
            <CtaEth />
          </div>
          <CtaStar color={"white"} index={1} width={48} height={112} />
          <CtaStar color={"#FFCC00"} index={2} width={52} height={120} />
          <CtaStar color={"white"} index={4} width={9} height={48} />
          <CtaStar color={"#375FFF"} index={5} width={18} height={38} />
          <CtaStar color={"white"} index={7} width={12} height={74} />
          <CtaStar color={"#FFCC00"} index={8} width={20} height={43} />
          <div className="cta-computer">
            <Image
              src={"/section-main/computer.png"}
              width={262.287}
              height={362.504}
              alt="Computer image"
            />
          </div>
        </div>
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
