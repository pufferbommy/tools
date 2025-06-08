import { Link } from "@tanstack/react-router";

import type { Tool } from "@/types/index";
import SoftStar from "@/components/icons/soft-star";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function ToolCard({ tool }: { tool: Tool }) {
	return (
		<Card asChild className="hover:border-primary group">
			<Link to={tool.url}>
				<CardHeader>
					<CardTitle className="group-hover:text-primary transition-colors flex items-center gap-1">
						{tool.title}
						<SoftStar className="scale-0 group-hover:scale-100 transition-transform" />
					</CardTitle>
					<CardDescription className="line-clamp-2">
						{tool.description}
					</CardDescription>
				</CardHeader>
			</Link>
		</Card>
	);
}
