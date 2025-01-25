import { getBlogpost } from "@/sanity/sanity-utils";
import { PortableText } from "next-sanity";
import Image from "next/image";

export default async function BlogPostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const project = await getBlogpost(slug);

  console.log("project", project);
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
