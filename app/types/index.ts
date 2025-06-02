import type { TRoutes } from "@/utils/sitemap";

export interface Tool {
	url: TRoutes;
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
