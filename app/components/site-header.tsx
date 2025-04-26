import { Fragment, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Search } from "lucide-react";

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

export function SiteHeader() {
  const [activeCategory, setActiveCategory] = useState("");
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
    <>
      <header
        onMouseLeave={() => setActiveCategory("")}
        className="bg-background group sticky top-0 z-50 border-b border-dashed"
      >
        <div
          className={cn(
            "container mx-auto py-4 flex items-center justify-between",
            activeCategory && "border-transparent"
          )}
        >
          <div className="flex-1 flex">
            <Link
              onClick={() => setActiveCategory("")}
              to="/"
              className="inline-flex gap-2 items-center font-semibold"
            >
              <Logo />
              รวมมิตรเครื่องมือ
            </Link>
          </div>
          <nav className="hidden lg:flex">
            {TOOL_CATEGORIES.map((category) => (
              <div key={category.url}>
                <Button
                  onMouseEnter={() => setActiveCategory(category.url)}
                  asChild
                  onClick={() => setActiveCategory("")}
                  variant="ghost"
                  aria-expanded={activeCategory === category.url}
                  aria-haspopup={category.items.length > 0}
                >
                  <Link key={category.url} to={category.url}>
                    {category.name}
                    {category.items.length > 0 && (
                      <ChevronDown
                        className={cn(
                          "transition-transform",
                          activeCategory === category.url && "rotate-180"
                        )}
                        size={16}
                      />
                    )}
                  </Link>
                </Button>
                {category.items.length > 0 && (
                  <div
                    className={cn(
                      "hidden pb-4 bg-background absolute border-b top-full left-0 h-auto w-full",
                      activeCategory === category.url && "group-hover:block"
                    )}
                  >
                    <div className="container border-none mx-auto grid-cols-3 grid">
                      {category.items.map((item) => (
                        <Button
                          onClick={() => setActiveCategory("")}
                          variant="ghost"
                          key={item.url}
                          asChild
                        >
                          <Link to={item.url}>{item.title}</Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex-1 flex justify-end">
            <Button
              onClick={() => {
                setIsSearchOpen(true);
                setActiveCategory("");
              }}
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
                        <CommandItem asChild>
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
      <div
        className={cn(
          "bg-black/25 z-40 fixed inset-0 hidden",
          activeCategory && "block"
        )}
      />
    </>
  );
}
