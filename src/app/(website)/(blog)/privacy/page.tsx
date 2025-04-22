import { formatBlogDate } from "@/helpers/formatBlogDate";
import { getPrivacy } from "@/sanity/sanity-utils";
import { Metadata } from "next";
import { PortableText } from "next-sanity";

export const metadata: Metadata = {
  title: "Privacy Policy",

  description:
    "Learn how Display's collects, uses, and safeguards your personal information. This policy covers data retention, user action logs, wallet usage, integrations with third-party services, and more. Stay informed about your rights, our security measures, and how to contact us for any privacy-related inquiries.",
};

export default async function Privacy() {
  const privacy = await getPrivacy();

  const { subheader, content, _createdAt, title, author } = privacy;

  // console.log("privacy", subheader);
  return (
    <div className="blog-post-page__container privacy">
      <div className="blog-post-page__post">
        <h1>{title}</h1>
        <div className="blog-post-page__author">
          <span>{author.name}</span>
          <div />
          <span>{formatBlogDate(_createdAt)}</span>
        </div>

        <PortableText value={subheader} />
        <div className="divider" />

        <div className="rich-text">
          <PortableText value={content} />
        </div>
      </div>
    </div>
  );
}
