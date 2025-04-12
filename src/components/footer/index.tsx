import React from "react";
import DottedLink from "./dotted-link";
import Link from "next/link";
import Image from "next/image";
import {
  FooterFarcaster,
  FooterX,
  FooterLinkedIn,
  LogoFooter,
} from "@/components/icon";
import FooterForm from "./footer-form";

import {
  socialWarpcast,
  socialsLinkedIn,
  socialsTwitter,
} from "@/helpers/socials";
import { getCategories } from "@/sanity/sanity-utils";
import Holes from "../section-sticker/holes";
import RoundHoles from "../section-sticker/round-holes";

const colors = ["#FFF8E7", "#93918E", "#FFCC00", "#050915"];

const Footer = async ({ isMobile }: { isMobile?: boolean }) => {
  const categories = await getCategories();

  return (
    <div id={isMobile ? "footer-mobile" : "footer"} className="footer">
      <div className="footer__container">
        <div className="footer__app">
          {/* <div className="footer__app__domain">
            <h4>Display</h4>
            <h4>.app</h4>
          </div> */}
          <div className="footer__app__wrapper">
            <div className="footer__app__container">
              <Link href={"/"} className="footer__app__logo">
                <LogoFooter />
              </Link>
              <div className="footer__app__links">
                <DottedLink href="/" index={1} label="Home" />
                <DottedLink href="/beta" index={3} label="Beta" />
                <DottedLink href="/blog" index={2} label="Blog" />
                <DottedLink href="/contacts" index={4} label="Contacts" />
              </div>
            </div>
            <Holes />
          </div>
        </div>
        <div className="footer__team">
          <div className="footer__team__container">
            <div className="footer__team__colors">
              {colors.map((color, index) => (
                <div key={index} style={{ backgroundColor: color }} />
              ))}
            </div>
            <div className="footer__team__ny">
              <h5>New York City</h5>
              <span>Made in</span>
            </div>
          </div>
          <div className="footer__team__year">
            <span>
              N<span className="three-letter">3</span>XUS
            </span>{" "}
            Team <span className="2025">2025</span>
          </div>
        </div>
        <div className="footer__reimagine">Reimagine How You Mint On Chain</div>
        <div className="footer__links">
          <div className="footer__links__home">
            <h5>Home</h5>
            <Link href="/#hero">Hero</Link>
            <Link href="/#collections">Collections</Link>
            <Link href="/#explore">Explore</Link>
            <Link href="/#about">About</Link>
            <Link href="/#features">Features</Link>
            <Link href="/#join">Join</Link>
          </div>
          <div className="footer__links__blog">
            <h5>Blog</h5>
            {categories.map((category) => (
              <Link key={category._id} href={`/blog?category=${category.slug}`}>
                {category.title}
              </Link>
            ))}
          </div>
          <div className="footer__links__contact">
            <h5>Contact Us</h5>
            <Link href="tel:+18453324043">+1 (845) 332-40-43</Link>
            <Link href="mailto:display@nexus.nyc">display@nexus.nyc</Link>
            <Link
              href="https://n3xus.nyc"
              target="_blank"
              rel="noopener noreferrer"
            >
              n3xus.nyc
            </Link>
          </div>
          <div className="footer__links__socials">
            <Link className="socials-link" href={socialsTwitter}>
              <FooterX />
            </Link>
            <Link className="socials-link" href={socialsLinkedIn}>
              <FooterLinkedIn />
            </Link>
            <Link className="socials-link" href={socialWarpcast}>
              <FooterFarcaster />
            </Link>
          </div>
        </div>
        <div className="footer__art">
          <RoundHoles />
          <Image
            alt="Nexus Dude Art"
            src="/dude-art.svg"
            width={556}
            height={265}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          <RoundHoles />
        </div>
        <div className="footer__form">
          <div className="footer__form__text">
            <span>
              With Display, minting on-chain has never been easier. Swipe
              through curated collections, mint what inspires you, and build
              your digital gallery—all in one seamless experience. Join our beta
              today and shape the next generation of blockchain art.
            </span>
          </div>
          <div className="footer__form__holes">
            <RoundHoles />
            <div className="footer__form__holes__container">
              <div className="section-sticker__works__arrows">
                <span>Stay in the loop</span>
                <div className="icon-small">
                  <span>!!!</span>
                </div>
              </div>
              <h4>sign up our newsletter </h4>
            </div>
          </div>
          <FooterForm />
        </div>
      </div>
      <div className="copyright">
        <span>Display 2025 ©</span>
        <span>All rights reserved</span>
      </div>
    </div>
  );
};

export default Footer;
