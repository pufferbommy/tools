import ToolLayout from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { TOOL_CATEGORIES } from "@/constants";
import { getOrigin } from "@/lib/get-origin";
import { seo } from "@/utils/seo";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/calculators/")({
	component: RouteComponent,
	loader: async (context) => {
		const origin = await getOrigin();
		const pathname = context.location.pathname;
		const url = `${origin}${pathname}`;
		return { url, pathname };
	},
	head: () => ({
		meta: [
			...seo({
				title: "เครื่องคำนวณ - รวมมิตรเครื่องมือ",
				description: "เครื่องมือคำนวณที่ช่วยให้คุณทำการคำนวณต่างๆ ได้อย่างง่ายดาย",
				keywords: "เครื่องคำนวณ, คำนวณ BMI, คำนวณอายุ, คำนวณเปอร์เซ็นต์, คำนวณดอกเบี้ย",
			}),
		],
	}),
});

function RouteComponent() {
	const { url, pathname } = Route.useLoaderData();

	return (
		<ToolLayout
			breadcrumbs={[
				{
					label: "เครื่องคำนวณ",
					href: "/tools/calculators",
				},
			]}
			title="เครื่องคำนวณ"
			description="เครื่องมือคำนวณที่ช่วยให้คุณทำการคำนวณต่างๆ ได้อย่างง่ายดาย"
			url={url}
		>
			<div className="grid grid-cols-3 gap-4">
				{TOOL_CATEGORIES.find(
					(category) => category.url === pathname,
				)?.items.map((tool) => (
					<Link to={tool.url}>
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
