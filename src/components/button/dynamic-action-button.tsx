import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { AnimatePresence, motion } from "motion/react";
import { useFundWallet } from "@privy-io/react-auth";
import { baseSepolia } from "viem/chains";

interface Props {
  isLoadingContext: boolean;
  isLoadingUserData: boolean;
  isMinting: boolean;
  isCorrectChain: boolean;
  isMintSubmitted: boolean;
  isEmailSubmitted: string | null;
  isEnoughFunds: boolean;
  buyNFTAction: () => void;
  switchChainAction: () => void;
  isLoadingSubmit: boolean;
}

const DynamicActionButton: React.FC<Props> = ({
  isLoadingContext,
  isLoadingUserData,
  isMinting,
  isCorrectChain,
  isMintSubmitted,
  isEmailSubmitted,
  isEnoughFunds,
  buyNFTAction,
  switchChainAction,
  isLoadingSubmit,
}) => {
  const { authenticated, login, ready, user } = usePrivy();
  let buttonText = "Loading...";
  let onClickAction: (() => void) | undefined = undefined;
  let disabled = true;

  const { fundWallet } = useFundWallet();
  console.log("dynamic", isLoadingContext, isLoadingUserData);
  // 1. When the context, user data, or balance is still loading:
  if (isLoadingSubmit || !ready || isLoadingUserData) {
    buttonText = isLoadingSubmit ? "Submitting..." : "Loading...";
    disabled = true;
  } else if (isLoadingContext || !authenticated) {
    buttonText = "ConnectWallet";
    onClickAction = login;
    disabled = false;
  }
  // 2. When the wallet is connected but on the wrong chain:
  else if (!isCorrectChain) {
    buttonText = "Switch Chain";
    onClickAction = switchChainAction;
    disabled = false;
  }
  // 3. When the balance is loaded but insufficient:
  else if (!isEnoughFunds) {
    buttonText = "Insufficient Balance";
    disabled = false;
    onClickAction = () => {
      if (user?.wallet?.address) {
        fundWallet(user?.wallet?.address, {
          chain: baseSepolia,
          amount: "0.0002", // Since no `asset` is set, defaults to 'native-currency' (ETH)
        });
      }
    };
  } else if (isMinting) {
    buttonText = "Minting...";
    disabled = true;
  } else if (isEmailSubmitted) {
    buttonText = "Mint More";
    onClickAction = buyNFTAction;
    disabled = false;
  }
  // 4. When the NFT has not yet been minted (and no email is submitted):
  else if (
    !isMintSubmitted &&
    !isMinting &&
    !isEmailSubmitted &&
    !isLoadingUserData
  ) {
    buttonText = "Mint";
    onClickAction = buyNFTAction;
    disabled = false;
  }
  // 5. When the minting process is in progress:

  // 6. When the NFT is minted but email has not been submitted:
  else if (isMintSubmitted && !isEmailSubmitted) {
    // The email submission is handled by the form. This button is just indicative.
    buttonText = "Submit Email";
    disabled = false;
    onClickAction = () => {};
  }
  // 7. When the email has been submitted, allow minting more NFTs:

  const variants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
  };

  return (
    <button type="submit" onClick={onClickAction} disabled={disabled}>
      <AnimatePresence mode="wait">
        <motion.span
          key={buttonText} // Changing key triggers the animation
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {buttonText}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default DynamicActionButton;
