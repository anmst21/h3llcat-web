import { PortableTextBlock } from "next-sanity";

export type Author = {
  _id: string;
  name: string;
  image: string;
  alt: string;
  resourceUri: string;
};

export type Category = {
  _id: string;
  title: string;
  slug: string;
};

export type PrevNextPost = {
  _id: string;
  name: string;
  slug: string;
};

export type Blogpost = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: string;
  image: string;
  url: string;
  alt: string;
  content: PortableTextBlock[];
  author: Author;
  category: Category;
};
