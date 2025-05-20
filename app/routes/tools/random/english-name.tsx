import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

import ToolLayout from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Slider } from "@/components/ui/slider";
import { ENGLISH_NAMES } from "@/constants/english-names";
import { GENDERS } from "@/constants/genders";
import { loadToolData } from "@/lib/tool/loadToolData";
import { pickRandomItem } from "@/utils/random";
import { seo } from "@/utils/seo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export interface Result {
	name: string | null;
	lastName: string | null;
	nickname: string | null;
}

const TYPES = [
	{
		id: "name",
		name: "ชื่อจริง",
	},
	{
		id: "last-name",
		name: "นามสกุล",
	},
	{
		id: "nickname",
		name: "ชื่อเล่น",
	},
];

const FormSchema = z.object({
	gender: z.enum(["both", ...GENDERS.map((gender) => gender.value)]),
	types: z.array(z.string()).min(1, {
		message: "กรุณาเลือกประเภทอย่างน้อย 1 ประเภท",
	}),
	amount: z.coerce.number({
		message: "กรุณากรอกจำนวน",
	}),
});

type FormSchema = z.infer<typeof FormSchema>;

export const Route = createFileRoute("/tools/random/english-name")({
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
	const [results, setResults] = useState<Result[]>([]);
	const form = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			gender: "both",
			types: ["name", "last-name", "nickname"],
			amount: 5,
		},
	});

	const onSubmit = (data: FormSchema) => {
		const items = Array.from({ length: data.amount }, () => {
			const gender =
				data.gender === "both" ? pickRandomItem(GENDERS).value : data.gender;
			const randomLastName = pickRandomItem(ENGLISH_NAMES.lastNames);
			const lastName = data.types.includes("last-name") ? randomLastName : null;
			if (gender === "male") {
				const maleName = pickRandomItem(ENGLISH_NAMES.maleNames);
				const maleNickname = pickRandomItem(ENGLISH_NAMES.maleNicknames);

				return {
					name: data.types.includes("name") ? maleName : null,
					lastName,
					nickname: data.types.includes("nickname") ? maleNickname : null,
				};
			}

			const femaleName = pickRandomItem(ENGLISH_NAMES.femaleNames);
			const femaleNickname = pickRandomItem(ENGLISH_NAMES.femaleNicknames);

			return {
				name: data.types.includes("name") ? femaleName : null,
				lastName,
				nickname: data.types.includes("nickname") ? femaleNickname : null,
			};
		});
		setResults(items);
	};

	return (
		<ToolLayout
			url={url}
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
			items={[
				{
					id: "1",
					title: "วิธีการใช้งาน",
					content: (
						<ol className="list-decimal list-inside space-y-2">
							<li>เลือกเพศที่ต้องการ (ทั้งคู่, ชาย หรือ หญิง)</li>
							<li>เลือกประเภทชื่อที่ต้องการสุ่ม (ชื่อจริง, นามสกุล, ชื่อเล่น)</li>
							<li>กำหนดจำนวนชื่อที่ต้องการสุ่ม (เลือกได้ตั้งแต่ 1 ถึง 25 ชื่อ)</li>
							<li>คลิกปุ่ม "สุ่มชื่อ" เพื่อดูผลลัพธ์ที่สร้างขึ้น</li>
							<li>หากต้องการสุ่มใหม่ สามารถกด "สุ่มชื่อ" ได้อีกครั้ง</li>
						</ol>
					),
				},
			]}
		>
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
												<div className="flex items-center gap-2">
													<RadioGroupItem value="both" id="both" />
													<Label htmlFor="both">ทั้งคู่</Label>
												</div>
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
								name="types"
								render={({ field: { value, onChange } }) => (
									<FormItem>
										<FormLabel>ประเภท</FormLabel>
										<FormControl>
											<div className="flex gap-4">
												{TYPES.map((type) => (
													<div
														key={type.id}
														className="flex gap-2 items-center"
													>
														<Checkbox
															id={type.id}
															checked={value.includes(type.id)}
															onCheckedChange={(checked) => {
																if (checked) {
																	onChange([...value, type.id]);
																} else {
																	onChange(value.filter((v) => v !== type.id));
																}
															}}
														/>
														<Label htmlFor={type.id}>{type.name}</Label>
													</div>
												))}
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>จำนวน</FormLabel>
										<FormControl>
											<div className="flex gap-2">
												<Input
													className="w-auto"
													type="number"
													min={1}
													max={25}
													{...field}
													onChange={(e) =>
														field.onChange(e.target.valueAsNumber)
													}
												/>
												<Slider
													className="w-40"
													value={[field.value]}
													onValueChange={(value) =>
														field.onChange(Number(value[0]))
													}
													min={1}
													max={25}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button>สุ่มชื่ออังกฤษ</Button>
					</form>
				</Form>
			</section>
			<Card className="text-center group relative">
				<CardHeader>
					<CardTitle>ชื่อที่สุ่มได้</CardTitle>
				</CardHeader>
				<CardContent className="space-y-8">
					{results.length === 0 ? (
						<div className="text-muted-foreground">
							ยังไม่มีผลลัพธ์นะ~ ✨ ลองสุ่มชื่อดูเลย!
						</div>
					) : (
						results.map((result) => (
							<div
								key={Object.values(result).join()}
								className="text-4xl [&>:nth-child(2)]:text-muted-foreground"
							>
								{(result.name || result.lastName || result.nickname) && (
									<p>
										{result.name} {result.lastName}{" "}
										{result.nickname && (
											<>
												{(result.name || result.lastName) && " - "}
												{result.nickname}
											</>
										)}
									</p>
								)}
							</div>
						))
					)}
				</CardContent>
			</Card>
		</ToolLayout>
	);
}
