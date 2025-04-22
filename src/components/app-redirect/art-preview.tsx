"use client";

import { useBlurDataURL } from "@/helpers/getBluhashDataUri";
import Image from "next/image";

type Props = {
  extention: "webp" | "mp4";
  category: string;
  blurhash: string;
  fullUriMd: string;
};

const ArtPreview = ({ extention, category, blurhash, fullUriMd }: Props) => {
  const blurhashUri = useBlurDataURL(blurhash);

  return (
    <>
      {extention === "webp" ? (
        <div className="media-wrapper">
          <Image
            blurDataURL={blurhashUri}
            placeholder="blur"
            src={fullUriMd}
            alt={category}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : (
        <div className="media-wrapper">
          <video
            poster={blurhashUri}
            src={fullUriMd}
            autoPlay
            loop
            muted
            playsInline
            className="media"
          />
        </div>
      )}
    </>
  );
};

export default ArtPreview;
