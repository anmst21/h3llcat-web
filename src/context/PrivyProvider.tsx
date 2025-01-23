"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { base, baseSepolia } from "viem/chains";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_KEY as string}
      config={{
        defaultChain: base,
        supportedChains: [base, baseSepolia],

        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          //    logo: "https://your-logo-url",
        },
        // Create embedded wallets for users who don't have a wallet
        // embeddedWallets: {
        //   createOnLogin: "users-without-wallets",
        // },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
