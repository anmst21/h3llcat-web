"use client";

import { nftProps } from "@/helpers/nftProps";
import Image from "next/image";
import { usePrivy, useWallets, useFundWallet } from "@privy-io/react-auth";
import { baseSepolia } from "viem/chains";
import { useEffect, useState, useCallback } from "react";
import { getClient, Execute, createClient } from "@reservoir0x/reservoir-sdk";
import FooterInput from "../subscribe-input/footer-input";
import { useUserBalance } from "@/hooks/useUserBalance";
import { options } from "@/helpers/reservoirClientOptions";
import { parseUnits } from "viem";
import { useWalletClient } from "@/hooks/useWalletClient";
import { useToken } from "@/hooks/useToken";
import { apiUriSubmitMint } from "@/helpers/apiUri";
import { useBuyNFT } from "@/hooks/useBuyNft";

createClient(options);

function SectionBeta({ mintsNum }: any) {
  //   const [logMessage, setLogMessage] = useState<Execute["steps"] | null>(null);

  //   const [mintingStatus, setMintingStatus] = useState("");

  const { login, authenticated, user, getAccessToken, ready } = usePrivy();

  const disableLogin = !ready || (ready && authenticated);

  const { wallets } = useWallets();

  const userWallet = wallets[wallets.length - 1];

  const userWalletChain =
    Number(userWallet?.chainId.split("eip155:")[1]) || null;

  const { fundWallet } = useFundWallet();

  const { userBalance, getUserBalance } = useUserBalance(userWallet, ready);

  const minBalance = parseUnits("0.0002", 18);

  const isEnoughFunds = userBalance && userBalance > minBalance;

  const { getWalletClient } = useWalletClient(userWallet, ready, authenticated);

  const { userData, setUserData, error, fetchToken } = useToken();

  useEffect(() => {
    if (userWallet && ready) {
      getUserBalance();
    }
  }, [userWallet, ready]);

  useEffect(() => {
    if (!authenticated) {
      setData(null);
    }
  }, [authenticated]);

  const setData = useCallback(
    (data: any) => {
      setUserData(data);
    },
    [setUserData]
  );
  const {
    buyNFT,
    mintingStatus,
    logMessage: mintLogMessage,
  } = useBuyNFT({
    userWallet,
    isEnoughFunds,
    getWalletClient,
    getAccessToken,
    setUserData: setData,
  });

  return (
    <div className="section-beta">
      <form className="section-beta__wrapper">
        <div className="section-beta__img">
          {userData && userData.isMinted && !userData.email ? (
            <div className="section-beta__email">!!!</div>
          ) : (
            <Image
              width={611}
              height={611}
              alt={nftProps.name}
              src={nftProps.artUri}
            />
          )}
        </div>

        <div className="section-beta__action">
          <h2>{nftProps.name}</h2>
          <h3>{nftProps.creator}</h3>
          <p>{nftProps.description}</p>
          <div className="section-beta__minted">
            <span className="section-beta__minted__label">Minted</span>
            <span className="section-beta__minted__number">
              {mintsNum.totalMinted}
              <span>/10,000</span>
            </span>
          </div>

          {(!ready || !authenticated) && (
            <button onClick={login} disabled={disableLogin}>
              {!ready ? "Loading" : "Connect Wallet"}
            </button>
          )}
          {(ready &&
            authenticated &&
            userWalletChain === 84532 &&
            isEnoughFunds) ||
            (userData && userData?.isMinted && !userData.email && (
              <button onClick={buyNFT}>Mint</button>
            ))}
          {userData &&
            userData?.isMinted &&
            !userData.email &&
            authenticated && (
              <button type="submit" onClick={buyNFT}>
                Submit
              </button>
            )}
          {!isEnoughFunds && ready && authenticated && userWallet && (
            <button onClick={async () => await fundWallet(userWallet.address)}>
              Add funds
            </button>
          )}
          {userWalletChain && userWalletChain !== 84532 && (
            <button onClick={() => userWallet.switchChain(baseSepolia.id)}>
              Switch Chain
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SectionBeta;
