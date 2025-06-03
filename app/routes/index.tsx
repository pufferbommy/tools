import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";

import ToolCard from "@/components/tools/tool-card";

import Asterisk from "@/components/icons/asterisk";
import PlainLogo from "@/components/icons/plain-logo";
import ToolLogo from "@/components/icons/tool-logo";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { TOOL_CATEGORY_LIST, popularTools } from "@/constants/tool-categories";
import { getOrigin } from "@/utils/get-origin";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	loader: ({ location }) => ({
		url: `${getOrigin()}${location.pathname}`,
		toolCategoryList: TOOL_CATEGORY_LIST,
	}),
	head: ({ loaderData }) => ({
		links: [
			{
				rel: "canonical",
				href: loaderData.url,
			},
		],
	}),
});

function RouteComponent() {
	const { toolCategoryList } = Route.useLoaderData();

	const toolsSectionRef = useRef<HTMLDivElement>(null);

	const handleStartUsing = () => {
		toolsSectionRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	};

	return (
		<>
			<section className="container py-16 flex gap-2 flex-col items-center text-center">
				<div className="flex flex-col items-end">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild aria-hidden="true">
								<span
									title="ฟีเจอร์ยังอยู่ในระหว่างการพัฒนา อาจมีบางส่วนที่ไม่สมบูรณ์"
									className="text-xs py-1 px-2 animate-bounce rounded-full bg-[#FFE2E8] text-[#FF507E] font-normal"
								>
									ALPHA
								</span>
							</TooltipTrigger>
							<TooltipContent>
								ฟีเจอร์ยังอยู่ในระหว่างการพัฒนา อาจมีบางส่วนที่ไม่สมบูรณ์
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<div className="flex items-center gap-4">
						<PlainLogo />
						<h1 className="text-[40px] font-bold">รวมมิตรเครื่องมือ</h1>
						<ToolLogo />
					</div>
				</div>
				<h2 className="text-muted-foreground mb-2">
					รวมเครื่องมือออนไลน์ฟรีสารพัดประโยชน์
					<br />
					ครบครันทุกหมวดหมู่ ใช้งานง่าย รวดเร็ว ไม่ต้องสมัครสมาชิก
				</h2>
				<Button onClick={handleStartUsing}>เริ่มต้นใช้งาน</Button>
			</section>
			<section
				ref={toolsSectionRef}
				className="space-y-16 pb-16 container scroll-mt-[calc(69px+1rem)]"
			>
				<article className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="font-bold text-xl inline-flex gap-2 items-center">
							<Asterisk />
							ยอดนิยม
							<Asterisk />
						</h3>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
						{popularTools.map((tool) => (
							<ToolCard key={tool.url} tool={tool} />
						))}
					</div>
				</article>
				{toolCategoryList.map(([pathname, category]) => (
					<article key={pathname} className="space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="font-bold text-xl inline-flex gap-2 items-center">
								<Asterisk />
								{category.title}
								<Asterisk />
							</h3>
							<Link
								to={pathname}
								className="text-sm inline-flex items-center text-secondary gap-2"
							>
								ดูทั้งหมด
								<ChevronRight size={16} />
							</Link>
						</div>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
							{category.tools.slice(0, 6).map((tool) => (
								<ToolCard key={tool.url} tool={tool} />
							))}
						</div>
					</article>
				))}
			</section>
		</>
	);
}
