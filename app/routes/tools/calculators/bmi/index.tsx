import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { getOrigin } from "@/lib/get-origin";
import ToolLayout from "@/components/ToolLayout";
import { BmiTableSection } from "@/routes/tools/calculators/bmi/-components/BmiTableSection";
import { BmiDisplaySection } from "@/routes/tools/calculators/bmi/-components/BmiDisplaySection";
import { BmiCalculatorSection } from "@/routes/tools/calculators/bmi/-components/BmiCalculatorSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    id: "1",
    title: "วิธีการใช้งาน",
    content: (
      <ol className="list-decimal list-inside space-y-2">
        <li>กรอกน้ำหนักของคุณ (หน่วยเป็นกิโลกรัม) ลงในช่องที่กำหนด</li>
        <li>กรอกส่วนสูงของคุณ (หน่วยเป็นเซนติเมตร) ลงในช่องที่กำหนด</li>
        <li>คลิกปุ่ม "คำนวณ" เพื่อดูผลลัพธ์ค่า BMI ของคุณ</li>
        <li>ดูค่า BMI ที่แสดง พร้อมเช็กเกณฑ์สุขภาพเบื้องต้น</li>
        <li>ต้องการคำนวณใหม่? กดปุ่ม "รีเซ็ต" แล้วกรอกข้อมูลใหม่ได้เลย!</li>
      </ol>
    ),
  },
];

export const Route = createFileRoute("/tools/calculators/bmi/")({
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

  const [bmi, setBmi] = useState<number | null>(null);

  return (
    <ToolLayout
      breadcrumbs={[
        {
          label: "เครื่องคำนวณ",
          href: "/tools/calculators",
        },
        {
          label: "คำนวณดัชนีมวลกาย (BMI)",
          href: "/tools/calculators/bmi",
        },
      ]}
      title="คำนวณดัชนีมวลกาย (BMI)"
      description="เครื่องมือสำหรับคำนวณดัชนีมวลกาย (BMI) จากส่วนสูงและน้ำหนักของคุณ ไม่ว่าจะใช้เพื่อติดตามสุขภาพ, วางแผนการลดน้ำหนัก, หรือเข้าใจสภาวะร่างกายของตัวเองได้ง่ายๆ 💪✨"
      url={url}
    >
      <BmiCalculatorSection setBmi={setBmi} />
      <BmiDisplaySection bmi={bmi} />
      <BmiTableSection bmi={bmi} />
      <Accordion
        type="single"
        defaultValue="1"
        collapsible
        className="-space-y-px"
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
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
