import Link from "next/link";
import React from "react";
import { BlogBack } from "../icon";

type Props = {
  href: string;
  content: string;
};

const LinkButton = ({ href, content }: Props) => {
  return (
    <Link className="link-button" href={href}>
      <span>{content}</span>
      <div className="link-button__icon">
        <BlogBack />
      </div>
    </Link>
  );
};

export default LinkButton;
