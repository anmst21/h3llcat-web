"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Collection } from "@/types/CollectionCarousel";

type Props = {
  order: number[];
  setOrder: React.Dispatch<React.SetStateAction<number[]>>;
  collection: Collection[];
  strobe: boolean;
};

const cardVariants = {
  top: {
    rotate: -45,
    top: 120,
    marginRight: 0,
    zIndex: 15,
  },
  middle: {
    rotate: -30,
    top: 215,
    marginRight: 20,
    zIndex: 10,
  },
  bottom: {
    rotate: -15,
    top: 320,
    marginRight: 80,
    zIndex: 5,
  },
};

const headerVariants = {
  offscreen: {
    top: {
      ...cardVariants.top,
      top: 120 - 1000,
    },
    middle: {
      ...cardVariants.middle,
      top: 215 - 1000,
    },
    bottom: {
      ...cardVariants.bottom,
      top: 320 - 1000,
    },
  },
  onscreen: {
    top: cardVariants.top,
    middle: cardVariants.middle,
    bottom: cardVariants.bottom,
  },
  afterscreen: {
    top: {
      ...cardVariants.top,
      top: 120 + 2000,
    },
    middle: {
      ...cardVariants.middle,
      top: 215 + 2000,
    },
    bottom: {
      ...cardVariants.bottom,
      top: 320 + 2000,
    },
  },
};
const transition = { duration: 1, type: "spring", bounce: 0.2 };
const transitionUp = { duration: 0.4, type: "spring", bounce: 0.2 };

const topRaisedVariant = {
  rotate: -65,
  top: -100,
  marginRight: -20,
  zIndex: cardVariants.top.zIndex,
  transition: transitionUp,
};

const ImageCarousel = ({ order, setOrder, collection, strobe }: Props) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // setOrder(([first, second, third]) => [second, third, first]);

    if (strobe) {
      const interval = setInterval(() => {
        // Begin the first step: raise the top card.
        setAnimating(true);

        // After the raise animation completes (0.5s),
        // update the order so the raised card goes to the bottom.
        setTimeout(() => {
          setOrder(([first, second, third]) => [second, third, first]);
          // Reset the animating flag so that the new top card uses its standard variant.
          setAnimating(false);
        }, 400);
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [strobe]);
  return (
    <AnimatePresence>
      {strobe &&
        collection.map((item, index) => {
          const slot = order.indexOf(index);

          const variantName =
            slot === 0 ? "top" : slot === 1 ? "middle" : "bottom";

          const variantToUse =
            slot === 0 && animating
              ? topRaisedVariant
              : cardVariants[variantName];
          const slotName =
            slot === 0 ? "top" : slot === 1 ? "middle" : "bottom";

          return (
            <motion.div
              initial={headerVariants.offscreen[slotName]}
              key={index}
              exit={headerVariants.offscreen[slotName]}
              animate={variantToUse}
              transition={transition}
              style={{
                position: "absolute",
                borderRadius: "25px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 2px 16px 0px rgba(0, 0, 0, 0.20)",
              }}
            >
              <Image
                width={450}
                height={450}
                alt={item.artName}
                src={item.artUri as string}
                className="collection-image"
              />
            </motion.div>
          );
        })}
    </AnimatePresence>
  );
};

export default ImageCarousel;
