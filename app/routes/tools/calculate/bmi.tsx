import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ToolLayout from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { loadToolData } from "@/lib/tool/loadToolData";
import { cn } from "@/lib/utils";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/tools/calculate/bmi")({
	component: RouteComponent,
	loader: ({ location }) => loadToolData(location.pathname),
	head: ({ loaderData }) => ({
		meta: [
			...seo({
				title: loaderData.tool.title,
				description: loaderData.tool.description,
				keywords: loaderData.tool.keywords,
			}),
		],
		links: [
			{
				rel: "canonical",
				href: loaderData.url,
			},
		],
	}),
});

function RouteComponent() {
	const { url, category, tool } = Route.useLoaderData();
	const [bmi, setBmi] = useState<number | null>(null);

	return (
		<ToolLayout
			breadcrumbs={[
				{
					label: category.title,
					href: "..",
				},
				{
					label: tool.title,
					href: tool.url,
				},
			]}
			title={tool.title}
			description={tool.description}
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

const FormSchema = z.object({
	weight: z.number({
		message: "กรุณากรอกน้ำหนัก",
	}),
	height: z.number({
		message: "กรุณากรอกส่วนสูง",
	}),
});

type FormSchema = z.infer<typeof FormSchema>;

export function BmiCalculatorSection({
	setBmi,
}: {
	setBmi: (value: number | null) => void;
}) {
	const form = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			weight: "" as unknown as number,
			height: "" as unknown as number,
		},
	});

	const onSubmit = ({ weight, height }: FormSchema) => {
		const heightMeters = height / 100; // Convert height from cm to meters
		const bmiValue = weight / heightMeters ** 2;
		setBmi(bmiValue);
	};

	const handleResetClick = () => {
		form.reset();
		setBmi(null);
	};

	return (
		<section>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
						<FormField
							control={form.control}
							name="weight"
							render={({ field }) => (
								<FormItem>
									<FormLabel>น้ำหนัก (กิโลกรัม)</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											onChange={(e) => field.onChange(e.target.valueAsNumber)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="height"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ส่วนสูง (เซนติเมตร)</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											onChange={(e) => field.onChange(e.target.valueAsNumber)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="space-x-2">
						<Button>คำนวณ BMI</Button>
						<Button type="button" variant="outline" onClick={handleResetClick}>
							รีเซ็ต
						</Button>
					</div>
				</form>
			</Form>
		</section>
	);
}

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

type BmiRow = {
	range: string;
	label: string;
	desc: string;
	isHighlighted: (bmi: number | null) => boolean;
};

const bmiRows: BmiRow[] = [
	{
		range: "< 18.5",
		label: "น้ำหนักน้อย / ผอม",
		desc: "ร่างกายอาจขาดสารอาหาร และภูมิคุ้มกันต่ำ — ควรเพิ่มปริมาณอาหาร และเลือกที่มีคุณค่าทางโภชนาการ",
		isHighlighted: (bmi) => bmi !== null && bmi < 18.5,
	},
	{
		range: "18.5 – 22.9",
		label: "น้ำหนักปกติ",
		desc: "สุขภาพดี สมดุลเหมาะสม ✨ — รักษาน้ำหนักให้อยู่ในช่วงนี้ด้วยอาหารครบ 5 หมู่ และการออกกำลังกายสม่ำเสมอ",
		isHighlighted: (bmi) => bmi !== null && bmi >= 18.5 && bmi <= 22.9,
	},
	{
		range: "23.0 – 24.9",
		label: "น้ำหนักเกิน (อ้วนระดับ 1)",
		desc: "เริ่มมีความเสี่ยงต่อโรคเรื้อรัง — แนะนำให้ควบคุมอาหาร และเพิ่มการออกกำลังกาย",
		isHighlighted: (bmi) => bmi !== null && bmi >= 23 && bmi <= 24.9,
	},
	{
		range: "25.0 – 29.9",
		label: "อ้วน (อ้วนระดับ 2)",
		desc: "เสี่ยงต่อโรคเบาหวาน ความดัน และไขมันในเลือดสูง — ควรปรับพฤติกรรมการกิน และออกกำลังกายอย่างจริงจัง",
		isHighlighted: (bmi) => bmi !== null && bmi >= 25 && bmi <= 29.9,
	},
	{
		range: "≥ 30.0",
		label: "อ้วนมาก (อ้วนระดับ 3)",
		desc: "เสี่ยงโรคร้ายแรง เช่น หัวใจ เบาหวานขั้นสูง — ควรปรึกษาผู้เชี่ยวชาญ และเริ่มวางแผนดูแลสุขภาพอย่างเข้มข้น",
		isHighlighted: (bmi) => bmi !== null && bmi >= 30,
	},
];

export function BmiTableSection({ bmi }: { bmi: number | null }) {
	return (
		<section className="overflow-x-auto border rounded">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>ช่วงค่า BMI</TableHead>
						<TableHead>อยู่ในเกณฑ์</TableHead>
						<TableHead>คำอธิบาย</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{bmiRows.map((row) => (
						<TableRow
							key={row.range}
							data-state={row.isHighlighted(bmi) ? "selected" : ""}
							className={cn(row.isHighlighted(bmi) && "bg-accent")}
						>
							<TableCell>{row.range}</TableCell>
							<TableCell>{row.label}</TableCell>
							<TableCell>{row.desc}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
}
