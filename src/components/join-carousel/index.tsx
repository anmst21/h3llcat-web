"use client";

import React from "react";

import { JoinIcon, JoinJap } from "../icon";
import classNames from "classnames";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Link from "next/link";

const JoinCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, watchDrag: false }, [
    AutoScroll({
      playOnInit: true,
      speed: 1,
      direction: "backward",
    }),
  ]);
  return (
    <div ref={emblaRef} className="join-carousel">
      <div className="join-carousel__container">
        {Array.from({ length: 10 }, (_, index) => (
          <Link
            href={"/beta"}
            key={index}
            className={classNames("join-carousel__item", {
              "join-carousel__item--jap": index % 2 === 0,
            })}
          >
            <JoinIcon />
            {index % 2 === 0 ? <JoinJap /> : <span>JOIN BETA</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JoinCarousel;
