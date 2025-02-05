"use client";

import { useCallback } from "react";
import { createWalletClient, custom } from "viem";
import { baseSepolia } from "viem/chains";
import type { Hex } from "viem";

export function useWalletClient(
  userWallet: any,
  ready: boolean,
  authenticated: boolean
) {
  const getWalletClient = useCallback(async () => {
    if (!userWallet) return undefined;

    // Retrieve the Ethereum provider from the wallet
    const provider = await userWallet.getEthereumProvider();

    // Only create the wallet client if the app is ready and the user is authenticated
    if (!ready || !authenticated) return undefined;

    // Create and return the wallet client for the specified chain
    return createWalletClient({
      account: userWallet.address as Hex,
      chain: baseSepolia,
      transport: custom(provider),
    });
  }, [userWallet, ready, authenticated]);

  return { getWalletClient };
}
