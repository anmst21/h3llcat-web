import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/index.scss";
import PrivyProvider from "@/context/PrivyProvider";
import { createClient, reservoirChains } from "@reservoir0x/reservoir-sdk";
import CookieConsentBanner from "@/components/cookie-consent";
import Footer from "@/components/footer";
import { CapchaProvider } from "@/context/CapchaProvider";
import { MenuProvider } from "@/context/MenuProvider";
import { BalanceProvider } from "@/context/BalanceProvider";

const sfPro = localFont({
  src: [
    {
      path: "./fonts/SFPro-CompressedLight.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/SFPro-ExpandedLight.ttf",
      weight: "270",
      style: "normal",
    },
    {
      path: "./fonts/SFPro-CompressedLight.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/SFPro.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SFPro-ExpandedMedium.ttf",
      weight: "540",
      style: "normal",
    },
    {
      path: "./fonts/SFPro-CompressedMedium.ttf",
      weight: "550",
      style: "normal",
    },
    {
      path: "./fonts/SFPro-Semibold.ttf",
      weight: "590",
      style: "normal",
    },
    {
      path: "./fonts/SFPro-Medium.ttf",
      weight: "510",
      style: "normal",
    },
    {
      path: "./fonts/SFPro-SemiboldItalic.ttf",
      weight: "590",
      style: "italic",
    },
    {
      path: "./fonts/SFPro-ExpandedSemibold.ttf",
      weight: "650",
      style: "normal",
    },
    {
      path: "./fonts/SFPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/SFPro-ExpandedBold.ttf",
      weight: "760",
      style: "normal",
    },
    {
      path: "./fonts/SFPro-ExpandedBlack.ttf",
      weight: "1000",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
});

export const metadata: Metadata = {
  title: {
    default: "Display - Reimagine How You Mint On-Chain",
    template: "%s | Display",
  },
  description:
    "Experience seamless wallet integration powered by Coinbase, instant NFT minting via Privy-embedded wallets, and a swipe-to-mint UI designed for single-hand navigation. Enjoy perfectly optimized visuals and curated feeds from Rodeo protocol—giving you the ultimate on-chain art discovery experience.",
  metadataBase: new URL("https://display.app/"),
  referrer: "origin-when-cross-origin",
  generator: "Next.js",

  authors: [
    { name: "Anthony Nazarov", url: "https://www.n3xus.nyc/" },
    { name: "Vladimir Kokorev", url: "https://www.n3xus.nyc/" },
  ],
};

createClient({
  chains: [
    {
      ...reservoirChains.base,
      active: true,
    },
    {
      ...reservoirChains.baseSepolia,
      active: true,
    },
  ],
  source: "h3llcat.app",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sfPro.variable}`}>
        <CapchaProvider>
          <PrivyProvider>
            <BalanceProvider>
              <MenuProvider>
                <div className="main">
                  {children}
                  <Footer />
                </div>
              </MenuProvider>
              <CookieConsentBanner />
            </BalanceProvider>
          </PrivyProvider>
        </CapchaProvider>
      </body>
    </html>
  );
}
