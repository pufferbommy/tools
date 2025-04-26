import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { getOrigin } from "@/lib/get-origin";
import { FormSection } from "./-components/FormSection";
import ResultSection from "./-components/ResultSection";
import ToolLayout from "@/components/ToolLayout";

export interface Result {
  name: string;
  lastName: string;
  nickname: string;
}

export const Route = createFileRoute("/tools/random/thai-name/")({
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

  const [results, setResults] = useState<Result[]>([]);

  return (
    <ToolLayout
      url={url}
      title="สุ่มชื่อไทย"
      description="สุ่มชื่อไทยแบบง่ายๆ ใช้ได้ทันที ไม่ต้องคิดเอง"
      breadcrumbs={[
        {
          label: "เครื่องสุ่ม",
          href: "/tools/random",
        },
        {
          label: "สุ่มชื่อไทย",
          href: "/tools/random/thai-name",
        },
      ]}
    >
      <FormSection setResults={setResults} />
      {results.length > 0 && <ResultSection results={results} />}
    </ToolLayout>
  );
}
