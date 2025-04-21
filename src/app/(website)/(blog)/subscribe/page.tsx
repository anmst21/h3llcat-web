import { Metadata } from "next";
import SubscribeInput from "@/components/subscribe-input";

export const metadata: Metadata = {
  title: "Subscribe To Newsletter",
  description:
    "Get the inside scoop before anyone else—join Display’s newsletter for early beta invites, feature drops, and curated on-chain art updates delivered straight to your inbox.",
};

export default function SubscribePage() {
  return (
    <div className="subscribe-page">
      <div className="subscribe-page__container">
        <div className="subscribe-page__header">
          <span>Get email updates</span>
          <h2>
            Reimagine <br />
            How You Mint
            <br />
            On Chain
            <br />
          </h2>
        </div>
        <SubscribeInput />
      </div>
    </div>
  );
}
