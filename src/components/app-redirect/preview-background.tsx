"use client";

import { Collection } from "@/types/CollectionCarousel";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import ThreeScene from "../three-scene";
import { useMediaQuery } from "react-responsive";

const sdnUri =
  "https://cryptoiconsstorage.blob.core.windows.net/crypto-icons/assets-redirect/";
//`/${}_${}.jpg`
interface Props {
  redirects: Collection[];
}

const rotations = [
  -23.663, 15.463, -14.821, 52.41, -52.972, 14.977, -17.822, 7.622,
];

const sizes = [240, 160, 80, 80, 80, 80, 160, 240];

export default function PreviewBackground({ redirects }: Props) {
  // drop last two
  const trimmed = redirects.slice(0, -2);
  const router = useRouter();

  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });

  return (
    <>
      {isMobile && (
        <div className="three_wrapper">
          <ThreeScene />
        </div>
      )}

      <div className="preview-background">
        {trimmed.map((item, i) => (
          <motion.div
            onClick={() => router.push(item.rodeoUri)}
            key={item.contract + "_" + item.id}
            className={`preview-background__item preview-background__item--${i + 1}`}
            // make this wrapper the positioning context:
            style={{ position: "absolute" }}
            // start with blur + base rotation + normal scale
            initial={{
              filter: "blur(20px)",
              rotate: `${rotations[i]}deg`,
              zIndex: 0,
            }}
            whileHover={{
              scale: 1.5,
              rotate: `${rotations[i] + -3}deg`,
              filter: "blur(0px)", // crisply in focus
              zIndex: 1000, // float above siblings
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Image
              src={`${sdnUri}${item.contract}_${item.id}.jpg`}
              alt={item.name}
              width={sizes[i]}
              height={sizes[i]}
              style={{
                objectFit: "cover",
                borderRadius: 10,
                display: "block",
              }}
            />

            {/* overlay sits on top of the image */}
            {/* <motion.div
            className="preview-background__overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: 10,

              // backdropFilter: "blur(20px)",
              pointerEvents: "none",
            }}
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          /> */}
          </motion.div>
        ))}
      </div>
    </>
  );
}
