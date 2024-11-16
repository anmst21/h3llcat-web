import BtnRounded from "./btn-rounded";
import { NexusUri } from "../icon";
import { BtnRoundedType } from "./types";

export default function SectionFuture() {
  return (
    <div className="section-future">
      <div className="section-future__text">
        <span className="section-future__text__h1">
          Empowering the Future of Decentralized Applications on Ethereum
        </span>
        <span className="section-future__text__p">
          Driving real-world blockchain innovation through seamless and secure
          user experiences.
        </span>
      </div>
      <div className="section-future__boxes">
        <div className="section-future__boxes__btns">
          <BtnRounded
            top
            href="/"
            content="Partner With Us"
            type={BtnRoundedType.active}
          />
          <BtnRounded
            top
            href="/"
            content="Explore"
            type={BtnRoundedType.accent}
          />
        </div>
      </div>
    </div>
  );
}
