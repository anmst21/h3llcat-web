import CornerGrid from "./corner-grid";
import { collections } from "@/collections";
import Image from "next/image";
import {
  CollectionChain,
  CollectionContract,
  CollectionStandard,
} from "../icon";
import { truncateEthAddress } from "@/helpers/truncateAddress";

export default function SectionCollections() {
  const collectionList = collections
    .flat()
    .filter((data) => data.userName !== "@wblut");
  return (
    <div className="section-collections">
      <div className="section-collections__header">
        <span>Explore all</span>
        <h1>Collections</h1>
        <CornerGrid />
      </div>
      <div className="section-collections__list">
        {collectionList.map((item, index) => {
          const { contract, chain, standard } = item;
          return (
            <div className="item-card" key={index}>
              <Image
                width={348}
                height={310}
                alt={item.artName}
                src={item.artUri as string}
                style={{
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
              <div className="item-card__bottom">
                <div className="item-card__profile">
                  <Image
                    width={50}
                    height={50}
                    alt={item.name}
                    src={item.userProfileUri}
                    style={{
                      objectFit: "cover",
                      borderRadius: 1000,
                    }}
                  />
                  <div className="item-card__meta">
                    <h3>{item.artName}</h3>
                    <span>{item.userName}</span>
                  </div>
                </div>
                <div className="item-card__props">
                  <div className="item-card__props__item">
                    <CollectionContract />
                    <span>Contract</span>
                    <span>{truncateEthAddress(contract).toLowerCase()}</span>
                  </div>
                  <div className="item-card__props__item item-card__props__item--nofill">
                    <CollectionChain />
                    <span>Chain</span>
                    <span>{chain}</span>
                  </div>
                  <div className="item-card__props__item">
                    <CollectionStandard />
                    <span>Standard</span>
                    <span>{standard}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
