import { createServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { getHeader } from "@tanstack/react-start/server";

import { SocialShare } from "~/routes/tools/-components/SocialShare";
import { Breadcrumbs } from "~/routes/tools/-components/Breadcrumbs";
import { IntroSection } from "../-components/IntroSection";
import { BmrCalculatorSection } from "./-components/BmrCalculatorSection";
import { useState } from "react";
import { BmrDisplaySection } from "./-components/BmrDisplaySection";

const getOrigin = createServerFn({ method: "GET" }).handler(async () => {
  const host = getHeader("host");
  const proto = getHeader("x-forwarded-proto") || "http";
  const origin = `${proto}://${host}`;
  return origin;
});

export const Route = createFileRoute("/tools/bmr-calculator/")({
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
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "หน้าแรก" },
          { href: "/tools/calculators", label: "เครื่องมือคำนวณ" },
          { href: "/tools/bmr-calculator", label: "เครื่องมือคำนวณ BMR" },
        ]}
      />
      <IntroSection
        title="เครื่องมือคำนวณอัตราการเผาผลาญพลังงานพื้นฐาน (BMR)"
        description={
          <>
            BMR หรือ Basal Metabolic Rate
            คืออัตราการเผาผลาญพลังงานพื้นฐานของร่างกาย
            หรือพลังงานที่ร่างกายต้องใช้ในขณะพักผ่อนอย่างสมบูรณ์ เช่น ขณะนอนหลับ
            โดยไม่มีกิจกรรมใด ๆ ซึ่งเป็นค่าที่สำคัญสำหรับการวางแผนควบคุมน้ำหนัก
            เพิ่มน้ำหนัก หรือวางแผนการออกกำลังกาย
            <br />
            การคำนวณ BMR จะพิจารณาจากเพศ อายุ น้ำหนัก และส่วนสูง
            ช่วยให้เรารู้ว่าร่างกายต้องการพลังงานขั้นต่ำเท่าใดต่อวัน
            เพื่อให้ระบบต่าง ๆ ทำงานได้ตามปกติ
          </>
        }
      />
      <BmrCalculatorSection setBmr={setBmr} />
      {bmr !== null && <BmrDisplaySection bmr={bmr} />}
      <SocialShare
        url={url}
        text="เครื่องมือคำนวณอัตราการเผาผลาญพลังงานพื้นฐาน (BMR)"
      />
    </>
  );
}
