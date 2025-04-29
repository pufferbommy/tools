import { Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Home } from "lucide-react";
import { SocialShare } from "@/components/SocialShare";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { TOOL_CATEGORIES } from "@/constants";
import { Fragment } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  url: string;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
}

export default function ToolLayout(props: ToolLayoutProps) {
  return (
    <>
      <div className="border-b border-dashed">
        <Breadcrumb className="container py-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">
                  <Home size={14} />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {props.breadcrumbs.map((item, i) => (
              <Fragment key={item.href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {i < props.breadcrumbs.length - 1 ? (
                    <BreadcrumbLink asChild>
                      <Link to={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>
                      <DropdownMenu>
                        <DropdownMenuTrigger>{item.label}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {TOOL_CATEGORIES.some((c) => c.url === item.href)
                            ? TOOL_CATEGORIES.map((c) => (
                                <DropdownMenuItem key={c.url} asChild>
                                  <Link to={c.url}>{c.name}</Link>
                                </DropdownMenuItem>
                              ))
                            : TOOL_CATEGORIES.find((c) =>
                                c.items.find((i) => i.url === item.href)
                              )?.items.map((item) => (
                                <DropdownMenuItem key={item.url} asChild>
                                  <Link to={item.url}>{item.title}</Link>
                                </DropdownMenuItem>
                              ))}
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
          <h1 className="text-2xl font-semibold mb-2">{props.title}</h1>
          <p className="text-muted-foreground">{props.description}</p>
        </section>
        {props.children}
        <SocialShare url={props.url} text={props.title} />
      </div>
    </>
  );
}
