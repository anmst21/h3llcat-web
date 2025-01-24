import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

const config = defineConfig({
  projectId: "du4or4nz",
  dataset: "production",
  title: "My personal website",
  apiVersion: "2025-01-04",
  basePath: "/admin",
  plugins: [structureTool()],
});

export default config;
