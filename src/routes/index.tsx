import { Shuffle } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { TOOL_CATEGORIES } from "~/constants";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const randomCategory =
      TOOL_CATEGORIES[Math.floor(Math.random() * TOOL_CATEGORIES.length)];
    const randomTool =
      randomCategory.items[
        Math.floor(Math.random() * randomCategory.items.length)
      ];
    const randomToolHref = randomTool.href;

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
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            รวมมิตรเครื่องมือสารพัดประโยชน์
          </h1>
          <p className="text-base-content/75">
            เว็บเดียวที่รวมทุกเครื่องมือที่คุณต้องใช้ในชีวิตประจำวัน ทั้งสะดวก
            ใช้ง่าย และฟรี
          </p>
        </div>
        <Link to={randomToolHref} className="btn btn-primary">
          <Shuffle size={16} />
          สุ่มเครื่องมือ
        </Link>
      </section>
      <section className="space-y-4">
        {tools.map(({ category, items }) => (
          <div key={category} className="space-y-2">
            <h2 className="font-bold text-lg">
              {category} ({items.length})
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {items.map((tool) => (
                <Link
                  to={tool.href}
                  key={tool.href}
                  className="card card-border"
                >
                  <div className="card-body">
                    <h2 className="card-title">{tool.title}</h2>
                    <p className="text-base-content/75">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
