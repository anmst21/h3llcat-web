const blogpost = {
  name: "blogposts",
  title: "Blogposts",

  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    {
      name: "author",
      title: "Blogpost's Author",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      name: "category",
      title: "Post's category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};

export default blogpost;
// {
//   name: "blogpost",
//   title: "Blogpost",
//   type: "array",
//   of: [
//     {
//       type: "object",
//       name: "headerEntry",
//       title: "Header Entry",
//       fields: [
//         {
//           name: "header",
//           type: "string",
//           title: "Header",
//         },
//         {
//           name: "paragraphs",
//           title: "Paragraphs",
//           type: "array",
//           of: [
//             // Here we use block content:
//             {
//               type: "block",
//             },
//           ],
//         },
//       ],
//     },
//   ],
// },
