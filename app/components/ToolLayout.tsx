import { SocialShare } from "@/components/SocialShare";
import { CATEGORY_LIST, CATEGORY_MAP } from "@/constants/categories";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
			return CATEGORY_LIST.map(([pathname, category]) => (
				<DropdownMenuItem
					key={pathname}
					asChild
					className={cn(pathname.endsWith(currentHref || "") && "bg-accent")}
				>
					<Link to={pathname}>{category.title}</Link>
				</DropdownMenuItem>
			));
		}

		const category = CATEGORY_MAP[categoryPathname as string];

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
			<div className="border-b border-dashed">
				<Breadcrumb className="container py-4">
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
			</div>
			<div className="container flex-1 py-8 space-y-8">
				<section>
					<h1 className="text-2xl font-semibold mb-2">{title}</h1>
					<p className="text-muted-foreground">{description}</p>
				</section>
				{children}
				{items && (
					<Accordion
						type="single"
						defaultValue="1"
						collapsible
						className="-space-y-px"
					>
						{items.map((item) => (
							<AccordionItem
								key={item.id}
								value={item.id}
								className="has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
							>
								<AccordionTrigger className="py-2 leading-6 hover:no-underline focus-visible:ring-0">
									{item.title}
								</AccordionTrigger>
								<AccordionContent className="text-muted-foreground pb-2">
									{item.content}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				)}
				<SocialShare url={url} text={title} />
			</div>
		</>
	);
}
