import { useRef, useState } from "react";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Copiable({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	const [isCopyed, setIsCopyed] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleCopy = () => {
		if (!children) return;

		setIsCopyed(true);
		navigator.clipboard.writeText(children.toString());
		toast.success(`คัดลอก "${children.toString()}" แล้ว 🎉`);

		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => setIsCopyed(false), 1000);
	};

	return (
		<div className="relative inline-block">
			<button
				type="button"
				className={cn("peer hover:text-secondary transition-colors", className)}
				onClick={handleCopy}
			>
				{children}
			</button>
			<Badge
				variant="outline"
				className="absolute bg-background pointer-events-none left-full bottom-full transition-opacity opacity-0 peer-hover:opacity-100"
			>
				{isCopyed ? "คัดลอกแล้ว" : "คัดลอก"}
			</Badge>
		</div>
	);
}
