import Categories from "@/components/blog/categories";
import { getCategories } from "@/sanity/sanity-utils";
import { Suspense } from "react";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <div className="blog">
      <div className="blog-sections">
        <Suspense>
          <Categories list={categories} />
        </Suspense>
        {children}
      </div>
    </div>
  );
}
