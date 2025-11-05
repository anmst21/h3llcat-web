// "use server"; // (or omit if you're calling this client-side)

import type { Address, Hex } from "viem";

import { baseSepolia } from "viem/chains";
import {
  getChainId,
  switchChain,
  writeContract,
  waitForTransactionReceipt,
  readContract,
} from "viem/actions";
import { openEdition721Abi as ABI } from "../helpers/openEdition721Abi";

type AllowlistTuple = [
  Hex[], // proof
  bigint, // quantityLimitPerWallet
  bigint, // pricePerToken
  Address, // currency
];

export async function claimWithPrivy({
  walletClient,
  publicClient,
  contractAddress,
  receiver,
  quantity,
  proof = [],
  data = "0x",

}: {
  walletClient: any; // viem WalletClient from your Privy provider
  publicClient: any; // viem PublicClient
  contractAddress: Address;
  receiver: Address;
  quantity: bigint; // e.g. 1n
  proof?: Hex[];
  data?: Hex;
 
}) {
  // 1) Ensure wallet is on Base Sepolia (84532)
  const currentChainId = await getChainId(walletClient).catch(() => undefined);
  if (currentChainId !== baseSepolia.id) {
    // This will trigger a wallet network switch UI if needed
    await switchChain(walletClient, { id: baseSepolia.id });
  }

  // 2) Build the allowlist tuple (must be an array in exact order)

  // 3) Native ETH payment must include value = price * quantity

  const uri = await readContract(publicClient, {
    address: contractAddress,
    abi: ABI,
    functionName: "contractURI",
  });
  console.log({ uri });

  const activeId = await readContract(publicClient, {
    address: contractAddress,
    abi: ABI,
    functionName: "getActiveClaimConditionId",
    // no chain: publicClient already knows it
  });

  // Make sure it's a bigint (Viem often returns bigint)
  console.log("Active Claim Condition ID:", activeId);

  const cond = await readContract(publicClient, {
    address: contractAddress,
    abi: ABI,
    functionName: "getClaimConditionById",
    args: [activeId],
  });

  console.log("Active Claim Condition:", cond);

  const allowlistProof: AllowlistTuple = [
    proof,
    cond.quantityLimitPerWallet, // quantityLimitPerWallet (unused)
    cond.pricePerToken, // price per token
    cond.currency, // currency = native ETH
  ];

  const value = cond.pricePerToken * quantity;

 
  // 4) Send tx (locally signed via Privy-provided wallet client)
  const hash = await writeContract(walletClient, {
    gas: BigInt(300000),
    address: contractAddress,
    abi: ABI as any,
    functionName: "claim",
    args: [
      receiver,
      quantity,
      cond.currency, // _currency (native)
      cond.pricePerToken, // _pricePerToken
      allowlistProof, // tuple as array
      data, // bytes
    ],
    value,
    chain: baseSepolia,
    // account: receiver,
    // (optional) explicitly set the signer account if needed:
    account: (await walletClient.getAddresses())[0],
  });

  // 5) Wait for mining and return the receipt
  const receipt = await waitForTransactionReceipt(publicClient, { hash });

  console.log({ receipt });
  return receipt;
}
