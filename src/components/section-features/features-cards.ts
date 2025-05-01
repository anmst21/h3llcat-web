import artStandsOut from "@/components/icon/features-carousel/art-stands-out.json";
import basePrivyDisplay from "@/components/icon/features-carousel/base-privy-display.json";
import instantMinting from "@/components/icon/features-carousel/instant-minting.json";
import rodeoLogo from "@/components/icon/features-carousel/rodeo-logo.json";
import singleHandNavigation from "@/components/icon/features-carousel/single-hand-navigation.json";
import swipeToMint from "@/components/icon/features-carousel/swipe-to-mint.json";

export const featuresCards = [
  {
    header: "Swipe-to-Mint Innovation",
    paragraph:
      "Minting reimagined: Swipe through NFT collections natively in-app and make your matches with ease.",
    animation: swipeToMint,
  },
  {
    header: "Art that Stands Out",
    paragraph:
      "Enjoy perfectly optimized visuals for on-chain art, ensuring every piece looks stunning.",
    animation: artStandsOut,
  },
  {
    header: "Powered By Rodeo",
    paragraph:
      "Discover collections powered by the Rodeo protocol, delivering an endless array of unique art tailored to your preferences.",
    animation: rodeoLogo,
  },
  {
    header: "Instantaneous Minting",
    paragraph:
      "Utilize our embedded Privy wallet to mint NFTs in a single step—fast, reliable, and entirely built for modern collectors.",
    animation: instantMinting,
  },
  {
    header: "Single-Hand Navigation",
    paragraph:
      "Designed with mobile users in mind, every interaction is optimized for effortless, one-handed use.",
    animation: singleHandNavigation,
  },
  {
    header: "Seamless Wallet Integration",
    paragraph:
      "Powered by Coinbase's mobile wallet protocol, enjoy secure and hassle-free wallet interactions, making connecting to the blockchain as smooth as ever.",
    animation: basePrivyDisplay,
  },
];
