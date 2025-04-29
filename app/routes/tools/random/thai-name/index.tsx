import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { getOrigin } from "@/lib/get-origin";
import { FormSection } from "./-components/FormSection";
import ResultSection from "./-components/ResultSection";
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
        <li>เลือกเพศที่ต้องการ (ทั้งคู่, ชาย หรือ หญิง)</li>
        <li>เลือกประเภทชื่อที่ต้องการสุ่ม (ชื่อจริง, นามสกุล, ชื่อเล่น)</li>
        <li>เลือกภาษาของชื่อ (ไทย, อังกฤษ หรือทั้งสองภาษา)</li>
        <li>กำหนดจำนวนชื่อที่ต้องการสุ่ม (เลือกได้ตั้งแต่ 1 ถึง 25 ชื่อ)</li>
        <li>คลิกปุ่ม "สุ่มชื่อ" เพื่อดูผลลัพธ์ที่สร้างขึ้น</li>
        <li>หากต้องการสุ่มใหม่ สามารถกด "สุ่มชื่อ" ได้อีกครั้ง</li>
      </ol>
    ),
  },
];

export interface Result {
  name: {
    th: string;
    en: string;
  } | null;
  lastName: {
    th: string;
    en: string;
  } | null;
  nickname: {
    th: string;
    en: string;
  } | null;
}

export const Route = createFileRoute("/tools/random/thai-name/")({
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

  const [results, setResults] = useState<Result[]>([]);

  return (
    <ToolLayout
      url={url}
      title="สุ่มชื่อไทย"
      description="เครื่องมือสุ่มชื่อจริง ชื่อเล่น หรือนามสกุลไทย พร้อมตัวเลือกเพศและภาษา ใช้ได้ทั้งตั้งชื่อลูก ตัวละคร หรือไอเดียใหม่ๆ"
      breadcrumbs={[
        {
          label: "เครื่องสุ่ม",
          href: "/tools/random",
        },
        {
          label: "สุ่มชื่อไทย",
          href: "/tools/random/thai-name",
        },
      ]}
    >
      <FormSection setResults={setResults} />
      <ResultSection results={results} />
      <Accordion
        type="single"
        defaultValue="1"
        collapsible
        className="-space-y-px"
      >
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
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
