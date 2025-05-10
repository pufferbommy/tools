import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import { Fragment, useState } from "react";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { TOOL_CATEGORIES } from "@/constants";
import { useSearchContext } from "@/contexts/search";

import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import { Button } from "./ui/button";

export function SiteHeader() {
	const { isDialogOpen, setIsDialogOpen } = useSearchContext();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<header className="bg-background group sticky top-0 z-50 border-b border-dashed">
			<div className="container mx-auto py-4 flex items-center">
				<div className="flex-1 flex">
					<Link to="/" className="inline-flex gap-2 items-center font-semibold">
						<Logo />
						รวมมิตรเครื่องมือ
					</Link>
				</div>
				<NavigationMenu className="hidden lg:flex">
					<NavigationMenuList>
						{TOOL_CATEGORIES.map((category) => (
							<NavigationMenuItem key={category.url} value={category.url}>
								<NavigationMenuTrigger
									className="cursor-pointer"
									onClick={() => {
										navigate({
											to: category.url,
										});
									}}
								>
									{category.name}
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
										{category.items.map((item) => (
											<li key={item.url}>
												<NavigationMenuLink asChild>
													<Link
														to={item.url}
														className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm font-medium"
													>
														{item.title}
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
					<Button
						aria-label="Open search dialog"
						onClick={() => setIsDialogOpen(true)}
						variant="ghost"
						size="icon"
					>
						<Search />
					</Button>
					<CommandDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<CommandInput placeholder="ค้นหาเครื่องมือ..." />
						<CommandList>
							<CommandEmpty>ไม่พบเครื่องมือที่ค้นหา</CommandEmpty>
							{TOOL_CATEGORIES.map((category, index) => (
								<Fragment key={category.url}>
									{index > 0 && <CommandSeparator />}
									<CommandGroup heading={category.name}>
										{category.items.map((item) => (
											<CommandItem key={item.url} asChild>
												<Link
													to={item.url}
													onClick={() => setIsDialogOpen(false)}
												>
													{item.title}
												</Link>
											</CommandItem>
										))}
									</CommandGroup>
								</Fragment>
							))}
						</CommandList>
					</CommandDialog>
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
							{TOOL_CATEGORIES.map((category) => (
								<div key={category.url} className="flex flex-col">
									<Button
										asChild
										onClick={() => setIsDrawerOpen(false)}
										variant="ghost"
										className="font-semibold justify-start"
									>
										<Link key={category.url} to={category.url}>
											{category.name}
										</Link>
									</Button>
									{category.items.map((item) => (
										<Button
											onClick={() => setIsDrawerOpen(false)}
											variant="ghost"
											key={item.url}
											className="justify-start"
											asChild
										>
											<Link to={item.url}>{item.title}</Link>
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
