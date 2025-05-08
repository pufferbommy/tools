import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import ToolLayout from "@/components/ToolLayout";
import { seo } from "@/utils/seo";
import { TdeeCalculatorSection } from "./-components/TdeeCalculatorSection";
import { TdeeDisplaySection } from "./-components/TdeeDisplaySection";

export const Route = createFileRoute("/tools/calculators/tdee/")({
	component: RouteComponent,
	loader: async (context) => {
		const pathname = context.location.pathname;
		const url = `${process.env.ORIGIN}${pathname}`;
		return { url };
	},
	head: () => ({
		meta: [
			...seo({
				title: "คำนวณพลังงานต่อวัน (TDEE) - รวมมิตรเครื่องมือ",
				description: "คำนวณพลังงานที่ร่างกายต้องการต่อวัน",
				keywords: "TDEE, คำนวณ TDEE, เครื่องมือคำนวณ TDEE",
			}),
		],
	}),
});

function RouteComponent() {
	const { url } = Route.useLoaderData();

	const [tdee, setTdee] = useState<number | null>(null);

	return (
		<ToolLayout
			breadcrumbs={[
				{
					label: "เครื่องคำนวณ",
					href: "/tools/calculators",
				},
				{
					label: "คำนวณพลังงานต่อวัน (TDEE)",
					href: "/tools/calculators/tdee",
				},
			]}
			title="คำนวณพลังงานต่อวัน (TDEE)"
			description="เครื่องมือคำนวณ TDEE ที่ช่วยให้คุณวางแผนการกินและออกกำลังกายได้อย่างเหมาะสม ตามพลังงานที่ร่างกายต้องการในแต่ละวัน 🏃‍♀️🥗"
			url={url}
			items={[
				{
					id: "1",
					title: "วิธีการใช้งาน",
					content: (
						<ol className="list-decimal list-inside space-y-2">
							<li>เลือกเพศของคุณ (ชาย หรือ หญิง)</li>
							<li>กรอกอายุ น้ำหนัก และส่วนสูงของคุณ</li>
							<li>เลือกระดับกิจกรรมที่คุณทำในแต่ละวัน (เบา, ปานกลาง, หนัก ฯลฯ)</li>
							<li>คลิกปุ่ม "คำนวณ" เพื่อดูผลลัพธ์ค่า TDEE ของคุณ</li>
							<li>อยากเริ่มใหม่? คลิก "รีเซ็ต" แล้วลองคำนวณอีกครั้งได้เลย!</li>
						</ol>
					),
				},
			]}
		>
			<TdeeCalculatorSection setTdee={setTdee} />
			<TdeeDisplaySection tdee={tdee} />
		</ToolLayout>
	);
}
