import Image from "next/image";
import pyramidImg from "@/app/collection-img-pyramid.png";
import leafImg from "@/app/collection-img-leaf.png";
import crystallImg from "@/app/collection-img-crystall.png";

export default async function Nft({
  params,
}: {
  params: Promise<{ nft: string; address: string }>;
}) {
  const nft = (await params).nft;
  const address = (await params).address;

  return (
    <div className="nft">
      <div className="nft__corner">
        <div className="nft__corner__state">
          <span>NFT</span>
        </div>
      </div>
      <div className="nft__container">
        <Image
          className="pyramid-img"
          src={pyramidImg}
          width={192.12}
          height={192.12}
          alt="pyramid"
        />
        <Image
          className="leaf-img"
          src={leafImg}
          width={191.66}
          height={191.66}
          alt="leaf"
        />
        <Image
          className="crystall-img"
          src={crystallImg}
          width={262.62}
          height={262.62}
          alt="crystall"
        />
        <div className="nft__card">
          <span className="nft__card__name">Citizen Sleeper</span>
        </div>
      </div>
    </div>
  );
}
//   Hello!{nft} {address}
