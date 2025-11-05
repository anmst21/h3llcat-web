"use server";

import { prisma } from "@/lib/prisma";
// import { TransactionReceipt } from "viem";

export async function recordMint({
  did,
  receipt,
}: {
  did: string;
  receipt: {
    blockHash: `0x${string}`;
    blockNumber: number;
    cumulativeGasUsed: number;
    effectiveGasPrice: number;
    gasUsed: number;
    from: `0x${string}`;
    transactionHash: `0x${string}`;
  };
}) {
  const user = await prisma.userData.findUnique({
    where: { did },
  });

  if (!user) {
    throw new Error(`User with DID ${did} not found`);
  }

  const updatedUser = await prisma.userData.update({
    where: { did },
    data: { isMinted: true },
  });

  const raw = JSON.parse(
    JSON.stringify(receipt, (_, v) =>
      typeof v === "bigint" ? v.toString() : v
    )
  );
  await prisma.mintReceiptJson.create({
    data: {
      userId: updatedUser.id,
      txHash: receipt.transactionHash,
      raw,
    },
  });

  return updatedUser;
}
