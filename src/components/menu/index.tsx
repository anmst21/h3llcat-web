"use client";

import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();
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
            "menu-btn--active": pathname === "/blog",
          })}
          href="/blog"
        >
          Blog
        </Link>
        <button
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
          <span>Connect Wallet</span>
        </button>
      </div>
    </div>
  );
}
