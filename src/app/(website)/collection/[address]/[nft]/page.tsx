import { MetaItemName } from "@/components/collection/types";
import { truncateEthAddress } from "@/helpers/truncateAddress";
import {
  CollectionLock,
  CollectionUser,
  ArrowSticker,
  StickerIphoneIcon,
} from "@/components/icon";
import Footer from "@/components/footer";
import { apiUri, gateway } from "@/helpers/uris";

import { Metadata } from "next";
import RoundHoles from "@/components/section-sticker/round-holes";
import Holes from "@/components/section-sticker/holes";
import QRCode from "@/components/footer/qr-code";
import classNames from "classnames";
import ArtPreview from "@/components/app-redirect/art-preview";
import { notFound } from "next/navigation";
import Link from "next/link";
import { etherScanUriBase } from "@/components/app-redirect/etherScanUriBase";

const DOMAIN = "https://displaymint.app";

type Props = {
  params: {
    address: string;
    nft: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { address, nft } = params;

  const title = "NFT Details";
  const description =
    "Dive into the details of this unique NFT powered by Rodeo.club. View metadata, explore artwork, and seamlessly mint or interact with it directly in the Display app.";

  const ogImageUrl = `${DOMAIN}/api/collection/${address}/${nft}`;
  const pageUrl = `${DOMAIN}/collection/${address}/${nft}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
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
  params: Promise<{ nft: string; address: string }>;
}) {
  const postId = (await params).nft;
  const collectionAddress = (await params).address;

  const url = new URL(`${apiUri}/anonymous/rodeo/post`);
  url.searchParams.set("collectionAddress", collectionAddress);
  url.searchParams.set("tokenId", postId);

  const res = await fetch(url.toString(), {
    method: "GET",
  });
  if (!res.ok) {
    notFound();
  }
  const data = await res.json();
  // console.log("dadada", data);
  const {
    mintEndDatetime,
    image: { name, category, ipfsCid, mimeType, blurhash },
    collection: { contractAddress, tokenId, creatorAddress },
  } = data.post;

  const hash = ipfsCid.split("ipfs://")[1];
  const extention = mimeType === "image/jpeg" ? "webp" : "mp4";
  const fullUriMd = `${gateway}/${hash}_Md.${extention}`;

  const currentTime = Math.floor(Date.now() / 1000);
  const endTime = Math.floor(new Date(mintEndDatetime).getTime() / 1000);
  const remainingSeconds = Math.max(endTime - currentTime, 0);
  const hoursRemaining = Math.floor(remainingSeconds / 3600);
  const filledSticks = Math.ceil(hoursRemaining / 4);

  const metaItemData = [
    {
      name: MetaItemName.contract,
      value: truncateEthAddress(contractAddress),
      isBg: false,
    },
    {
      name: MetaItemName.token,
      value: tokenId,
      isBg: true,
    },
    {
      name: MetaItemName.chain,
      value: "Base",
      isBg: false,
    },
    {
      name: MetaItemName.standard,
      value: "ERC-1155",
      isBg: true,
    },
  ];

  return (
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
        <h3>{name.toUpperCase()}</h3>

        <Link
          target="_blank"
          href={
            etherScanUriBase + "address/" + (creatorAddress || contractAddress)
          }
          className="section-sticker__works__arrows"
        >
          <span>
            {truncateEthAddress(creatorAddress || contractAddress) || "NFT"}
          </span>
          <ArrowSticker />
        </Link>
      </div>
      <Holes />
      <div className="nft-card__preview">
        <div className="nft-card__preview__container">
          <ArtPreview
            extention={extention}
            category={category}
            blurhash={blurhash}
            fullUriMd={fullUriMd}
          />
        </div>
        <div className="nft-card__preview__props">
          <div className="nft-card__preview__items">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className={classNames("nft-card__preview__sticks", {
                  "nft-card__preview__sticks--active": filledSticks > index,
                })}
              />
            ))}
          </div>
          <span className="nft-card__preview__text move-up">
            <span className="accent-color">{hoursRemaining}</span>H LEFT
          </span>
        </div>
      </div>
      <Holes />
      <div className="nft-card__props">
        {metaItemData.map((item, index) => (
          <div key={index} className="nft-card__props__item">
            <span>{item.name}</span>
            <div className="nft-card__props__divider" />
            <Link
              href={
                item.name === MetaItemName.contract
                  ? etherScanUriBase + "token/" + contractAddress
                  : item.name === MetaItemName.token
                    ? etherScanUriBase +
                      "token/" +
                      contractAddress +
                      `?a=${postId}`
                    : "/"
              }
              target="_blank"
              className={classNames("nft-card__props__value", {
                disabled:
                  item.name === MetaItemName.chain ||
                  item.name === MetaItemName.standard,
              })}
            >
              {item.value}
            </Link>
          </div>
        ))}
      </div>
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
            uri={`h3llcat:///collection/${collectionAddress}/${postId}`}
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
  );
}
//
