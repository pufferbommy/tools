import { createFileRoute } from "@tanstack/react-router";

import { IntroSection } from "../../-components/IntroSection";
import { BmrCalculatorSection } from "./-components/BmrCalculatorSection";
import { useState } from "react";
import { BmrDisplaySection } from "./-components/BmrDisplaySection";
import { getOrigin } from "~/lib/get-origin";

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
    <>
      <IntroSection
        title="คำนวณการเผาผลาญพลังงาน (BMR)"
        description="ใส่ข้อมูลพื้นฐาน แล้วมาดูกันว่า… แค่หายใจก็เผาผลาญพลังงานไปเท่าไหร่!"
        url={url}
      />
      <BmrCalculatorSection setBmr={setBmr} />
      <BmrDisplaySection bmr={bmr} />
    </>
  );
}
