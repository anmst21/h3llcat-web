// src/lib/viem.ts
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { base } from "viem/chains";

export function getActiveChain() {
  return base;
}

export function getRpcUrl() {
  return process.env.NEXT_PUBLIC_BASE_MAINNET_RPC!;
}

export function getContractAddress() {
  return process.env.NEXT_PUBLIC_CONTRACT_BASE as `0x${string}`;
}

export const publicClient = createPublicClient({
  chain: getActiveChain(),
  transport: http(getRpcUrl()),
});

export async function getWalletClient() {
  if (typeof window === "undefined" || !(window as any).ethereum)
    throw new Error("No injected wallet found.");

  const walletClient = createWalletClient({
    chain: getActiveChain(),
    transport: custom((window as any).ethereum),
  });

  try {
    await walletClient.requestAddresses();
  } catch {}
  try {
    await walletClient.switchChain({ id: getActiveChain().id });
  } catch {}

  return walletClient;
}
