import Footer from "@/components/footer";
import { apiUri, gateway } from "@/helpers/uris";
import axios from "axios";
import { truncateEthAddress } from "@/helpers/truncateAddress";
import { MetaItemName } from "@/components/collection/types";
import MetaItem from "@/components/collection/meta-item";
import Image from "next/image";
import image from "@/app/logo-display.svg";
import CornerStatus from "@/components/collection/coner-status";
import SidebarBtn from "@/components/header/sidebar-btn";
import ThreeScene from "@/components/three-scene";
import "@/components/three-scene/index.scss";
import Script from "next/script";
import Header from "@/components/header";

export default async function Nft({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const collectionAddress = (await params).address;
  const { data } = await axios.get(
    apiUri + "/anonymous/rodeo/collection/posts",
    {
      params: { collectionAddress: collectionAddress, limit: 5, offset: 0 },
    }
  );

  const { creatorAddress, contractAddress } = data.collection;
  const images = data.posts.map((post: any) => {
    const fullUri = `${gateway}/${
      post.image.ipfsCid.split("ipfs://")[1]
    }_Sm.webp`;
    return fullUri;
  });

  const metaItemData = [
    {
      name: MetaItemName.contract,
      value: truncateEthAddress(contractAddress),
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

  console.log("data", data);
  return (
    <div className="nft">
      <Header />
      <div className="three_wrapper">
        <ThreeScene />
      </div>
      <div className="nft__corner">
        <CornerStatus status="collection" />
      </div>
      <div className="nft__container">
        <div className="nft__container__status">
          <Image width={26} height={26} src={image} alt="logo-status" />

          <CornerStatus status="collection" />
        </div>
        {/*<BgImages />*/}

        <div className="nft__card">
          <div className="highlight" />
          <div className="nft__card__images">
            {images.map((uri: string, key: number) => {
              return (
                <Image
                  src={uri}
                  width={94}
                  height={154}
                  alt={`collection-image-${key}`}
                  key={key}
                  style={{ objectFit: "cover" }}
                  className={`nft__card__images__${key + 1}`}
                />
              );
            })}
          </div>
          <div className="nft__card__section">
            <div className="nft__card__section__container">
              <div className="nft__card__section__placeholder" />
              <div className="nft__card__section__text">
                <span className="nft__card__name">
                  {truncateEthAddress(contractAddress)}
                </span>
                <span className="nft__card__creator">
                  {truncateEthAddress(creatorAddress)}
                </span>
              </div>
            </div>
            <div className="nft__card__section__bio">
              <span>
                In order to progress the plot, survive, and escape the Eye, the
                player rolls a number of dice each in-game day.
              </span>
            </div>
            <div className="nft__card__section__meta">
              {metaItemData.map((data, index) => {
                return (
                  <MetaItem
                    name={data.name}
                    value={data.value}
                    isBg={data.isBg}
                    key={index}
                  />
                );
              })}
            </div>
            {/* <CtaBtn collectionAddress={collectionAddress} /> */}
          </div>
        </div>
      </div>
      <SidebarBtn />
      <Footer sqSize={18} uri={`h3llcat:///collection/${collectionAddress}`} />
      <Script src="/interractiveCard.js" />
    </div>
  );
}
