"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { base, baseSepolia } from "viem/chains";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_KEY as string}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID as string}
      config={{
        defaultChain: base,
        supportedChains: [base, baseSepolia],

        appearance: {
          landingHeader: "Connect you wallet to Display",

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
