import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { getOrigin } from "@/lib/get-origin";
import { FormSchema, FormSection } from "./-components/FormSection";

import RandomResultCard from "./-components/RandomResultCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ToolLayout from "@/components/ToolLayout";

const items = [
  {
    id: "1",
    title: "วิธีการใช้งาน",
    content: (
      <ol className="list-decimal list-inside space-y-2">
        <li>ระบุช่วงตัวเลขที่ต้องการสุ่ม (ต่ำสุด - สูงสุด)</li>
        <li>คลิกปุ่ม "สุ่ม" เพื่อสร้างตัวเลขแบบสุ่ม</li>
        <li>ดูผลลัพธ์ที่แสดงขึ้น</li>
        <li>คลิกปุ่มไอคอน "คัดลอก" เพื่อคัดลอกตัวเลข</li>
        <li>ต้องการสุ่มใหม่? กดปุ่ม "สุ่ม" ได้อีกครั้งเลย!</li>
      </ol>
    ),
  },
];

export const Route = createFileRoute("/tools/random/number/")({
  component: RouteComponent,
  loader: async (context) => {
    const origin = await getOrigin();
    const pathname = context.location.pathname;
    const url = `${origin}${pathname}`;
    return { url };
  },
});

function RouteComponent() {
  const { url } = Route.useLoaderData();

  const [number, setNumber] = useState<number | null>(null);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [histories, setHistories] = useState<number[]>([]);

  const animationFrameId = useRef<number | null>(null);

  const handleSubmit = (data: FormSchema) => {
    setIsRandomizing(true);

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    let start: number | null = null;
    let duration = 1000;

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;

      const randomNumber =
        Math.floor(Math.random() * (data.max - data.min + 1)) + data.min;
      setNumber(randomNumber);

      if (elapsed < duration) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        setIsRandomizing(false);
        setHistories((prev) => [...prev, randomNumber]);
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);
  };

  return (
    <ToolLayout
      url={url}
      title="สุ่มตัวเลข"
      description="เครื่องมือสำหรับสุ่มตัวเลขในช่วงที่คุณต้องการ ไม่ว่าจะใช้เพื่อความสนุก, การตัดสินใจ, หรือการจำลองข้อมูลต่างๆ"
      breadcrumbs={[
        {
          label: "เครื่องสุ่ม",
          href: "/tools/random",
        },
        {
          label: "สุ่มตัวเลข",
          href: "/tools/random/number",
        },
      ]}
    >
      <FormSection onSubmit={handleSubmit} />
      <RandomResultCard
        number={number}
        histories={histories}
        isRandomizing={isRandomizing}
      />
      <Accordion
        type="single"
        defaultValue="1"
        collapsible
        className="-space-y-px"
      >
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            className="has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
          >
            <AccordionTrigger className="py-2 leading-6 hover:no-underline focus-visible:ring-0">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-2">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ToolLayout>
  );
}
