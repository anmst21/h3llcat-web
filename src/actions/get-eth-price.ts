// actions/get-eth-price.ts
"use server";

import { cache } from "react";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

// memoized fetch helper (React cache) + Next.js revalidate
const fetchEthPriceCached = cache(async (): Promise<number> => {
  const res = await fetch(COINGECKO_URL, {
    next: { revalidate: 3600 }, // cache for 1h, stale-while-revalidate semantics
  });
  if (!res.ok) {
    throw new Error(`Coingecko fetch failed: ${res.status}`);
  }
  const body = await res.json();
  const usd = body?.ethereum?.usd;
  if (typeof usd !== "number") {
    throw new Error("Unexpected shape from Coingecko");
  }
  return usd;
});

export async function getEthPrice(): Promise<number> {
  return fetchEthPriceCached();
}
