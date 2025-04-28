import ToolLayout from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { TOOL_CATEGORIES } from "@/constants";
import { getOrigin } from "@/lib/get-origin";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/random/")({
  component: RouteComponent,
  loader: async (context) => {
    const origin = await getOrigin();
    const pathname = context.location.pathname;
    const url = `${origin}${pathname}`;
    return { url, pathname };
  },
});

function RouteComponent() {
  const { url, pathname } = Route.useLoaderData();

  return (
    <ToolLayout
      breadcrumbs={[
        {
          label: "เครื่องสุ่ม",
          href: "/tools/calculators",
        },
      ]}
      title="เครื่องสุ่ม"
      description="เครื่องมือสุ่มแบบต่างๆ"
      url={url}
    >
      <div className="grid grid-cols-3 gap-4">
        {TOOL_CATEGORIES.find(
          (category) => category.url === pathname
        )?.items.map((tool) => (
          <Link to={tool.url}>
            <Card className="hover:bg-primary/10 transition-colors hover:border-primary">
              <CardContent className="font-medium text-center">
                {tool.title}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </ToolLayout>
  );
}
