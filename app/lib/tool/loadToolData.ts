import { TOOL_CATEGORY_MAP } from "@/constants/tool-categories";
import { redirect } from "@tanstack/react-router";
import { getOrigin } from "@/utils/get-origin";

export const loadToolData = (pathname: string) => {
	const origin = getOrigin();
	const url = `${origin}${pathname}`;
	const categoryPathname = url.match(/\/tools\/[^\/]+/)?.[0] as string;
	const category = TOOL_CATEGORY_MAP[categoryPathname];
	const tool = category?.tools.find((tool) => tool.url === pathname);

	if (!tool) {
		throw redirect({ to: "/" });
	}

	return { url, category, tool };
};
