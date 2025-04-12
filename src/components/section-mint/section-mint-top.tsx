import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React from "react";

const SectionMintTop = ({
  name,
  uri,
  timesMinted,
}: {
  name: string;
  uri: string;
  timesMinted: number;
}) => {
  const textAnimationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  return (
    <div className="section-mint__top">
      <Link target="_blank" href={uri} className="section-mint__top__left">
        <span>Creator</span>
        <AnimatePresence mode="wait">
          <motion.h2 key={name} {...textAnimationProps}>
            {name}
          </motion.h2>
        </AnimatePresence>
      </Link>
      <div className="section-mint__top__right">
        <span>Minted</span>
        <AnimatePresence mode="wait">
          <motion.h3 key={timesMinted} {...textAnimationProps}>
            {timesMinted}
          </motion.h3>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SectionMintTop;
