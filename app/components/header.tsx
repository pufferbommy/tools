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
import { CATEGORY_LIST } from "@/constants/categories";

import ThemeSwitcher from "./theme-switcher";
import { Button } from "./ui/button";

export default function Header() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<header className="bg-background group sticky top-0 z-50 border-b border-dashed">
			<div className="container py-3 flex items-center">
				<div className="flex-1 flex">
					<Link to="/" className="inline-flex gap-2 items-center font-semibold">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height={32}
							viewBox="0 0 240 297"
							fill="none"
						>
							<title>Logo</title>
							<g clipPath="url(#a)">
								<path
									fill="#00BBA0"
									d="M239.904 59.109 215.843 0h-29.242l11.45 31.978-11.45 19.83h-29.417l-11.45-19.83L157.184 0h-29.242l-24.056 59.109 34.127 59.109h10.881v114.231c0 11.677 9.467 21.14 21.144 21.14h3.713c11.677 0 21.145-9.468 21.145-21.14V118.218h10.884l34.128-59.11z"
								/>
								<path
									fill="#FF507E"
									d="M171.28 96.362v-2.59c0-11.793-11.296-21.35-25.234-21.35H25.234C11.296 72.422 0 81.979 0 93.772v2.59c0 11.793 11.296 21.35 25.234 21.35C11.296 117.712 0 127.274 0 139.067v2.59c0 11.793 11.296 21.35 25.234 21.35C11.296 163.007 0 172.569 0 184.358v2.59c0 11.793 11.296 21.35 25.234 21.35C11.296 208.303 0 217.86 0 229.653v2.59c0 11.793 11.296 21.35 25.234 21.35H146.05c13.933 0 25.234-9.557 25.234-21.35v-2.59c0-11.793-11.296-21.35-25.234-21.35 13.933 0 25.234-9.558 25.234-21.351v-2.59c0-11.793-11.296-21.35-25.234-21.35 13.933 0 25.234-9.558 25.234-21.35v-2.591c0-11.793-11.296-21.35-25.234-21.35 13.933 0 25.234-9.557 25.234-21.35z"
								/>
								<path
									fill="#fff"
									d="M108.489 160.884c8.135 0 14.73-10.867 14.73-24.271s-6.595-24.27-14.73-24.27-14.73 10.866-14.73 24.27 6.595 24.271 14.73 24.271"
								/>
								<mask
									id="b"
									width={31}
									height={49}
									x={93}
									y={112}
									maskUnits="userSpaceOnUse"
									style={{
										maskType: "luminance",
									}}
								>
									<path
										fill="#fff"
										d="M108.489 160.884c8.135 0 14.73-10.867 14.73-24.271s-6.595-24.27-14.73-24.27-14.73 10.866-14.73 24.27 6.595 24.271 14.73 24.271"
									/>
								</mask>
								<g mask="url(#b)">
									<path
										fill="#231F20"
										d="M117.006 160.884c8.135 0 14.73-10.867 14.73-24.271s-6.595-24.27-14.73-24.27-14.73 10.866-14.73 24.27 6.595 24.271 14.73 24.271"
									/>
								</g>
								<path
									fill="#fff"
									d="M62.791 160.884c8.136 0 14.73-10.867 14.73-24.271s-6.594-24.27-14.73-24.27-14.73 10.866-14.73 24.27 6.595 24.271 14.73 24.271"
								/>
								<mask
									id="c"
									width={30}
									height={49}
									x={48}
									y={112}
									maskUnits="userSpaceOnUse"
									style={{
										maskType: "luminance",
									}}
								>
									<path
										fill="#fff"
										d="M62.791 160.884c8.136 0 14.73-10.867 14.73-24.271s-6.594-24.27-14.73-24.27-14.73 10.866-14.73 24.27 6.595 24.271 14.73 24.271"
									/>
								</mask>
								<g mask="url(#c)">
									<path
										fill="#231F20"
										d="M71.304 160.884c8.135 0 14.73-10.867 14.73-24.271s-6.595-24.27-14.73-24.27-14.73 10.866-14.73 24.27 6.595 24.271 14.73 24.271"
									/>
								</g>
								<path
									fill="#FFA128"
									d="M44.267 253.593v17.822h-13.5c-7.066 0-12.791 5.725-12.791 12.79 0 7.066 5.725 12.791 12.79 12.791h51.928v-43.403z"
								/>
								<path
									fill="#4CAADF"
									d="M99.368 253.593v17.822H85.867c-7.065 0-12.79 5.725-12.79 12.79 0 7.066 5.725 12.791 12.79 12.791h51.928v-43.403z"
								/>
							</g>
							<defs>
								<clipPath id="a">
									<path fill="#fff" d="M0 0h239.904v297H0z" />
								</clipPath>
							</defs>
						</svg>
						รวมมิตรเครื่องมือ
					</Link>
				</div>
				<NavigationMenu className="hidden lg:flex">
					<NavigationMenuList>
						{CATEGORY_LIST.map(([pathname, category]) => (
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
							{CATEGORY_LIST.map(([pathname, category]) => (
								<div key={pathname} className="flex flex-col">
									<Button
										asChild
										onClick={() => setIsDrawerOpen(false)}
										variant="ghost"
										className="font-semibold justify-start"
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
