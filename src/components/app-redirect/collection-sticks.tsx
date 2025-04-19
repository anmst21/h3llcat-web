"use client";

import { useCarousel } from "@/context/PreviewCarouselProvider";
import classNames from "classnames";
import React from "react";

type Props = {
  sticksArray: { hoursRemaining: string; filledSticks: number }[];
};

const CollectionSticks = ({ sticksArray }: Props) => {
  const { selectedIndex } = useCarousel();

  return (
    <div className="nft-card__preview__props">
      <div className="nft-card__preview__items">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className={classNames("nft-card__preview__sticks", {
              "nft-card__preview__sticks--active":
                sticksArray[selectedIndex].filledSticks > index,
            })}
          />
        ))}
      </div>
      <span className="nft-card__preview__text move-up">
        <span className="accent-color">
          {sticksArray[selectedIndex].hoursRemaining}
        </span>
        H LEFT
      </span>
    </div>
  );
};

export default CollectionSticks;
