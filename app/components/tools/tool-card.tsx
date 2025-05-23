import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import type { Tool } from "@/types";

export default function ToolCard({
	tool,
	noAnimation,
}: { tool: Tool; noAnimation?: boolean }) {
	const MotionLink = motion.create(Link);

	const variants = {
		visible: { opacity: 1, scale: 1 },
		hidden: { opacity: 0, scale: 0 },
	};

	const linkProps = noAnimation
		? {}
		: {
				layout: true,
				variants,
				initial: "hidden",
				animate: "visible",
				exit: "hidden",
				transition: { duration: 0.15 },
			};

	const LinkComponent = noAnimation ? Link : MotionLink;

	return (
		<LinkComponent to={tool.url} className="h-full rounded-md" {...linkProps}>
			<Card className="h-full shadow-[0_-0.125rem_0_inset] transition-colors hover:border-primary [--tw-shadow-color:oklch(from_var(--border)_l_c_h_/_0.5)] hover:shadow-[0.25rem_0.25rem_0]">
				<CardHeader>
					<CardTitle>{tool.shortTitle}</CardTitle>
					<CardDescription className="line-clamp-2">
						{tool.description}
					</CardDescription>
				</CardHeader>
			</Card>
		</LinkComponent>
	);
}
