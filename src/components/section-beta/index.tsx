"use client";

import { nftProps } from "@/helpers/nftProps";
import Image from "next/image";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { baseSepolia } from "viem/chains";
import { useEffect, useCallback, useState } from "react";
import { createClient } from "@reservoir0x/reservoir-sdk";
import FooterInput from "../subscribe-input/footer-input";
import { useUserBalance } from "@/hooks/useUserBalance";
import { options } from "@/helpers/reservoirClientOptions";
import { parseUnits } from "viem";
import { useWalletClient } from "@/hooks/useWalletClient";
import { useToken } from "@/hooks/useToken";
import { useBuyNFT } from "@/hooks/useBuyNft";
import { useBetaSubmit } from "@/hooks/useBetaSubmit";
//
createClient(options);

function SectionBeta({ mintsNum }: any) {
  const { login, authenticated, getAccessToken, ready } = usePrivy();

  const [timesMinted, setTimesMinted] = useState(mintsNum.totalMinted);

  const disableLogin = !ready || (ready && authenticated);

  const { wallets } = useWallets();

  const userWallet = wallets[wallets.length - 1];

  const userWalletChain =
    Number(userWallet?.chainId.split("eip155:")[1]) || null;

  const { userBalance, getUserBalance } = useUserBalance(userWallet, ready);

  const minBalance = parseUnits("0.0002", 18);

  const isEnoughFunds = userBalance && userBalance > minBalance;

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
    // showSuccessMessage,
    // isCaptchaError,
  } = useBetaSubmit({ setUserData });

  useEffect(() => {
    if (userWallet && ready) {
      getUserBalance();
    }
  }, [userWallet, ready, getUserBalance]);

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
    // mintingStatus,
    // logMessage: mintLogMessage,
  } = useBuyNFT({
    userWallet,
    getWalletClient,
    getAccessToken,
    setUserData: setData,
    setTimesMinted,
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
          {(!ready || !authenticated) && (
            <button onClick={login} disabled={disableLogin}>
              {!ready ? "Loading" : "Connect Wallet"}
            </button>
          )}
          {(!isLoadingData &&
            ready &&
            authenticated &&
            userWalletChain === 84532 &&
            isEnoughFunds) ||
            (userData && userData?.isMinted && !userData.email && (
              <button onClick={buyNFT}>Mint</button>
            ))}

          {!isLoadingData &&
            userData &&
            userData?.isMinted &&
            !userData.email &&
            authenticated && <button type="submit">Submit</button>}

          {!isLoadingData &&
            !isEnoughFunds &&
            ready &&
            authenticated &&
            userWalletChain === 84532 &&
            userWallet && <button disabled>Insuficient funds</button>}

          {!isLoadingData &&
            authenticated &&
            ready &&
            userData?.isMinted &&
            userData.email &&
            isEnoughFunds && <button onClick={buyNFT}>Mint More</button>}

          {!isLoadingData && userWalletChain && userWalletChain !== 84532 && (
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
