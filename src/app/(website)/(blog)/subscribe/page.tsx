import { Metadata } from "next";
import SubscribeInput from "@/components/subscribe-input";

export const metadata: Metadata = {
  title: "Join Beta - Mint Your Spot",
  description:
    "Join the Display Beta and help us redefine on-chain minting. Mint the Display Beta NFT on Base for a chance to be one of 150 exclusive testers. Secure your spot, provide feedback, and experience the new Swipe-to-Mint feature before anyone else.",
};

export default function SubscribePage() {
  return (
    <div className="subscribe-page">
      <div className="subscribe-page__container">
        <div className="subscribe-page__header">
          <span>GET EMAIL UPDATES</span>
          <h2>Subscribe to Display's Newsletter</h2>
        </div>
      </div>
      <SubscribeInput />
    </div>
  );
}
