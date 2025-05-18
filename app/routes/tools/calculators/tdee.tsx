import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import ToolLayout from "@/components/tool-layout";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/tools/calculators/tdee")({
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
	}),
});

function RouteComponent() {
	const { url, category, tool } = Route.useLoaderData();
	const [tdee, setTdee] = useState<number | null>(null);

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

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { GENDERS } from "@/constants/genders";
import { loadToolData } from "@/lib/tool/loadToolData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ACTIVITY_LEVELS = [
	{ value: 1.2, label: "🏢 ไม่ออกกำลังกายเลย (นั่งทำงานทั้งวัน)" },
	{ value: 1.375, label: "🚶‍♂️ ออกกำลังกายเบาๆ (1–2 วัน/สัปดาห์)" },
	{ value: 1.55, label: "🏃‍♂️ ออกกำลังกายปานกลาง (3–5 วัน/สัปดาห์)" },
	{ value: 1.725, label: "💪 ออกกำลังกายหนัก (6–7 วัน/สัปดาห์)" },
	{ value: 1.9, label: "🔥 ออกกำลังกายหนักมาก (เช้า–เย็น หรืองานใช้แรงเยอะ)" },
];

const FormSchema = z.object({
	gender: z.enum(["male", "female"]),
	age: z.number({
		message: "กรุณากรอกอายุ",
	}),
	weight: z.number({
		message: "กรุณากรอกน้ำหนัก",
	}),
	height: z.number({
		message: "กรุณากรอกส่วนสูง",
	}),
	activity: z.number({
		message: "กรุณาเลือกระดับกิจกรรม",
	}),
});

type FormSchema = z.infer<typeof FormSchema>;

export function TdeeCalculatorSection({
	setTdee,
}: {
	setTdee: (value: number | null) => void;
}) {
	const form = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			gender: "male",
			age: "" as unknown as number,
			weight: "" as unknown as number,
			height: "" as unknown as number,
			activity: 1.2 as number,
		},
	});

	const onSubmit = (data: FormSchema) => {
		const heightMeters = data.height / 100; // Convert cm to m
		const bmr =
			data.gender === "male"
				? 10 * data.weight + 6.25 * heightMeters - 5 * data.age + 5
				: 10 * data.weight + 6.25 * heightMeters - 5 * data.age - 161;
		const tdee = bmr * data.activity;
		return setTdee(tdee);
	};

	const handleResetClick = () => {
		form.reset();
		setTdee(null);
	};

	return (
		<section>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
						<FormField
							control={form.control}
							name="gender"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>เพศ</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={onChange}
											defaultValue={value}
											className="flex gap-4"
										>
											{GENDERS.map((gender) => (
												<div
													key={gender.value}
													className="flex items-center gap-2"
												>
													<RadioGroupItem
														value={gender.value}
														id={gender.value}
													/>
													<Label htmlFor={gender.value}>{gender.name}</Label>
												</div>
											))}
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="age"
							render={({ field }) => (
								<FormItem>
									<FormLabel>อายุ</FormLabel>
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
						<FormField
							control={form.control}
							name="activity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ระดับกิจกรรม</FormLabel>
									<FormControl>
										<Select
											defaultValue={field.value.toString()}
											onValueChange={(value) => field.onChange(Number(value))}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="เลือกระดับกิจกรรม" />
											</SelectTrigger>
											<SelectContent>
												{ACTIVITY_LEVELS.map((level) => (
													<SelectItem
														key={level.value}
														value={level.value.toString()}
													>
														{level.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="space-x-2">
						<Button>คำนวณ</Button>
						<Button type="button" onClick={handleResetClick} variant="outline">
							รีเซ็ต
						</Button>
					</div>
				</form>
			</Form>
		</section>
	);
}

function TdeeDisplaySection({ tdee }: { tdee: number | null }) {
	return (
		<Card className="text-center">
			<CardHeader>
				<CardTitle>ค่าพลังงานที่ร่างกายคุณต้องการต่อวัน (TDEE)</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<p className="space-x-2">
					<span className="text-8xl text-primary font-semibold">
						{tdee?.toFixed(1) || "?"}
					</span>
					{tdee && <span>แคลอรี่</span>}
				</p>
			</CardContent>
		</Card>
	);
}
