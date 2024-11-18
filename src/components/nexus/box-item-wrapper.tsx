"use client";

import { useRef, useEffect, useState } from "react";

import BoxItem from "./box-item";

interface BoxItemWrapperProps {}

const BoxItemWrapper = () => {
  const [items, setItems] = useState([
    { height: 70, index: 1 },
    { height: 50, index: 2 },
    { height: 80, index: 3 },
    { height: 40, index: 4 },
    { height: 100, index: 5 },
  ]);
  const carouselRef = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       if (!carouselRef.current) return;

  //       const itemWidth = carouselRef.current.children[0]?.clientWidth || 0;

  //       // Scroll by the width of one item
  //       carouselRef.current.scrollBy({
  //         left: itemWidth,
  //         behavior: "smooth",
  //       });

  //       // Rearrange items after scroll ends
  //       setTimeout(() => {
  //         //   carouselRef.current.scrollLeft = 0;

  //         const updatedItems = [...items];
  //         const firstItem = updatedItems.shift(); // Remove the first item
  //         if (firstItem) updatedItems.push(firstItem); // Add it to the end
  //         setItems(updatedItems);

  //         // Reset scroll position
  //       }, 500); // Match the scroll duration (500ms)
  //     }, 1000); // Scroll every second

  //     return () => clearInterval(interval); // Clean up on unmount
  //   }, [items]);

  return (
    <div ref={carouselRef} className="section-future__boxes__items">
      {items.map((item, index) => {
        return <BoxItem flexValue={item.height} key={index} />;
      })}
    </div>
  );
};

export default BoxItemWrapper;
