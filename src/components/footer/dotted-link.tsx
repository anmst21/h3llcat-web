import React from "react";
import Link from "next/link";
import { FooterDooted } from "@/components/icon";

type Props = {
  href: string;
  index: number;
  label: string;
};

const DottedLink = ({ href, index, label }: Props) => {
  return (
    <Link href={href} className="dotted-link">
      <span className="dotted-link__number">0{index}</span>
      <span className="dotted-link__line"></span>
      <span className="dotted-link__label">{label}</span>
    </Link>
  );
};

export default DottedLink;
