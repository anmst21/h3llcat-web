"use client";

import { useMemo } from "react";
import { NexusJap, DisplayJap, StarCarousel } from "../icon";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useMediaQuery } from "react-responsive";

const DisplayCarousel = ({ type }: { type: "desktop" | "mobile" }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });

  const multipliedCarouselData = useMemo(() => {
    return new Array(5).fill(null).flatMap(() => [
      { textEng: "N3xus", textJap: <NexusJap /> },
      { textEng: "Display", textJap: <DisplayJap /> },
    ]);
  }, []);

  const [emblaRef] = useEmblaCarousel({ loop: true, watchDrag: false }, [
    AutoScroll({
      playOnInit: true,
      speed: 1,
      direction: "backward",
    }),
  ]);
  if (type === "desktop" && isMobile) return null;
  if (type === "mobile" && !isMobile) return null;
  return (
    <div className="section-display__bottom">
      <div className="section-display__bottom__viewport" ref={emblaRef}>
        <div className="section-display__bottom__container">
          {multipliedCarouselData.map((data, index) => {
            return (
              <div key={index} className="section-display__bottom__card">
                <StarCarousel />
                <span>{data.textEng}</span>
                {data.textJap}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DisplayCarousel;
