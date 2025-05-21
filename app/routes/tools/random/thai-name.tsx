import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import ToolLayout from "@/components/tools/tool-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { seo } from "@/utils/seo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { GENDERS } from "@/constants/genders";
import { THAI_NAMES } from "@/constants/thai-names";
import { loadToolData } from "@/lib/tool/loadToolData";
import { pickRandomItem } from "@/utils/random";

interface Result {
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

export const Route = createFileRoute("/tools/random/thai-name")({
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

	const [results, setResults] = useState<Result[]>([]);

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

const LANGUAGES = [
	{
		id: "th",
		name: "ไทย",
	},
	{
		id: "en",
		name: "อังกฤษ",
	},
];

const FormSchema = z.object({
	gender: z.enum(["both", ...GENDERS.map((gender) => gender.value)]),
	types: z.array(z.string()).min(1, {
		message: "กรุณาเลือกประเภทอย่างน้อย 1 ประเภท",
	}),
	languages: z.array(z.string()).min(1, {
		message: "กรุณาเลือกภาษาอย่างน้อย 1 ภาษา",
	}),
	amount: z.coerce.number({
		message: "กรุณากรอกจำนวน",
	}),
});

type FormSchema = z.infer<typeof FormSchema>;

export function FormSection({
	setResults,
}: {
	setResults: (value: Result[]) => void;
}) {
	const form = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			gender: "both",
			types: ["name", "last-name", "nickname"],
			languages: ["th", "en"],
			amount: 5,
		},
	});

	const onSubmit = (data: FormSchema) => {
		const items = Array.from({ length: data.amount }, () => {
			const gender =
				data.gender === "both" ? pickRandomItem(GENDERS).value : data.gender;

			const randomLastName = pickRandomItem(THAI_NAMES.lastNames);
			const lastName = data.types.includes("last-name")
				? {
						th: data.languages.includes("th") ? randomLastName.th : "",
						en: data.languages.includes("en") ? randomLastName.en : "",
					}
				: null;

			if (gender === "male") {
				const maleName = pickRandomItem(THAI_NAMES.maleNames);
				const maleNickname = pickRandomItem(THAI_NAMES.maleNicknames);

				return {
					name: data.types.includes("name")
						? {
								th: data.languages.includes("th") ? maleName.th : "",
								en: data.languages.includes("en") ? maleName.en : "",
							}
						: null,
					lastName,
					nickname: data.types.includes("nickname")
						? {
								th: data.languages.includes("th") ? maleNickname.th : "",
								en: data.languages.includes("en") ? maleNickname.en : "",
							}
						: null,
				};
			}

			const femaleName = pickRandomItem(THAI_NAMES.femaleNames);
			const femaleNickname = pickRandomItem(THAI_NAMES.femaleNicknames);

			return {
				name: data.types.includes("name")
					? {
							th: data.languages.includes("th") ? femaleName.th : "",
							en: data.languages.includes("en") ? femaleName.en : "",
						}
					: null,
				lastName,
				nickname: data.types.includes("nickname")
					? {
							th: data.languages.includes("th") ? femaleNickname.th : "",
							en: data.languages.includes("en") ? femaleNickname.en : "",
						}
					: null,
			};
		});
		setResults(items);
	};

	return (
		<section>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 items-start gap-4">
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
												<div key={type.id} className="flex gap-2 items-center">
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
							name="languages"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>ภาษา</FormLabel>
									<FormControl>
										<div className="flex gap-4">
											{LANGUAGES.map((language) => (
												<div
													key={language.id}
													className="flex gap-2 items-center"
												>
													<Checkbox
														id={language.id}
														checked={value.includes(language.id)}
														onCheckedChange={(checked) => {
															if (checked) {
																onChange([...value, language.id]);
															} else {
																onChange(
																	value.filter((v) => v !== language.id),
																);
															}
														}}
													/>
													<Label htmlFor={language.id}>{language.name}</Label>
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
												onChange={(e) => field.onChange(e.target.valueAsNumber)}
											/>
											<Slider
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
					<Button>สุ่มชื่อไทย</Button>
				</form>
			</Form>
		</section>
	);
}

function ResultSection({ results }: { results: Result[] }) {
	return (
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
							{(result.name?.th ||
								result.lastName?.th ||
								result.nickname?.th) && (
								<p>
									{result.name?.th} {result.lastName?.th}{" "}
									{result.nickname?.th && (
										<>
											{(result.name?.th || result.lastName?.th) && " - "}
											{result.nickname?.th}
										</>
									)}
								</p>
							)}
							{(result.name?.en ||
								result.lastName?.en ||
								result?.nickname?.en) && (
								<p>
									{result.name?.en} {result.lastName?.en}
									{result.nickname?.en && (
										<>
											{(result.name?.en || result.lastName?.en) && " - "}
											{result.nickname?.en}
										</>
									)}
								</p>
							)}
						</div>
					))
				)}
			</CardContent>
		</Card>
	);
}
