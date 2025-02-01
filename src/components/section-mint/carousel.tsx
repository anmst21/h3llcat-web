"use client";

import React from "react";
import { categories } from "../icon/category";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

type Props = {
  isInView: boolean;
};

const CategoriesCarousel = (props: Props) => {
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
    <div ref={emblaRef} className="rodeo-categories__viewport ">
      <div className="rodeo-categories">
        {categories.map((category) => {
          return (
            <div className="rodeo-category" key={category.key}>
              {category.icon}
              <span>{category.content}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesCarousel;
