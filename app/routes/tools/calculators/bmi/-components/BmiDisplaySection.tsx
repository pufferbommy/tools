import { useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BmiDisplaySection({ bmi }: { bmi: number | null }) {
	const bmiCategory = useMemo(() => {
		if (bmi === null) return "";
		if (bmi < 18.5) return "น้ำหนักน้อย / ผอม";
		if (bmi >= 18.5 && bmi <= 22.9) return "ปกติ";
		if (bmi >= 23 && bmi <= 24.9) return "น้ำหนักเกิน (อ้วนระดับ 1)";
		if (bmi >= 25 && bmi <= 29.9) return "อ้วน (อ้วนระดับ 2)";
		return "อ้วนมาก (อ้วนระดับ 3)";
	}, [bmi]);

	return (
		<Card className="text-center group relative">
			<CardHeader>
				<CardTitle>ค่าดัชนีมวลกาย (BMI)</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<p className="space-x-2">
					<span className="text-8xl text-primary font-semibold">
						{bmi?.toFixed(1) || "?"}
					</span>
					{bmi && (
						<span>
							kg/m<sup>2</sup>
						</span>
					)}
				</p>
				<p>
					อยู่ในเกณฑ์
					<br />
					<span className="font-semibold text-primary">
						{bmiCategory || "?"}
					</span>
				</p>
			</CardContent>
		</Card>
	);
}
