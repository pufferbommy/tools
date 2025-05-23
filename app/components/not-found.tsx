import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

export function NotFound({ children }: { children?: React.ReactNode }) {
	return (
		<div className="container flex-1">
			<div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
				<AlertTriangle
					className="text-yellow-500 dark:text-yellow-400"
					size={48}
				/>
				<h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
					ไม่พบหน้านี้
				</h1>
				<p className="text-gray-600 dark:text-gray-400 max-w-md">
					{children || "ขออภัย! หน้าที่คุณพยายามเข้าชมไม่มีอยู่ในระบบ หรืออาจถูกย้ายไปแล้ว"}
				</p>
				<div className="flex gap-4 flex-wrap justify-center">
					<Button variant="outline" onClick={() => window.history.back()}>
						ย้อนกลับ
					</Button>
					<Button asChild>
						<Link to="/">กลับสู่หน้าแรก</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
