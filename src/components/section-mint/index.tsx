import React from "react";
import Link from "next/link";
import { collections } from "@/collections";
import Image from "next/image";
import Carousel from "./carousel";

type Props = {};

const colorsTriadic = ["#9747FF", "#FF9747", "#47FF97"];
const colorsSplitComplementary = ["#9747FF", "#EDFF47", "#72FF47"];
const colorsAnalogous = ["#4772FF", "#9747FF", "#FF47ED"];
const colorsTetraidic = ["#9747FF", "#FF47AF", "#AFFF47", "#47FF97"];
const colorsSquare = ["#9747FF", "#FF4754", "#AFFF47", "#47FFF3"];

const SectionMint = (props: Props) => {
  const collection = collections[0];
  console.log("len", collections.flat().length);
  return (
    <div className="section-mint">
      {collection.map((item) => (
        <Image
          className="collection-image"
          width={450}
          height={450}
          alt={item.artName}
          src={item.artUri as string}
        />
      ))}

      <div className="section-mint__top">
        <div className="section-mint__top__left">
          <span>Collection</span>
          <h2>Rv666</h2>
        </div>
        <div className="section-mint__top__right">
          <span>Minted</span>
          <h3>3,234</h3>
        </div>
      </div>
      <div className="section-mint__header">
        <h1>*Mint Now*</h1>
      </div>
      <Carousel />

      <Link className="section-mint__cta" href="/beta">
        Go to Beta
      </Link>
    </div>
  );
};

export default SectionMint;
