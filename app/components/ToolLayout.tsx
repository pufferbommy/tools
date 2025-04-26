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
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {i < props.breadcrumbs.length - 1 ? (
                    <BreadcrumbLink asChild>
                      <Link to={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </>
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
