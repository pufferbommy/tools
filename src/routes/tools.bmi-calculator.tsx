import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { getHeader } from "@tanstack/react-start/server";

import { BmiIntro } from "~/components/bmi/BmiIntro";
import { BmiTable } from "~/components/bmi/BmiTable";
import { SocialShare } from "~/components/SocialShare";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BmiDisplay } from "~/components/bmi/BmiDisplay";
import { BmiCalculator } from "~/components/bmi/BmiCalculator";
import { BmiAdviceAllSections } from "~/components/bmi/BmiAdviceSection";

import { createServerFn } from "@tanstack/react-start";

const getOrigin = createServerFn({ method: "GET" }).handler(async () => {
  const host = getHeader("host");
  const proto = getHeader("x-forwarded-proto") || "http";
  const origin = `${proto}://${host}`;
  return origin;
});

export const Route = createFileRoute("/tools/bmi-calculator")({
  component: RouteComponent,
  loader: async () => {
    const origin = await getOrigin();
    return { origin };
  },
});

function RouteComponent() {
  const { origin } = Route.useLoaderData();

  const [bmi, setBmi] = useState<number | null>(null);

  return (
    <main className="container-sm space-y-8 py-8">
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">หน้าแรก</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/tools/calculator">
          เครื่องมือคำนวณ
        </Breadcrumbs.Item>
        <Breadcrumbs.Item href="/tools/calculator/bmi">
          ดัชนีมวลกาย (BMI)
        </Breadcrumbs.Item>
      </Breadcrumbs>
      <BmiIntro />
      <BmiCalculator setBmi={setBmi} />
      {bmi !== null && <BmiDisplay bmi={bmi} />}
      <BmiTable bmi={bmi} />
      <BmiAdviceAllSections />
      <SocialShare url={origin} text="เครื่องมือคำนวณดัชนีมวลกาย (BMI)" />
    </main>
  );
}
