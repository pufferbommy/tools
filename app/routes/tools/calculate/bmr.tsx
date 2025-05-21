import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import ToolLayout from "@/components/tools/tool-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { GENDERS } from "@/constants/genders";
import { loadToolData } from "@/lib/tool/loadToolData";

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
});

type FormSchema = z.infer<typeof FormSchema>;

function BmrCalculatorSection({
	setBmr,
}: {
	setBmr: (value: number | null) => void;
}) {
	const form = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			gender: "male",
			age: "" as unknown as number,
			weight: "" as unknown as number,
			height: "" as unknown as number,
		},
	});

	const onSubmit = (data: FormSchema) => {
		const heightMeters = data.height / 100; // Convert cm to m
		const bmr =
			data.gender === "male"
				? 10 * data.weight + 6.25 * heightMeters - 5 * data.age + 5
				: 10 * data.weight + 6.25 * heightMeters - 5 * data.age - 161;
		return setBmr(bmr);
	};

	const handleResetClick = () => {
		form.reset();
		setBmr(null);
	};

	return (
		<section>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
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
			</Form>
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
					<span className="text-8xl text-primary font-semibold">
						{bmr?.toFixed(1) || "?"}
					</span>
					{bmr && <span>แคลอรี่ต่อวัน</span>}
				</p>
			</CardContent>
		</Card>
	);
}
