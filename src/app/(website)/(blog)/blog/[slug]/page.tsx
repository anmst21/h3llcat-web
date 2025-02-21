import { getBlogpost, getBlogposts } from "@/sanity/sanity-utils";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { formatBlogDate } from "@/helpers/formatBlogDate";
import {
  FooterFarcaster,
  FooterX,
  FooterLinkedIn,
  ArrowContainer,
} from "@/components/icon";

import BlogForm from "@/components/subscribe-input/blog-form";
import { notFound } from "next/navigation";

type Slug = {
  params: { slug: string };
  searchParams?: { category: string };
};

export async function generateStaticParams() {
  const { blogposts } = await getBlogposts();
  return blogposts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params: { slug } }: Slug) {
  const project = await getBlogpost(slug);
  const postUrl = `https://h3llcat.app/blog/${slug}`;
  const imageUrl = project.image; // Ensure this is an absolute URL

  return {
    title: project.name,
    description: project.subheader,
    openGraph: {
      title: project.name,
      description: project.subheader,
      url: postUrl,

      images: [
        {
          url: imageUrl,
          alt: project.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.subheader,
      images: [imageUrl],
      site: "@0xN3XUS",
    },
  };
}

export default async function BlogPostPage({ params: { slug } }: Slug) {
  const project = await getBlogpost(slug);

  if (!project || Object.keys(project).length === 0) {
    notFound();
  }

  const { category, name, author, _createdAt: date, subheader } = project;

  console.log("project", project);

  // Construct the canonical URL for the blog post
  const postUrl = `https://h3llcat.app/blog/${slug}`;

  // Build dynamic social share URLs using the post metadata
  const twitterShareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(
    postUrl
  )}&text=${encodeURIComponent(name)}`;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    postUrl
  )}&title=${encodeURIComponent(name)}&summary=${encodeURIComponent(subheader)}`;
  // Adjust Farcaster share URL as needed if there's a specific share endpoint
  const farcasterShareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(
    `Check out "${name}": 
    ${postUrl}`
  )}`;
  return (
    <>
      <div className="blog-post-page__container">
        <div className="blog-post-page__post">
          <Image
            src={project.image}
            alt={project.alt}
            width={730}
            height={438}
            className="blog-post-page__image"
            style={{ width: "100%", height: "auto" }}
          />
          <Link
            className="blog-post-page__category"
            href={"/blog?category=" + category.slug}
          >
            {category.title}
          </Link>
          <h1>{name}</h1>
          <div className="blog-post-page__author">
            <span>{author.name}</span>
            <div />
            <span>{formatBlogDate(date)}</span>
          </div>
          <p>{subheader}</p>
          <div className="divider" />

          <div className="rich-text">
            <PortableText value={project.content} />
          </div>
        </div>
        <div className="blog-post-page__socials__container">
          <div className="blog-post-page__socials">
            <span>Share this article</span>
            <Link target="_blank" href={twitterShareUrl}>
              <div className="socials-link">
                <FooterX />
              </div>
              Share with X
              <ArrowContainer />
            </Link>

            <Link target="_blank" href={linkedInShareUrl}>
              <div className="socials-link">
                <FooterLinkedIn />
              </div>
              Share with LinkedIn
              <ArrowContainer />
            </Link>
            <Link target="_blank" href={farcasterShareUrl}>
              <div className="socials-link">
                <FooterFarcaster />
              </div>
              Share with Farcaster
              <ArrowContainer />
            </Link>
          </div>
          <div className="blog-post-page__socials blog-post-page__socials--submit">
            <span>Receive updates</span>
            <h4>Subscribe to Display newsletter</h4>
            <BlogForm />
          </div>
        </div>
      </div>
    </>
  );
}
