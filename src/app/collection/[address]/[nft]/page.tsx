import axios from "axios";
import Image from "next/image";
import MetaItem from "@/components/collection/meta-item";
import { MetaItemName } from "@/components/collection/types";
import { truncateEthAddress } from "@/helpers/truncateAddress";
import BgImages from "@/components/collection/bg-images";
import { CollectionLock, CoinFade } from "@/components/icon";
import { stringToColor } from "@/helpers/stringToColor";
import Footer from "@/components/footer";
import Sticks from "@/components/collection/sticks";
import { apiUri, gateway } from "@/helpers/uris";
import SidebarBtn from "@/components/header/sidebar-btn";
import CornerStatus from "@/components/collection/coner-status";
import image from "@/app/logo-display.svg";
import ThreeScene from "@/components/three-scene";
import '@/components/three-scene/index.scss';
import Script from "next/script";
import Header from "@/components/header";

export default async function Nft({
  params,
}: {
  params: Promise<{ nft: string; address: string }>;
}) {
  const postId = (await params).nft;
  const contractId = (await params).address;
  const { data } = await axios.get(apiUri + "/anonymous/rodeo/post", {
    params: { postId },
  });

  const {
    mintEndDatetime,
    image: { name, category, ipfsCid },
    collection: { contractAddress, tokenId },
  } = data.post;

  const hash = ipfsCid.split("ipfs://")[1];
  const fullUriSm = `${gateway}/${hash}_Sm.webp`;

  const currentTime = Math.floor(Date.now() / 1000);
  const endTime = Math.floor(new Date(mintEndDatetime).getTime() / 1000);
  const remainingSeconds = Math.max(endTime - currentTime, 0);
  const hoursRemaining = Math.floor(remainingSeconds / 3600);
  const filledSticks = Math.ceil(hoursRemaining / 4) - 1;

  console.log("filledSticks", filledSticks, hoursRemaining);

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
    <div className="nft">
      <Header />
      <div className="nft__corner">
        <CornerStatus status="nft" />
      </div>
      <div className="nft__container">
        <BgImages />
        <div className="nft__container__status">
          <Image width={26} height={26} src={image} alt="logo-status" />
          <CornerStatus status="nft" />
        </div>
        <div className="nft__corner">
          <CornerStatus status="nft"/>
        </div>
        <div className="nft__container">
          {/*<BgImages/>*/}
          <div className="nft__container__status">
            <Image width={26} height={26} src={image} alt="logo-status"/>

            <CornerStatus status="nft"/>
          </div>
          <div className="nft__card">
            <div className="highlight"/>

            <div className="nft__card__top">
              <div className="nft__card__image">
                <Image
                    src={fullUriSm}
                    alt="nft-preview"
                    layout="fill"
                    objectFit="contain"
                />
              </div>
              <div className="nft__card__text">
                <span className="nft__card__name">{name}</span>
                <span className="nft__card__creator">{category}</span>
              </div>
            </div>

            <div className="nft__card__comment">
              <div className="nft__card__comment__item">
                <div
                    className="coin-fade"
                    style={{color: stringToColor(contractAddress)}}
                >
                  <CoinFade/>
                </div>
                <span>Comment...</span>
                <CollectionLock/>
              </div>

              <div className="nft__card__sticks">
                <Sticks
                    totalSticks={6}
                    filledSticks={filledSticks}
                    stickWidth={3}
                    stickHeight={12}
                    gap={3}
                />
                <span>
                {hoursRemaining}
                  <span>h</span>
              </span>
              </div>
            </div>

            <div className="nft__card__meta">
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
            {/* <CtaBtn collectionId={contractId} /> */}
          </div>
        </div>
        <SidebarBtn/>
        <Footer
            sqSize={14}
            uri={`h3llcat:///collection/${contractId}/${postId}`}
        />
      </div>
    </div>
  );
}
