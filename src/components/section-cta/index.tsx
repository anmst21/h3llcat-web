import React from "react";
import {
  CtaEth,
  CtaIlluminati,
  CtaJap,
  CtaLogo,
  CtaNft,
  CtaStar,
  CtaStars,
  CtaTryNow,
  CtaWeb,
} from "../icon";
import StickerBtn from "../section-sticker/sticker-btn";
import Image from "next/image";
import Game from "./game";
//234 x 372
const SectionCta = () => {
  return (
    <div className="section-cta">
      <div className="section-cta__badge section-cta__badge--left">
        <CtaJap />
      </div>
      <div className="section-cta__badge section-cta__badge--right">
        <CtaJap />
      </div>

      <div className="section-cta__container">
        <div className="section-cta__artwork">
          <div className="cta-illuminati__wrapper">
            <CtaIlluminati />
          </div>
          <CtaStar color={"#FFCC00"} index={3} width={27} height={60} />
          <div className="cta-game-boy__wrapper">
            <div className="cta-game-boy">
              <Image
                src={"/section-main/game-boy.png"}
                width={467}
                height={743}
                alt="game boy image"
              />
              <Game />
            </div>
          </div>
          <div className="cta-logo__wrapper">
            <CtaLogo />
          </div>
          <div className="cta-try-now__wrapper">
            <CtaTryNow />
          </div>
          <div className="cta-web__wrapper">
            <CtaWeb />
          </div>
          <CtaStar color={"white"} index={6} width={28} height={60} />

          <div className="cta-nft__wrapper">
            <CtaNft />
          </div>
          <div className="cta-eth__wrapper">
            <CtaEth />
          </div>
          <CtaStar color={"white"} index={1} width={48} height={112} />
          <CtaStar color={"#FFCC00"} index={2} width={52} height={120} />
          <CtaStar color={"white"} index={4} width={9} height={48} />
          <CtaStar color={"#375FFF"} index={5} width={18} height={38} />
          <CtaStar color={"white"} index={7} width={12} height={74} />
        </div>
        <div className="section-cta__text">
          <h1>HEY, COLLECTORS!</h1>
          <div className="section-cta__stars">
            <CtaStars />
          </div>
          <h2>Get ready to shape the next era of on-chain art.</h2>

          <p>
            Become a part of Display's exclusive Beta and help shape the future
            of on-chain collecting.
          </p>

          <p>
            With our swipe-to-mint design, exploring curated collections and
            building your digital gallery is effortless. Sign up now and be
            among the first to pioneer the next era of NFT art.
          </p>

          <StickerBtn large type="cta" content="Join the beta" />
        </div>
      </div>
    </div>
  );
};

export default SectionCta;
