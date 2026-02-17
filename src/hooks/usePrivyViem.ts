// usePrivyViem.ts
"use client";

import { useEffect, useState } from "react";
import { useWallets } from "@privy-io/react-auth";
import { createWalletClient, createPublicClient, custom, http } from "viem";
import type { Address } from "viem";
import { getActiveChain, getRpcUrl } from "@/helpers/mintHelpers";

const activeChain = getActiveChain();
const rpcUrl = getRpcUrl();

export function usePrivyViem() {
  const { wallets, ready } = useWallets();
  const [walletClient, setWalletClient] = useState<any>(null);
  const [publicClient, setPublicClient] = useState<any>(null);
  const [address, setAddress] = useState<Address | null>(null);

  // Derive a stable dependency from the wallets array to avoid infinite loops.
  // The wallets array gets a new reference on every render, so using it directly
  // as a dependency causes the effect to re-run endlessly.
  const coinbaseWalletAddress = wallets.find(
    (w) => w.walletClientType === "coinbase_wallet"
  )?.address;

  useEffect(() => {
    const setup = async () => {
      if (!ready || !coinbaseWalletAddress) return;
      const userWallet = wallets.find(
        (w) => w.walletClientType === "coinbase_wallet"
      );
      if (!userWallet) return;

      const provider = await userWallet.getEthereumProvider();
      const addr = userWallet.address as Address;
      setAddress(addr);

      try {
        await provider.request?.({ method: "eth_requestAccounts", params: [] });
      } catch {}

      const walletClientInstance = createWalletClient({
        account: addr,
        chain: activeChain,
        transport: custom(provider),
      });

      const publicClientInstance = createPublicClient({
        chain: activeChain,
        transport: http(rpcUrl),
      });

      setWalletClient(walletClientInstance);
      setPublicClient(publicClientInstance);
    };

    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinbaseWalletAddress, ready]);

  return { walletClient, publicClient, address };
}
