"use client";

import { useEffect, useState } from "react";
import SectionMintTop from "./section-mint-top";
import TextCarousel from "./text-carousel";
import Carousel from "./carousel";
import { optimizedCollections as collections } from "@/collections";
import { motion } from "motion/react";
import ImageCarousel from "./image-carousel";
import { useMediaQuery } from "react-responsive";

const MobileMint = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });

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
  if (!isMobile) return null;

  return (
    <div className="mobile-mint">
      <div className="mobile-mint__container">
        <motion.div
          id="collections"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ amount: "some" }}
          className="mobile-mint__header"
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
      </div>
      <div className="section-sticker__works__arrows">
        <div className="arrow-down">
          <span>+</span>
        </div>
        <button>
          <span>
            {"***"}
            <span> DISPLAY </span>

            {"***"}
          </span>
        </button>
        <div className="arrow-down">
          <span>+</span>
        </div>
      </div>
    </div>
  );
};

export default MobileMint;
