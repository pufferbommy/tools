import { TOOL_CATEGORIES } from "@/constants";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
} from "@/components/ui/sidebar";
import { Label } from "./ui/label";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const data = {
  navMain: TOOL_CATEGORIES.map((category) => ({
    title: category.name,
    icon: category.icon,
    isActive: true,
    items: category.items.map((tool) => ({
      title: tool.title,
      url: tool.url,
    })),
  })),
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [search, setSearch] = useState("");

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent className="relative">
            <Label htmlFor="search" className="sr-only">
              ค้นหา
            </Label>
            <SidebarInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาเครื่องมือ..."
              className="pl-8 peer"
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            <SidebarGroupAction
              onClick={() => setSearch("")}
              className="top-1/2 -translate-y-1/2 right-2 peer-placeholder-shown:opacity-0 peer-placeholder-shown:pointer-events-none transition-opacity"
            >
              <X />
            </SidebarGroupAction>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain.map((category) => ({
            ...category,
            items: category.items.filter((item) =>
              item.title.toLowerCase().includes(search.toLowerCase())
            ),
          }))}
        />
      </SidebarContent>
    </Sidebar>
  );
}
