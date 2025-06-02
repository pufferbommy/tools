import { createFileRoute } from "@tanstack/react-router";

import ToolCard from "@/components/tools/tool-card";
import ToolLayout from "@/components/tools/tool-layout";
import { TOOL_CATEGORY_MAP } from "@/constants/tool-categories";
import { getOrigin } from "@/utils/get-origin";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/tools/$category")({
	component: RouteComponent,
	loader: (context) => {
		const pathname = context.location.pathname;
		const url = `${getOrigin()}${pathname}`;
		const category = TOOL_CATEGORY_MAP[`/tools/${context.params.category}`];
		return { url, pathname, category };
	},
	head: ({ loaderData }) => ({
		meta: [
			...seo({
				title: loaderData.category.title,
				description: loaderData.category.description,
				keywords: loaderData.category.keywords,
				image: `${loaderData.url}.png`.replace("/tools", "/og/tools"),
			}),
		],
		links: [
			{
				rel: "canonical",
				href: loaderData.url,
			},
		],
	}),
});

function RouteComponent() {
	const { url, pathname, category } = Route.useLoaderData();

	return (
		<ToolLayout
			breadcrumbs={[
				{
					label: category.title,
					href: pathname,
				},
			]}
			title={category.title}
			description={category.description}
			url={url}
		>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				{category.tools.map((tool) => (
					<ToolCard key={tool.url} tool={tool} />
				))}
			</div>
		</ToolLayout>
	);
}
