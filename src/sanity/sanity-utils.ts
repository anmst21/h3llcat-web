import { createClient, groq } from "next-sanity";
import { Project } from "@/types/Project";
import config from "./config/client-config";

export async function getBlogposts(): Promise<Project[]> {
  return createClient(config).fetch(
    groq`*[_type == "blogposts"]{
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    "image": image.asset->url,
    "alt": image.alt,
    url,
    content,
    
    }`
  );
}

export async function getBlogpost(slug: string): Promise<Project> {
  return createClient(config).fetch(
    groq`*[_type == "blogposts" && slug.current == $slug][0]{
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    "image": image.asset->url,
    "alt": image.alt,
    url,
    content,
    pageTitle,
    prevPost-> {
        name,
        "slug": slug.current
      },
    
    }`,

    { slug }
  );
}
