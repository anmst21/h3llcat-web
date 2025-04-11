"use client";

import { useMemo } from "react";
import posts from "../../../100.json";
import { Collection } from "@/types/CollectionCarousel";
import RombusSection from "./rombus-section";
import {
  MainDiskCar,
  MainDiskKiss,
  StarCarousel,
  NexusJap,
  SideJap,
  DisplayJap,
  RadioKnob,
} from "../icon";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import Equalizer from "./equalizer";
import { useState } from "react";
import { motion } from "motion/react";

const SectionDisplay = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const chunkArray = useMemo(() => {
    const chunkSize = 9;
    const result = [];
    for (let i = 0; i < posts.length; i += chunkSize) {
      result.push(posts.slice(i, i + chunkSize));
    }
    return result;
  }, []);

  const multipliedCarouselData = useMemo(() => {
    return new Array(5).fill(null).flatMap(() => [
      { textEng: "N3xus", textJap: <NexusJap /> },
      { textEng: "Display", textJap: <DisplayJap /> },
    ]);
  }, []);

  const [emblaRef] = useEmblaCarousel({ loop: true, watchDrag: false }, [
    AutoScroll({
      playOnInit: true,
      speed: 1,
      direction: "backward",
    }),
  ]);

  const itemVariants = {
    initial: { scale: 0.2, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      scale: 0.2,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  //100
  return (
    <div id="hero" className="section-display">
      <div className="section-display__top">
        <div className="section-display__top__right">
          <span>Display by N3xus</span>
        </div>
      </div>

      <div className="section-display__center">
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
        <div className="rombus-section">
          {chunkArray.map((chunk, index) => {
            return (
              <RombusSection
                colIndex={index}
                key={index}
                array={chunk as Collection[]}
              />
            );
          })}
        </div>
        <div className="section-display__right">
          <SideJap />
        </div>
      </div>
      <div className="section-display__bottom">
        <div className="section-display__bottom__viewport" ref={emblaRef}>
          <div className="section-display__bottom__container">
            {multipliedCarouselData.map((data, index) => {
              return (
                <div key={index} className="section-display__bottom__card">
                  <StarCarousel />
                  <span>{data.textEng}</span>
                  {data.textJap}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDisplay;
