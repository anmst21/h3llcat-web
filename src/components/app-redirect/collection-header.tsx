"use client";

import { useCarousel } from "@/context/PreviewCarouselProvider";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  headerArray: string[];
};

const CollectionHeader = ({ headerArray }: Props) => {
  const { selectedIndex } = useCarousel();
  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.h3
        variants={fadeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
        key={headerArray[selectedIndex]}
      >
        {headerArray[selectedIndex].toUpperCase()}
      </motion.h3>
    </AnimatePresence>
  );
};

export default CollectionHeader;
