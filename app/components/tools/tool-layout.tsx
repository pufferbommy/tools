import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

import { SocialShare } from "@/components/social-share";
import {
	TOOL_CATEGORY_LIST,
	TOOL_CATEGORY_MAP,
} from "@/constants/tool-categories";
import { cn } from "@/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Asterisk from "../icons/asterisk";

interface ToolLayoutProps {
	title: string;
	description: string;
	url: string;
	breadcrumbs: {
		label: string;
		href?: string;
	}[];
	children: React.ReactNode;
	items?: {
		id: string;
		title: string;
		content: React.ReactNode;
	}[];
}

export default function ToolLayout({
	title,
	description,
	url,
	breadcrumbs,
	children,
	items,
}: ToolLayoutProps) {
	const categoryPathname = url.match(/\/tools\/[^\/]+/)?.[0];
	const isCategory = /\/tools\/[^\/]+\/?$/.test(url);

	const renderBreadcrumbDropdown = (currentHref?: string) => {
		if (isCategory) {
			return TOOL_CATEGORY_LIST.map(([pathname, category]) => (
				<DropdownMenuItem
					key={pathname}
					asChild
					className={cn(pathname.endsWith(currentHref || "") && "bg-accent")}
				>
					<Link to={pathname}>{category.title}</Link>
				</DropdownMenuItem>
			));
		}

		const category = TOOL_CATEGORY_MAP[categoryPathname as string];

		return category.tools.map((tool) => (
			<DropdownMenuItem
				key={tool.url}
				asChild
				className={cn(tool.url.endsWith(currentHref || "") && "bg-accent")}
			>
				<Link to={tool.url}>{tool.title}</Link>
			</DropdownMenuItem>
		));
	};

	return (
		<>
			<Breadcrumb className="container pt-4">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to="/">หน้าแรก</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					{breadcrumbs.map((item, i) => (
						<Fragment key={item.href}>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								{i < breadcrumbs.length - 1 ? (
									<BreadcrumbLink asChild>
										<Link to={item.href}>{item.label}</Link>
									</BreadcrumbLink>
								) : (
									<BreadcrumbPage>
										<DropdownMenu>
											<DropdownMenuTrigger>{item.label}</DropdownMenuTrigger>
											<DropdownMenuContent>
												{renderBreadcrumbDropdown(item.href)}
											</DropdownMenuContent>
										</DropdownMenu>
									</BreadcrumbPage>
								)}
							</BreadcrumbItem>
						</Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
			<div className="container pt-8 flex-1 space-y-8 pb-8">
				<section>
					<h1 className="font-bold text-2xl mb-2 inline-flex gap-2 items-center">
						<Asterisk />
						{title}
						<Asterisk />
					</h1>
					<h2 className="text-muted-foreground">{description}</h2>
				</section>
				{children}
				{items && (
					<Accordion
						type="single"
						defaultValue="1"
						collapsible
						className="text-muted-foreground"
					>
						{items.map((item) => (
							<AccordionItem key={item.id} value={item.id}>
								<AccordionTrigger>{item.title}</AccordionTrigger>
								<AccordionContent>{item.content}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				)}
				<SocialShare url={url} text={title} />
			</div>
		</>
	);
}
