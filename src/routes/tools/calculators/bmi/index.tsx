import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { getHeader } from "@tanstack/react-start/server";

import { BmiTableSection } from "~/routes/tools/calculators/bmi/-components/BmiTableSection";
import { BmiDisplaySection } from "~/routes/tools/calculators/bmi/-components/BmiDisplaySection";
import { BmiCalculatorSection } from "~/routes/tools/calculators/bmi/-components/BmiCalculatorSection";

import { createServerFn } from "@tanstack/react-start";
import { IntroSection } from "../../-components/IntroSection";

const getOrigin = createServerFn({ method: "GET" }).handler(async () => {
  const host = getHeader("host");
  const proto = getHeader("x-forwarded-proto") || "http";
  const origin = `${proto}://${host}`;
  return origin;
});

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
    <>
      <IntroSection
        title="เครื่องคำนวณดัชนีมวลกาย (BMI)"
        description="กรอกส่วนสูงและน้ำหนักแล้วมาดูกันว่าได้ค่า BMI เท่าไหร่ และอยู่ในเกณฑ์ไหน พร้อมคำแนะนำสุขภาพง่ายๆ 💪"
        url={url}
      />
      <BmiCalculatorSection setBmi={setBmi} />
      <BmiDisplaySection bmi={bmi} />
      <BmiTableSection bmi={bmi} />
    </>
  );
}
