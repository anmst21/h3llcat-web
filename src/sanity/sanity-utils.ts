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
    author->{
        _id,
        name,
        photo{
          asset->url,
          alt
        },
        resourceUri
    },
    category->{
        _id,
        title,
        slug
    },
    
    "prevPost": *[_type == "blogposts" && _createdAt < ^._createdAt] | order(_createdAt desc) [0]{
        _id,
        name,
        "slug": slug.current
    },
    "nextPost": *[_type == "blogposts" && _createdAt > ^._createdAt] | order(_createdAt asc) [0]{
        _id,
        name,
        "slug": slug.current
    }
    
    }`,

    { slug }
  );
}
