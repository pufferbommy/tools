import type { FileRouteTypes } from "@/routeTree.gen";
import type { Sitemap } from "tanstack-router-sitemap";
import { TOOL_CATEGORIES } from "../constants";

export type TRoutes = FileRouteTypes["fullPaths"];

const categoryConfig = {
	priority: 0.8,
	changeFrequency: "monthly" as const,
};

const toolConfig = {
	priority: 0.6,
	changeFrequency: "monthly" as const,
};

const generateRoutesFromCategories = () =>
	Object.fromEntries(
		TOOL_CATEGORIES.flatMap((category) => [
			[category.url, categoryConfig],
			...category.items.map((item) => [item.url, toolConfig]),
		]),
	);

export const sitemap: Sitemap<TRoutes> = {
	siteUrl: "https://ruammittools.com",
	defaultPriority: 0.5,
	routes: {
		"/": {
			priority: 1,
			changeFrequency: "daily",
		},
		...generateRoutesFromCategories(),
	},
};
