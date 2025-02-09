"use client";

import { nftProps } from "@/helpers/nftProps";
import Image from "next/image";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { baseSepolia } from "viem/chains";
import { useEffect, useCallback, useState } from "react";
import { createClient } from "@reservoir0x/reservoir-sdk";
import FooterInput from "../subscribe-input/footer-input";
import { options } from "@/helpers/reservoirClientOptions";
import { useWalletClient } from "@/hooks/useWalletClient";
import { useToken } from "@/hooks/useToken";
import { useBuyNFT } from "@/hooks/useBuyNft";
import { useBetaSubmit } from "@/hooks/useBetaSubmit";
import DynamicActionButton from "../button/dynamic-action-button";

createClient(options);

function SectionBeta({ mintsNum }: any) {
  const { authenticated, getAccessToken, ready } = usePrivy();

  const [isFundsError, setIsFundsError] = useState(false);

  const [timesMinted, setTimesMinted] = useState(mintsNum.totalMinted);

  const disableLogin = !ready || (ready && authenticated);

  const { wallets } = useWallets();

  const userWallet = wallets.find(
    (wallet) => wallet.walletClientType === "coinbase_wallet"
  );
  const userWalletChain =
    Number(userWallet?.chainId.split("eip155:")[1]) || null;

  const { getWalletClient } = useWalletClient(userWallet, ready, authenticated);

  const {
    userData,
    setUserData,
    isLoadingData,
    // error, fetchToken
  } = useToken();

  const {
    register,
    handleSubmit,
    onSubmit,
    isLoadingSubmit,
    // showSuccessMessage,
    // isCaptchaError,
  } = useBetaSubmit({ setUserData });

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
    isMinting,
    // mintingStatus,
    // logMessage: mintLogMessage,
  } = useBuyNFT({
    userWallet,
    getWalletClient,
    getAccessToken,
    setUserData: setData,
    setTimesMinted,
    isFundsError,
    setIsFundsError,
  });

  return (
    <div className="section-beta">
      <form onSubmit={handleSubmit(onSubmit)} className="section-beta__wrapper">
        <div className="section-beta__img">
          {userData && userData.isMinted && !userData.email ? (
            <div className="section-beta__email">
              <FooterInput
                type="email"
                register={register("email")}
                placeholder="E-Mail"
              />
            </div>
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
              {timesMinted}
              <span>/10,000</span>
            </span>
          </div>

          <DynamicActionButton
            isLoadingSubmit={isLoadingSubmit}
            isLoadingContext={!disableLogin}
            isLoadingUserData={isLoadingData}
            isMinting={isMinting}
            isCorrectChain={userWalletChain === 84532}
            isMintSubmitted={userData?.isMinted}
            isEmailSubmitted={userData?.email}
            isEnoughFunds={!isFundsError}
            buyNFTAction={buyNFT}
            switchChainAction={async () => {
              if (userWallet) {
                await userWallet.switchChain(baseSepolia.id);
              }
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default SectionBeta;
