import { Link, useNavigate } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { TOOL_CATEGORY_LIST } from "@/constants/tool-categories";

import Logo from "./logo";
import ThemeSwitcher from "./theme-switcher";
import { Button } from "./ui/button";

export default function Header() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<header className="bg-background sticky top-0 z-50 border-b border-dashed">
			<div className="container py-4 flex items-center">
				<div className="flex-1 flex">
					<Link to="/" className="inline-flex gap-2 items-center font-bold">
						<Logo />
						รวมมิตรเครื่องมือ
					</Link>
				</div>
				<NavigationMenu className="hidden lg:flex">
					<NavigationMenuList>
						{TOOL_CATEGORY_LIST.map(([pathname, category]) => (
							<NavigationMenuItem key={pathname} value={pathname}>
								<NavigationMenuTrigger
									onClick={() => {
										navigate({
											to: pathname,
										});
									}}
								>
									{category.title}
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
										{category.tools.map((tool) => (
											<li key={tool.url}>
												<NavigationMenuLink asChild>
													<Link
														to={tool.url}
														className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm font-medium"
													>
														{tool.shortTitle}
													</Link>
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
				<div className="flex-1 gap-2 flex justify-end">
					<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
						<DrawerTrigger asChild>
							<Button
								aria-label="Open menu"
								className="lg:hidden"
								variant="ghost"
								size="icon"
							>
								<Menu />
							</Button>
						</DrawerTrigger>
						<DrawerContent className="px-4">
							{TOOL_CATEGORY_LIST.map(([pathname, category]) => (
								<div key={pathname} className="flex flex-col">
									<Button
										asChild
										onClick={() => setIsDrawerOpen(false)}
										variant="ghost"
										className="font-bold justify-start"
									>
										<Link key={pathname} to={pathname}>
											{category.title}
										</Link>
									</Button>
									{category.tools.map((tool) => (
										<Button
											onClick={() => setIsDrawerOpen(false)}
											variant="ghost"
											key={tool.url}
											className="justify-start"
											asChild
										>
											<Link to={tool.url}>{tool.title}</Link>
										</Button>
									))}
								</div>
							))}
						</DrawerContent>
					</Drawer>
					<ThemeSwitcher />
				</div>
			</div>
		</header>
	);
}
