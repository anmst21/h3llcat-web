"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { base } from "viem/chains";
import { getActiveChain } from "@/helpers/mintHelpers";
import { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isSecure, setIsSecure] = useState(true);

  useEffect(() => {
    const { protocol, hostname } = window.location;
    if (protocol !== "https:" && hostname !== "localhost" && hostname !== "127.0.0.1") {
      setIsSecure(false);
    }
  }, []);

  if (!isSecure) {
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_KEY as string}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID as string}
      config={{
        defaultChain: getActiveChain(),
        supportedChains: [base],

        appearance: {
          loginMessage: "Connect your wallet to Display",
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
