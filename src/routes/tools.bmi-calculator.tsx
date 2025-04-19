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

function getRequestOrigin() {
  const isClient = typeof window !== "undefined";

  if (isClient) return window.location.origin;

  const host = getHeader("host");
  const proto = getHeader("x-forwarded-proto") || "http";
  const origin = `${proto}://${host}`;
  return origin;
}

export const Route = createFileRoute("/tools/bmi-calculator")({
  component: RouteComponent,
  loader: (context) => {
    const origin = getRequestOrigin();
    const pathname = context.location.pathname;
    const url = `${origin}${pathname}`;
    return { url };
  },
});

function RouteComponent() {
  const { url } = Route.useLoaderData();

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
      <SocialShare url={url} text="แชร์เครื่องคำนวณ BMI" />
    </main>
  );
}
