import { Link, createFileRoute } from "@tanstack/react-router";

import ToolLayout from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_MAP } from "@/constants/categories";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/tools/$category")({
	component: RouteComponent,
	loader: async (context) => {
		const pathname = context.location.pathname;
		const url = `${process.env.ORIGIN}${pathname}`;
		const category = CATEGORY_MAP[pathname];
		return { url, pathname, category };
	},
	head: (c) => ({
		meta: [
			...seo({
				title: c.loaderData.category.title,
				description: c.loaderData.category.description,
				keywords: c.loaderData.category.keywords,
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
			<div className="grid grid-cols-3 gap-4">
				{category.tools.map((tool) => (
					<Link key={tool.url} to={tool.url}>
						<Card className="hover:bg-primary/10 transition-colors hover:border-primary">
							<CardContent className="font-medium text-center">
								{tool.title}
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</ToolLayout>
	);
}
