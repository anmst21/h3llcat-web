"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { getClient, TransferData } from "@reservoir0x/reservoir-sdk";
import { nftProps } from "@/helpers/nftProps";
import { apiUriSubmitMint } from "@/helpers/apiUri";

export type UseBuyNFTProps = {
  userWallet: any;
  getWalletClient: () => Promise<any>;
  getAccessToken: () => Promise<string | null>;
  setUserData: (data: any) => void;
  setTimesMinted: (data: any) => void;
  isFundsError: boolean;
  setIsFundsError: (value: boolean) => void;

  numToMint: number;
};

export function useBuyNFT({
  userWallet,
  getWalletClient,
  getAccessToken,
  setUserData,
  setTimesMinted,
  isFundsError,
  setIsFundsError,
  numToMint,
}: UseBuyNFTProps) {
  const [isMinting, setIsMinting] = useState(false);
  const logMessageRef = useRef<TransferData[] | undefined>(undefined);
  console.log("isFundsError", isFundsError);

  const resetFundsError = useCallback(() => {
    setIsFundsError(false);
  }, [setIsFundsError]);

  useEffect(() => {
    if (isFundsError) {
      const timer = setTimeout(resetFundsError, 5000);
      return () => clearTimeout(timer);
    }
  }, [isFundsError, resetFundsError]);

  const buyNFT = useCallback(async () => {
    try {
      setIsMinting(true);

      const walletClient = await getWalletClient();

      const balance = await getClient()?.actions.mintToken({
        items: [
          {
            token: nftProps.contract + ":" + "1",
            quantity: numToMint,
          },
        ],
        options: {
          relayer: userWallet.address,
          taker: userWallet.address,
          skipBalanceCheck: false,
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

      console.log("balance!!!!!", balance);

      if (logMessageRef.current && logMessageRef.current[0]) {
        setIsMinting(false);
        const accessToken = await getAccessToken();
        const response = await fetch(apiUriSubmitMint, {
          method: "POST",
          body: JSON.stringify({
            transactions: [
              {
                data: { ...logMessageRef.current[0] },
              },
            ],
            totalMints: numToMint,
          }),
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        const data: {
          did: string;
          email: string | null;
          totalMints: number;
          yourMintsCount: number;
        } = await response.json();
        logMessageRef.current = undefined;
        setUserData({
          did: data.did,
          email: data.email,
          isMinted: data.yourMintsCount > 0,
        });
        setTimesMinted(data.totalMints);
      }
    } catch (error: any) {
      console.error("Error buying token:", error);
      logMessageRef.current = undefined;
      setIsMinting(false);

      if (error.message.includes("Balance too low")) {
        setIsFundsError(true);
      }
    }
  }, [
    userWallet,
    getWalletClient,
    getAccessToken,
    setUserData,
    setTimesMinted,
    setIsFundsError,
    numToMint,
    //  getClient()?.actions.mintToken,
  ]);

  return { buyNFT, isMinting, logMessage: logMessageRef.current };
}
