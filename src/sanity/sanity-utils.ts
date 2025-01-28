import { createClient, groq } from "next-sanity";
import { Blogpost } from "@/types/Blogpost";
import config from "./config/client-config";

export async function getBlogposts(): Promise<Blogpost[]> {
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

export async function getBlogpost(slug: string): Promise<Blogpost> {
  return createClient(config).fetch(
    groq`*[_type == "blogposts" && slug.current == $slug][0]{
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    "image": image.asset->url,
    "alt": image.alt,
    content,
    pageTitle,
    author->{
        _id,
        name,
        "image": image.asset->url,
        "alt": image.alt,
    },
    category->{
        _id,
        title,
        "slug": slug.current,
    },

    // "prevPost": *[_type == "blogposts" && _createdAt < ^._createdAt] | order(_createdAt desc) [0]{
    //     _id,
    //     name,
    //     "slug": slug.current
    // },
    // "nextPost": *[_type == "blogposts" && _createdAt > ^._createdAt] | order(_createdAt asc) [0]{
    //     _id,
    //     name,
    //     "slug": slug.current
    // }
    
    }`,

    { slug }
  );
}
