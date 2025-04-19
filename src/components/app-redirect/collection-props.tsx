"use client";

import { useCarousel } from "@/context/PreviewCarouselProvider";
import React from "react";
import { MetaItemName } from "../collection/types";
import { truncateEthAddress } from "@/helpers/truncateAddress";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { etherScanUriBase } from "./etherScanUriBase";
import classNames from "classnames";

type Props = {
  contractAddress: string;
  ids: number[];
};

const CollectionProps = ({ contractAddress, ids }: Props) => {
  const { selectedIndex } = useCarousel();
  const metaItemData = [
    {
      name: MetaItemName.contract,
      value: truncateEthAddress(contractAddress),
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
        <div key={index} className="nft-card__props__item">
          <span>{item.name}</span>
          <div className="nft-card__props__divider" />
          <Link
            href={
              item.name === MetaItemName.contract
                ? etherScanUriBase + "token/" + contractAddress
                : item.name === MetaItemName.token
                  ? etherScanUriBase +
                    "token/" +
                    contractAddress +
                    `?a=${ids[selectedIndex]}`
                  : "/"
            }
            target="_blank"
            className={classNames("nft-card__props__value-container", {
              disabled:
                item.name === MetaItemName.chain ||
                item.name === MetaItemName.standard,
            })}
          >
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
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CollectionProps;
