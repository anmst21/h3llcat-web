"use client";

import { useState, useCallback, useRef } from "react";
import { getClient, TransferData } from "@reservoir0x/reservoir-sdk";
import { nftProps } from "@/helpers/nftProps";
import { apiUriSubmitMint } from "@/helpers/apiUri";

export type UseBuyNFTProps = {
  userWallet: any;
  getWalletClient: () => Promise<any>;
  getAccessToken: () => Promise<string | null>;
  setUserData: (data: any) => void;
  setTimesMinted: (data: any) => void;
};

export function useBuyNFT({
  userWallet,
  getWalletClient,
  getAccessToken,
  setUserData,
  setTimesMinted,
}: UseBuyNFTProps) {
  const [isMinting, setIsMinting] = useState(false);
  const logMessageRef = useRef<TransferData[] | undefined>(undefined);

  const buyNFT = useCallback(async () => {
    try {
      setIsMinting(true);

      const walletClient = await getWalletClient();

      await getClient()?.actions.mintToken({
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
        onProgress: (steps) => {
          if (!steps || !Array.isArray(steps) || steps.length < 2) {
            console.warn("Steps is not in the expected format.");
            return;
          }

          const secondStep = steps[1];
          if (!secondStep.items || secondStep.items.length === 0) {
            console.warn("No items in the second step.");
            return;
          }

          const { transfersData } = secondStep.items[0];
          logMessageRef.current = transfersData; // update the ref immediately
        },
      });

      console.log("msg", logMessageRef.current);

      if (logMessageRef.current && logMessageRef.current[0]) {
        setIsMinting(false);
        const accessToken = await getAccessToken();
        const response = await fetch(apiUriSubmitMint, {
          method: "POST",
          body: JSON.stringify({
            data: logMessageRef.current[0],
          }),
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        logMessageRef.current = undefined;
        setUserData(data);
        setTimesMinted(data.totalMinted);
      }
    } catch (error: any) {
      console.error("Error buying token:", error);
      logMessageRef.current = undefined;
      setIsMinting(false);
    }
  }, [
    userWallet,
    getWalletClient,
    getAccessToken,
    setUserData,
    setTimesMinted,
  ]);

  return { buyNFT, isMinting, logMessage: logMessageRef.current };
}
