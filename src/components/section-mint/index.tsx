"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ImageCarousel from "./image-carousel";
import Carousel from "./carousel";
import { motion, AnimatePresence } from "motion/react";
import { optimizedCollections as collections } from "@/collections";
import ZigZagCarousel from "./zig-zag-carousel";
import TextCarousel from "./text-carousel";

const SectionMint = () => {
  const [strobe, setStrobe] = useState(false);
  const [order, setOrder] = useState<number[]>([0, 1, 2]);
  const [collectionIndex, setCollectionIndex] = useState(0);
  const collection = collections[collectionIndex];
  const topItem = collection[order[0]];

  useEffect(() => {
    if (!strobe) {
      setOrder([0, 1, 2]);
    }
  }, [strobe]);

  const textAnimationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  return (
    <div className="section-mint__container">
      <motion.div
        id="collections"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: "some" }}
        className="section-mint"
        onViewportEnter={() => setStrobe(true)}
        onViewportLeave={() => setStrobe(false)}
      >
        <ImageCarousel
          collection={collection}
          order={order}
          setOrder={setOrder}
          strobe={strobe}
          setCollectionIndex={setCollectionIndex}
          collectionIndex={collectionIndex}
          collectionsLength={collections.length}
        />
        <div className="section-mint__top">
          <Link
            target="_blank"
            href={topItem.rodeoUri}
            className="section-mint__top__left"
          >
            <span>Creator</span>
            <AnimatePresence mode="wait">
              <motion.h2
                key={topItem.name} // key changes when the value updates
                {...textAnimationProps}
              >
                {topItem.name}
              </motion.h2>
            </AnimatePresence>
          </Link>
          <div className="section-mint__top__right">
            <span>Minted</span>
            <AnimatePresence mode="wait">
              <motion.h3
                key={topItem.minted} // key changes when the value updates
                {...textAnimationProps}
              >
                {topItem.minted}
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>

        {/* <motion.h1
        // Use the current order to pick a color from the analogous colors array.
        initial={{ color: colorsAnalogous[order[0]] }}
        animate={{ color: colorsAnalogous[order[0]] }}
        transition={{ duration: 0.8, ease: "linear" }}
        className={classNames("section-mint__header", {
          strobe: strobe && order[0] === 0,
        })}
      >
        *Mint Now*
      </motion.h1> */}

        {/* <Carousel /> */}

        {/* <Link className="section-mint__cta" href="/beta">
        Go to Beta
      </Link> */}
      </motion.div>
      <TextCarousel strobe={strobe && order[0] === 0} />
      <Carousel />
      <ZigZagCarousel />
      <div className="section-mint__disclaimer">
        <span>
          All these collections come from{" "}
          <Link href="https://rodeo.club/">rodeo.club</Link>, a Base-powered
          photo-sharing platform where each post is minted on-chain. Display
          simply offers a fresh way to discover, swipe, and collect—giving you a
          different perspective on what's possible on-chain.
        </span>
      </div>
    </div>
  );
};

export default SectionMint;

// const colorsTetraidic = ["#9747FF", "#FF47AF", "#AFFF47", "#47FF97"];
// const colorsSquare = ["#9747FF", "#FF4754", "#AFFF47", "#47FFF3"];
// const colorsTriadic = ["#9747FF", "#FF9747", "#47FF97"];
// const colorsSplitComplementary = ["#9747FF", "#EDFF47", "#72FF47"];
