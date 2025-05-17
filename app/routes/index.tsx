import { Link, createFileRoute } from "@tanstack/react-router";
import { Search, Shuffle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { CATEGORY_MAP } from "@/constants/categories";
import { useSearchContext } from "@/contexts/search";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	loader: async () => {
		const categoryKeys = Object.keys(CATEGORY_MAP);
		const randomCategory =
			CATEGORY_MAP[
				categoryKeys[Math.floor(Math.random() * categoryKeys.length)]
			];
		const randomTool =
			randomCategory.tools[
				Math.floor(Math.random() * randomCategory.tools.length)
			];
		const randomToolHref = randomTool.url;

		return {
			categories: CATEGORY_MAP,
			randomToolHref,
		};
	},
});

function RouteComponent() {
	const { categories, randomToolHref } = Route.useLoaderData();

	const { setIsDialogOpen } = useSearchContext();
	const [activeCategory, setActiveCategory] = useState<string | null>(null);

	const filteredCategories = activeCategory
		? Object.entries(categories).filter(
				([pathname]) => pathname === activeCategory,
			)
		: Object.entries(categories);

	return (
		<>
			<section className="border-b border-dashed">
				<div className="container py-16">
					<h1 className="text-4xl mb-4 font-semibold inline-block relative">
						รวมมิตรเครื่องมือ
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<span
										title="ฟีเจอร์ยังอยู่ในระหว่างการพัฒนา อาจมีบางส่วนที่ไม่สมบูรณ์"
										className="text-xs py-1 px-2 absolute animate-bounce rounded-full top-0 left-[calc(100%+0.5rem)] bg-primary/10 text-primary font-medium"
									>
										ALPHA
									</span>
								</TooltipTrigger>
								<TooltipContent>
									ฟีเจอร์ยังอยู่ในระหว่างการพัฒนา อาจมีบางส่วนที่ไม่สมบูรณ์
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</h1>
					<p className="text-muted-foreground mb-8">
						เว็บรวมเครื่องมือออนไลน์สารพัดประโยชน์ ใช้ง่าย รวดเร็ว ครอบคลุมทุกอย่างที่คุณต้องการ
						และฟรี 100%
					</p>
					<div className="flex sm:flex-row flex-col gap-4">
						<Button asChild>
							<Link to={randomToolHref}>
								<Shuffle />
								สุ่มเครื่องมือ
							</Link>
						</Button>
						<Button
							onClick={() => setIsDialogOpen(true)}
							className="sm:w-60 justify-start relative text-muted-foreground hover:text-muted-foreground"
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
				<ScrollArea className="container">
					<div className="space-x-4 w-max py-4">
						<Button
							variant={activeCategory === null ? "outline" : "secondary"}
							onClick={() => setActiveCategory(null)}
							className={cn(
								activeCategory !== null
									? "border-secondary border hover:border-secondary/90"
									: "hover:bg-inherit",
							)}
						>
							ทั้งหมด (
							{Object.entries(categories).reduce(
								(sum, [_, category]) => category.tools.length + sum,
								0,
							)}
							)
						</Button>
						{Object.entries(categories).map(([pathname, category]) => (
							<Button
								onClick={() => setActiveCategory(pathname)}
								variant={activeCategory === pathname ? "outline" : "secondary"}
								key={pathname}
								className={cn(
									activeCategory !== pathname
										? "border-secondary border hover:border-secondary/90"
										: "hover:bg-inherit",
								)}
							>
								{category.title} ({category.tools.length})
							</Button>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
			<div className="container px-0 flex-1 space-y-8 py-8">
				<div className="grid px-8 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<AnimatePresence initial={false}>
						{filteredCategories.map(([_, category]) =>
							category.tools.map((tool) => (
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
									transition={{
										duration: 0.15,
									}}
								>
									<Link to={tool.url} className="h-full block">
										<Card className="hover:bg-primary/10 h-full justify-center transition-colors hover:border-primary">
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
