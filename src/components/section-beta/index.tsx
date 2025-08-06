"use client";

import { nftProps } from "@/helpers/nftProps";
import Image from "next/image";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { baseSepolia } from "viem/chains";
import { useEffect, useCallback, useState, useMemo } from "react";
import { createClient } from "@reservoir0x/reservoir-sdk";
import { options } from "@/helpers/reservoirClientOptions";
import { useWalletClient } from "@/hooks/useWalletClient";
import { useToken } from "@/hooks/useToken";
import { useBuyNFT } from "@/hooks/useBuyNft";
import DynamicActionButton from "./dynamic-action-button";
import { MenuBeta, BetaDescription } from "../icon";
import PassDetails from "./pass-details";
import PassMeta from "./pass-meta";
import { AnimatePresence, motion } from "motion/react";
import { betaPageHeader } from "@/helpers/beta-page-assets";
import VideoPlayer from "./video-player";
// import anime from "animejs";

createClient(options);

function SectionBeta({
  mintsNum,
}: {
  mintsNum: { totalMinted: number } | undefined;
}) {
  const { authenticated, getAccessToken, ready } = usePrivy();

  const [numToMint, setNumToMint] = useState(1);

  const [isFundsError, setIsFundsError] = useState(false);

  const [timesMinted, setTimesMinted] = useState(mintsNum?.totalMinted || 0);

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

  console.log({ userData });

  const setData = useCallback(
    (data: any) => {
      setUserData(data);
    },
    [setUserData]
  );

  useEffect(() => {
    if (!authenticated) {
      setData(null);
    }
  }, [authenticated, setData]);
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
    numToMint,
  });

  const currectStep = useMemo(() => {
    const getStep = () => {
      if (!userData) {
        return "1";
      } else if (userData.did && !userData.email && !userData.isMinted) {
        return "2";
      } else if (userData.did && !userData.email && userData.isMinted) {
        return "3";
      } else if (userData.did && userData.email && userData.isMinted) {
        return "4";
      } else {
        return "1";
      }
    };
    return getStep();
  }, [userData]);

  // const animationRef = useRef<HTMLDivElement>(null);

  return (
    <div className="section-beta">
      <div className="section-beta__top">
        <div className="wallet-item">
          <div className="wallet-item__user">
            <span className="wallet-item__title">Secure Your Spot</span>
            <span className="wallet-item__address">
              Join our Beta program today
            </span>
          </div>
        </div>

        <Image
          width={2160}
          height={340}
          alt="Nft Header"
          src={betaPageHeader}
        />
      </div>
      <div className="section-beta__bot">
        <div className="section-beta__left">
          <VideoPlayer uri={nftProps.artUri} name={nftProps.name} />
          <PassDetails timesMinted={timesMinted} />
        </div>
        <div className="section-beta__right">
          <div className="pass-description">
            <div className="wallet-item">
              <div className="wallet-item__icon">
                <BetaDescription />
              </div>
              <div className="wallet-item__user">
                <span className="wallet-item__title">{nftProps.name}</span>
                <span className="wallet-item__address">About:</span>
              </div>
            </div>
            <div className="pass-description__text">
              <p>{nftProps.description}</p>
            </div>
          </div>
          <PassMeta
            contract={nftProps.contract}
            creator={nftProps.creator}
            standard={nftProps.standard}
          />
          <div className="pass-description">
            <div className="wallet-item">
              <div className="wallet-item__icon">
                <MenuBeta />
              </div>
              <div className="wallet-item__user">
                <span className="wallet-item__title">Secure your spot</span>
                <span
                  style={{ overflow: "hidden" }}
                  className="wallet-item__address"
                >
                  Step:
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={currectStep} // key change triggers re-animation
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ color: "#FFF8E7", width: 12, textAlign: "end" }}
                    >
                      {currectStep}
                    </motion.span>
                  </AnimatePresence>
                  <span>/4</span>
                </span>
              </div>
            </div>
            <DynamicActionButton
              numToMint={numToMint}
              setNumToMint={setNumToMint}
              setUserData={setData}
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
        </div>
      </div>
    </div>
  );
}

export default SectionBeta;
