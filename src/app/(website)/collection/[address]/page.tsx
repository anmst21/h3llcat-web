import { apiUri, gateway } from "@/helpers/uris";
import { truncateEthAddress } from "@/helpers/truncateAddress";
import { Metadata } from "next";
import Footer from "@/components/footer";
import {
  ArrowSticker,
  CollectionLock,
  CollectionUser,
  StickerIphoneIcon,
} from "@/components/icon";
import RoundHoles from "@/components/section-sticker/round-holes";
import Holes from "@/components/section-sticker/holes";
import QRCode from "@/components/footer/qr-code";
import PreviewCarousel from "@/components/app-redirect/preview-carousel";
import { PreviewCarouselProvider } from "@/context/PreviewCarouselProvider";
import { CarouselPost, RodeoPost } from "@/components/app-redirect/types";
import CollectionHeader from "@/components/app-redirect/collection-header";
import CollectionProps from "@/components/app-redirect/collection-props";
import CollectionSticks from "@/components/app-redirect/collection-sticks";
import { notFound } from "next/navigation";
import Link from "next/link";

import { etherScanUriBase } from "@/components/app-redirect/etherScanUriBase";

type Props = {
  params: {
    address: string;
  };
};
const DOMAIN = "https://h3llcat.app";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { address } = params;

  const title = "Explore NFT Collection";
  const description =
    "Discover unique NFT collections powered by Rodeo.club. Swipe through curated artwork, explore metadata, and seamlessly mint your favorites directly within the Display app.";

  // point at your API‑route edge function:
  const ogImageUrl = `${DOMAIN}/api/collection/${address}`;

  return {
    title: "Explore NFT Collection",
    description:
      "Discover unique NFT collections powered by Rodeo.club. Swipe through curated artwork, explore metadata, and seamlessly mint your favorites directly within the Display app.",
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Preview Display",
        },
      ],
      siteName: "Display",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function Nft({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const contractAddress = (await params).address;

  // build and call the URL
  const url = new URL(`${apiUri}/anonymous/rodeo/collection/posts`);
  url.searchParams.set("collectionAddress", contractAddress);
  url.searchParams.set("limit", "8");
  url.searchParams.set("offset", "0");

  const res = await fetch(url.toString(), { method: "GET" });
  if (!res.ok) notFound();

  // cast to the shape you expect
  const data: {
    collection: { creatorAddress: string };
    posts: RodeoPost[];
  } = await res.json();

  // map into your CarouselPost[] exactly
  const carouselPosts: CarouselPost[] = data.posts.map(
    (post: RodeoPost): CarouselPost => {
      const { name, ipfsCid, category, mimeType, blurhash } = post.image;
      const hash = ipfsCid.split("ipfs://")[1];

      // extention will be inferred as the literal union "webp" | "mp4"
      const extention = mimeType === "image/jpeg" ? "webp" : "mp4";
      const fullUriMd = `${gateway}/${hash}_Md.${extention}`;

      const nowSec = Math.floor(Date.now() / 1000);
      const endSec = Math.floor(
        new Date(post.mintEndDatetime).getTime() / 1000
      );
      const remainingSec = Math.max(endSec - nowSec, 0);
      const hoursRemaining = Math.floor(remainingSec / 3600);
      const filledSticks = Math.ceil(hoursRemaining / 4);

      return {
        name,
        tokenId: post.tokenId,
        blurhash,
        category,
        fullUriMd,
        extention,
        hoursRemaining,
        filledSticks,
      };
    }
  );

  const clockList = carouselPosts.map((post) => ({
    hoursRemaining: post.hoursRemaining.toString(), // ← now a string
    filledSticks: post.filledSticks,
  }));

  const headersList = carouselPosts.map((post) => post.name);
  const idsList = carouselPosts.map((post) => post.tokenId);

  // console.log(
  //   "contractAddress, user",
  //   contractAddress,
  //   data.collection.creatorAddress
  // );

  return (
    <PreviewCarouselProvider>
      <div className="nft-card">
        <div className="section-sticker__logo remove-on-desktop">
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
        <div className="round-holes__top remove-on-desktop">
          <RoundHoles />
        </div>
        <div className="round-holes__bot ">
          <RoundHoles />
        </div>

        <div className="section-sticker__reimagine">
          <CollectionHeader headerArray={headersList} />

          <Link
            target="_blank"
            href={
              etherScanUriBase + "address/" + data.collection.creatorAddress
            }
            className="section-sticker__works__arrows"
          >
            <span>
              {truncateEthAddress(data.collection.creatorAddress) || "NFT"}
            </span>
            <ArrowSticker />
          </Link>
        </div>
        <Holes />
        <div className="nft-card__preview">
          <div className="nft-card__preview__container">
            {/* <ArtPreview
          extention={extention}
          category={category}
          blurhash={blurhash}
          fullUriMd={fullUriMd}
        /> */}
            <PreviewCarousel carouselPosts={carouselPosts} />
          </div>
          {/* <div className="nft-card__preview__props">
            <div className="nft-card__preview__items">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className={classNames("nft-card__preview__sticks", {
                    "nft-card__preview__sticks--active": 3 > index,
                  })}
                />
              ))}
            </div>
            <span className="nft-card__preview__text move-up">
              <span className="accent-color">{1}</span>H LEFT
            </span>
          </div> */}
          <CollectionSticks sticksArray={clockList} />
        </div>
        <Holes />
        <CollectionProps contractAddress={contractAddress} ids={idsList} />
        <Holes />
        <div className="nft-card__input">
          <label htmlFor="card-input">
            <CollectionUser />
            <input placeholder="COMMENT..." disabled={true} />
            <CollectionLock />
          </label>
        </div>
        <div className="round-holes__top ">
          <RoundHoles />
        </div>

        <div className="remove-on-mobile reverse-direction">
          <div className="round-holes__bot ">
            <RoundHoles />
          </div>

          <div className="nft-card__code">
            <div className="section-sticker__iphone section-beta__header__logo">
              <StickerIphoneIcon />
              <div className="section-sticker__iphone__text">
                <h5>Get the app</h5>
                <span className="section-sticker__iphone__text__sub">
                  Edit all your QR codes
                </span>
              </div>
            </div>

            <QRCode
              sqSize={18}
              uri={`h3llcat:///collection/${contractAddress}`}
            />
          </div>
          <div className="round-holes__top ">
            <RoundHoles />
          </div>
        </div>
        <div className="round-holes__bot remove-on-desktop">
          <RoundHoles />
        </div>
        <Footer isMobile />
      </div>
    </PreviewCarouselProvider>
  );
}
