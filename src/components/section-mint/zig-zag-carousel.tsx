"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { CollectionZigZag } from "../icon";
const ZigZagCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, watchDrag: false }, [
    AutoScroll({
      playOnInit: true,
      speed: 1,
      direction: "forward",
    }),
  ]);
  const items = [1, 2, 3];

  return (
    <div
      ref={emblaRef}
      className="rodeo-categories__viewport rodeo-categories__viewport--zig-zag"
    >
      <div className="rodeo-categories rodeo-categories__zig-zag">
        {items.map((item) => {
          return (
            <div className="rodeo-category" key={item}>
              <CollectionZigZag />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ZigZagCarousel;
