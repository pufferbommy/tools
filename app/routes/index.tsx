import { useForm } from "@tanstack/react-form";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Search, Shuffle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";

import ToolCard from "@/components/tool-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	CATEGORY_LIST,
	CATEGORY_MAP,
	type Category,
	type Tool,
} from "@/constants/categories";
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

		return {
			categories: CATEGORY_LIST,
			randomToolHref: randomTool.url,
		};
	},
});

function RouteComponent() {
	const { categories, randomToolHref } = Route.useLoaderData();

	const [searchQuery, setSearchQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState("");

	const totalToolCount = useMemo(
		() =>
			categories.reduce((sum, [_, category]) => category.tools.length + sum, 0),
		[categories],
	);

	const filteredTools = useMemo(() => {
		return categories
			.filter(
				([pathname]) => activeCategory === "" || pathname === activeCategory,
			)
			.flatMap(([_, category]) =>
				category.tools.filter((tool) => {
					const query = searchQuery.toLowerCase();
					return (
						!searchQuery ||
						tool.shortTitle.toLowerCase().includes(query) ||
						tool.description.toLowerCase().includes(query)
					);
				}),
			);
	}, [categories, searchQuery, activeCategory]);

	const handleSearch = useCallback((sq: string) => setSearchQuery(sq), []);
	const handleCategoryChange = useCallback(
		(category: string) => setActiveCategory(category),
		[],
	);

	return (
		<>
			<HeroSection randomToolHref={randomToolHref} />
			<section className="container space-y-4 pb-8">
				<SearchBar onSearch={handleSearch} />
				<CategoryFilter
					categories={categories}
					activeCategory={activeCategory}
					onCategoryChange={handleCategoryChange}
					totalToolCount={totalToolCount}
				/>
				<ToolGrid filteredTools={filteredTools} />
			</section>
		</>
	);
}

function HeroSection({ randomToolHref }: { randomToolHref: string }) {
	return (
		<section className="border-b border-dashed">
			<div className="container py-16 flex flex-col items-center text-center">
				<h1 className="text-4xl mb-4 font-semibold inline-block relative">
					รวมมิตรเครื่องมือ
					<AlphaBadge className="absolute bottom-[95%] left-[95%]" />
				</h1>
				<p className="text-muted-foreground mb-8">
					เว็บรวมเครื่องมือออนไลน์สารพัดประโยชน์ ใช้ง่าย
					<br />
					รวดเร็ว ครอบคลุมทุกอย่างที่คุณต้องการ และฟรี 100%
				</p>
				<Button asChild>
					<Link to={randomToolHref}>
						สุ่มเครื่องมือ
						<Shuffle />
					</Link>
				</Button>
			</div>
		</section>
	);
}

function AlphaBadge({ className }: { className?: string }) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<span
						title="ฟีเจอร์ยังอยู่ในระหว่างการพัฒนา อาจมีบางส่วนที่ไม่สมบูรณ์"
						className={cn(
							"text-xs py-1 px-2 animate-bounce rounded-full bg-primary/10 text-primary font-medium",
							className,
						)}
					>
						ALPHA
					</span>
				</TooltipTrigger>
				<TooltipContent>
					ฟีเจอร์ยังอยู่ในระหว่างการพัฒนา อาจมีบางส่วนที่ไม่สมบูรณ์
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

function SearchBar({
	onSearch,
}: {
	onSearch: (searchQuery: string) => void;
}) {
	const form = useForm({
		defaultValues: { searchQuery: "" },
		onSubmit: async ({ value }) => onSearch(value.searchQuery),
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className="-mt-5 bg-background flex gap-4"
		>
			<form.Field name="searchQuery">
				{(field) => (
					<div className="flex-1 relative">
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder="ค้นหาเครื่องมือ..."
							className="peer ps-9"
						/>
						<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
							<Search size={16} aria-hidden="true" />
						</div>
						<button
							type="reset"
							onClick={(event) => {
								event.preventDefault();
								form.reset();
								form.handleSubmit();
							}}
							className="text-muted-foreground/80 peer-placeholder-shown:hidden absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50"
						>
							<X size={16} aria-hidden="true" />
						</button>
					</div>
				)}
			</form.Field>
			<Button variant="outlinePrimary">ค้นหา</Button>
		</form>
	);
}

interface CategoryFilterProps {
	categories: [string, Category][];
	activeCategory: string;
	onCategoryChange: (category: string) => void;
	totalToolCount: number;
}

function CategoryFilter({
	categories,
	activeCategory,
	onCategoryChange,
	totalToolCount,
}: CategoryFilterProps) {
	return (
		<div className="space-x-2 flex flex-wrap gap-2">
			<Button
				size="xs"
				onClick={() => onCategoryChange("")}
				variant={activeCategory === "" ? "outlinePrimary" : "ghost"}
				className={cn(activeCategory !== "" && "border-transparent border")}
			>
				ทั้งหมด ({totalToolCount})
			</Button>
			{categories.map(([pathname, category]) => (
				<Button
					size="xs"
					onClick={() => onCategoryChange(pathname)}
					variant={activeCategory === pathname ? "outlinePrimary" : "ghost"}
					className={cn(
						activeCategory !== pathname && "border-transparent border",
					)}
					key={pathname}
				>
					{category.title} ({category.tools.length})
				</Button>
			))}
		</div>
	);
}

function ToolGrid({
	filteredTools,
}: {
	filteredTools: Tool[];
}) {
	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<AnimatePresence initial={false}>
				{filteredTools.map((tool) => (
					<ToolCard key={tool.url} tool={tool} />
				))}
			</AnimatePresence>
		</div>
	);
}
