import { getBlogpost } from "@/sanity/sanity-utils";
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
import {
  socialsTwitter,
  socialsLinkedIn,
  socialWarpcast,
} from "@/helpers/socials";
import BlogForm from "@/components/subscribe-input/blog-form";
import { notFound } from "next/navigation";

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

export default async function BlogPostPage({ params: { slug } }: Slug) {
  const project = await getBlogpost(slug);

  if (!project || Object.keys(project).length === 0) {
    notFound();
  }

  const { category, name, author, _createdAt: date, subheader } = project;

  console.log("project", project);
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
            <Link target="_blank" href={socialsTwitter}>
              <div className="socials-link">
                <FooterX />
              </div>
              Share with X
              <ArrowContainer />
            </Link>

            <Link target="_blank" href={socialsLinkedIn}>
              <div className="socials-link">
                <FooterLinkedIn />
              </div>
              Share with LinkedIn
              <ArrowContainer />
            </Link>
            <Link target="_blank" href={socialWarpcast}>
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
