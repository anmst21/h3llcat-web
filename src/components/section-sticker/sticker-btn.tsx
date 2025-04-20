"use client";
import classNames from "classnames";
import React from "react";

import {
  arrowVariants,
  textVariants,
} from "../section-beta/dynamic-action-button-variants";
import { MenuArrow } from "../icon";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

type Props = {
  content: string;
  type: "cta" | "letter";
  large?: boolean;
};

const StickerBtn = ({ content, type, large }: Props) => {
  const router = useRouter();

  const btnAnimate = {
    width: "100%",
    backgroundColor: type === "cta" ? "#FFCC00" : "white",
    color: "#050915",
  };
  return (
    <motion.button
      //   className={classNames("sticker-btn", {
      //     "sticker-btn--newsletter": newsletter,
      //   })}
      //   onClick={callback}
      onClick={() =>
        type === "cta" ? router.push("/beta") : router.push("/subscribe")
      }
      className={classNames("mint-submit", {
        "mint-submit--cta": type === "cta",
        "mint-submit--lg": large,
      })}
      variants={{
        initial: {
          width: "100%",
          color: "#050915",
          backgroundColor: "#FFCC00",
        },
      }}
      initial="initial"
      whileHover={"hover"}
      whileTap={"active"}
      //    className={btnClass}
      //type={"submit" : "reset"}
      //   onClick={onClickAction}
      //   disabled={disabled}
      animate={btnAnimate}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        animate={{
          opacity: 1,
          x: 10,
        }}
        id={content}
        variants={textVariants}
        key={content}
        style={{ color: "#050915", fontSize: 17 }}
      >
        {content.toUpperCase()}
      </motion.span>

      <motion.div
        key="arrow-icon"
        style={{ display: "flex" }}
        variants={arrowVariants}
      >
        <MenuArrow />
      </motion.div>
    </motion.button>
  );
};

export default StickerBtn;
