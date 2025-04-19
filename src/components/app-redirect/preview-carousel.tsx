"use client";

import React, { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { CarouselPost } from "./types";

type Props = {
  carouselPosts: CarouselPost[];
};

import ArtPreview from "./art-preview";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { useCarousel } from "@/context/PreviewCarouselProvider";
import { motion } from "motion/react";

const PreviewCarousel = ({ carouselPosts }: Props) => {
  console.log("carouselPosts", carouselPosts);
  const autoplayDelay = 3000;
  const duration = autoplayDelay / 1000;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Fade(),
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);

  const { selectedIndex, setSelectedIndex } = useCarousel();

  // 1. Define your callback once, with emblaApi & setSelectedIndex in its deps
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    // grab the autoplay plugin instance
    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return;

    // when the user releases (touchend/mouseup), resume autoplay
    const resumeAutoplay = () => autoplay.play();

    emblaApi.on("pointerUp", resumeAutoplay);

    return () => {
      emblaApi.off("pointerUp", resumeAutoplay);
    };
  }, [emblaApi]);
  // 2. Wire it up in useEffect, depending only on emblaApi & the memoized callback
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect(); // initialize
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  console.log("selected index", selectedIndex);
  return (
    <>
      <div className="preview-carousel__status">
        <div className="preview-carousel__status__items">
          {carouselPosts.map((_, idx) => (
            <div key={idx} className="preview-carousel__status__item">
              {/* fully filled for slides already shown */}
              {idx < selectedIndex && (
                <div className="preview-carousel__status__fill full" />
              )}

              {/* animate only the current slide */}
              {idx === selectedIndex && (
                <motion.div
                  className="preview-carousel__status__fill"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration, ease: "linear" }}
                />
              )}
            </div>
          ))}
        </div>
        <span className="preview-carousel__status__id">
          {selectedIndex + 1}/<span>{carouselPosts.length}</span>
        </span>
      </div>
      <div className="preview-carousel" ref={emblaRef}>
        <div className="preview-carousel__container">
          {carouselPosts.map((post, index) => (
            <div key={index} className="preview-carousel__video">
              <ArtPreview
                blurhash={post.blurhash}
                fullUriMd={post.fullUriMd}
                category={post.category}
                extention={post.extention}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PreviewCarousel;
