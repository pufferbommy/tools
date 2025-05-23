import type { TRoutes } from "@/utils/sitemap";

export interface Tool {
	url: TRoutes;
	shortTitle: string;
	title: string;
	description: string;
	keywords: string;
}

export interface Category {
	title: string;
	description: string;
	keywords: string;
	tools: Tool[];
}
