import { createFileRoute } from "@tanstack/react-router";

import { IntroSection } from "../../-components/IntroSection";
import { TdeeCalculatorSection } from "./-components/TdeeCalculatorSection";
import { useState } from "react";
import { TdeeDisplaySection } from "./-components/TdeeDisplaySection";
import { getOrigin } from "~/lib/get-origin";

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
    <>
      <IntroSection
        title="คำนวณพลังงานต่อวัน (TDEE)"
        description="กินเท่าไหร่ถึงจะพอดี? มาคำนวณพลังงานที่คุณใช้ในแต่ละวันกัน! 🔥🥦"
        url={url}
      />
      <TdeeCalculatorSection setTdee={setTdee} />
      <TdeeDisplaySection tdee={tdee} />
    </>
  );
}
