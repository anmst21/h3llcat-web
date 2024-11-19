import Image from "next/image";
import pyramidImg from "@/app/collection-img-pyramid.png";
import leafImg from "@/app/collection-img-leaf.png";
import crystallImg from "@/app/collection-img-crystall.png";

const BgImages = () => {
  return (
    <>
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
    </>
  );
};

export default BgImages;
//
