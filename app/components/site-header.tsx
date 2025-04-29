import { Menu, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Fragment, useEffect, useState } from "react";

import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { TOOL_CATEGORIES } from "@/constants";
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

export function SiteHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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
                <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
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
        <div className="flex-1 flex justify-end">
          <Button
            onClick={() => setIsSearchOpen(true)}
            variant="ghost"
            size="icon"
          >
            <Search />
          </Button>
          <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
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
                          onClick={() => setIsSearchOpen(false)}
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
              <Button className="lg:hidden" variant="ghost" size="icon">
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
        </div>
      </div>
    </header>
  );
}
