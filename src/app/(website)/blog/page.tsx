import { getProjects } from "@/sanity/sanity-utils";
import Link from "next/link";
import Image from "next/image";

export default async function Blog() {
  const projects = await getProjects();
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
