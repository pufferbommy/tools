import { TOOL_CATEGORY_MAP } from "@/constants/tool-categories";
import { redirect } from "@tanstack/react-router";

export const loadToolData = (pathname: string) => {
	const url = `${process.env.ORIGIN}${pathname}`;
	const categoryPathname = url.match(/\/tools\/[^\/]+/)?.[0] as string;
	const category = TOOL_CATEGORY_MAP[categoryPathname];
	const tool = category?.tools.find((tool) => tool.url === pathname);

	if (!tool) {
		throw redirect({ to: "/" });
	}

	return { url, category, tool };
};
