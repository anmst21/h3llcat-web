import { createClient, groq } from "next-sanity";
import { Blogpost, Category } from "@/types/Blogpost";
import config from "./config/client-config";

type ListWithCategories = {
  blogposts: Blogpost[];
  categories: Category[];
};

const categoriesQuery = groq`
    *[_type == "category"]{
      _id,
      title,
      "slug": slug.current,
    }
  `;

export async function getBlogposts(): Promise<ListWithCategories> {
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

  const [blogposts, categories] = await Promise.all([
    client.fetch<Blogpost[]>(blogpostQuery),
    client.fetch<Category[]>(categoriesQuery),
  ]);

  return { blogposts, categories };
}

type BlogpostWithCategories = Blogpost & {
  categories: Category[];
};
export async function getBlogpost(
  slug: string
): Promise<BlogpostWithCategories> {
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

  const [blogpost, categories] = await Promise.all([
    client.fetch<Blogpost>(blogpostQuery, { slug }),
    client.fetch<Category[]>(categoriesQuery),
  ]);

  return { ...blogpost, categories };
}
