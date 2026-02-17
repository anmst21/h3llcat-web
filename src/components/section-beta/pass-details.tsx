import React from "react";
import { BetaBarCode, BetaRagdoll, BetaTarget } from "../icon";
import { useEthPrice } from "@/context/EthPriceProvider";
import { AnimatePresence, motion } from "motion/react";
import { dynamicButtonProps } from "../button/animation";

type Props = {
  timesMinted: number;
  mintGoal: number;
  price: number;
};

const PassDetails = ({ timesMinted, price, mintGoal = 10000 }: Props) => {
  const {
    ethPrice,
    loading: isLoadingPrice,
    error: isErrorPrice,
  } = useEthPrice();
  // const isErrorPrice = true;

  return (
    <div className="pass-details">
      <div className="pass-details__top">
        <div className="wallet-item__user">
          <span className="wallet-item__title">Details</span>
          <span className="wallet-item__address">Beta Pass</span>
        </div>
        <BetaBarCode />
      </div>
      <div className="pass-details__bottom">
        <div className="pass-details__section">
          <span>Price</span>
          <h4>{price} ETH</h4>
          <AnimatePresence mode="wait">
            {isLoadingPrice || isErrorPrice ? (
              <motion.div
                key="loading-balance"
                style={{
                  zIndex: 1000,
                  display: "flex",
                  width: "60%",
                  height: "20px",
                  borderRadius: "2px",
                }}
                initial={{
                  backgroundColor: "rgba(255, 248, 231, 0.1)",
                }}
                animate={{
                  backgroundColor: [
                    "rgba(255, 248, 231, 0.1)",
                    "rgba(255, 248, 231, 0.2)",
                  ],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ) : (
              <motion.span className="price" {...dynamicButtonProps}>
                (${(price * Number(ethPrice)).toFixed(2)})
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="pass-details__section">
          <span>Category</span>
          <h4>Access Pass</h4>
          <div className="pass-details__section__icons">
            <BetaRagdoll />
            <BetaRagdoll />
            <BetaRagdoll />
            <BetaRagdoll />
          </div>
        </div>
        <div className="pass-details__section">
          <span>Minted</span>
          <h4>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={timesMinted} // key change triggers re-animation
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {timesMinted > mintGoal ? mintGoal : timesMinted}
              </motion.span>
            </AnimatePresence>
            /{mintGoal}
          </h4>
          <div className="pass-details__section__icons pass-details__section__icons--target">
            <BetaTarget />
            <BetaTarget />
            <BetaTarget />
            <BetaTarget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassDetails;
