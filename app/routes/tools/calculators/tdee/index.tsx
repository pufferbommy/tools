import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { getOrigin } from "@/lib/get-origin";
import { SocialShare } from "../../-components/SocialShare";
import { IntroSection } from "../../-components/IntroSection";
import { TdeeCalculatorSection } from "./-components/TdeeCalculatorSection";
import { TdeeDisplaySection } from "./-components/TdeeDisplaySection";

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
    <div className="space-y-8">
      <IntroSection
        title="คำนวณพลังงานต่อวัน (TDEE)"
        description="กินเท่าไหร่ถึงจะพอดี? มาคำนวณพลังงานที่คุณใช้ในแต่ละวันกัน! 🔥🥦"
      />
      <TdeeCalculatorSection setTdee={setTdee} />
      <TdeeDisplaySection tdee={tdee} />
      <SocialShare url={url} text="เครื่องคำนวณดัชนีมวลกาย (BMI)" />
    </div>
  );
}
