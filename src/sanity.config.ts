import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemas from "@/sanity/schemas";

const config = defineConfig({
  projectId: "du4or4nz",
  dataset: "production",
  title: "My personal website",
  apiVersion: "2025-01-04",
  basePath: "/admin",
  plugins: [structureTool()],
  schema: { types: schemas },
});
export default config;
