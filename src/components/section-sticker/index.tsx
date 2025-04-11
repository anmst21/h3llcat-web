import React from "react";
import Holes from "./holes";
import {
  ArrowSticker,
  StickerLove,
  StickerIphoneIcon,
  StickerBarcode,
  MenuBeta,
  ContactsMail,
  StickerTool,
} from "../icon";
import StickerBtn from "./sticker-btn";
import Image from "next/image";
import VideoCarousel from "./video-carousel";
import RoundHoles from "./round-holes";
import AnimatedSticker from "./animated-sticker";

function SectionSticker() {
  return (
    <div className="section-sticker">
      <div className="section-sticker__hollow"></div>
      <div className="section-sticker__logo">
        <div className="section-sticker__iphone">
          <StickerIphoneIcon />
          <div className="section-sticker__iphone__text">
            <h5>Display</h5>
            <span className="section-sticker__iphone__text__sub">
              swipe. collect. repeat.
            </span>
          </div>
        </div>
      </div>

      <Holes />
      <div className="section-sticker__reimagine">
        <h3>Reimagine How You Mint On Chain</h3>

        <div className="section-sticker__works__arrows">
          <span>one swipe at a time</span>
          <ArrowSticker />
        </div>
      </div>
      <Holes />
      <div className="section-sticker__works">
        <div className="section-sticker__works__arrows">
          <span>introduction</span> <StickerLove />
        </div>
        <p>
          Welcome to Display, where on-chain minting is as intuitive as a swipe.
          Explore curated NFT collections, mint the pieces that catch your eye,
          and seamlessly grow your digital gallery—all in one app.
        </p>
        <StickerBtn type="cta" content="Join the beta" />
      </div>
      <Holes />
      <div className="section-sticker__barcode">
        <div className="section-sticker__barcode__container">
          <StickerBarcode />
        </div>
        <div className="section-sticker__works__arrows">
          <span>Design by n3xus team</span>
          <span>xx-xx-2025</span>
        </div>
      </div>
      {/* <Holes />
      <div className="section-sticker__works">
        <div className="section-sticker__works__arrows">
          <span>About Display</span> <StickerInfo />
        </div>
        <p>
          With Display, minting on-chain has never been easier. Swipe through
          curated collections, mint what inspires you, and build your digital
          gallery—all in one seamless experience.
        </p>
      </div> */}
      <RoundHoles />
      <div className="section-sticker__gradient">
        <div className="section-sticker__gradient__img">
          <Image
            alt="Gradient for sticker."
            width={408}
            height={137}
            src={"/gradient-bg.png"}
          />
        </div>
        <div className="section-sticker__gradient__text">
          <h3>TINDER-INSPIRED MINTING WITH DISPLAY</h3>

          <div className="section-sticker__works__arrows">
            <span>GET STARTED</span>
            <MenuBeta />
          </div>
        </div>
      </div>

      <RoundHoles />
      <VideoCarousel />
      <Holes />
      <div className="section-sticker__works">
        <div className="section-sticker__works__arrows">
          <span>How it works?</span> <StickerTool />
        </div>
        <p>
          Display simplifies on-chain minting so you can focus on collecting
          art. Just connect a wallet, swipe through curated collections, and
          mint the pieces you love—all in one seamless motion.
        </p>
      </div>
      <Holes />
      <div className="section-sticker__newsletter">
        <div className="section-sticker__works__arrows">
          <span>Stay in the loop</span>
          <div className="icon-small">
            <ContactsMail />
          </div>
        </div>
        <h4>subscribe to our newsletter for exclusive updates and insights</h4>
        <StickerBtn type="letter" content="Subscribe Now" />
      </div>
      <div className="round-holes__top">
        <RoundHoles />
      </div>
      <AnimatedSticker />
    </div>
  );
}

export default SectionSticker;
