import React from "react";
import { BetaMeta, BetaUri, MenuBase } from "../icon";
import Link from "next/link";
import { truncateEthAddress } from "@/helpers/truncateAddress";

type Props = {
  contract: string;
  creator: string;
  standard: string;
};

const PassMeta = ({ contract, creator, standard }: Props) => {
  return (
    <div className="pass-description">
      <div className="wallet-item">
        <div className="wallet-item__icon">
          <BetaMeta />
        </div>
        <div className="wallet-item__user">
          <span className="wallet-item__title">Contract's Meta</span>
          <Link
            href={`https://basescan.org/address/${contract}`}
            target="_blank"
            className="wallet-item__address"
          >
            <span>{truncateEthAddress(contract)}</span>
            <BetaUri />
          </Link>
        </div>
      </div>
      <div className="wallet-item__bottom">
        <div className="wallet-item__meta">
          <span className="wallet-item__meta__title">Chain</span>
          <span className="wallet-item__meta__value">
            Base <MenuBase />
          </span>
        </div>
        <div className="wallet-item__meta">
          <span className="wallet-item__meta__title">Creator</span>
          <span className="wallet-item__meta__value">{creator}</span>
        </div>
        <div className="wallet-item__meta">
          <span className="wallet-item__meta__title">Standard</span>
          <span className="wallet-item__meta__value">{standard}</span>
        </div>
        <div className="wallet-item__meta">
          <span className="wallet-item__meta__title">Media</span>
          <span className="wallet-item__meta__value">JPEG</span>
        </div>
      </div>
    </div>
  );
};

export default PassMeta;
