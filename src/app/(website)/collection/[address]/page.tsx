import { apiUri, gateway } from "@/helpers/uris";
import axios from "axios";
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
import { CarouselPost } from "@/components/app-redirect/types";
import CollectionHeader from "@/components/app-redirect/collection-header";
import CollectionProps from "@/components/app-redirect/collection-props";
import CollectionSticks from "@/components/app-redirect/collection-sticks";

interface ImageInfo {
  name: string;
  ipfsCid: string;
  category: string;
  mimeType: string;
  blurhash: string;
  width: number;
  height: number;
}

interface RodeoPost {
  id: string;
  mintEndDatetime: string; // ISO date string; you could use `Date` if you parse it
  image: ImageInfo;
  tokenId: number;
}

export const metadata: Metadata = {
  title: "Explore NFT Collection",
  description:
    "Discover unique NFT collections powered by Rodeo.club. Swipe through curated artwork, explore metadata, and seamlessly mint your favorites directly within the Display app.",
};

export default async function Nft({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const contractAddress = (await params).address;
  const { data } = await axios.get(
    apiUri + "/anonymous/rodeo/collection/posts",
    {
      params: { collectionAddress: contractAddress, limit: 8, offset: 0 },
    }
  );

  const carouselPosts = data.posts.map((post: RodeoPost) => {
    const { name, ipfsCid, category, mimeType, blurhash } = post.image;
    const hash = ipfsCid.split("ipfs://")[1];
    const extention = mimeType === "image/jpeg" ? "webp" : "mp4";
    const fullUriMd = `${gateway}/${hash}_Md.${extention}`;
    console.log("fullUriSm", data);

    const currentTime = Math.floor(Date.now() / 1000);
    const endTime = Math.floor(new Date(post.mintEndDatetime).getTime() / 1000);
    const remainingSeconds = Math.max(endTime - currentTime, 0);
    const hoursRemaining = Math.floor(remainingSeconds / 3600);
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
  });

  const clockList: { hoursRemaining: string; filledSticks: number }[] =
    carouselPosts.map((post: CarouselPost) => ({
      hoursRemaining: post.hoursRemaining,
      filledSticks: post.filledSticks,
    }));

  const headersList: string[] = carouselPosts.map(
    (post: CarouselPost) => post.name
  );
  const idsList: number[] = carouselPosts.map(
    (post: CarouselPost) => post.tokenId
  );

  // const { creatorAddress, contractAddress } = data.collection;
  // const images = data.posts.map((post: any) => {
  //   const fullUri = `${gateway}/${
  //     post.image.ipfsCid.split("ipfs://")[1]
  //   }_Sm.webp`;
  //   return fullUri;
  // });

  // const metaItemData = [
  //   {
  //     name: MetaItemName.contract,
  //     value: truncateEthAddress(contractAddress),
  //     isBg: true,
  //   },

  //   {
  //     name: MetaItemName.chain,
  //     value: "Base",
  //     isBg: false,
  //   },
  //   {
  //     name: MetaItemName.standard,
  //     value: "ERC-1155",
  //     isBg: true,
  //   },
  // ];

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

          <div className="section-sticker__works__arrows">
            <span>{truncateEthAddress(contractAddress) || "NFT"}</span>
            <ArrowSticker />
          </div>
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
        <CollectionProps
          creatorAddress={data.collection.creatorAddress}
          ids={idsList}
        />
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
