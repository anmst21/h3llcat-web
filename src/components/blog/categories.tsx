"use client";

import React, { useCallback } from "react";
import { Category } from "@/types/Blogpost";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";

type Props = {
  list: Category[];
};

const Categories = ({ list }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

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
      <button
        //  className={classNames({ "active-category": !activeCategory })}
        onClick={() => router.push("/blog")}
      >
        Blog
      </button>
      <div className="category__container">
        <button
          key={"mail"}
          className={classNames("category", {
            "active-category": !activeCategory,
          })}
          onClick={() => router.push("/blog")}
          // Ensure the button can contain the absolutely positioned background
          //  style={{ position: "relative", overflow: "hidden" }}
        >
          {/* The animated background indicator */}
          {!activeCategory ? (
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
              onClick={() =>
                router.push(
                  "/blog" + "?" + createQueryString("category", category.slug)
                )
              }
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
      </div>
    </div>
  );
};

export default Categories;
