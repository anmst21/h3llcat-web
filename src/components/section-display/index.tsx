"use client";

import { useMemo } from "react";
import posts from "../../../100.json";
import { Collection } from "@/types/CollectionCarousel";
import RombusSection from "./rombus-section";

const SectionDisplay = () => {
  console.log("l", posts.length);
  const chunkArray = useMemo(() => {
    const chunkSize = 10;
    const result = [];
    for (let i = 0; i < posts.length; i += chunkSize) {
      result.push(posts.slice(i, i + chunkSize));
    }
    return result;
  }, []);

  //100
  return (
    <div id="hero" className="section-display">
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
    </div>
  );
};

export default SectionDisplay;
