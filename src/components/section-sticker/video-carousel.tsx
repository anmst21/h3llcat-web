"use client";

import React, { useEffect } from "react";
import { ArrowSticker } from "../icon";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";

type Props = {};

const VideoCarousel = (props: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Fade(),
  ]);

  const videoKeys = ["rodeo", "display", "nexus"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      emblaApi?.scrollNext();
    }, 15000); // 15 seconds

    return () => clearInterval(intervalId);
  }, [emblaApi]);

  return (
    <div className="section-sticker__works">
      <div className="section-sticker__works__viewport" ref={emblaRef}>
        <div className="section-sticker__works__container">
          {videoKeys.map((key) => (
            <div key={key} className="section-sticker__works__video">
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: 280,
                  height: 280,
                  objectFit: "cover",
                  scale: 0.8,
                }}
              >
                <source src={`/video/${key}-logo.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
      <div className="section-sticker__works__arrows">
        <div className="arrow-down">
          <ArrowSticker />
          <ArrowSticker />
          <ArrowSticker />
        </div>
        <button onClick={() => emblaApi?.scrollNext()}>
          <span>
            {"--{ "}
            <span>NEXT</span>
            {" }--"}
          </span>
        </button>
        <div className="arrow-down">
          <ArrowSticker />
          <ArrowSticker />
          <ArrowSticker />
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;
