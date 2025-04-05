"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { Collection } from "@/types/CollectionCarousel";

import CarouselItem from "./carousel-item";

type Props = {
  order: number[];
  setOrder: React.Dispatch<React.SetStateAction<number[]>>;
  collection: Collection[];
  strobe: boolean;
  setCollectionIndex: React.Dispatch<React.SetStateAction<number>>;
  collectionIndex: number;
  collectionsLength: number;
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
        collection.map((item, index) => (
          <CarouselItem
            item={item}
            index={index}
            order={order}
            key={index}
            collectionIndex={collectionIndex}
            animating={animating}
          />
        ))}
    </AnimatePresence>
  );
};

export default ImageCarousel;
