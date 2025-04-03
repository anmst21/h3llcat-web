"use client";

import { categories } from "../icon/category";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const CategoriesCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, watchDrag: false }, [
    AutoScroll({
      playOnInit: true,
      speed: 1,
      direction: "backward",
    }),
  ]);

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
