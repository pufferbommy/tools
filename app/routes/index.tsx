import { SearchIcon, Shuffle } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { TOOL_CATEGORIES } from "@/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { cn } from "@/lib/utils";

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

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  return (
    <>
      <section className="border-b border-dashed">
        <div className="container py-16">
          <h1 className="text-4xl mb-4 font-semibold">
            รวมมิตรเครื่องมือสารพัดประโยชน์
          </h1>
          <p className="text-muted-foreground mb-8">
            เว็บเดียวที่รวมทุกเครื่องมือที่คุณต้องใช้ในชีวิตประจำวัน ทั้งสะดวก
            ใช้ง่าย และฟรี
          </p>
          <Button asChild variant="secondary">
            <Link to={randomToolHref}>
              <Shuffle />
              สุ่มเครื่องมือ
            </Link>
          </Button>
        </div>
      </section>
      <div className="border-b border-dashed">
        <div className="container py-4 space-x-4 overflow-x-auto whitespace-nowrap">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            onClick={() => setActiveCategory(null)}
            className={cn(
              activeCategory === null &&
                "border-primary border hover:border-primary/90"
            )}
          >
            ทั้งหมด
          </Button>
          {tools.map((category) => (
            <Button
              onClick={() => setActiveCategory(category.url)}
              variant={activeCategory === category.url ? "default" : "outline"}
              key={category.url}
              className={cn(
                activeCategory === category.url &&
                  "border-primary border hover:border-primary/90"
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="container px-0 flex-1 space-y-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid px-8 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {tools
              .filter((category) =>
                activeCategory === null ? true : category.url === activeCategory
              )
              .map((category) =>
                category.items.map((tool) => (
                  <motion.div key={tool.url} layout variants={itemVariants}>
                    <Link to={tool.url}>
                      <Card className="hover:bg-primary/10 transition-colors hover:border-primary">
                        <CardContent className="font-medium text-center">
                          {tool.title}
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))
              )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
