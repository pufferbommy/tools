import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import ToolLayout from "@/components/ToolLayout";
import { seo } from "@/utils/seo";
import { FormSection } from "./-components/FormSection";
import ResultSection from "./-components/ResultSection";

export interface Result {
	name: {
		th: string;
		en: string;
	} | null;
	lastName: {
		th: string;
		en: string;
	} | null;
	nickname: {
		th: string;
		en: string;
	} | null;
}

export const Route = createFileRoute("/tools/random/thai-name/")({
	component: RouteComponent,
	loader: async (context) => {
		const pathname = context.location.pathname;
		const url = `${process.env.ORIGIN}${pathname}`;
		return { url };
	},
	head: () => ({
		meta: [
			...seo({
				title: "สุ่มชื่อไทย",
				description: "เครื่องมือสุ่มชื่อจริง ชื่อเล่น หรือนามสกุลไทย",
				keywords: "สุ่มชื่อไทย, สุ่มชื่อจริง, สุ่มชื่อเล่น, สุ่มนามสกุล, เครื่องมือสุ่มชื่อ",
			}),
		],
	}),
});

function RouteComponent() {
	const { url } = Route.useLoaderData();

	const [results, setResults] = useState<Result[]>([]);

	return (
		<ToolLayout
			url={url}
			title="สุ่มชื่อไทย"
			description="เครื่องมือสุ่มชื่อจริง ชื่อเล่น หรือนามสกุลไทย พร้อมตัวเลือกเพศและภาษา ใช้ได้ทั้งตั้งชื่อลูก ตัวละคร"
			breadcrumbs={[
				{
					label: "เครื่องมือสุ่ม",
					href: "/tools/random",
				},
				{
					label: "สุ่มชื่อไทย",
					href: "/tools/random/thai-name",
				},
			]}
			items={[
				{
					id: "1",
					title: "วิธีการใช้งาน",
					content: (
						<ol className="list-decimal list-inside space-y-2">
							<li>เลือกเพศที่ต้องการ (ทั้งคู่, ชาย หรือ หญิง)</li>
							<li>เลือกประเภทชื่อที่ต้องการสุ่ม (ชื่อจริง, นามสกุล, ชื่อเล่น)</li>
							<li>เลือกภาษาของชื่อ (ไทย, อังกฤษ หรือทั้งสองภาษา)</li>
							<li>กำหนดจำนวนชื่อที่ต้องการสุ่ม (เลือกได้ตั้งแต่ 1 ถึง 25 ชื่อ)</li>
							<li>คลิกปุ่ม "สุ่มชื่อ" เพื่อดูผลลัพธ์ที่สร้างขึ้น</li>
							<li>หากต้องการสุ่มใหม่ สามารถกด "สุ่มชื่อ" ได้อีกครั้ง</li>
						</ol>
					),
				},
			]}
		>
			<FormSection setResults={setResults} />
			<ResultSection results={results} />
		</ToolLayout>
	);
}
