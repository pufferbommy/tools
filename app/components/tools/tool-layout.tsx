import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

import { SocialShare } from "@/components/social-share";
import {
	TOOL_CATEGORY_LIST,
	TOOL_CATEGORY_MAP,
} from "@/constants/tool-categories";
import { cn } from "@/lib/utils";
import Asterisk from "@/components/icons/asterisk";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
			<div className="h-px w-full bg-border sticky top-[68px]" />
			<div className="container h-px sticky top-[68px] -mt-px bg-background" />
			<Breadcrumb className="[--rd:calc(var(--radius)-2px)] before:absolute before:size-(--rd) before:aspect-square before:z-10 before:shadow-[calc(var(--rd)*-0.25)_calc(var(--rd)*0.25)_var(--background)] before:rounded-bl-full before:border-l before:border-border before:border-b before:-left-px before:-bottom-px after:absolute after:size-2 after:aspect-square after:z-10 after:shadow-[0.125rem_0.125rem_var(--background)] after:rounded-br-full after:border-r after:border-border after:border-b after:-right-px after:-bottom-px container lg:border-x -mt-px relative py-4">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to="/">หน้าแรก</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					{breadcrumbs.map((item, i) => (
						<Fragment key={item.href}>
							<BreadcrumbSeparator>/</BreadcrumbSeparator>
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
				<div className="[--rd:calc(var(--radius)-2px)] absolute size-(--rd) aspect-square z-10 shadow-[calc(var(--rd)*0.25)_calc(var(--rd)*-0.25)_var(--background)] rounded-tr-full border-r border-border border-t left-0 -translate-x-full -top-px" />
				<div className="[--rd:calc(var(--radius)-2px)] absolute size-(--rd) aspect-square z-10 shadow-[calc(var(--rd)*-0.25)_calc(var(--rd)*-0.25)_var(--background)] rounded-tl-full border-l border-border border-t right-0 translate-x-full -top-px" />
			</Breadcrumb>
			<div className="container h-px sticky rounded-bl-md top-[68px] bg-border" />
			<div className="container space-y-8 pt-8">
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
