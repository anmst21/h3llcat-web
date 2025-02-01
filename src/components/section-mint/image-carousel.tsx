"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Collection } from "@/types/CollectionCarousel";

type Props = {
  order: number[];
  setOrder: React.Dispatch<React.SetStateAction<number[]>>;
  collection: Collection[];
  strobe: boolean;
  setCollectionIndex: React.Dispatch<React.SetStateAction<number>>;
  collectionIndex: number;
  collectionsLength: number;
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
const transitionUp = { duration: 0.3, type: "spring", bounce: 0.2 };

const topRaisedVariant = {
  rotate: -65,
  top: -100,
  marginRight: -20,
  zIndex: cardVariants.top.zIndex,
  transition: transitionUp,
};

const ImageCarousel = ({
  order,
  setOrder,
  collection,
  strobe,
  setCollectionIndex,
  collectionIndex,
  collectionsLength,
}: Props) => {
  const [animating, setAnimating] = useState(false);
  const [isChangingCollection, setIsChangingCollection] = useState(false);

  console.log(order, collectionIndex);

  const setIndex = useCallback(
    (index: number) => {
      setCollectionIndex(index + 1);
    },
    [setCollectionIndex]
  );

  useEffect(() => {
    if (!strobe) {
      setOrder([0, 1, 2]);
    }

    if (strobe) {
      const interval = setInterval(() => {
        setAnimating(true);

        setTimeout(() => {
          setOrder((prevOrder) => {
            const newOrder = [prevOrder[1], prevOrder[2], prevOrder[0]];

            return newOrder;
          });
          setAnimating(false);
        }, 300);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [strobe]);

  useEffect(() => {
    if (order[0] === 0 && strobe) {
      setIsChangingCollection(true);

      // Wait 1 second before executing the logic and then set isChangingCollection to false
      setTimeout(() => {
        if (collectionIndex === collectionsLength - 1) {
          setCollectionIndex(0);
        } else {
          console.log("!!!triggered");
          setIndex(collectionIndex);
        }

        // Mark the collection change as complete
        setIsChangingCollection(false);
      }, 700);
    }
  }, [order]);

  return (
    <AnimatePresence>
      {strobe &&
        !isChangingCollection &&
        collection.map((item, index) => {
          const slot = order.indexOf(index);

          const variantName =
            slot === 0 ? "top" : slot === 1 ? "middle" : "bottom";

          const variantToUse =
            slot === 0 && animating && order[1] !== 0
              ? topRaisedVariant
              : cardVariants[variantName];
          const slotName =
            slot === 0 ? "top" : slot === 1 ? "middle" : "bottom";

          return (
            <motion.div
              initial={headerVariants.offscreen[slotName]}
              key={`${index}+${collectionIndex}`}
              exit={headerVariants.afterscreen[slotName]}
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
              />
            </motion.div>
          );
        })}
    </AnimatePresence>
  );
};

export default ImageCarousel;
