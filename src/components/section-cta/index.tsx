"use client";

import React, { useState, useEffect } from "react";
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
import { motion } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";

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

  const containerVariants = {
    hidden: {},
    visible: {
      // transition: {
      //   staggerChildren: 0.2, // delay each child’s animation by 0.2 seconds
      // },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const { ref, transform, handleMouseMove, handleMouseLeave } = useTilt(16);

  ///  transform: "translateZ(75px)",
  return (
    <div className="section-cta">
      <div className="section-cta__badge section-cta__badge--left">
        <CtaJap />
      </div>
      <div className="section-cta__badge section-cta__badge--right">
        <CtaJap />
      </div>

      <div className="section-cta__container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 1 }}
          className="section-cta__artwork"
        >
          <motion.div
            animate={{
              color: ["#FF2200", "#0033FF", "#88FF00", "#FF2200"],
              rotate: [0, 360],
            }}
            transition={{
              color: { duration: 9, ease: "linear", repeat: Infinity },
              rotate: { duration: 50, ease: "linear", repeat: Infinity },
            }}
            variants={itemVariants}
            className="cta-illuminati__wrapper"
          >
            <CtaIlluminati />
          </motion.div>
          <motion.div
            animate={{ rotate: [-2, 5, -2] }}
            transition={{ duration: 12, ease: "linear", repeat: Infinity }}
            variants={itemVariants}
            className="cta-star-3"
          >
            <CtaStar color={"#FFCC00"} index={3} width={27} height={60} />
          </motion.div>
          <motion.div
            animate={{ rotate: [-2, 4, -2] }}
            transition={{
              rotate: { duration: 18, ease: "linear", repeat: Infinity },
              // scale: { duration: 0.2, ease: "linear" },
            }}
            variants={itemVariants}
            className="cta-game-boy__wrapper"
          >
            <div className="cta-game-boy">
              <Image
                src={"/section-main/game-boy.png"}
                width={467}
                height={743}
                alt="game boy image"
              />
              <Game />
            </div>
          </motion.div>
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            variants={itemVariants}
            className="cta-logo__wrapper"
          >
            <CtaLogo />
          </motion.div>
          <motion.div
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            variants={itemVariants}
            className="cta-try-now__wrapper"
          >
            <CtaTryNow />
          </motion.div>
          <motion.div
            animate={{ rotate: [-2, 4, -2] }}
            transition={{ duration: 26, ease: "linear", repeat: Infinity }}
            variants={itemVariants}
            className="cta-web__wrapper"
          >
            <CtaWeb />
          </motion.div>
          <motion.div
            animate={{ rotate: [-1, 3, -1] }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
            variants={itemVariants}
            className="cta-star-6"
          >
            <CtaStar color={"white"} index={6} width={28} height={60} />
          </motion.div>

          <motion.div
            animate={{ rotate: [-1, 3, -1] }}
            transition={{ duration: 12, ease: "linear", repeat: Infinity }}
            variants={itemVariants}
            className="cta-nft__wrapper"
          >
            <CtaNft />
          </motion.div>
          <motion.div
            animate={{ rotate: [-4, 6, -4] }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
            variants={itemVariants}
            className="cta-eth__wrapper"
          >
            <CtaEth />
          </motion.div>
          <motion.div
            animate={{ rotate: [-2, 5, -2] }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            variants={itemVariants}
            className="cta-star-1"
          >
            <CtaStar color={"white"} index={1} width={48} height={112} />
          </motion.div>
          <motion.div
            animate={{ rotate: [-8, 3, -8] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            variants={itemVariants}
            className="cta-star-2"
          >
            <CtaStar color={"#FFCC00"} index={2} width={52} height={120} />
          </motion.div>
          <motion.div
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            variants={itemVariants}
            className="cta-star-4"
          >
            <CtaStar color={"white"} index={4} width={9} height={48} />
          </motion.div>
          <motion.div
            animate={{ rotate: [-1, 3, -1] }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity }}
            variants={itemVariants}
            className="cta-star-5"
          >
            <CtaStar color={"#375FFF"} index={5} width={18} height={38} />
          </motion.div>
          <motion.div
            animate={{ rotate: [-2, 4, -2] }}
            transition={{ duration: 12, ease: "linear", repeat: Infinity }}
            variants={itemVariants}
            className="cta-star-7"
          >
            <CtaStar color={"white"} index={7} width={12} height={74} />
          </motion.div>
          <motion.div
            animate={{ rotate: [-6, 3, -6] }}
            transition={{ duration: 16, ease: "linear", repeat: Infinity }}
            variants={itemVariants}
            className="cta-star-8"
          >
            <CtaStar color={"#FFCC00"} index={8} width={20} height={43} />
          </motion.div>
          <motion.div
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 14, ease: "linear", repeat: Infinity }}
            className="cta-computer__wrapper"
            variants={itemVariants}
          >
            <div className="cta-computer">
              <Image
                src={"/section-main/computer.png"}
                width={262.287}
                height={362.504}
                alt="Computer image"
              />
            </div>
          </motion.div>
        </motion.div>
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
