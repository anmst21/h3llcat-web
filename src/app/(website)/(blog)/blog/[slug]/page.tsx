import { getBlogpost } from "@/sanity/sanity-utils";
import { PortableText } from "next-sanity";
import Image from "next/image";
import BlogButton from "@/components/button/blog-button";
import Link from "next/link";
import { formatBlogDate } from "@/helpers/formatBlogDate";
import Categories from "@/components/blog/categories";

type Slug = {
  params: { slug: string };
  searchParams?: { category: string };
};

export async function generateMetadata({ params: { slug } }: Slug) {
  const project = await getBlogpost(slug);

  return {
    title: project.name,
    description: project.subheader,
  };
}

export default async function BlogPostPage({
  params: { slug },
  searchParams,
}: Slug) {
  const project = await getBlogpost(slug);

  console.log("project", project);
  return (
    <div className="blog-post-page">
      {/* <div className="blog-post-page__categories">
        {project.categories.map((category) => {
          return (
            <Link key={category._id} href={"/blog/category/" + category.slug}>
              {category.title}
            </Link>
          );
        })}
      </div> */}
      <Categories active={searchParams?.category} list={project.categories} />
      <div className="blog-post-page__top">
        <div className="blog-post-page__header">
          <div className="blog-post-page__buttons">
            <BlogButton back />
            <BlogButton />
          </div>
          <Link href={"/blog/category/" + project.category.slug}>
            {project.category.title}
          </Link>
        </div>
        <h1 className="blog-post-page__h1">{project.name}</h1>

        <Image
          src={project.image}
          alt={project.alt}
          width={1080}
          height={609}
          className="blog-post-page__image"
        />
        <div className="blog-post-page__meta">
          <div className="blog-post-page__author">
            <Image
              width={70}
              height={70}
              alt={project.author.alt}
              src={project.author.image}
            />
            <span>{project.author.name}</span>
          </div>
          <span className="blog-post-page__date">
            {formatBlogDate(project._createdAt)}
          </span>
        </div>
      </div>

      <div className="blog-post-main">
        <p>{project.subheader}</p>
        <PortableText value={project.content} />
      </div>
    </div>
  );
}
