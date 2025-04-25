import { useRef, useState } from "react";
import { Button } from "./ui/button";

export default function CopyButton({
  text,
  label = "คัดลอก",
  copiedLabel = "คัดลอกแล้ว",
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [isCopyed, setIsCopyed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopyed(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsCopyed(false), 1000);
  };

  return (
    <Button size="sm" onClick={handleCopyClick}>
      {isCopyed ? copiedLabel : label}
    </Button>
  );
}
