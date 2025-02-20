import { getBlogposts } from "@/sanity/sanity-utils";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { formatBlogDate } from "@/helpers/formatBlogDate";
import SectionHeader from "@/components/blog/section-header";
import { BlogBack } from "@/components/icon";
import Divider from "@/components/blog/divider";

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
  const { blogposts } = await getBlogposts(searchParams?.category);
  if (blogposts.length === 0) {
    return <div>fallback</div>;
  }

  const featured = blogposts.find((blogpost) => blogpost.featured === true);
  const filteredPosts = blogposts.filter((blogpost) => blogpost !== featured);

  const featuredBottom = filteredPosts.slice(0, 4);
  const otherPosts = blogposts.length > 4 ? blogposts.slice(4) : [];

  return (
    <>
      <div className="blog-featured">
        <SectionHeader featured header="The latest" subHeader="Featured" />

        {featured && (
          <Link
            href={"/blog/" + featured.slug}
            className="blog-featured__container"
          >
            <Image
              src={featured.image}
              alt={featured.alt}
              width={690}
              height={420}
              style={{ height: "auto", width: "100%" }}
            />
            <div className="blog-featured__text">
              <span>Latest</span>
              <h3>{featured.name}</h3>
              <div className="blog-featured__icon">
                <BlogBack />
              </div>
            </div>
          </Link>
        )}
        <div className="blog-featured__bottom">
          {featuredBottom.map((post, index) => {
            return (
              <Link
                key={index}
                className="blog-featured__small"
                href={"/blog/" + post.slug}
              >
                {!featured &&
                index === 0 &&
                featuredBottom.length === 1 ? null : (
                  <Divider />
                )}
                <div className="blog-featured__small__text">
                  <span>{post.category.title}</span>
                  <h4>{post.name}</h4>
                </div>
                <Image
                  width={220}
                  height={132}
                  alt={post.alt}
                  src={post.image}
                  //  style={{ height: "auto" }}
                />
              </Link>
            );
          })}
        </div>
      </div>
      {otherPosts.length > 0 && (
        <div className="other-posts">
          <SectionHeader header="Display Updates" subHeader="Other Posts" />
          {otherPosts.map((post, index) => {
            return (
              <Link
                key={index}
                className="other-posts__post"
                href={"/blog/" + post.slug}
              >
                {index !== 0 && <Divider transparent={index === 0} />}
                <div className="other-posts__container">
                  <span className="subtitle subtitle--top">
                    {post.category.title}
                  </span>
                  <div className="other-posts__text">
                    <span className="subtitle--block">
                      {post.category.title}
                    </span>
                    <h4>{post.name}</h4>
                    <div className="other-posts__meta">
                      <span>{formatBlogDate(post._createdAt)}</span>
                      <div className="vert-divider" />
                      <span>{post.author.name}</span>
                    </div>
                    <p>{post.subheader}</p>
                  </div>
                  <Image
                    width={370}
                    height={222}
                    alt={post.alt}
                    src={post.image}
                    style={{ height: "auto", width: "100%", maxWidth: 400 }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
