"use client";
import React, { useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "@/components/icon/animation.json";

export default function Menu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const menuTextVariants = {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
  };

  const closeTextVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  };

  const toggleMenu = useCallback(
    (value: boolean) => {
      setIsOpen(value);
    },
    [setIsOpen]
  );

  // Create a ref to control the Lottie animation instance
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      if (isOpen) {
        lottieRef.current.playSegments([102, 126.75], true);
      } else {
        lottieRef.current.playSegments([0, 50], true);
      }
    }
  }, [isOpen]);
  const iconVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="menu">
      <button onClick={() => toggleMenu(!isOpen)} className="menu-container">
        <div className="menu-container__icon">
          <AnimatePresence mode="wait">
            <motion.div
              style={{ display: "flex" }}
              key="hamburger-icon"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Lottie
                style={{ width: 30, height: 30 }}
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoplay={false} // We control playback via the ref and useEffect
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="menu-container__text">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.span
                key="menu"
                variants={menuTextVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                Menu
              </motion.span>
            ) : (
              <motion.span
                key="close"
                variants={closeTextVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                Close
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
}
