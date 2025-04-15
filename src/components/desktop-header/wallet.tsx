"use client";
import { dynamicButtonProps } from "../button/animation";
import { AnimatePresence, motion } from "motion/react";
import { MenuWallet, ChevDown, MenuBase, MenuFunds, MenuLogout } from "../icon";
import { truncateEthAddress } from "@/helpers/truncateAddress";
import { useBalanceContext } from "@/context/BalanceProvider";
import { useMenu } from "@/context/MenuProvider";
import { useCallback, useState } from "react";
import { useFundWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import classNames from "classnames";
import { base } from "viem/chains";

const Wallet = () => {
  const { isLoadingBalance, formattedUserBalance } = useBalanceContext();
  const { setIsOpenMenu } = useMenu();
  const { user, logout, login } = usePrivy();
  const [isHovered, setIsHovered] = useState(false);
  const { fundWallet } = useFundWallet();
  const openMenuCallback = useCallback(() => setIsOpenMenu(true), []);

  const { wallets } = useWallets();

  const userWallet = wallets.find(
    (wallet) => wallet.walletClientType === "coinbase_wallet"
  );
  const userWalletChain =
    Number(userWallet?.chainId.split("eip155:")[1]) || null;

  return (
    <div
      className="wallet-dropdown__wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {!isLoadingBalance && user?.wallet?.address ? (
          <motion.button
            //   onClick={openMenuCallback}
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
        ) : (
          <motion.button
            //   onClick={openMenuCallback}
            key={"connect-wallet"}
            {...dynamicButtonProps}
            className="section-beta__header__wallet"
            onClick={async () => await login()}
          >
            <span>Connect Wallet</span>
            {/* <div className="divider" />
            <span className="white">
              {truncateEthAddress(user?.wallet?.address)}
            </span>
            <div className="wallet-chev">
              <ChevDown />
            </div> */}
            <div
              className={classNames("section-beta__header__wallet__item", {
                "wallet-item--active": true,
              })}
            >
              <MenuWallet />
            </div>
          </motion.button>
        )}
        <AnimatePresence mode="wait">
          {isHovered && !isLoadingBalance && user?.wallet?.address && (
            <motion.div
              key="wallet-dropdown"
              className="wallet-dropdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <button
                onClick={() => {
                  if (user?.wallet?.address) {
                    fundWallet(user?.wallet?.address, {
                      chain: base,
                      defaultFundingMethod: "manual",
                      amount: "0.0002",
                    });
                  }
                }}
                className="wallet-dropdown__funds"
              >
                <MenuFunds />

                <h4>Add funds</h4>
                <p>Top up your wallet for new digital art</p>
              </button>
              <div className="wallet-dropdown__right">
                <button
                  onClick={async () => {
                    if (userWallet && userWalletChain !== 8453) {
                      await userWallet.switchChain(base.id);
                    } else {
                      return undefined;
                    }
                  }}
                  className="wallet-dropdown__chain"
                >
                  <div className="wallet-dropdown__header">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.h4
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -10, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        key={userWalletChain === 8453 ? "chain" : "switch"}
                      >
                        {userWalletChain === 8453 ? "Chain" : "Switch Chain"}
                      </motion.h4>
                    </AnimatePresence>
                    <MenuBase />
                  </div>
                  <p>Select your active Ethereum network</p>
                </button>
                <button
                  onClick={async () => {
                    await logout();
                    setIsHovered(false);
                  }}
                  className="wallet-dropdown__logout"
                >
                  <div className="wallet-dropdown__header">
                    <h4>Sign Out</h4>
                    <MenuLogout />
                  </div>
                  <p>Securely end your Display session</p>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </div>
  );
};

export default Wallet;
