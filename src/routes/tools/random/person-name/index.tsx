import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { getOrigin } from "~/lib/get-origin";
import { IntroSection } from "../../-components/IntroSection";
import { FormSection } from "./-components/FormSection";
import ResultSection from "./-components/ResultSection";

export interface Result {
  name: string;
  lastName: string;
  nickname: string;
}

export const Route = createFileRoute("/tools/random/person-name/")({
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
    <>
      <IntroSection
        title="สุ่มชื่อคน"
        description="สุ่มชื่อคนแบบง่ายๆ ใช้ได้ทันที ไม่ต้องคิดเอง"
        url={url}
      />
      <FormSection setResults={setResults} />
      {results.length > 0 && <ResultSection results={results} />}
    </>
  );
}
