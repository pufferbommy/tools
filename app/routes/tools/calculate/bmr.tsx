import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import ToolLayout from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GENDERS } from "@/constants/genders";
import { loadToolData } from "@/lib/tool/loadToolData";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/tools/calculate/bmr")({
	component: RouteComponent,
	loader: ({ location }) => loadToolData(location.pathname),
	head: ({ loaderData }) => ({
		meta: [
			...seo({
				title: loaderData.tool.title,
				description: loaderData.tool.description,
				keywords: loaderData.tool.keywords,
				image: `${loaderData.url}.png`.replace("/tools", "/og/tools"),
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

	const [bmr, setBmr] = useState<number | null>(null);

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

function BmrCalculatorSection({
	setBmr,
}: {
	setBmr: (value: number | null) => void;
}) {
	const form = useForm({
		defaultValues: {
			gender: "male",
			age: "" as unknown as number,
			weight: "" as unknown as number,
			height: "" as unknown as number,
		},
		onSubmit: ({ value }) => {
			const heightMeters = value.height / 100; // Convert cm to m
			const bmr =
				value.gender === "male"
					? 10 * value.weight + 6.25 * heightMeters - 5 * value.age + 5
					: 10 * value.weight + 6.25 * heightMeters - 5 * value.age - 161;
			return setBmr(bmr);
		},
	});

	const handleResetClick = () => {
		form.reset();
		setBmr(null);
	};

	return (
		<section>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="space-y-4"
			>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
					<form.Field name="age">
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label>อายุ</Label>
								<Input
									type="number"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.valueAsNumber)}
								/>
							</div>
						)}
					</form.Field>
					<form.Field name="weight">
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label>น้ำหนัก (กิโลกรัม)</Label>
								<Input
									type="number"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.valueAsNumber)}
								/>
							</div>
						)}
					</form.Field>
					<form.Field name="height">
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label>ส่วนสูง (เซนติเมตร)</Label>
								<Input
									type="number"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.valueAsNumber)}
								/>
							</div>
						)}
					</form.Field>
					<form.Field name="gender">
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label>เพศ</Label>
								<RadioGroup
									onValueChange={field.handleChange}
									defaultValue={field.state.value}
									className="flex gap-4"
								>
									{GENDERS.map(({ value, name }) => (
										<div key={value} className="flex items-center gap-2">
											<RadioGroupItem value={value} id={value} />
											<Label htmlFor={value}>{name}</Label>
										</div>
									))}
								</RadioGroup>
							</div>
						)}
					</form.Field>
				</div>
				<div className="space-x-2">
					<Button>คำนวณ BMR</Button>
					<Button
						variant="outline"
						type="button"
						onClick={handleResetClick}
						className="btn btn-outline"
					>
						รีเซ็ต
					</Button>
				</div>
			</form>
		</section>
	);
}

export function BmrDisplaySection({ bmr }: { bmr: number | null }) {
	return (
		<Card className="text-center group relative">
			<CardHeader>
				<CardTitle>ค่าการเผาผลาญพลังงาน (BMR)</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<p className="space-x-2">
					<span className="text-8xl text-primary font-bold">
						{bmr?.toFixed(1) || "?"}
					</span>
					{bmr && <span>แคลอรี่ต่อวัน</span>}
				</p>
			</CardContent>
		</Card>
	);
}
