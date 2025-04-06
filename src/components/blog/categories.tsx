"use client";

import React, { useCallback } from "react";
import { Category } from "@/types/Blogpost";
import classNames from "classnames";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { dynamicMintProps } from "../button/animation";
import { StickerIphoneIcon } from "../icon";
import Link from "next/link";

type Props = {
  list: Category[];
};

const Categories = ({ list }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const pathname = usePathname();
  console.log("pathname", process.env.NEXT_NOT_FOUND);
  let buttonText = "Blog";
  let href = "/blog";

  if (pathname.includes("/blog")) {
    buttonText = "Blog";
    href = "/blog";
  } else if (pathname.includes("/subscribe")) {
    buttonText = "Newsletter";
    href = "/blog";
  } else if (pathname.includes("/privacy")) {
    buttonText = "Privacy";
    href = "/privacy";
  } else if (pathname.includes("/contacts")) {
    buttonText = "Contacts";
    href = "/contacts";
  }
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="blog-post-page__categories">
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
      <div className="category__container__scroll">
        <motion.div className="category__container">
          <AnimatePresence mode="popLayout">
            <motion.button
              className="blog-post-page__categories__status"
              key={buttonText} // Changing key triggers the animation
              {...dynamicMintProps}
              onClick={() => router.push(href)}
            >
              {buttonText}
            </motion.button>
          </AnimatePresence>
          <div className="divider" />
          <button
            key={"mail"}
            className={classNames("category", {
              "active-category": !activeCategory && pathname.includes("/blog"),
            })}
            onClick={() => router.push("/blog")}
            // Ensure the button can contain the absolutely positioned background
            //  style={{ position: "relative", overflow: "hidden" }}
          >
            {/* The animated background indicator */}
            {!activeCategory && pathname.includes("/blog") ? (
              <motion.div layoutId="underline" className="underline" />
            ) : null}
            <span>Main</span>
          </button>
          {list.map((category) => {
            const isActive = activeCategory === category.slug;
            return (
              <button
                key={category._id}
                className={classNames("category", {
                  "active-category": isActive,
                })}
                onClick={() => {
                  const newPath =
                    "/blog" +
                    "?" +
                    createQueryString("category", category.slug);
                  router.push(newPath);
                  router.refresh();
                }}
                // Ensure the button can contain the absolutely positioned background
                //  style={{ position: "relative", overflow: "hidden" }}
              >
                {/* The animated background indicator */}
                {isActive ? (
                  <motion.div layoutId="underline" className="underline" />
                ) : null}
                <span>{category.title}</span>
              </button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;
