import { defineConfig } from "@tanstack/react-start/config";
import { generateSitemap } from "tanstack-router-sitemap";
import tsConfigPaths from "vite-tsconfig-paths";

// import the sitemap you defined earlier
import { sitemap } from "./src/utils/sitemap";

export default defineConfig({
  server: {
    preset: "netlify",
  },
  tsr: {
    appDirectory: "src",
  },
  vite: {
    plugins: [
      generateSitemap(sitemap),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
