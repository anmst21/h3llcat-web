import { Metadata } from "next";
import PageHeader from "@/components/page-header";
import SectionBeta from "@/components/section-beta";
import { apiUri } from "@/helpers/apiUri";

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
  });

  const data = (await response.json()) as string;
  return (
    <div className="home">
      <PageHeader
        isDark
        btnContent="Go to BETA"
        href="/beta"
        subHeader="Mint your Beta Pass NFT to unlock early access, exclusive features, and the future of on-chain minting"
        text={["Mint", "Display's", "Beta Pass"]}
      />
      <SectionBeta mintsNum={data} />
    </div>
  );
}
