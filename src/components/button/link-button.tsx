"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BlogBack } from "../icon";
import classNames from "classnames";

const LinkButton = ({
  href,
  content,
  isDark,
}: {
  href: string;
  content: string;
  isDark?: boolean;
}) => {
  const pathname = usePathname();
  return (
    <Link
      className={classNames("link-button", {
        "link-button--dark": isDark,
      })}
      href={pathname.includes("/subscribe") ? "/beta" : href}
    >
      <span>{pathname.includes("/subscribe") ? "Visit Beta" : content}</span>
      <div className="link-button__icon">
        <BlogBack />
      </div>
    </Link>
  );
};

export default LinkButton;
