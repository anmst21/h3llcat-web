import { decode } from "blurhash";

export const getBlurDataURL = (
  blurHash: string,
  width = 32,
  height = 32
): string => {
  // Decode the blurhash string into RGBA pixel data
  const pixels = decode(blurHash, width, height);

  // Create a temporary canvas to draw the decoded pixels
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Create an ImageData object and draw the pixels
  const imageData = ctx.createImageData(width, height);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);

  // Return the canvas content as a base64-encoded data URL
  return canvas.toDataURL();
};
