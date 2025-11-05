import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/index.scss";
import PrivyProvider from "@/context/PrivyProvider";
import CookieConsentBanner from "@/components/cookie-consent";
import Footer from "@/components/footer";
import { CapchaProvider } from "@/context/CapchaProvider";
import { MenuProvider } from "@/context/MenuProvider";
import { BalanceProvider } from "@/context/BalanceProvider";
import { EthPriceProvider } from "@/context/EthPriceProvider";
import DesktopHeader from "@/components/desktop-header";

const sfPro = localFont({
  src: [
    { path: "./fonts/SFProText-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/SFProText-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/SFProText-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/SFProText-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-sf-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Display - Reimagine How You Mint On-Chain",
    template: "%s | Display",
  },
  description:
    "Experience seamless wallet integration powered by Coinbase, instant NFT minting via Privy-embedded wallets, and a swipe-to-mint UI designed for single-hand navigation. Enjoy perfectly optimized visuals and curated feeds from Rodeo protocol—giving you the ultimate on-chain art discovery experience.",
  metadataBase: new URL("https://h3llcat.app"),
  referrer: "origin-when-cross-origin",
  generator: "Next.js",

  authors: [
    { name: "Anthony Nazarov", url: "https://www.n3xus.nyc/" },
    { name: "Vladimir Kokorev", url: "https://www.n3xus.nyc/" },
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Display",
    images: [
      {
        url: "/opengraph/main-og.jpg",
        width: 1200,
        height: 630,
        alt: "Display - Reimagine How You Mint On-Chain",
      },
    ],
  },
  twitter: {
    images: ["/opengraph/main-og.jpg"],
    card: "summary_large_image",
    site: "@0xN3XUS",
    creator: "@Anthony_N2000",
  },

  keywords: [
    "NFT",
    "minting",
    "web3",
    "crypto art",
    "Display app",
    "swipe to mint",
    "Coinbase wallet",
    "Mobile Wallet Protocol",
    "embedded wallet",
    "Privy",
    "Base chain",
    "TestFlight beta",
    "on-chain art discovery",
    "Rodeo protocol",
    "single-hand navigation",
    "React Native",
  ],
};

// DB URI FIX

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
            <EthPriceProvider>
              <BalanceProvider>
                <MenuProvider>
                  <div className="main">
                    <DesktopHeader />
                    {children}
                    <Footer />
                  </div>
                </MenuProvider>
                <CookieConsentBanner />
              </BalanceProvider>
            </EthPriceProvider>
          </PrivyProvider>
        </CapchaProvider>
      </body>
    </html>
  );
}
