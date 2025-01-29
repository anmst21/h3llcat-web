import { getBlogposts } from "@/sanity/sanity-utils";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { formatBlogDate } from "@/helpers/formatBlogDate";
import Categories from "@/components/blog/categories";
// import LinkButton from "@/components/button/link-button";
import SectionHeader from "@/components/blog/section-header";
import { BlogSlash, BlogBack } from "@/components/icon";

export const metadata: Metadata = {
  title: "Display Updates - Stay tuned",
  description:
    "Stay current on all things Display. From new feature launches to behind-the-scenes insights, our blog is your go-to source for updates and announcements. Subscribe to our newsletter for exclusive news and sneak peeks.",
};

export default async function Blog({
  searchParams,
}: {
  searchParams?: { category: string };
}) {
  const { categories, blogposts } = await getBlogposts(searchParams?.category);

  const featured = blogposts.find((blogpost) => blogpost.featured === true);

  console.log(" categories, blogposts ", searchParams?.category);

  return (
    <div className="blog-sections">
      <Categories active={searchParams?.category} list={categories} />
      {featured && (
        <div className="featured">
          <SectionHeader featured header="Featured" subHeader="Editors Pick" />
          <div className="featured__main">
            {featured.image && (
              <Image
                src={featured.image}
                width={700}
                height={609}
                alt={featured.alt}
                style={{
                  objectFit: "cover",
                }}
              />
            )}
            <Link
              className="featured__right"
              href={`/blog/${featured.slug}`}
              key={featured._id}
            >
              <span className="featured__title">{featured.category.title}</span>
              <h3>{featured.name}</h3>

              <div className="featured__meta">
                <span>{formatBlogDate(featured._createdAt)}</span>
                <BlogSlash />
                <span>{featured.author.name}</span>
              </div>
              <Link
                className="featured__forward"
                href={"/blog/" + featured.slug}
              >
                <BlogBack />
              </Link>
            </Link>
          </div>
        </div>
      )}
      <div className="blog-all">
        <SectionHeader header="Display's news" subHeader="All posts" />
        <div className="blog-items">
          {blogposts.map((blogpost) => (
            <Link
              className="blog-item"
              href={`/blog/${blogpost.slug}`}
              key={blogpost._id}
            >
              <div className="blog-item__left">
                <h3>{blogpost.name}</h3>
                <div className="featured__meta">
                  <span>{formatBlogDate(blogpost._createdAt)}</span>
                  <BlogSlash />
                  <span>{blogpost.author.name}</span>
                </div>
                <p>{blogpost.subheader}</p>
              </div>
              {blogpost.image && (
                <Image
                  src={blogpost.image}
                  width={364}
                  height={280}
                  alt={blogpost.alt}
                  style={{
                    borderRadius: 10,
                    objectFit: "cover",
                  }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
