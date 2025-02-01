import React from "react";
import LinkButton from "../button/link-button";
import BtnCarousel from "../section-app/btn-carousel";
import classNames from "classnames";

type Props = {
  text: string[];
  subHeader: string;
  href: string;
  isDark?: boolean;
  btnContent: string;
};

const PageHeader = ({ text, subHeader, href, isDark, btnContent }: Props) => {
  return (
    <div
      className={classNames("blog-cta", {
        "blog-cta--dark": isDark,
      })}
    >
      <div className="blog-cta__carousel">
        <BtnCarousel />
      </div>
      <div className="blog-cta__heading">
        {text.map((hItem, index) => {
          return <span key={index}>{hItem}</span>;
        })}
      </div>
      <div className="blog-cta__paragraph">
        <p>{subHeader}</p>
        <LinkButton isDark={isDark} href={href} content={btnContent} />
      </div>
    </div>
  );
};

export default PageHeader;
