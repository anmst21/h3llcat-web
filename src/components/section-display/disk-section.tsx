"use client";

import { MainDiskCar, MainDiskKiss, RadioKnob } from "../icon";

import Image from "next/image";
import Equalizer from "./equalizer";
import { motion } from "motion/react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const DiskSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });

  const [isLoaded, setIsLoaded] = useState(false);

  const itemVariants = {
    initial: { scale: 0.2, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
    exit: {
      scale: 0.2,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" as const },
    },
  };
  if (isMobile) return null;
  return (
    <div className="disk-section" key="disk-section">
      <motion.div
        key="disk-kiss"
        className="disk-section__kiss"
        variants={itemVariants}
        initial="initial"
        animate={isLoaded ? "animate" : "initial"}
        exit="exit"
      >
        <MainDiskKiss />
      </motion.div>

      <motion.div
        className="disk-section__radio"
        variants={itemVariants}
        initial="initial"
        animate={
          isLoaded
            ? { rotate: [-14.294, -12, -14.294], ...itemVariants.animate }
            : "initial"
        }
        exit="exit"
        transition={{
          rotate: { duration: 18, ease: "linear", repeat: Infinity },
        }}
      >
        <Image
          onLoad={() => setIsLoaded(true)}
          alt="Wakkie talkie radio"
          width={360}
          height={650}
          src={"/section-main/walkie-talkie.png"}
        />
        {isLoaded && (
          <>
            <Equalizer />
            <div className="disk-section__radio__knob">
              <RadioKnob />
            </div>
          </>
        )}
      </motion.div>

      <motion.div
        key="disk-car"
        className="disk-section__car"
        variants={itemVariants}
        initial="initial"
        animate={isLoaded ? "animate" : "initial"}
        exit="exit"
      >
        <MainDiskCar />
      </motion.div>
    </div>
  );
};

export default DiskSection;
