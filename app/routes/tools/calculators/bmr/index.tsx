import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { getOrigin } from "@/lib/get-origin";
import ToolLayout from "@/components/ToolLayout";
import { BmrDisplaySection } from "./-components/BmrDisplaySection";
import { BmrCalculatorSection } from "./-components/BmrCalculatorSection";

export const Route = createFileRoute("/tools/calculators/bmr/")({
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

  const [bmr, setBmr] = useState<number | null>(null);

  return (
    <ToolLayout
      breadcrumbs={[
        {
          label: "เครื่องคำนวณ",
          href: "/tools/calculators",
        },
        {
          label: "คำนวณการเผาผลาญพลังงาน (BMR)",
          href: "/tools/calculators/bmi",
        },
      ]}
      title="คำนวณการเผาผลาญพลังงาน (BMR)"
      description="กรอกส่วนสูงและน้ำหนักแล้วมาดูกันว่าได้ค่า BMI เท่าไหร่ และอยู่ในเกณฑ์ไหน พร้อมคำแนะนำสุขภาพง่ายๆ 💪"
      url={url}
    >
      <BmrCalculatorSection setBmr={setBmr} />
      <BmrDisplaySection bmr={bmr} />
    </ToolLayout>
  );
}
