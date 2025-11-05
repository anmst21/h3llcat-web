// src/lib/mint-open-edition.ts
"use client";

import { Address, Hex } from "viem";
import {
  getWalletClient,
  publicClient,
  getContractAddress,
} from "./mintHelpers";
import { openEdition721Abi } from "./openEdition721Abi";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

export async function claimOpenEdition({
  quantity = BigInt(1),
  receiver, // optional override; defaults to connected wallet
  allowlistProof, // optional: { proof: Hex[], quantityLimitPerWallet: bigint, pricePerToken: bigint, currency: Address }
  data = "0x", // optional bytes
}: {
  quantity?: bigint;
  receiver?: Address;
  allowlistProof?: {
    proof: Hex[];
    quantityLimitPerWallet: bigint;
    pricePerToken: bigint;
    currency: Address;
  };
  data?: Hex;
}) {
  const walletClient = await getWalletClient();
  const [account] = await walletClient.getAddresses();
  const to = (receiver ?? account) as Address;
  const address = getContractAddress();

  // 1) Read active claim condition (gets currency & price expected on-chain)
  const conditionId = (await publicClient.readContract({
    address,
    abi: openEdition721Abi,
    functionName: "getActiveClaimConditionId",
  })) as bigint;

  const condition = (await publicClient.readContract({
    address,
    abi: openEdition721Abi,
    functionName: "getClaimConditionById",
    args: [conditionId],
  })) as {
    startTimestamp: bigint;
    maxClaimableSupply: bigint;
    supplyClaimed: bigint;
    quantityLimitPerWallet: bigint;
    merkleRoot: Hex;
    pricePerToken: bigint;
    currency: Address;
    metadata: string;
  };

  // 2) Build args
  const expectedCurrency = allowlistProof?.currency ?? condition.currency;
  const expectedPricePerToken =
    allowlistProof?.pricePerToken ?? condition.pricePerToken;

  const argAllowlist = allowlistProof ?? {
    proof: [] as Hex[],
    quantityLimitPerWallet: BigInt(0),
    pricePerToken: BigInt(0),
    currency: ZERO_ADDRESS as Address,
  };

  // 3) msg.value if native
  const needsValue =
    expectedCurrency.toLowerCase() === ZERO_ADDRESS.toLowerCase();
  const totalValue = needsValue ? expectedPricePerToken * quantity : undefined;

  // 4) Write claim()
  const hash = await walletClient.writeContract({
    address,
    abi: openEdition721Abi,
    functionName: "claim",
    args: [
      to,
      quantity,
      expectedCurrency,
      expectedPricePerToken,
      argAllowlist,
      data,
    ],
    value: totalValue,
    account,
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  if (receipt.status !== "success") throw new Error("Claim failed");
  return { hash, receipt, condition };
}
