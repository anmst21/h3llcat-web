const project = {
  name: "project",
  title: "Projects",

  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "pageTitle", title: "Page Title", type: "string" },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    },
    { name: "url", title: "URL", type: "url" },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
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
    {
      name: "prevPost",
      title: "Previous Post",
      type: "reference",
      to: [{ type: "project" }],
    },
  ],
};

export default project;
