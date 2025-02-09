"use client";
import React, { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuCross, MenuHamburger } from "../icon";

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

  const iconVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const toggleMenu = useCallback(
    (value: boolean) => {
      setIsOpen(value);
    },
    [setIsOpen]
  );
  return (
    <div className="menu">
      <button onClick={() => toggleMenu(!isOpen)} className="menu-container">
        <div className="menu-container__icon">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                style={{ display: "flex" }}
                key="hamburger-icon"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <MenuHamburger />
              </motion.div>
            ) : (
              <motion.div
                style={{ display: "flex" }}
                key="cross-icon"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <MenuCross />
              </motion.div>
            )}
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
