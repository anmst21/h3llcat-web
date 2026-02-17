import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Display — Swipe to Mint NFTs on Base",
    template: "%s | Display",
  },
  description:
    "Display is a mobile app for discovering and minting NFT art on Base. Swipe through curated collections, mint instantly, and build your on-chain gallery.",
  metadataBase: new URL("https://displaymint.app"),
  referrer: "origin-when-cross-origin",
  generator: "Next.js",

  authors: [
    { name: "Anthony Nazarov", url: "https://www.n3xus.nyc/" },
    { name: "Vladimir Kokorev", url: "https://www.n3xus.nyc/" },
  ],

  alternates: {
    canonical: "https://displaymint.app",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://displaymint.app",
    siteName: "Display",
    title: "Display — Swipe to Mint NFTs on Base",
    description:
      "Display is a mobile app for discovering and minting NFT art on Base. Swipe through curated collections, mint instantly, and build your on-chain gallery.",
    images: [
      {
        url: "/opengraph/main-og.jpg",
        width: 1200,
        height: 630,
        alt: "Display — Swipe to Mint NFTs on Base",
      },
    ],
  },
  twitter: {
    images: ["/opengraph/main-og.jpg"],
    card: "summary_large_image",
    site: "@0xN3XUS",
    creator: "@Anthony_N2000",
    title: "Display — Swipe to Mint NFTs on Base",
    description:
      "Display is a mobile app for discovering and minting NFT art on Base. Swipe through curated collections, mint instantly, and build your on-chain gallery.",
  },

  keywords: [
    "NFT minting app",
    "mint NFTs on Base",
    "NFT art discovery",
    "swipe to mint",
    "Base chain NFTs",
    "on-chain art",
    "NFT gallery",
    "crypto art app",
    "digital art minting",
    "NFT collections",
  ],
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Display",
    url: "https://displaymint.app",
    logo: "https://displaymint.app/icon.png",
    sameAs: ["https://x.com/nexus_nyc"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Display",
    url: "https://displaymint.app",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sfPro.variable}`}>
        {jsonLd.map((ld, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
          />
        ))}
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
