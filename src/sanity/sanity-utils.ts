import { createClient, groq } from "next-sanity";
import { Blogpost, Category, PrivacyPolicy } from "@/types/Blogpost";
import config from "./config/client-config";

type List = {
  blogposts: Blogpost[];
};

const categoriesQuery = groq`
    *[_type == "category"]{
      _id,
      title,
      "slug": slug.current,
    }
  `;

export async function getCategories(): Promise<Category[]> {
  const client = createClient(config);

  const categories = await client.fetch<Category[]>(categoriesQuery);

  return categories;
}

export async function getPrivacy(): Promise<PrivacyPolicy> {
  const client = createClient(config);

  const privacyPolicyQuery = groq`
  *[_type == "privacy"][0]{
    _id,
    _createdAt,
    title,
    author->{
        _id,
        name,
        "image": image.asset->url,
        "alt": image.alt,
      },
    subheader,
    content,

  }`;
  const privacy = await client.fetch<PrivacyPolicy>(privacyPolicyQuery);

  return privacy;
}

export async function getBlogposts(category?: string): Promise<List> {
  const client = createClient(config);

  const blogpostQuery = groq`*[_type == "blogposts"] | order(_createdAt desc) {
  _id,
  _createdAt,
  name,
  subheader,
  "slug": slug.current,
  "image": image.asset->url,
  "alt": image.alt,
  featured,
   category->{
        _id,
        title,
        "slug": slug.current,
      }, 
  author->{
        _id,
        name,
        "image": image.asset->url,
        "alt": image.alt,
      },
}`;

  const blogpostByCategoryQuery = groq`
  *[_type == "blogposts" && category->slug.current == $category] | order(_createdAt desc) {
    _id,
    _createdAt,
    name,
    subheader,
    "slug": slug.current,
    "image": image.asset->url,
    "alt": image.alt,
    featured,
    category->{
      _id,
      title,
      "slug": slug.current,
    },
    author->{
      _id,
      name,
      "image": image.asset->url,
      "alt": image.alt,
    },
  }
`;

  const decider = category
    ? client.fetch<Blogpost[]>(blogpostByCategoryQuery, { category })
    : client.fetch<Blogpost[]>(blogpostQuery);

  const [blogposts] = await Promise.all([decider]);

  return { blogposts };
}

export async function getBlogpost(slug: string): Promise<Blogpost> {
  const client = createClient(config);

  // GROQ query to fetch the blog post by slug
  const blogpostQuery = groq`
    *[_type == "blogposts" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      subheader,
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

    }
  `;

  // GROQ query to fetch all categories

  const [blogpost] = await Promise.all([
    client.fetch<Blogpost>(blogpostQuery, { slug }),
  ]);

  return { ...blogpost };
}
