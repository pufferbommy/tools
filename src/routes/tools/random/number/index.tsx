import { createFileRoute } from "@tanstack/react-router";

import { getOrigin } from "~/lib/get-origin";
import { IntroSection } from "../../-components/IntroSection";
import { FormSection } from "./-components/FormSection";
import { useRef, useState } from "react";

export const Route = createFileRoute("/tools/random/number/")({
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

  const [number, setNumber] = useState<number | null>(null);

  const [isCopyed, setIsCopyed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopyClick = () => {
    if (number === null) return;

    setIsCopyed(true);

    navigator.clipboard.writeText(number.toString());

    // Clear the previous timeout if it exists
    // This prevents multiple timeouts from being set if the button is clicked multiple times
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => setIsCopyed(false), 1000);
  };

  return (
    <>
      <IntroSection
        title="สุ่มเลข"
        description="สุ่มตัวเลขแบบง่าย ๆ ในช่วงที่คุณกำหนด"
        url={url}
      />
      <FormSection setNumber={setNumber} />
      <div className="flex items-center gap-4">
        <div>
          เลขที่สุ่มได้คือ{" "}
          <strong className="text-primary">{number || "?"}</strong>
        </div>
        <button
          disabled={number === null}
          onClick={handleCopyClick}
          className="btn btn-sm"
        >
          {isCopyed ? "คัดลอกแล้ว" : "คัดลอก"}
        </button>
      </div>
    </>
  );
}
