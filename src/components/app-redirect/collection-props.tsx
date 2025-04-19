"use client";

import { useCarousel } from "@/context/PreviewCarouselProvider";
import React from "react";
import { MetaItemName } from "../collection/types";
import { truncateEthAddress } from "@/helpers/truncateAddress";
import { motion, AnimatePresence } from "motion/react";

type Props = {
  creatorAddress: string;
  ids: number[];
};

const CollectionProps = ({ creatorAddress, ids }: Props) => {
  const { selectedIndex } = useCarousel();
  const metaItemData = [
    {
      name: MetaItemName.contract,
      value: truncateEthAddress(creatorAddress),
      isBg: false,
    },
    {
      name: MetaItemName.token,
      value: ids[selectedIndex],
      isBg: true,
    },
    {
      name: MetaItemName.chain,
      value: "Base",
      isBg: false,
    },
    {
      name: MetaItemName.standard,
      value: "ERC-1155",
      isBg: true,
    },
  ];
  return (
    <div className="nft-card__props">
      {metaItemData.map((item, index) => (
        <div className="nft-card__props__item">
          <span>{item.name}</span>
          <div className="nft-card__props__divider" />
          <div className="nft-card__props__value-container">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={item.value}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="nft-card__props__value"
              >
                {item.value}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionProps;
