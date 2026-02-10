"use client";

import { Collection } from "@/types/CollectionCarousel";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const sdnUri =
  "https://cryptoiconsstorage.blob.core.windows.net/crypto-icons/assets-redirect/";

interface Props {
  redirects: Collection[];
}

const rotations = [
  -23.663, 15.463, -14.821, 52.41, -52.972, 14.977, -17.822, 7.622,
];
const sizes = [240, 160, 80, 80, 80, 80, 160, 240];

// parent variants for staggering
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// child variants: `custom` will be the index `i`
const itemVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    scale: 0.2,
    rotate: rotations[i] * 2,
    filter: "blur(20px)",
    zIndex: 0,
  }),
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: rotations[i],
    filter: "blur(20px)", // still blurred until hover
    zIndex: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 20 },
  }),
};

export default function PreviewBackground({ redirects }: Props) {
  // drop last two
  const trimmed = redirects.slice(0, -2);
  const router = useRouter();

  return (
    <motion.div
      className="preview-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {trimmed.map((item, i) => (
        <motion.div
          key={`${item.contract}_${item.id}`}
          custom={i}
          variants={itemVariants}
          className={`preview-background__item preview-background__item--${i + 1}`}
          style={{ position: "absolute" }}
          whileHover={{
            scale: 1.5,
            rotate: rotations[i] - 3,
            filter: "blur(0px)",
            zIndex: 1000,
          }}
          onClick={() => router.push(item.rodeoUri)}
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
        </motion.div>
      ))}
    </motion.div>
  );
}
