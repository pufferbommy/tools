import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

export default function RandomResultCard(props: {
  number: number | null;
  isRandomizing: boolean;
  histories: number[];
}) {
  const [isCopyed, setIsCopyed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopyClick = useCallback(() => {
    if (!props.number) return;

    navigator.clipboard.writeText(props.number.toString());
    toast.success(`คัดลอกเลข ${props.number} แล้ว 🎉`);

    setIsCopyed(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsCopyed(false), 1000);
  }, [props.number]);

  return (
    <Card className="text-center group relative">
      <CardHeader>
        <CardTitle>ตัวเลขที่สุ่มได้</CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className={cn(
            "text-8xl text-primary overflow-x-auto overflow-y-hidden",
            props.isRandomizing && "animate-pulse"
          )}
        >
          {props.number ? props.number : "?"}
        </p>
      </CardContent>
      <CardFooter className="text-muted-foreground justify-center">
        {props.histories.length > 0
          ? `ประวัติล่าสุด: ${props.histories.join(", ")}`
          : "ยังไม่มีการสุ่มในรอบนี้ ลองสุ่มดูสิ!"}
      </CardFooter>
      <Button
        size="icon"
        className="absolute top-2 right-2"
        variant="ghost"
        onClick={handleCopyClick}
        disabled={!props.number || props.isRandomizing}
      >
        {isCopyed ? <ClipboardCheck /> : <Clipboard />}
      </Button>
    </Card>
  );
}
