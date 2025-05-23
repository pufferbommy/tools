import type { FileRouteTypes } from "@/routeTree.gen";
import type { Sitemap } from "tanstack-router-sitemap";

import { TOOL_CATEGORY_LIST } from "../constants/tool-categories";

export type TRoutes = FileRouteTypes["fullPaths"];

const categoryConfig = {
	priority: 0.8,
	changeFrequency: "monthly" as const,
};

const toolConfig = {
	priority: 0.6,
	changeFrequency: "monthly" as const,
};

const generateRoutesFromCategories = () => {
	return Object.fromEntries(
		TOOL_CATEGORY_LIST.flatMap(([pathname, category]) => [
			[pathname, categoryConfig],
			...category.tools.map((tool) => [tool.url, toolConfig]),
		]),
	);
};

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
