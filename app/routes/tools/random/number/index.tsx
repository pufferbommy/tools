import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

import ToolLayout from "@/components/ToolLayout";
import { seo } from "@/utils/seo";
import { type FormSchema, FormSection } from "./-components/FormSection";
import RandomResultCard from "./-components/RandomResultCard";

export const Route = createFileRoute("/tools/random/number/")({
	component: RouteComponent,
	loader: async (context) => {
		const pathname = context.location.pathname;
		const url = `${process.env.ORIGIN}${pathname}`;
		return { url };
	},
	head: () => ({
		meta: [
			...seo({
				title: "สุ่มตัวเลข - รวมมิตรเครื่องมือ",
				description: "สร้างตัวเลขสุ่มภายในช่วงที่คุณระบุ",
				keywords: "สุ่มตัวเลข, เครื่องมือสุ่มตัวเลข, สุ่มหมายเลข, สุ่มหมายเลขสุ่ม",
			}),
		],
	}),
});

function RouteComponent() {
	const { url } = Route.useLoaderData();

	const [number, setNumber] = useState<number | null>(null);
	const [isRandomizing, setIsRandomizing] = useState(false);
	const [histories, setHistories] = useState<number[]>([]);

	const animationFrameId = useRef<number | null>(null);

	const handleSubmit = (data: FormSchema) => {
		setIsRandomizing(true);

		if (animationFrameId.current) {
			cancelAnimationFrame(animationFrameId.current);
		}

		let start: number | null = null;
		const duration = 1000;

		const animate = (timestamp: number) => {
			if (start === null) start = timestamp;
			const elapsed = timestamp - start;

			const randomNumber =
				Math.floor(Math.random() * (data.max - data.min + 1)) + data.min;
			setNumber(randomNumber);

			if (elapsed < duration) {
				animationFrameId.current = requestAnimationFrame(animate);
			} else {
				setIsRandomizing(false);
				setHistories((prev) => [...prev, randomNumber]);
			}
		};

		animationFrameId.current = requestAnimationFrame(animate);
	};

	return (
		<ToolLayout
			url={url}
			title="สุ่มตัวเลข"
			description="เครื่องมือสำหรับสุ่มตัวเลขในช่วงที่คุณต้องการ ไม่ว่าจะใช้เพื่อความสนุก, การตัดสินใจ, หรือการจำลองข้อมูลต่างๆ"
			breadcrumbs={[
				{
					label: "เครื่องมือสุ่ม",
					href: "/tools/random",
				},
				{
					label: "สุ่มตัวเลข",
					href: "/tools/random/number",
				},
			]}
			items={[
				{
					id: "1",
					title: "วิธีการใช้งาน",
					content: (
						<ol className="list-decimal list-inside space-y-2">
							<li>ระบุช่วงตัวเลขที่ต้องการสุ่ม (ต่ำสุด - สูงสุด)</li>
							<li>คลิกปุ่ม "สุ่ม" เพื่อสร้างตัวเลขแบบสุ่ม</li>
							<li>ดูผลลัพธ์ที่แสดงขึ้น</li>
							<li>คลิกปุ่มไอคอน "คัดลอก" เพื่อคัดลอกตัวเลข</li>
							<li>ต้องการสุ่มใหม่? กดปุ่ม "สุ่ม" ได้อีกครั้งเลย!</li>
						</ol>
					),
				},
			]}
		>
			<FormSection onSubmit={handleSubmit} />
			<RandomResultCard
				number={number}
				histories={histories}
				isRandomizing={isRandomizing}
			/>
		</ToolLayout>
	);
}
