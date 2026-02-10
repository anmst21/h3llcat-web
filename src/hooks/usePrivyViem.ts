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

  useEffect(() => {
    const setup = async () => {
      if (!ready) return;
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
  }, [wallets, ready]);

  return { walletClient, publicClient, address };
}
