"use client";
import { useRouter } from "next/navigation";
import classNames from "classnames";

import React from "react";
import { BlogBack } from "../icon";

interface BlogButtonProps {
  back?: boolean;
}

const BlogButton: React.FC<BlogButtonProps> = ({ back }) => {
  const router = useRouter();
  return (
    <button
      className={classNames("blog-button", {
        "blog-button--accent": !back,
      })}
      onClick={() => (back ? router.back() : router.push("/subscribe"))}
    >
      {back && <BlogBack />}
      <span>{back ? "Back" : "Subscribe to mail updates"}</span>
    </button>
  );
};

export default BlogButton;
