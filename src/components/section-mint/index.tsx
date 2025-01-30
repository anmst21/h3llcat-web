import React from "react";
import Link from "next/link";
import { categories } from "../icon/category";
import { collections } from "@/collections";
import Image from "next/image";

type Props = {};

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

      <div className="rodeo-categories">
        {categories.map((category) => {
          return (
            <div className="rodeo-category" key={category.key}>
              {category.icon}
              <span>{category.content}</span>
            </div>
          );
        })}
      </div>
      <Link className="section-mint__cta" href="/beta">
        Go to Beta
      </Link>
    </div>
  );
};

export default SectionMint;
