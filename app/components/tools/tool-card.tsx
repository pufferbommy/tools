import { Link } from "@tanstack/react-router";

import type { Tool } from "@/types/index";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import SoftStar from "../icons/soft-star";

export default function ToolCard({ tool }: { tool: Tool }) {
	return (
		<Link to={tool.url} className="h-full rounded-md">
			<Card className="h-full transition-all hover:border-primary group hover:shadow-[0_0_0.25rem_var(--primary)]">
				<CardHeader>
					<CardTitle className="group-hover:text-primary transition-colors flex items-center gap-1">
						{tool.title}
						<SoftStar className="scale-0 group-hover:scale-100 transition-transform" />
					</CardTitle>
					<CardDescription className="line-clamp-2">
						{tool.description}
					</CardDescription>
				</CardHeader>
			</Card>
		</Link>
	);
}
