import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePrivy } from "@privy-io/react-auth";
import { AnimatePresence, motion } from "motion/react";
import { useFundWallet } from "@privy-io/react-auth";
import { baseSepolia } from "viem/chains";
import ContactInput from "../contacts-form/contact-input";
import { useBetaSubmit } from "@/hooks/useBetaSubmit";
import { UserData } from "@/hooks/types";
import {
  ContactsMail,
  MenuArrow,
  BetaCoin,
  MenuBase,
  MenuWallet,
} from "../icon";
import NumberInput from "./number-input";
import animationBeta from "../icon/animationBeta.json";
import Lottie from "lottie-react";
import { arrowVariants, textVariants } from "./dynamic-action-button-variants";
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
  setUserData: Dispatch<SetStateAction<UserData>>;
  numToMint: number;
  setNumToMint: (value: number) => void;
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
  setUserData,
  numToMint,
  setNumToMint,
}) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    isLoadingSubmit,
    formState: { errors },
    // showSuccessMessage,
    // isCaptchaError,
  } = useBetaSubmit({ setUserData });

  const [renderedComponent, setRenderedComponent] = useState(false);

  useEffect(() => {
    setRenderedComponent(true);
  }, []);

  const { authenticated, login, ready, user } = usePrivy();
  // let buttonText = "Loading...";
  // let onClickAction: (() => void) | undefined = undefined;
  // let disabled = true;
  // let variation:
  //   | "loading"
  //   | "connect"
  //   | "switch"
  //   | "funds"
  //   | "mint"
  //   | "more"
  //   | "submit" = "loading";

  const { fundWallet } = useFundWallet();

  const [buttonText, setButtonText] = useState("Loading");
  const [disabled, setDisabled] = useState(true);
  const [variation, setVariation] = useState<
    "loading" | "connect" | "switch" | "funds" | "mint" | "more" | "submit"
  >("loading");

  // const [onClickAction, setOnClickAction] = useState<(() => void) | undefined>(
  //   undefined
  // );

  console.log("button", variation, buttonText, disabled);
  console.log({
    isLoadingContext,
    isLoadingUserData,
    isMinting,
    authenticated,
    isCorrectChain,
    isMintSubmitted,
    isLoadingSubmit,
    isEmailSubmitted,
    isEnoughFunds,
    ready,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        ready &&
        authenticated &&
        isCorrectChain &&
        !isMinting &&
        !isMintSubmitted &&
        !isEmailSubmitted &&
        !isLoadingUserData &&
        !isLoadingSubmit &&
        isEnoughFunds
      ) {
        setButtonText("Mint");
        setDisabled(false);
        setVariation("mint");
      } else if (ready && (!authenticated || isLoadingContext)) {
        setButtonText("Connect Wallet");
        setDisabled(false);
        setVariation("connect");
      } else if (
        !isCorrectChain &&
        ready &&
        authenticated &&
        !isLoadingContext
      ) {
        setButtonText("Switch Chain");
        setDisabled(false);
        setVariation("switch");
      } else if (!isEnoughFunds) {
        setButtonText("Insufficient Balance");
        setDisabled(false);
        setVariation("funds");
      } else if (isMinting) {
        setButtonText("Minting");
        setDisabled(true);
        setVariation("loading");
      } else if (isEmailSubmitted && isMintSubmitted) {
        setButtonText("Mint More");
        setDisabled(false);
        setVariation("more");
      } else if (isMintSubmitted && !isEmailSubmitted && !isLoadingSubmit) {
        setButtonText("Submit");
        setDisabled(false);
        setVariation("submit");
      } else {
        setButtonText(isLoadingSubmit ? "Submitting" : "Loading");
        setDisabled(true);
        setVariation("loading");
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [
    isLoadingSubmit,
    isLoadingUserData,
    isLoadingContext,
    authenticated,
    isCorrectChain,
    isEnoughFunds,
    isMinting,
    isEmailSubmitted,
    isMintSubmitted,
  ]);
  const btnAnimate = {
    width: variation === "submit" ? 180 : "100%",
    backgroundColor:
      variation === "mint" || variation === "more" || variation === "submit"
        ? "#FFCC00"
        : variation === "connect" ||
            variation === "funds" ||
            variation === "switch"
          ? "#FFF8E7"
          : "rgba(5, 9, 21, 0.20)",
    color: variation === "loading" ? "#FFF8E7" : "#050915",
  };

  const onClickAction = useMemo(() => {
    if (variation === "connect") {
      return login;
    } else if (variation === "switch") {
      return switchChainAction;
    } else if (variation === "mint" || variation === "more") {
      return buyNFTAction;
    } else if (variation === "funds") {
      return () => {
        if (user?.wallet?.address) {
          fundWallet(user.wallet.address, {
            chain: baseSepolia,
            defaultFundingMethod: "manual",
            amount: "0.0002",
          });
        }
      };
    } else {
      return undefined;
    }
  }, [
    variation,
    login,
    switchChainAction,
    fundWallet,
    user?.wallet?.address,
    buyNFTAction,
  ]);

  const formItemProps = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "100%", opacity: 1 },
    exit: { width: 0, opacity: 0 },
    transition: { duration: 0.3 },
    style: { overflow: "hidden", display: "flex" },
  } as const;

  const staticIconProps = {
    style: { display: "flex" },
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  } as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mint-submit__contaienr">
      <AnimatePresence mode="wait">
        {variation === "submit" && (
          <motion.div key="contact-input" {...formItemProps}>
            <ContactInput
              register={register("email")}
              icon={<ContactsMail />}
              placeholder="example@display.app"
              isError={!!errors.email}
              type="email"
              beta
            />
          </motion.div>
        )}
        {variation === "more" && (
          <motion.div
            className="numbers-btn--fix"
            key="add-mints"
            {...formItemProps}
          >
            <NumberInput value={numToMint} setValue={setNumToMint} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className="mint-submit"
        variants={{
          initial: {
            width: "100%",
            color: "#FFF8E7",
            backgroundColor: "rgba(5, 9, 21, 0.20)",
          },
        }}
        initial="initial"
        whileHover={variation !== "loading" ? "hover" : undefined}
        whileTap={variation !== "loading" ? "active" : undefined}
        //    className={btnClass}
        type={variation === "submit" ? "submit" : "reset"}
        onClick={onClickAction}
        disabled={disabled}
        animate={btnAnimate}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            animate={{
              opacity: 1,
              x:
                renderedComponent &&
                (variation === "loading" ||
                  variation === "funds" ||
                  variation === "switch" ||
                  variation === "connect")
                  ? 0
                  : 10,
            }}
            id={buttonText}
            variants={textVariants}
            key={buttonText}
          >
            {buttonText}
          </motion.span>
        </AnimatePresence>

        {/* Animated arrow */}
        <AnimatePresence mode="wait">
          {variation === "loading" ? (
            <motion.div key="loading-animation" {...staticIconProps}>
              <Lottie
                style={{ display: "flex", width: 32, height: 12 }}
                animationData={animationBeta}
                loop
                autoPlay
              />
            </motion.div>
          ) : variation === "funds" ? (
            <motion.div key="funds-animation" {...staticIconProps}>
              <BetaCoin />
            </motion.div>
          ) : variation === "connect" ? (
            <motion.div key="connect-animation" {...staticIconProps}>
              <MenuWallet />
            </motion.div>
          ) : variation === "switch" ? (
            <motion.div key="switch-animation" {...staticIconProps}>
              <MenuBase />
            </motion.div>
          ) : (
            <motion.div
              key="arrow-icon"
              style={{ display: "flex" }}
              variants={arrowVariants}
            >
              <MenuArrow />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
};

export default DynamicActionButton;
