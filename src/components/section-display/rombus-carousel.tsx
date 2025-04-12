"use client";

import React, { useMemo } from "react";
import { Collection } from "@/types/CollectionCarousel";
import RombusSection from "./rombus-section";
import posts from "../../../100.json";
import { useMediaQuery } from "react-responsive";

const RombusCarousel = ({ type }: { type: "desktop" | "mobile" }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });

  const chunkArray = useMemo(() => {
    const chunkSize = 9;
    const result = [];
    for (let i = 0; i < posts.length; i += chunkSize) {
      result.push(posts.slice(i, i + chunkSize));
    }
    return result;
  }, []);

  if (type === "desktop" && isMobile) return null;
  if (type === "mobile" && !isMobile) return null;
  return (
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
  );
};

export default RombusCarousel;
