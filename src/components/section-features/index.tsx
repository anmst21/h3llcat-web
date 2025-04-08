"use client";

import { TopFeaturesHeader, StarCarousel, FeaturesJap } from "../icon";
import { featuresCards } from "./features-cards";
import FeaturesSticker from "./features-sticker";

import FeaturesCard from "./features-card";
import { useEffect, useRef, useState } from "react";

const SectionFeatures = () => {
  const items = ["simple", "fast", "on-chain"];

  const [autoIndex, setAutoIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const currentActiveIndex = hoveredIndex !== null ? hoveredIndex : autoIndex;

  // Use this ref to detect the initial mount
  const initialMountRef = useRef(true);

  useEffect(() => {
    let autoInterval: ReturnType<typeof setInterval> | null = null;
    let autoTimeout: ReturnType<typeof setTimeout> | null = null;

    if (hoveredIndex === null) {
      if (initialMountRef.current) {
        // On initial mount, start auto-play immediately.
        autoInterval = setInterval(() => {
          setAutoIndex((prev) => (prev + 1) % featuresCards.length);
        }, 3000);
        initialMountRef.current = false;
      } else {
        // After hover ends, wait 2s before resuming auto-play.
        autoTimeout = setTimeout(() => {
          autoInterval = setInterval(() => {
            setAutoIndex((prev) => (prev + 1) % featuresCards.length);
          }, 3000);
        }, 2000);
      }
    }

    return () => {
      if (autoTimeout) clearTimeout(autoTimeout);
      if (autoInterval) clearInterval(autoInterval);
    };
  }, [hoveredIndex]);

  return (
    <div className="section-features">
      <div className="section-features__header">
        <div className="section-features__header__svg">
          <TopFeaturesHeader />
        </div>
        <div className="section-features__badge">
          {items.map((item, index) => {
            return (
              <div key={index} className="section-features__badge__item">
                <StarCarousel />
                <span>{item}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-features__jap section-features__jap--left">
        <FeaturesJap />
      </div>
      <div className="section-features__jap section-features__jap--right">
        <FeaturesJap />
      </div>

      <div className="section-features__grid__container">
        <FeaturesSticker />
        {featuresCards.map((item, index) => (
          <FeaturesCard
            key={index}
            item={item}
            index={index}
            activeItemIndex={currentActiveIndex}
            setActiveItemIndex={setHoveredIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionFeatures;
