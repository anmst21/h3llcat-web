import type { Address, Hex } from "viem";

import {
  getChainId,
  switchChain,
  writeContract,
  waitForTransactionReceipt,
  readContract,
} from "viem/actions";
import { dropErc1155Abi as ABI } from "../helpers/dropErc1155Abi";
import { getActiveChain } from "../helpers/mintHelpers";

const TOKEN_ID = 0n;

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
  walletClient: any;
  publicClient: any;
  contractAddress: Address;
  receiver: Address;
  quantity: bigint;
  proof?: Hex[];
  data?: Hex;
}) {
  const activeChain = getActiveChain();

  // 1) Ensure wallet is on the active chain
  const currentChainId = await getChainId(walletClient).catch(() => undefined);
  if (currentChainId !== activeChain.id) {
    await switchChain(walletClient, { id: activeChain.id });
  }

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
    args: [TOKEN_ID],
  });

  console.log("Active Claim Condition ID:", activeId);

  const cond = await readContract(publicClient, {
    address: contractAddress,
    abi: ABI,
    functionName: "getClaimConditionById",
    args: [TOKEN_ID, activeId],
  });

  console.log("Active Claim Condition:", cond);

  const allowlistProof: AllowlistTuple = [
    proof,
    cond.quantityLimitPerWallet,
    cond.pricePerToken,
    cond.currency,
  ];

  const value = cond.pricePerToken * quantity;

  // Send tx (locally signed via Privy-provided wallet client)
  const hash = await writeContract(walletClient, {
    gas: BigInt(300000),
    address: contractAddress,
    abi: ABI as any,
    functionName: "claim",
    args: [
      receiver,
      TOKEN_ID,
      quantity,
      cond.currency,
      cond.pricePerToken,
      allowlistProof,
      data,
    ],
    value,
    chain: activeChain,
    account: (await walletClient.getAddresses())[0],
  });

  const receipt = await waitForTransactionReceipt(publicClient, { hash });

  console.log({ receipt });
  return receipt;
}
