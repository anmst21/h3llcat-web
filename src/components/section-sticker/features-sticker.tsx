"use client";

import React, { useState, useEffect, useCallback } from "react";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { featuresCards } from "../section-features/features-cards";
import { ArrowSticker } from "../icon";
import { EmblaCarouselType } from "embla-carousel";
import { AnimatePresence, motion } from "motion/react";
import Lottie from "lottie-react";
type UseSelectedSnapDisplayType = {
  selectedSnap: number;
  snapCount: number;
};

export const useSelectedSnapDisplay = (
  emblaApi: EmblaCarouselType | undefined
): UseSelectedSnapDisplayType => {
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const updateScrollSnapState = useCallback((emblaApi: EmblaCarouselType) => {
    setSnapCount(emblaApi.scrollSnapList().length);
    setSelectedSnap(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateScrollSnapState(emblaApi);
    emblaApi.on("select", updateScrollSnapState);
    emblaApi.on("reInit", updateScrollSnapState);
  }, [emblaApi, updateScrollSnapState]);

  return {
    selectedSnap,
    snapCount,
  };
};

type PropType = {
  selectedSnap: number;
  snapCount: number;
};

export const SelectedSnapDisplay: React.FC<PropType> = (props) => {
  const { selectedSnap, snapCount } = props;

  return (
    <span>
      {selectedSnap + 1} / {snapCount}
    </span>
  );
};

function FeaturesSticker() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Fade(),
  ]);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const leftArrowVariants = {
    initial: { x: 0 },
    hover: { x: -3 },
    active: { x: -6 },
  };
  const rightArrowVariants = {
    initial: { x: 0 },
    hover: { x: 3 },
    active: { x: 6 },
  };
  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="features-sticker remove-on-desktop">
      <div className="features-sticker__viewport" ref={emblaRef}>
        <div className="features-sticker__container">
          {featuresCards.map((item, index) => (
            <div key={index} className="features-sticker__slide">
              <Lottie
                style={{ display: "flex", width: "100%", height: "auto" }}
                animationData={item.animation}
                loop
                autoPlay
              />
            </div>
          ))}
        </div>
      </div>
      <div className="features-sticker__buttons">
        <div className="features-sticker__buttons__prev">
          <motion.button
            initial="initial"
            whileHover="hover"
            whileTap="active"
            onClick={onPrevButtonClick}
          >
            <motion.div
              variants={leftArrowVariants}
              style={{ display: "flex" }}
            >
              <ArrowSticker />
            </motion.div>
            <span>L</span>
          </motion.button>
        </div>
        <div className="features-sticker__buttons__status">
          <span>SLIDE</span>
          <SelectedSnapDisplay
            selectedSnap={selectedSnap}
            snapCount={snapCount}
          />
        </div>
        <div className="features-sticker__buttons__next">
          <motion.button
            initial="initial"
            whileHover="hover"
            whileTap="active"
            onClick={onNextButtonClick}
          >
            <span>R</span>
            <motion.div
              variants={rightArrowVariants}
              style={{ display: "flex" }}
            >
              <ArrowSticker />
            </motion.div>
          </motion.button>
        </div>
      </div>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={selectedSnap}
          className="features-sticker__text"
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <h4>{featuresCards[selectedSnap].header}</h4>
          <p>{featuresCards[selectedSnap].paragraph}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default FeaturesSticker;
