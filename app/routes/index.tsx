import { ChevronRight, Shuffle } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { TOOL_CATEGORIES } from "@/constants";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const randomCategory =
      TOOL_CATEGORIES[Math.floor(Math.random() * TOOL_CATEGORIES.length)];
    const randomTool =
      randomCategory.items[
        Math.floor(Math.random() * randomCategory.items.length)
      ];
    const randomToolHref = randomTool.url;

    return {
      tools: TOOL_CATEGORIES,
      randomToolHref,
    };
  },
});

function RouteComponent() {
  const { tools, randomToolHref } = Route.useLoaderData();

  return (
    <>
      <section className="bg-primary/5 mb-16 border-b p-16">
        <h1 className="text-4xl mb-4 font-semibold">
          รวมมิตรเครื่องมือสารพัดประโยชน์
        </h1>
        <p className="text-muted-foreground mb-8">
          เว็บเดียวที่รวมทุกเครื่องมือที่คุณต้องใช้ในชีวิตประจำวัน ทั้งสะดวก
          ใช้ง่าย และฟรี
        </p>
        <Button asChild>
          <Link to={randomToolHref}>
            <Shuffle />
            สุ่มเครื่องมือ
          </Link>
        </Button>
      </section>
      <div className="space-y-8 px-16">
        {tools.map(({ name: category, items }) => (
          <section key={category}>
            <h2 className="font-semibold mb-4">{category}</h2>
            <div className="grid grid-cols-4 gap-4">
              {items.map((tool) => (
                <Link to={tool.url} key={tool.url}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
