"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ImageCarousel from "./image-carousel";
import Carousel from "./carousel";
import { motion } from "motion/react";
import { optimizedCollections as collections } from "@/collections";
import ZigZagCarousel from "./zig-zag-carousel";
import TextCarousel from "./text-carousel";
import SectionMintTop from "./section-mint-top";
import { useMediaQuery } from "react-responsive";

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
  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });

  if (isMobile) return null;
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
        <SectionMintTop
          name={topItem.name}
          uri={topItem.rodeoUri}
          timesMinted={topItem.minted}
        />
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
