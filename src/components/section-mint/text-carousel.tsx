"use client";
import { CollectionText } from "../icon";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const colorsAnalogous = ["#9747FF", "#4772FF", "#FF47ED"];

const TextCarousel = ({ strobe }: { strobe: boolean }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, watchDrag: false }, [
    AutoScroll({
      playOnInit: true,
      speed: 1,
      direction: "forward",
    }),
  ]);
  const items = [
    { colorMain: "#FF2200", colorAccent: "#00DDFF" },
    { colorMain: "#FFCC02", colorAccent: "#0033FF" },
    { colorMain: "#88FF00", colorAccent: "#7700FF" },
  ];

  return (
    <div
      ref={emblaRef}
      className="rodeo-categories__viewport rodeo-categories__viewport--zig-zag  rodeo-categories__viewport--text"
    >
      <div className="rodeo-categories rodeo-categories__zig-zag rodeo-categories__text">
        {items.map((item) => {
          return (
            <div className="rodeo-category" key={item.colorMain}>
              <CollectionText
                strobe={strobe}
                colorMain={item.colorMain}
                colorAccent={item.colorAccent}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TextCarousel;
