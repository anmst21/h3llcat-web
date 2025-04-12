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
  TopFeaturesHeader,
  StickerStar,
  StickerInfo,
} from "../icon";
import StickerBtn from "./sticker-btn";
import Image from "next/image";
import VideoCarousel from "./video-carousel";
import RoundHoles from "./round-holes";
import AnimatedSticker from "./animated-sticker";
import RombusCarousel from "../section-display/rombus-carousel";
import DisplayCarousel from "../section-display/display-carousel";
import CtaArtwork from "../section-cta/cta-artwork";
import JoinCarousel from "../join-carousel";
import Footer from "../footer";
import FeaturesSticker from "./features-sticker";
import MobileMint from "../section-mint/mobile-mint";

function SectionSticker() {
  const items = ["simple", "fast", "on-chain"];

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
      <div className="remove-on-desktop">
        <Holes />
      </div>

      <div className="section-sticker__works remove-on-desktop">
        <RombusCarousel type="mobile" />
        <div className="section-sticker__works__arrows">
          <div className="arrow-down">
            <ArrowSticker />
            <ArrowSticker />
            <ArrowSticker />
          </div>
          <button>
            <span>
              {"../../ "}
              <span>展示へようこそ</span>
              {" /../.."}
            </span>
          </button>
          <div className="arrow-down">
            <ArrowSticker />
            <ArrowSticker />
            <ArrowSticker />
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
      <div className="remove-on-desktop">
        <Holes />
      </div>
      <div className="section-sticker__scene">
        <DisplayCarousel type="mobile" />
      </div>

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
      <div className="section-sticker__works remove-on-desktop">
        <div className="section-sticker__works__arrows">
          <span>About Display</span> <StickerInfo />
        </div>
        <p>
          With Display, minting on-chain has never been easier. Swipe through
          curated collections, mint what inspires you, and build your digital
          gallery—all in one seamless experience.
        </p>
      </div>
      <div className="remove-on-desktop">
        <Holes />
      </div>

      <MobileMint />
      <div className="remove-on-desktop">
        <Holes />
      </div>
      <div className="section-sticker__works ">
        <div className="section-sticker__works__arrows">
          <span>How it works?</span> <StickerTool />
        </div>
        <p>
          Display simplifies on-chain minting so you can focus on collecting
          art. Just connect a wallet, swipe through curated collections, and
          mint the pieces you love—all in one seamless motion.
        </p>
      </div>
      <div className="remove-on-desktop">
        <Holes />
      </div>
      <div className="remove-on-mobile">
        <Holes />
      </div>
      <div className="section-sticker__newsletter remove-on-mobile">
        <div className="section-sticker__works__arrows">
          <span>Stay in the loop</span>
          <div className="icon-small">
            <ContactsMail />
          </div>
        </div>
        <h4>subscribe to our newsletter for exclusive updates and insights</h4>
        <StickerBtn type="letter" content="Subscribe Now" />
      </div>
      <div className="round-holes__top remove-on-mobile">
        <RoundHoles />
      </div>

      <AnimatedSticker />
      <div className="round-holes__bot remove-on-desktop">
        <RoundHoles />
      </div>
      <div className="section-sticker__newsletter remove-on-desktop">
        <div className="section-sticker__works__arrows">
          <span>Stay in the loop</span>
          <div className="icon-small">
            <ContactsMail />
          </div>
        </div>
        <h4>subscribe to our newsletter for exclusive updates and insights</h4>
        <StickerBtn type="letter" content="Subscribe Now" />
      </div>
      <div className="remove-on-desktop">
        <RoundHoles />
      </div>
      <div className="section-sticker__features-header remove-on-desktop">
        <TopFeaturesHeader />
        <div className="section-sticker__features-header__slogan">
          {items.map((item) => (
            <div
              key={item}
              className="section-sticker__features-header__slogan__item"
            >
              <span className="star">*</span>
              <span>{item}</span>
            </div>
          ))}
          <ArrowSticker />
        </div>
      </div>
      <div className="remove-on-desktop">
        <Holes />
      </div>
      <FeaturesSticker />
      <div className="remove-on-desktop">
        <RoundHoles />
      </div>
      <div className="section-sticker__join remove-on-desktop">
        <JoinCarousel isMobile />
      </div>
      <div className="remove-on-desktop">
        <RoundHoles />
      </div>
      <div className="section-sticker__h2 remove-on-desktop">
        <h2>Hey Collectors!</h2>
      </div>
      <div className="section-sticker__scene section-sticker__artwork remove-on-desktop">
        <CtaArtwork isPhone />
      </div>
      <div className="section-sticker__works remove-on-desktop">
        <div className="section-sticker__works__arrows">
          <span>Get ready</span>
          <StickerStar />
        </div>
        <p>
          Become a part of Display's exclusive Beta and help shape the future of
          on-chain collecting.
        </p>
        <p>
          With our swipe-to-mint design, exploring curated collections and
          building your digital gallery is effortless. Sign up now and be among
          the first to pioneer the next era of NFT art.
        </p>
        <StickerBtn type="cta" content="Join the beta" />
      </div>
      <div className="remove-on-desktop">
        <RoundHoles />
      </div>
      <Footer isMobile />
    </div>
  );
}

export default SectionSticker;
