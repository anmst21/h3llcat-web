"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import CarouselBtn from "../button/carousel-btn";

type Props = {};

const BtnCarousel = (props: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, watchDrag: false },
    [
      AutoScroll({
        playOnInit: true,
        speed: 3,
        direction: "backward",
      }),
    ]
  );

  return (
    <div
      ref={emblaRef}
      className="rodeo-categories__viewport rodeo-categories__viewport--app"
    >
      <div className="rodeo-categories">
        {Array.from({ length: 20 }, (_, index) => {
          return <CarouselBtn key={index} href="/beta" content="Go to BETA" />;
        })}
      </div>
    </div>
  );
};

export default BtnCarousel;
