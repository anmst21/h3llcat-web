import { Metadata } from "next";
import SectionBeta from "@/components/section-beta";
import { Address } from "viem";
import { readContract } from "viem/actions";
import { dropErc721Abi as ABI } from "@/helpers/dropErc1155Abi";
import { ClaimCondition, SerializedClaimCondition } from "@/types/ClaimCondition";
import { publicClient, getContractAddress } from "@/helpers/mintHelpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

const contract = getContractAddress();

export default async function Beta() {
  let serialized: SerializedClaimCondition | null = null;

  try {
    const activeId = await readContract(publicClient, {
      address: contract as Address,
      abi: ABI,
      functionName: "getActiveClaimConditionId",
    });

    console.log("Active Claim Condition ID:", activeId);

    const claimCondition: ClaimCondition = await readContract(publicClient, {
      address: contract as Address,
      abi: ABI,
      functionName: "getClaimConditionById",
      args: [activeId],
    });

    console.log({ mintsData: claimCondition });

    // Convert BigInt → string so data can cross the RSC → client boundary
    serialized = {
      startTimestamp: claimCondition.startTimestamp.toString(),
      maxClaimableSupply: claimCondition.maxClaimableSupply.toString(),
      supplyClaimed: claimCondition.supplyClaimed.toString(),
      quantityLimitPerWallet: claimCondition.quantityLimitPerWallet.toString(),
      merkleRoot: claimCondition.merkleRoot,
      pricePerToken: claimCondition.pricePerToken.toString(),
      currency: claimCondition.currency,
      metadata: claimCondition.metadata,
    };
  } catch (error) {
    console.error("Failed to fetch claim condition:", error);
  }

  return <SectionBeta claimCondition={serialized} />;
}
