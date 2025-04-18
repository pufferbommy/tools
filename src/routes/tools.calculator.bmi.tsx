import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { BmiAdviceAllSections } from "~/components/bmi/BmiAdviceSection";
import { BmiCalculator } from "~/components/bmi/BmiCalculator";
import { BmiDisplay } from "~/components/bmi/BmiDisplay";
import { BmiIntro } from "~/components/bmi/BmiIntro";
import { BmiTable } from "~/components/bmi/BmiTable";
import { SocialShare } from "~/components/SocialShare";
import { Breadcrumbs } from "~/components/Breadcrumbs";

export const Route = createFileRoute("/tools/calculator/bmi")({
  component: RouteComponent,
});

function RouteComponent() {
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
      <SocialShare />
    </main>
  );
}
