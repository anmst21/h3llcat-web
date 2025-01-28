import { getBlogposts } from "@/sanity/sanity-utils";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Display Updates - Stay tuned",
  description:
    "Stay current on all things Display. From new feature launches to behind-the-scenes insights, our blog is your go-to source for updates and announcements. Subscribe to our newsletter for exclusive news and sneak peeks.",
};

export default async function Blog() {
  const projects = await getBlogposts();
  console.log(projects);
  return (
    <div className="blog">
      <h1>Display Blog</h1>
      <div className="blog-items">
        {projects.map((project) => (
          <Link
            className="blog-item"
            href={`/blog/${project.slug}`}
            key={project._id}
          >
            <h1>{project.name}</h1>
            {project.image && (
              <Image
                objectFit="cover"
                src={project.image}
                width={250}
                height={100}
                alt={project.alt}
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
