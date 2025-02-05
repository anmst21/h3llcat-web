"use client";

import { useState, useCallback, useEffect } from "react";
import { createPublicClient, custom, formatUnits } from "viem";
import { baseSepolia } from "viem/chains";
import type { Hex } from "viem";

// Optionally, you can type your wallet (here it's typed as any)
export function useUserBalance(userWallet: any, ready: boolean) {
  const [userBalance, setUserBalance] = useState<bigint | null>(null);

  const getUserBalance = useCallback(async () => {
    if (!userWallet) return;

    try {
      // Get the provider from the wallet instance
      const provider = await userWallet.getEthereumProvider();

      // Create a public client using viem for the desired chain
      const publicClient = createPublicClient({
        chain: baseSepolia,
        transport: custom(provider),
      });

      // Retrieve the balance for the wallet's address
      const balance = await publicClient.getBalance({
        address: userWallet.address as Hex,
      });

      // Update the state with the retrieved balance
      setUserBalance(balance);

      // Log the balance formatted to Ether units for debugging
      console.log("User balance:", formatUnits(balance, 18));
    } catch (error) {
      console.error("Error fetching user balance:", error);
    }
  }, [userWallet]);

  // Run getUserBalance when the wallet is available and ready
  useEffect(() => {
    if (userWallet && ready) {
      getUserBalance();
    }
  }, [userWallet, ready, getUserBalance]);

  return { userBalance, getUserBalance };
}
