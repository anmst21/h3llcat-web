"use client";

import React, { useEffect, useRef } from "react";
import { ArrowSticker } from "../icon";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";

const VideoCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Fade(),
  ]);
  const videoKeys = ["rodeo", "display", "nexus"];
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  // Function to start the timer
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      emblaApi?.scrollNext();
    }, 12000); // 12 seconds interval
  };

  // Function to reset the timer
  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  // Start timer when emblaApi is ready and clear on unmount
  useEffect(() => {
    if (emblaApi) {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [emblaApi]);

  // Sync video playback with the active slide
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      videoRefs.current.forEach((video, index) => {
        if (video) {
          if (index === selectedIndex) {
            video.play();
          } else {
            video.pause();
          }
        }
      });
    };

    emblaApi.on("select", onSelect);
    // Call onSelect once to set the initial video playback state
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Handlers for manual navigation that also reset the timer
  const handlePrev = () => {
    emblaApi?.scrollPrev();
    resetTimer();
  };

  const handleNext = () => {
    emblaApi?.scrollNext();
    resetTimer();
  };

  return (
    <div className="section-sticker__works">
      <div className="section-sticker__works__viewport" ref={emblaRef}>
        <div className="section-sticker__works__container">
          {videoKeys.map((key, index) => (
            <div key={key} className="section-sticker__works__video">
              <video
                // Removed autoPlay; playback is now controlled via the select event.
                loop
                muted
                playsInline
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
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
        <button>
          <span>
            {"--{ "}
            <span onClick={handlePrev}> PREV </span>
            {" | "}
            <span onClick={handleNext}> NEXT </span>
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
