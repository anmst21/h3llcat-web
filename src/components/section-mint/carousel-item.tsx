"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Collection } from "@/types/CollectionCarousel";
import {
  cardVariants,
  headerVariants,
  transition,
  topRaisedVariant,
  mobileCardVariants,
  topRaisedVariantMobile,
} from "./animation";
import { decode } from "blurhash";
import { useMediaQuery } from "react-responsive";

const repoDefault =
  "https://cryptoiconsstorage.blob.core.windows.net/crypto-icons/compressed-assets/";

// Helper function to convert a blurHash string into a base64 data URL
const getBlurDataURL = (blurHash: string, width = 32, height = 32): string => {
  // Decode the blurhash string into RGBA pixel data
  const pixels = decode(blurHash, width, height);

  // Create a temporary canvas to draw the decoded pixels
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Create an ImageData object and draw the pixels
  const imageData = ctx.createImageData(width, height);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);

  // Return the canvas content as a base64-encoded data URL
  return canvas.toDataURL();
};

type CarouselItemProps = {
  item: Collection;
  index: number;
  order: number[];
  animating: boolean;
  collectionIndex: number;
};

const CarouselItem: React.FC<CarouselItemProps> = ({
  item,
  index,
  order,
  animating,
  collectionIndex,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });
  const tRV = isMobile ? topRaisedVariantMobile : topRaisedVariant;
  const slot = order.indexOf(index);
  const variantName = slot === 0 ? "top" : slot === 1 ? "middle" : "bottom";
  const variantToUse =
    slot === 0 && animating && order[1] !== 0
      ? tRV
      : isMobile
        ? mobileCardVariants[variantName]
        : cardVariants[variantName];
  const slotName = slot === 0 ? "top" : slot === 1 ? "middle" : "bottom";

  // Determine file type and repository URI
  const type = item.artUri.split(".").pop();
  console.log("type", type);
  const finalType = type === "png" || type === "jpeg" ? "jpg" : "mp4";
  const repoUri = repoDefault + `${item.contract}:${item.id}.${finalType}`;

  // Wrap the blurhash computation in useMemo to memoize the result
  const blurhash = useMemo(
    () => getBlurDataURL(item.blurHash),
    [item.blurHash]
  );

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
        scale: isMobile ? 0.3 : 1,
      }}
    >
      {finalType === "jpg" && (
        <Image
          blurDataURL={blurhash}
          placeholder="blur"
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
          poster={blurhash}
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
};

export default CarouselItem;
