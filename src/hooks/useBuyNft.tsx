"use client";

import { useState, useCallback } from "react";
import { getClient, Execute } from "@reservoir0x/reservoir-sdk";
import { nftProps } from "@/helpers/nftProps";
import { apiUriSubmitMint } from "@/helpers/apiUri";

export type UseBuyNFTProps = {
  userWallet: any;
  isEnoughFunds: bigint | boolean | null;
  getWalletClient: () => Promise<any>;
  getAccessToken: () => Promise<string | null>;
  setUserData: (data: any) => void;
};

export function useBuyNFT({
  userWallet,
  isEnoughFunds,
  getWalletClient,
  getAccessToken,
  setUserData,
}: UseBuyNFTProps) {
  const [mintingStatus, setMintingStatus] = useState<string>("");
  const [logMessage, setLogMessage] = useState<Execute["steps"] | null>(null);

  const buyNFT = useCallback(async () => {
    if (!isEnoughFunds) {
      setMintingStatus("funds");
      return;
    }

    if (!userWallet?.address) {
      setMintingStatus("input");
      setLogMessage(null);
      return;
    }

    try {
      setMintingStatus("minting");

      // Get the wallet client for signing transactions.
      const walletClient = await getWalletClient();

      // Mint the NFT using Reservoir SDK
      const buy = await getClient()?.actions.mintToken({
        items: [
          {
            token: nftProps.contract + ":" + "1",
            quantity: 1,
          },
        ],
        options: {
          relayer: userWallet.address,
          taker: userWallet.address,
          skipBalanceCheck: true,
        },
        chainId: 84532,
        wallet: walletClient,
        onProgress: (steps: Execute["steps"]) => {
          setLogMessage(steps);
        },
      });
      console.log("buy", buy);
      setMintingStatus("minted");

      // Fetch the access token and submit the mint transaction details to your backend

      const accessToken = await getAccessToken();

      const response = await fetch(apiUriSubmitMint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setUserData(data);
      setLogMessage(null);
    } catch (error: any) {
      console.error("Error buying token:", error);
      setMintingStatus("error");
      setLogMessage(null);
    }
  }, [isEnoughFunds, userWallet, getWalletClient, getAccessToken, setUserData]);

  return { buyNFT, mintingStatus, logMessage };
}
