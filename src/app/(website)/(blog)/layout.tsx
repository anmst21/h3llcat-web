import Categories from "@/components/blog/categories";
import { getCategories } from "@/sanity/sanity-utils";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <div className="blog">
      <div className="blog-sections">
        <Categories list={categories} />
        {children}
      </div>
    </div>
  );
}
