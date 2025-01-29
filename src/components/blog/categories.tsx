"use client";

import React, { useCallback } from "react";
import { Category } from "@/types/Blogpost";
import classNames from "classnames";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  list: Category[];
  active?: string;
};

const Categories = ({ list, active }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
        className={classNames({ "active-category": !active })}
        onClick={() => router.push(pathname)}
      >
        Blog
      </button>
      {list.map((category) => {
        return (
          <button
            className={classNames({
              "active-category": active === category.slug,
            })}
            key={category._id}
            onClick={() =>
              router.push(
                "/blog" + "?" + createQueryString("category", category.slug)
              )
            }
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
