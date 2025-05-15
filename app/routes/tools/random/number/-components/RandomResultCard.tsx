import { Clipboard, ClipboardCheck } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function RandomResultCard({
	number,
	isRandomizing,
	histories,
}: {
	number: number | null;
	isRandomizing: boolean;
	histories: number[];
}) {
	const [isCopyed, setIsCopyed] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleCopyClick = useCallback(() => {
		if (!number) return;

		navigator.clipboard.writeText(number.toString());
		toast.success(`คัดลอกเลข ${number} แล้ว 🎉`);

		setIsCopyed(true);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => setIsCopyed(false), 1000);
	}, [number]);

	return (
		<Card className="text-center group relative">
			<CardHeader>
				<CardTitle>ตัวเลขที่สุ่มได้</CardTitle>
			</CardHeader>
			<CardContent>
				<p
					className={cn(
						"text-8xl text-primary overflow-x-auto overflow-y-hidden",
						isRandomizing && "animate-pulse",
					)}
				>
					{number ? number : "?"}
				</p>
			</CardContent>
			<CardFooter className="text-muted-foreground justify-center">
				{histories.length > 0
					? `ประวัติล่าสุด: ${histories.join(", ")}`
					: "ยังไม่มีการสุ่มในรอบนี้ ลองสุ่มดูสิ!"}
			</CardFooter>
			<Button
				size="icon"
				className="absolute top-2 right-2"
				variant="ghost"
				onClick={handleCopyClick}
				disabled={!number || isRandomizing}
				aria-label="Copy number"
			>
				{isCopyed ? <ClipboardCheck /> : <Clipboard />}
			</Button>
		</Card>
	);
}
