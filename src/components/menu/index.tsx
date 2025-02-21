"use client";
import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "@/components/icon/animation.json";
import classNames from "classnames";

export default function Menu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  // Refs for container and children
  const containerRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Offsets for aligning icon and text to container edges
  const [offsets, setOffsets] = useState({ icon: 0, text: 0 });

  // Ref for controlling the Lottie animation
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    // Recalculate offsets whenever isOpen changes (or when layout might change)
    if (containerRef.current && iconRef.current && textRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const iconRect = iconRef.current.getBoundingClientRect();
      const textRect = textRef.current.getBoundingClientRect();

      // Calculate how far the icon should move so its right edge aligns with the container's right edge.
      const iconOffset = containerRect.right - iconRect.right - 5;
      // Calculate how far the text should move so its left edge aligns with the container's left edge.
      const textOffset = containerRect.left - textRect.left + 5;

      setOffsets({ icon: iconOffset, text: textOffset });
    }
  }, [isOpen]);

  useEffect(() => {
    if (lottieRef.current) {
      if (isOpen) {
        lottieRef.current.playSegments([102, 126.75], true);
      } else {
        lottieRef.current.playSegments([0, 50], true);
      }
    }
  }, [isOpen]);

  return (
    <div className="menu">
      <AnimatePresence>
        {isLoaded && (
          <motion.button
            key="menu-button"
            ref={containerRef}
            onClick={() => setIsOpen(!isOpen)}
            className={classNames("menu-container", {
              "menu-container--active": isOpen,
            })}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
          >
            {/* Icon wrapper */}
            <motion.div
              style={{ zIndex: 50 }}
              className="menu-container__icon"
              ref={iconRef}
              animate={{ x: isOpen ? offsets.icon : 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  style={{ display: "flex" }}
                  key="hamburger-icon"
                  transition={{ duration: 0.3 }}
                >
                  <Lottie
                    style={{ width: 30, height: 30 }}
                    lottieRef={lottieRef}
                    animationData={animationData}
                    loop={false}
                    autoplay={false}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Text wrapper */}
            <motion.div
              className="menu-container__text"
              ref={textRef}
              animate={{ x: isOpen ? offsets.text : 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.span key="menu" transition={{ duration: 0.3 }}>
                    Menu
                  </motion.span>
                ) : (
                  <motion.span key="close" transition={{ duration: 0.3 }}>
                    Close
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
