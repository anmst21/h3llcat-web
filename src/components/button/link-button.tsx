"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BlogBack } from "../icon";

const LinkButton = () => {
  const pathname = usePathname();
  return (
    <Link
      className="link-button"
      href={pathname.includes("/subscribe") ? "/beta" : "/subscribe"}
    >
      <span>
        {pathname.includes("/subscribe") ? "Visit Beta" : "Subscribe"}
      </span>
      <div className="link-button__icon">
        <BlogBack />
      </div>
    </Link>
  );
};

export default LinkButton;
