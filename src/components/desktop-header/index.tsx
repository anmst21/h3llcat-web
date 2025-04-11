import Link from "next/link";
import React from "react";
import { StickerIphoneIcon } from "../icon";
import Navigation from "./navigation";
import Wallet from "./wallet";

const DesktopHeader = () => {
  return (
    <div className="desktop-header">
      <Link
        href={"/"}
        className="section-sticker__iphone section-beta__header__logo"
      >
        <StickerIphoneIcon />
        <div className="section-sticker__iphone__text">
          <h5>Display</h5>
          <span className="section-sticker__iphone__text__sub">
            swipe. collect. repeat.
          </span>
        </div>
      </Link>
      <Navigation />
      <Wallet />
    </div>
  );
};

export default DesktopHeader;
