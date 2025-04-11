import { AnimatePresence, motion } from "framer-motion";
import { useLockBodyScroll } from "@/hooks/useLockByScroll";
import {
  MenuWallet,
  MenuFunds,
  MenuLogout,
  MenuBase,
  MenuEth,
  MenuArrow,
  StickerIphoneIcon,
} from "../icon";
import { usePrivy, useWallets, useFundWallet } from "@privy-io/react-auth";
import { truncateEthAddress } from "@/helpers/truncateAddress";
import { useBalanceContext } from "@/context/BalanceProvider";
import MenuItem from "./menu-item";
import { buttonProps, menuItems } from "./items";
import { useCallback, useEffect, useState } from "react";
import { base } from "viem/chains";
import { dynamicButtonProps } from "../button/animation";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import Divider from "../blog/divider";
import { useEthPrice } from "@/context/EthPriceProvider";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MenuModal = ({ isOpen, setIsOpen }: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const {
    ethPrice,
    loading: isLoadingPrice,
    error: isErrorPrice,
  } = useEthPrice();

  useEffect(() => {
    // This code runs only on the client
    setIsMobile(window.innerWidth < 1100);

    // Optional: Update on resize
    const handleResize = () => setIsMobile(window.innerWidth < 1100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLockBodyScroll(isOpen);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const { user, authenticated, ready, logout, login } = usePrivy();
  const { wallets } = useWallets();
  const { fundWallet } = useFundWallet();
  const pathname = usePathname();
  const userWallet = wallets.find(
    (wallet) => wallet.walletClientType === "coinbase_wallet"
  );

  const { isLoadingBalance, formattedUserBalance } = useBalanceContext();
  const userWalletChain =
    Number(userWallet?.chainId.split("eip155:")[1]) || null;
  const callback = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsWalletOpen(false);
    }
  }, [isOpen]);

  const onWalletPress = () => {
    if (!ready) {
      return;
    } else if (ready && authenticated) {
      setIsWalletOpen(!isWalletOpen);
    } else if (ready && !authenticated) {
      login();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="menu-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={callback}
        >
          <div className="menu-modal__scroll">
            <div
              onClick={(e) => e.stopPropagation()}
              className="menu-modal__menu"
            >
              <Link
                href={"/"}
                className="section-sticker__iphone section-beta__header__logo"
              >
                <StickerIphoneIcon />
                <div className="section-sticker__iphone__text">
                  <h5>Display</h5>
                  <span className="section-sticker__iphone__text__sub">
                    swipe. collect. repeat.
                  </span>
                </div>
              </Link>

              <Divider />

              <motion.h4 {...buttonProps(1)}>Menu</motion.h4>
              <div className="menu-modal__container">
                <div className="menu-modal__list">
                  {menuItems.map((item, index) => (
                    <MenuItem
                      buttonProps={buttonProps(index + 2)}
                      value={item.value}
                      icon={item.icon}
                      title={item.title}
                      href={item.href}
                      key={index}
                      callback={callback}
                      isActive={pathname === item.href}
                    />
                  ))}
                </div>
                {isMobile && (
                  <motion.div {...buttonProps(menuItems.length + 2)}>
                    <Divider />
                  </motion.div>
                )}

                <div className="menu-modal__list">
                  <div className="wallet-item ">
                    <motion.button
                      onClick={onWalletPress}
                      {...buttonProps(!isMobile ? 2 : menuItems.length + 3)}
                      className={classNames("wallet-item__icon", {
                        "wallet-item__icon--active": isWalletOpen,
                      })}
                    >
                      <MenuWallet />
                    </motion.button>
                    <div className="wallet-item__right">
                      <motion.button
                        onClick={onWalletPress}
                        {...buttonProps(!isMobile ? 2 : menuItems.length + 3)}
                        className={classNames(
                          "wallet-item__user wallet-item--hover",
                          {
                            "wallet-item__item--active": isWalletOpen,
                          }
                        )}
                      >
                        <div className="wallet-item__title">
                          <span>Wallet</span>
                          <div className="wallet-item__title__arrow">
                            <MenuArrow />
                          </div>
                        </div>
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={
                              !user?.wallet?.address
                                ? "connect-wallet-btn"
                                : "wallet-address-address"
                            }
                            {...dynamicButtonProps}
                            className="wallet-item__address"
                          >
                            {!user?.wallet?.address
                              ? "Connect Wallet"
                              : truncateEthAddress(user?.wallet?.address)}
                          </motion.span>
                        </AnimatePresence>
                      </motion.button>
                      <AnimatePresence mode="wait">
                        <motion.div
                          {...buttonProps(!isMobile ? 3 : menuItems.length + 4)}
                          className="wallet-item__bottom"
                        >
                          <AnimatePresence initial={false} mode="wait">
                            {authenticated && ready && (
                              <>
                                <motion.div
                                  {...dynamicButtonProps}
                                  className="wallet-item__meta"
                                >
                                  <span className="wallet-item__meta__title">
                                    Balance
                                  </span>
                                  <AnimatePresence mode="wait">
                                    {isLoadingBalance || isLoadingPrice ? (
                                      <motion.div
                                        key="loading-balance"
                                        style={{
                                          zIndex: 1000,
                                          display: "flex",
                                          width: "100px",
                                          height: "100%",
                                          borderRadius: "2px",
                                        }}
                                        initial={{
                                          backgroundColor:
                                            "rgba(255, 248, 231, 0.1)",
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
                                      <motion.span
                                        {...dynamicButtonProps}
                                        key="balance"
                                        className="wallet-item__meta__value"
                                      >
                                        <span className="wallet-item__meta__title">
                                          {formattedUserBalance}
                                        </span>
                                        {`${isErrorPrice && ethPrice ? "" : `/ $${(Number(formattedUserBalance) * Number(ethPrice)).toFixed(2)}`}`}
                                        <MenuEth />
                                      </motion.span>
                                    )}
                                  </AnimatePresence>
                                </motion.div>
                                <motion.div
                                  {...dynamicButtonProps}
                                  className="wallet-item__meta"
                                >
                                  <span className="wallet-item__meta__title">
                                    Chain
                                  </span>
                                  <AnimatePresence mode="wait">
                                    {userWalletChain === 8453 ? (
                                      <motion.span
                                        key="base"
                                        {...dynamicButtonProps}
                                        className="wallet-item__meta__value"
                                      >
                                        Base
                                        <MenuBase />
                                      </motion.span>
                                    ) : (
                                      <motion.button
                                        key="switch"
                                        {...dynamicButtonProps}
                                        className="wallet-item__meta__value wallet-item__meta__value--switch"
                                        onClick={async () => {
                                          if (userWallet) {
                                            await userWallet.switchChain(
                                              base.id
                                            );
                                          }
                                        }}
                                      >
                                        Switch Chain
                                        <MenuBase />
                                      </motion.button>
                                    )}
                                  </AnimatePresence>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {authenticated && ready && isWalletOpen && (
                      <>
                        <MenuItem
                          buttonProps={dynamicButtonProps}
                          value={"To Your wallet"}
                          icon={<MenuFunds />}
                          title={"Add funds"}
                          callback={() => {
                            if (user?.wallet?.address) {
                              fundWallet(user?.wallet?.address, {
                                chain: base,
                                defaultFundingMethod: "manual",
                                amount: "0.0002",
                              });
                            }
                          }}
                        />
                        <MenuItem
                          buttonProps={dynamicButtonProps}
                          value={"From Display"}
                          icon={<MenuLogout />}
                          title={"Sign Out"}
                          callback={async () => {
                            await logout();
                            setIsWalletOpen(false);
                          }}
                        />
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuModal;
