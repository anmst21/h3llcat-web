"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { base, baseSepolia } from "viem/chains";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_KEY as string}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID as string}
      config={{
        defaultChain: baseSepolia,
        supportedChains: [base, baseSepolia],

        appearance: {
          loginMessage: "Connect you wallet to Display",
          landingHeader: "Display",
          walletList: ["coinbase_wallet"],
          walletChainType: "ethereum-only",
          theme: "dark",
          accentColor: "#FFCC00",
          logo: "/logo_new.png",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
