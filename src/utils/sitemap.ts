import { type FileRouteTypes } from "~/routeTree.gen";
import { Sitemap } from "tanstack-router-sitemap";

// This will become a string literal union of all your routes
export type TRoutes = FileRouteTypes["fullPaths"];

// Define your sitemap
export const sitemap: Sitemap<TRoutes> = {
  siteUrl: "https://ruammit-tools.netlify.app",
  defaultPriority: 0.5,
  routes: {
    "/": {
      priority: 1,
      changeFrequency: "daily",
    },
    "/tools/calculators/bmi": {
      priority: 0.8,
      changeFrequency: "monthly",
    },
    "/tools/calculators/bmr": {
      priority: 0.8,
      changeFrequency: "monthly",
    },
    "/tools/calculators/tdee": {
      priority: 0.8,
      changeFrequency: "monthly",
    },
    "/tools/random/number": {
      priority: 0.8,
      changeFrequency: "monthly",
    },
    "/tools/random/person-name": {
      priority: 0.8,
      changeFrequency: "monthly",
    },
  },
};
