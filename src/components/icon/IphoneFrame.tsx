import * as React from "react";
import Image from "next/image";

const SvgIcon = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    className="mock-shade"
    style={{
      width: "auto",
      height: "100%",
    }}
    src={src}
    alt={alt}
    layout="responsive"
    width={677}
    height={1413}
  />
);

export default SvgIcon;
