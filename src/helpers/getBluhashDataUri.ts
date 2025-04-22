"use client";

import { decode } from "blurhash";
import { useMemo } from "react";

export function useBlurDataURL(
  blurHash: string,
  width = 32,
  height = 32
): string {
  return useMemo(() => {
    // guard: only run in the browser
    if (typeof document === "undefined") {
      return "";
    }

    // decode into pixels
    const pixels = decode(blurHash, width, height);

    // build a canvas and draw
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return "";
    }

    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);

    // export a data‑URL
    return canvas.toDataURL();
  }, [blurHash, width, height]);
}
