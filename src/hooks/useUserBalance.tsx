"use client";

import { useState, useCallback, useEffect } from "react";
import { createPublicClient, custom, formatUnits } from "viem";
import { base } from "viem/chains";
import type { Hex } from "viem";
import { usePrivy } from "@privy-io/react-auth";

// Optionally, you can type your wallet (here it's typed as any)
export function useUserBalance(userWallet: any) {
  const [userBalance, setUserBalance] = useState<bigint>(BigInt(0));
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const { ready, authenticated } = usePrivy();
  const getUserBalance = useCallback(async () => {
    if (!userWallet) return;
    setIsLoadingBalance(true);
    try {
      // Get the provider from the wallet instance
      const provider = await userWallet.getEthereumProvider();

      // Create a public client using viem for the desired chain
      const publicClient = createPublicClient({
        chain: base,
        transport: custom(provider),
      });

      // Retrieve the balance for the wallet's address
      const balance = await publicClient.getBalance({
        address: userWallet.address as Hex,
      });

      // Update the state with the retrieved balance
      setUserBalance(balance);
      setIsLoadingBalance(false);

      // Log the balance formatted to Ether units for debugging
      console.log("User balance:", formatUnits(balance, 18));
    } catch (error) {
      console.error("Error fetching user balance:", error);
      setIsLoadingBalance(false);
    }
  }, [userWallet]);

  // Run getUserBalance when the wallet is available and ready
  useEffect(() => {
    if (ready && authenticated && userWallet) {
      getUserBalance();
    }
  }, [ready, getUserBalance, authenticated, userWallet]);

  return { userBalance, getUserBalance, isLoadingBalance };
}
