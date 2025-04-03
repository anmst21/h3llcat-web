"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Collection } from "@/types/CollectionCarousel";
import {
  cardVariants,
  headerVariants,
  transition,
  topRaisedVariant,
} from "./animation";

type Props = {
  order: number[];
  setOrder: React.Dispatch<React.SetStateAction<number[]>>;
  collection: Collection[];
  strobe: boolean;
  setCollectionIndex: React.Dispatch<React.SetStateAction<number>>;
  collectionIndex: number;
  collectionsLength: number;
};

const repoDefault =
  "https://cryptoiconsstorage.blob.core.windows.net/crypto-icons/compressed-assets/";

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

      setTimeout(() => {
        if (collectionIndex === collectionsLength - 1) {
          setCollectionIndex(0);
        } else {
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

          const type = item.artUri.split(".").pop();
          console.log("type", type);
          const finalType = type === "png" || type === "jpeg" ? "jpg" : "mp4";

          const repoUri =
            repoDefault + `${item.contract}:${item.id}.${finalType}`;

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
              {finalType === "jpg" && (
                <Image
                  //  placeholder="blur"
                  width={450}
                  height={450}
                  alt={item.artName || ""}
                  src={item.artUri as string}
                />
              )}

              {finalType === "mp4" && (
                <video
                  width="630"
                  height="630"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: "450px",
                    height: "450px",
                    objectFit: "cover",
                  }}
                >
                  <source src={repoUri} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </motion.div>
          );
        })}
    </AnimatePresence>
  );
};

export default ImageCarousel;

//
