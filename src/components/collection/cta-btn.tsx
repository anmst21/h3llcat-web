import Link from "next/link";
import { ChevBtn } from "../icon";

const CtaBtn = ({ collectionId }: { collectionId: string }) => {
  return (
    <Link
      href={`h3llcat:///collection/${collectionId}`}
      className="nft__card__cta"
    >
      Mint with<span> DISPLAY</span>
      <ChevBtn />
    </Link>
  );
};

export default CtaBtn;
