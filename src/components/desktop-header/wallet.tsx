"use client";
import { dynamicButtonProps } from "../button/animation";
import { AnimatePresence, motion } from "motion/react";
import { MenuWallet, ChevDown } from "../icon";
import { truncateEthAddress } from "@/helpers/truncateAddress";
import { useBalanceContext } from "@/context/BalanceProvider";
import { useMenu } from "@/context/MenuProvider";
import { useCallback } from "react";
import { usePrivy } from "@privy-io/react-auth";
import classNames from "classnames";

const Wallet = () => {
  const { isLoadingBalance, formattedUserBalance } = useBalanceContext();
  const { setIsOpenMenu } = useMenu();
  const { user } = usePrivy();

  const openMenuCallback = useCallback(() => setIsOpenMenu(true), []);
  return (
    <AnimatePresence mode="wait">
      {!isLoadingBalance && user?.wallet?.address && (
        <motion.button
          onClick={openMenuCallback}
          key={"wallet"}
          {...dynamicButtonProps}
          className="section-beta__header__wallet"
        >
          <span>{formattedUserBalance} ETH</span>
          <div className="divider" />
          <span className="white">
            {truncateEthAddress(user?.wallet?.address)}
          </span>
          <div className="wallet-chev">
            <ChevDown />
          </div>
          <div
            className={classNames("section-beta__header__wallet__item", {
              "wallet-item--active": true,
            })}
          >
            <MenuWallet />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default Wallet;
