import { createFileRoute } from "@tanstack/react-router";

import ToolCard from "@/components/tool-card";
import ToolLayout from "@/components/tool-layout";
import { CATEGORY_MAP } from "@/constants/categories";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/tools/$category")({
	component: RouteComponent,
	loader: async (context) => {
		const pathname = context.location.pathname;
		const url = `${process.env.ORIGIN}${pathname}`;
		const category = CATEGORY_MAP[`/tools/${context.params.category}`];
		return { url, pathname, category };
	},
	head: ({
		loaderData: {
			category: { title, description, keywords },
		},
	}) => ({
		meta: [
			...seo({
				title,
				description,
				keywords,
			}),
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
			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{category.tools.map((tool) => (
					<ToolCard key={tool.url} tool={tool} noAnimation />
				))}
			</div>
		</ToolLayout>
	);
}
