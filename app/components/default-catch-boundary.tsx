import { Link, rootRouteId, useMatch, useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, RotateCw } from "lucide-react";
import { Button } from "./ui/button";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
	const router = useRouter();
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId,
	});

	console.error("DefaultCatchBoundary Error:", error);

	return (
		<div className="min-w-0 flex-1 p-6 flex flex-col items-center justify-center gap-6 text-center">
			<div className="flex flex-col items-center gap-2">
				<AlertTriangle className="w-10 h-10 text-yellow-500" />
				<h2 className="text-xl font-semibold">เกิดข้อผิดพลาดบางอย่าง</h2>
				<p className="text-muted-foreground text-sm max-w-md">
					ขออภัย ดูเหมือนว่าเกิดข้อผิดพลาดขณะโหลดหน้านี้ กรุณาลองอีกครั้ง
					หรือลองย้อนกลับไปยังหน้าก่อนหน้า
				</p>
			</div>

			<div className="flex gap-3 items-center flex-wrap justify-center">
				<Button onClick={() => router.invalidate()} variant="outline">
					<RotateCw className="w-4 h-4 mr-2" />
					ลองใหม่
				</Button>

				{isRoot ? (
					<Button asChild>
						<Link to="/">
							<ArrowLeft className="w-4 h-4 mr-2" />
							กลับหน้าหลัก
						</Link>
					</Button>
				) : (
					<Button
						variant="secondary"
						onClick={(e) => {
							e.preventDefault();
							window.history.back();
						}}
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						ย้อนกลับ
					</Button>
				)}
			</div>
		</div>
	);
}
