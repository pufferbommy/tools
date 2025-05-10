import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import ToolLayout from "@/components/ToolLayout";
import { seo } from "@/utils/seo";
import { BmrCalculatorSection } from "./-components/BmrCalculatorSection";
import { BmrDisplaySection } from "./-components/BmrDisplaySection";

export const Route = createFileRoute("/tools/calculators/bmr/")({
	component: RouteComponent,
	loader: async (context) => {
		const pathname = context.location.pathname;
		const url = `${process.env.ORIGIN}${pathname}`;
		return { url };
	},
	head: () => ({
		meta: [
			...seo({
				title: "คำนวณการเผาผลาญพลังงาน (BMR) - รวมมิตรเครื่องมือ",
				description: "คำนวณอัตราเผาผลาญพลังงานพื้นฐาน",
				keywords: "BMR, คำนวณ BMR, เครื่องมือคำนวณ BMR",
			}),
		],
	}),
});

function RouteComponent() {
	const { url } = Route.useLoaderData();

	const [bmr, setBmr] = useState<number | null>(null);

	return (
		<ToolLayout
			breadcrumbs={[
				{
					label: "เครื่องมือคำนวณ",
					href: "/tools/calculators",
				},
				{
					label: "คำนวณการเผาผลาญพลังงาน (BMR)",
					href: "/tools/calculators/bmr",
				},
			]}
			title="คำนวณการเผาผลาญพลังงาน (BMR)"
			description="เครื่องมือสำหรับคำนวณ BMR (Basal Metabolic Rate) ของคุณ เพียงกรอกน้ำหนัก ส่วนสูง อายุ และเพศ เพื่อดูว่าร่างกายเผาผลาญพลังงานพื้นฐานกี่แคลอรี พร้อมวางแผนสุขภาพให้ดียิ่งขึ้นได้เลย ✨"
			url={url}
			items={[
				{
					id: "1",
					title: "วิธีการใช้งาน",
					content: (
						<ol className="list-decimal list-inside space-y-2">
							<li>เลือกเพศของคุณ (ชาย หรือ หญิง)</li>
							<li>กรอกอายุของคุณ (ปี)</li>
							<li>กรอกน้ำหนัก (กิโลกรัม)</li>
							<li>กรอกส่วนสูง (เซนติเมตร)</li>
							<li>คลิกปุ่ม "คำนวณ" เพื่อดูผลลัพธ์ค่า BMR</li>
							<li>อยากคำนวณใหม่? คลิกปุ่ม "รีเซ็ต" เพื่อเริ่มใหม่ได้เลย!</li>
						</ol>
					),
				},
			]}
		>
			<BmrCalculatorSection setBmr={setBmr} />
			<BmrDisplaySection bmr={bmr} />
		</ToolLayout>
	);
}
