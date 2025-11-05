// usePrivyViem.ts
"use client";

import { useEffect, useState } from "react";
import { useWallets } from "@privy-io/react-auth";
import { createWalletClient, createPublicClient, custom, http } from "viem";
import { baseSepolia } from "viem/chains";
import type { Address } from "viem";

export function usePrivyViem() {
  const { wallets, ready } = useWallets();
  const [walletClient, setWalletClient] = useState<any>(null);
  const [publicClient, setPublicClient] = useState<any>(null);
  const [address, setAddress] = useState<Address | null>(null);

  useEffect(() => {
    const setup = async () => {
      if (!ready) return;
      const userWallet = wallets.find(
        (w) => w.walletClientType === "coinbase_wallet"
      );
      if (!userWallet) return;

      const provider = await userWallet.getEthereumProvider();
      const addr = userWallet.address as Address; // Privy gives it to you
      setAddress(addr);

      // (optional) make sure the provider has permission
      try {
        await provider.request?.({ method: "eth_requestAccounts", params: [] });
      } catch {}

      const walletClientInstance = createWalletClient({
        account: addr, // <<— important
        chain: baseSepolia,
        transport: custom(provider),
      });

      const publicClientInstance = createPublicClient({
        chain: baseSepolia,
        transport: http(),
      });

      setWalletClient(walletClientInstance);
      setPublicClient(publicClientInstance);
    };

    setup();
  }, [wallets, ready]);

  return { walletClient, publicClient, address };
}
