import React from "react";
import { Category } from "@/types/Blogpost";
import Link from "next/link";

type Props = {
  list: Category[];
};

const Categories = ({ list }: Props) => {
  return (
    <div className="blog-post-page__categories">
      {list.map((category) => {
        return (
          <Link key={category._id} href={"/blog/category/" + category.slug}>
            {category.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;
