"use client";

import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { truncateEthAddress } from "@/helpers/truncateAddress";
import { useEffect } from "react";

export default function Menu() {
  const { login, authenticated, logout, user, getAccessToken } = usePrivy();
  const { wallets } = useWallets();
  console.log("wallets", user);
  const pathname = usePathname();
  const { ready } = usePrivy();
  const disableLogin = !ready || (ready && authenticated);
  const disableLogout = !ready || (ready && !authenticated);

  const getToken = async () => {
    const accessToken = await getAccessToken();
    console.log("accessToken", accessToken);
    return accessToken;
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="menu">
      <div className="menu-container">
        <Link
          className={classNames("menu-btn", {
            "menu-btn--active": pathname === "/",
          })}
          href="/"
        >
          Home
        </Link>
        <Link
          className={classNames("menu-btn", {
            "menu-btn--active": pathname === "/beta",
          })}
          href="/beta"
        >
          Beta
        </Link>
        <Link
          className={classNames("menu-btn", {
            "menu-btn--active":
              pathname.includes("/blog") || pathname.includes("/subscribe"),
          })}
          href="/blog"
        >
          Blog
        </Link>
        <Link
          className={classNames("menu-btn", {
            "menu-btn--active": pathname.includes("/contacts"),
          })}
          href="/contacts"
        >
          Contacts
        </Link>
        <Link
          className={classNames("menu-btn", {
            "menu-btn--active": pathname.includes("/privacy"),
          })}
          href="/privacy"
        >
          Privacy
        </Link>
        <button
          disabled={disableLogin}
          onClick={login}
          className={classNames("menu-btn menu-btn__cta", {
            "menu-btn__cta--active": pathname === "/beta",
          })}
        >
          <Image
            width={70}
            height={70}
            src={"/logo-menu.png"}
            alt="logo menu"
          />
          {ready && !authenticated ? (
            <span>Connect Wallet</span>
          ) : (
            ready &&
            authenticated && (
              <span>{truncateEthAddress(wallets[0]?.address)}</span>
            )
          )}
          {!ready && <span>Loading...</span>}
        </button>
        {authenticated && pathname.includes("/beta") && (
          <button
            className="menu-btn menu-btn__cta"
            disabled={disableLogout}
            onClick={logout}
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
}
