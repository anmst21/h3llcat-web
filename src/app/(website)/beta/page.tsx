import { Metadata } from "next";
import SectionBeta from "@/components/section-beta";
import { apiUri } from "@/helpers/apiUri";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Join Beta - Mint Your Spot",
  description:
    "Join the Display Beta and help us redefine on-chain minting. Mint the Display Beta NFT on Base for a chance to be one of 150 exclusive testers. Secure your spot, provide feedback, and experience the new Swipe-to-Mint feature before anyone else.",
};

export default async function Beta() {
  const response = await fetch(apiUri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  if (!response.ok) {
    notFound();
  }

  const data = (await response.json()) as string;

  return (
    <div className="home">
      <SectionBeta mintsNum={data} />
    </div>
  );
}
