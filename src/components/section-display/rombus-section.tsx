import React, { useState } from "react";
import { Collection } from "@/types/CollectionCarousel";
import classNames from "classnames";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";

type Props = {
  array: Collection[];
  colIndex: number;
};

function RombusSection({ array, colIndex }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [emblaRef] = useEmblaCarousel(
    { loop: true, axis: "y", watchDrag: false },
    [
      AutoScroll({
        playOnInit: true,
        speed: 0.4,
        direction: colIndex % 2 === 0 ? "backward" : "forward",
      }),
    ]
  );
  const router = useRouter();

  return (
    <div className="rombus-container__viewport" ref={emblaRef}>
      <div className="rombus-container">
        {array.map((item, index) => {
          //item.artUri
          return (
            <div
              onClick={() =>
                (colIndex === 6 || colIndex === 7) &&
                (index === 1 || index === 2)
                  ? undefined
                  : router.push(item.rodeoUri)
              }
              key={index}
              className={classNames(`rombus`, {
                "rombus--rounded":
                  colIndex % 2 === 0 ? index % 2 !== 0 : index % 2 === 0,
                "rombus--logo":
                  (colIndex === 6 || colIndex === 7) &&
                  (index === 1 || index === 2),
              })}
            >
              {!loaded &&
                !(
                  (colIndex === 6 || colIndex === 7) &&
                  (index === 1 || index === 2)
                ) && <div className="skeleton"></div>}

              {colIndex === 6 && index === 1 ? (
                <Image
                  src={"/section-logo/1.svg"}
                  alt={item.artName || item.name || "Artwork"}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : colIndex === 7 && index === 1 ? (
                <Image
                  src={"/section-logo/2.svg"}
                  alt={item.artName || item.name || "Artwork"}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : colIndex === 6 && index === 2 ? (
                <Image
                  src={"/section-logo/3.svg"}
                  alt={item.artName || item.name || "Artwork"}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : colIndex === 7 && index === 2 ? (
                <Image
                  src={"/section-logo/4.svg"}
                  alt={item.artName || item.name || "Artwork"}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : // <Image
              //   onLoad={() => setLoaded(true)}
              //   // onError={() => setLoaded(false)}
              //   src={item.artUri}
              //   alt={item.artName || item.name || "Artwork"}
              //   fill
              //   style={{ objectFit: "cover" }}
              // />
              undefined}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RombusSection;
