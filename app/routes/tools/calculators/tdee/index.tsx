import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { getOrigin } from "@/lib/get-origin";
import ToolLayout from "@/components/ToolLayout";
import { TdeeCalculatorSection } from "./-components/TdeeCalculatorSection";
import { TdeeDisplaySection } from "./-components/TdeeDisplaySection";
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
        <li>เลือกเพศของคุณ (ชาย หรือ หญิง)</li>
        <li>กรอกอายุ น้ำหนัก และส่วนสูงของคุณ</li>
        <li>เลือกระดับกิจกรรมที่คุณทำในแต่ละวัน (เบา, ปานกลาง, หนัก ฯลฯ)</li>
        <li>คลิกปุ่ม "คำนวณ" เพื่อดูผลลัพธ์ค่า TDEE ของคุณ</li>
        <li>อยากเริ่มใหม่? คลิก "รีเซ็ต" แล้วลองคำนวณอีกครั้งได้เลย!</li>
      </ol>
    ),
  },
];

export const Route = createFileRoute("/tools/calculators/tdee/")({
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

  const [tdee, setTdee] = useState<number | null>(null);

  return (
    <ToolLayout
      breadcrumbs={[
        {
          label: "เครื่องคำนวณ",
          href: "/tools/calculators",
        },
        {
          label: "คำนวณพลังงานต่อวัน (TDEE)",
          href: "/tools/calculators/tdee",
        },
      ]}
      title="คำนวณพลังงานต่อวัน (TDEE)"
      description="เครื่องมือคำนวณ TDEE ที่ช่วยให้คุณวางแผนการกินและออกกำลังกายได้อย่างเหมาะสม ตามพลังงานที่ร่างกายต้องการในแต่ละวัน 🏃‍♀️🥗"
      url={url}
    >
      <TdeeCalculatorSection setTdee={setTdee} />
      <TdeeDisplaySection tdee={tdee} />
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
