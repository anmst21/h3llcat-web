import { getBlogpost } from "@/sanity/sanity-utils";
import { PortableText } from "next-sanity";
import Image from "next/image";

type Slug = {
  params: { slug: string };
};

export async function generateMetadata({ params: { slug } }: Slug) {
  const project = await getBlogpost(slug);

  return {
    title: project.name,
    description: project.content[0].children[0].text,
  };
}

export default async function BlogPostPage({ params: { slug } }: Slug) {
  const project = await getBlogpost(slug);

  console.log("project", project.content[0].children[0].text);
  return (
    <div className="blog-post-page">
      <h1>{project.name}</h1>

      <Image
        layout="responsive"
        src={project.image}
        alt={project.alt}
        width={1920}
        height={1080}
      />
      <PortableText value={project.content} />
    </div>
  );
}
