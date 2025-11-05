import { Metadata } from "next";
import SectionBeta from "@/components/section-beta";
// import { notFound } from "next/navigation";
// import { apiUri } from "@/helpers/apiUri";
// import { ThirdwebProvider } from "thirdweb/react";
import { baseSepolia } from "viem/chains";
import { Address, createPublicClient, http } from "viem";
import { readContract } from "viem/actions";
import { openEdition721Abi as ABI } from "@/helpers/openEdition721Abi";
import { ClaimCondition } from "@/types/ClaimCondition";

export const metadata: Metadata = {
  /* ---------- core SEO ---------- */
  title: "Join Beta",
  description:
    "Join the Display Beta and help us redefine on-chain minting. Mint the Display Beta NFT on Base for a chance to be one of 150 exclusive testers. Secure your spot, provide feedback, and experience the new Swipe-to-Mint feature before anyone else.",

  /* ---------- Open Graph ---------- */
  openGraph: {
    title: "Join Display's Private Beta — 150 Spots Only",
    description:
      "Mint the Display Beta Pass on Base, claim your TestFlight, and be first to swipe-to-mint NFTs with an embedded wallet.",
    // url: "/beta",          // optional: canonical path for the page
    images: [
      {
        url: "/opengraph/beta-og.jpg", // resolves to https://display.app/join-beta-og.jpg
        width: 1200,
        height: 630,
        alt: "Display Beta invitation card",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  /* ---------- Twitter card ---------- */
  twitter: {
    card: "summary_large_image",
    title: "Join Display's Private Beta — 150 Spots Only",
    description:
      "Secure your TestFlight invite and help shape the future of on-chain minting.",
    images: ["/opengraph/beta-og.jpg"],
  },
};

const contract = process.env.NEXT_PUBLIC_CONTRACT_BASE_SEPOLIA;

export default async function Beta() {
  // const response = await fetch(apiUri, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   cache: "no-cache",
  // });
  // if (!response.ok) {
  //   notFound();
  // }

  // const data:
  //   | {
  //       totalMinted: number;
  //     }
  //   | undefined = await response.json();

  const publicClientInstance = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  const activeId = await readContract(publicClientInstance, {
    address: contract as Address,
    abi: ABI,
    functionName: "getActiveClaimConditionId",
    // no chain: publicClientInstance already knows it
  });

  // Make sure it's a bigint (Viem often returns bigint)
  console.log("Active Claim Condition ID:", activeId);

  const claimCondition: ClaimCondition = await readContract(
    publicClientInstance,
    {
      address: contract as Address,
      abi: ABI,
      functionName: "getClaimConditionById",
      args: [activeId],
    }
  );

  console.log({ mintsData: claimCondition });
  return <SectionBeta claimCondition={claimCondition} />;
}
