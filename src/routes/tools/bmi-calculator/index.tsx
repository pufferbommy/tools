import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { getHeader } from "@tanstack/react-start/server";

import { BmiTableSection } from "~/routes/tools/bmi-calculator/-components/BmiTableSection";
import { SocialShare } from "~/routes/tools/-components/SocialShare";
import { Breadcrumbs } from "~/routes/tools/-components/Breadcrumbs";
import { BmiDisplaySection } from "~/routes/tools/bmi-calculator/-components/BmiDisplaySection";
import { BmiCalculatorSection } from "~/routes/tools/bmi-calculator/-components/BmiCalculatorSection";
import { BmiAdviceAllSections } from "~/routes/tools/bmi-calculator/-components/BmiAdviceSection";

import { createServerFn } from "@tanstack/react-start";
import { IntroSection } from "../-components/IntroSection";

const getOrigin = createServerFn({ method: "GET" }).handler(async () => {
  const host = getHeader("host");
  const proto = getHeader("x-forwarded-proto") || "http";
  const origin = `${proto}://${host}`;
  return origin;
});

export const Route = createFileRoute("/tools/bmi-calculator/")({
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
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "หน้าแรก" },
          { href: "/tools/calculators", label: "เครื่องมือคำนวณ" },
          { href: "/tools/bmr-calculator", label: "ดัชนีมวลกาย (BMI)" },
        ]}
      />
      <IntroSection
        title="เครื่องมือคำนวณดัชนีมวลกาย (BMI)"
        description={
          <>
            ดัชนีมวลกาย หรือ BMI (Body Mass Index)
            คือค่าที่ใช้วัดความสัมพันธ์ระหว่างน้ำหนักและส่วนสูง
            เพื่อประเมินสถานะน้ำหนักของร่างกายว่าอยู่ในเกณฑ์ผอม ปกติ น้ำหนักเกิน
            หรืออ้วน
            ซึ่งสามารถใช้เป็นแนวทางเบื้องต้นในการดูแลสุขภาพและป้องกันโรคที่เกี่ยวข้องกับน้ำหนักตัว
            <br />
            วิธีการคำนวณ BMI คือ นำน้ำหนัก (กิโลกรัม) หารด้วยส่วนสูง (เมตร)
            ยกกำลังสอง ค่านี้เหมาะสำหรับการประเมินเบื้องต้นในผู้ใหญ่ทั่วไป
            ไม่สามารถใช้กับเด็ก สตรีมีครรภ์
            หรือผู้ที่มีกล้ามเนื้อจำนวนมากได้อย่างแม่นยำ
          </>
        }
      />
      <BmiCalculatorSection setBmi={setBmi} />
      {bmi !== null && <BmiDisplaySection bmi={bmi} />}
      <BmiTableSection bmi={bmi} />
      <BmiAdviceAllSections />
      <SocialShare url={url} text="เครื่องมือคำนวณดัชนีมวลกาย (BMI)" />
    </>
  );
}
