"use client";

import { useMemo } from "react";
import posts from "../../../100.json";
import { Collection } from "@/types/CollectionCarousel";
import RombusSection from "./rombus-section";
import {
  MainDiskCar,
  MainDiskKiss,
  StarCarousel,
  NexusJap,
  SideJap,
  DisplayJap,
} from "../icon";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import Equalizer from "./equalizer";

const SectionDisplay = () => {
  console.log("l", posts.length);
  const chunkArray = useMemo(() => {
    const chunkSize = 9;
    const result = [];
    for (let i = 0; i < posts.length; i += chunkSize) {
      result.push(posts.slice(i, i + chunkSize));
    }
    return result;
  }, []);

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

  //100
  return (
    <div id="hero" className="section-display">
      <div className="section-display__top">
        <div className="section-display__top__right">
          <span>Display by N3xus</span>
        </div>
      </div>

      <div className="section-display__center">
        <div className="disk-section">
          <div className="disk-section__kiss">
            <MainDiskKiss />
          </div>
          <div className="disk-section__radio">
            <Image
              alt="Wakkie talkie radio"
              width={360}
              height={650}
              src={"/section-main/walkie-talkie.png"}
            />
            <Equalizer />
          </div>
          <div className="disk-section__car">
            <MainDiskCar />
          </div>
        </div>
        <div className="rombus-section">
          {chunkArray.map((chunk, index) => {
            return (
              <RombusSection
                colIndex={index}
                key={index}
                array={chunk as Collection[]}
              />
            );
          })}
        </div>
        <div className="section-display__right">
          <SideJap />
        </div>
      </div>
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
    </div>
  );
};

export default SectionDisplay;
