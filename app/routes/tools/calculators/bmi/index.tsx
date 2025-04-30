import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import ToolLayout from "@/components/ToolLayout";
import { getOrigin } from "@/lib/get-origin";
import { BmiCalculatorSection } from "@/routes/tools/calculators/bmi/-components/BmiCalculatorSection";
import { BmiDisplaySection } from "@/routes/tools/calculators/bmi/-components/BmiDisplaySection";
import { BmiTableSection } from "@/routes/tools/calculators/bmi/-components/BmiTableSection";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/tools/calculators/bmi/")({
	component: RouteComponent,
	loader: async (context) => {
		const origin = await getOrigin();
		const pathname = context.location.pathname;
		const url = `${origin}${pathname}`;
		return { url };
	},
	head: () => ({
		meta: [
			...seo({
				title: "คำนวณดัชนีมวลกาย (BMI) - รวมมิตรเครื่องมือ",
				description: "คำนวณค่า BMI เพื่อประเมินรูปร่าง",
				keywords: "BMI, ดัชนีมวลกาย, คำนวณ BMI, เครื่องมือคำนวณ BMI",
			}),
		],
	}),
});

function RouteComponent() {
	const { url } = Route.useLoaderData();

	const [bmi, setBmi] = useState<number | null>(null);

	return (
		<ToolLayout
			breadcrumbs={[
				{
					label: "เครื่องคำนวณ",
					href: "/tools/calculators",
				},
				{
					label: "คำนวณดัชนีมวลกาย (BMI)",
					href: "/tools/calculators/bmi",
				},
			]}
			title="คำนวณดัชนีมวลกาย (BMI)"
			description="เครื่องมือสำหรับคำนวณดัชนีมวลกาย (BMI) จากส่วนสูงและน้ำหนักของคุณ ไม่ว่าจะใช้เพื่อติดตามสุขภาพ, วางแผนการลดน้ำหนัก, หรือเข้าใจสภาวะร่างกายของตัวเองได้ง่ายๆ 💪✨"
			url={url}
			items={[
				{
					id: "1",
					title: "วิธีการใช้งาน",
					content: (
						<ol className="list-decimal list-inside space-y-2">
							<li>กรอกน้ำหนักของคุณ (หน่วยเป็นกิโลกรัม) ลงในช่องที่กำหนด</li>
							<li>กรอกส่วนสูงของคุณ (หน่วยเป็นเซนติเมตร) ลงในช่องที่กำหนด</li>
							<li>คลิกปุ่ม "คำนวณ" เพื่อดูผลลัพธ์ค่า BMI ของคุณ</li>
							<li>ดูค่า BMI ที่แสดง พร้อมเช็กเกณฑ์สุขภาพเบื้องต้น</li>
							<li>ต้องการคำนวณใหม่? กดปุ่ม "รีเซ็ต" แล้วกรอกข้อมูลใหม่ได้เลย!</li>
						</ol>
					),
				},
			]}
		>
			<BmiCalculatorSection setBmi={setBmi} />
			<BmiDisplaySection bmi={bmi} />
			<BmiTableSection bmi={bmi} />
		</ToolLayout>
	);
}
