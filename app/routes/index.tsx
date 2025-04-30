import { Link, createFileRoute } from "@tanstack/react-router";
import { Search, Shuffle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TOOL_CATEGORIES } from "@/constants";
import { useSearchContext } from "@/contexts/search";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	loader: async () => {
		const randomCategory =
			TOOL_CATEGORIES[Math.floor(Math.random() * TOOL_CATEGORIES.length)];
		const randomTool =
			randomCategory.items[
				Math.floor(Math.random() * randomCategory.items.length)
			];
		const randomToolHref = randomTool.url;

		return {
			tools: TOOL_CATEGORIES,
			randomToolHref,
		};
	},
});

function RouteComponent() {
	const { tools, randomToolHref } = Route.useLoaderData();

	const { setIsDialogOpen } = useSearchContext();
	const [activeCategory, setActiveCategory] = useState<string | null>(null);

	return (
		<>
			<section className="border-b border-dashed">
				<div className="container py-16">
					<h1 className="text-4xl mb-4 font-semibold">
						รวมมิตรเครื่องมือสารพัดประโยชน์
					</h1>
					<p className="text-muted-foreground mb-8">
						เว็บเดียวที่รวมทุกเครื่องมือที่คุณต้องใช้ในชีวิตประจำวัน ทั้งสะดวก ใช้ง่าย และฟรี
					</p>
					<div className="flex gap-4">
						<Button asChild>
							<Link to={randomToolHref}>
								<Shuffle />
								สุ่มเครื่องมือ
							</Link>
						</Button>
						<Button
							onClick={() => setIsDialogOpen(true)}
							className="w-60 justify-start relative text-muted-foreground hover:text-muted-foreground"
							variant="outline"
						>
							<Search />
							ค้นหาเครื่องมือ...
							<kbd className="text-xs ml-auto">
								<span>⌘</span>K
							</kbd>
						</Button>
					</div>
				</div>
			</section>
			<div className="border-b border-dashed">
				<div className="container py-4 space-x-4 overflow-x-auto whitespace-nowrap">
					<Button
						variant={activeCategory === null ? "outline" : "secondary"}
						onClick={() => setActiveCategory(null)}
						className={cn(
							activeCategory !== null
								? "border-secondary border hover:border-secondary/90"
								: "hover:bg-inherit",
						)}
					>
						ทั้งหมด
					</Button>
					{tools.map((category) => (
						<Button
							onClick={() => setActiveCategory(category.url)}
							variant={
								activeCategory === category.url ? "outline" : "secondary"
							}
							key={category.url}
							className={cn(
								activeCategory !== category.url
									? "border-secondary border hover:border-secondary/90"
									: "hover:bg-inherit",
							)}
						>
							{category.name}
						</Button>
					))}
				</div>
			</div>
			<div className="container px-0 flex-1 space-y-8 py-8">
				<div className="grid px-8 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<AnimatePresence>
						{tools
							.filter((category) =>
								activeCategory === null
									? true
									: category.url === activeCategory,
							)
							.map((category) =>
								category.items.map((tool) => (
									<motion.div
										key={tool.url}
										layout
										initial={{
											opacity: 0,
											scale: 0,
										}}
										animate={{
											opacity: 1,
											scale: 1,
										}}
										exit={{
											opacity: 0,
											scale: 0,
										}}
									>
										<Link to={tool.url}>
											<Card className="hover:bg-primary/10 transition-colors hover:border-primary">
												<CardContent className="font-medium text-center">
													{tool.title}
												</CardContent>
											</Card>
										</Link>
									</motion.div>
								)),
							)}
					</AnimatePresence>
				</div>
			</div>
		</>
	);
}
