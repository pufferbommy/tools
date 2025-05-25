import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import ToolLayout from "@/components/tools/tool-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { seo } from "@/utils/seo";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { GENDERS } from "@/constants/genders";

import { loadToolData } from "@/lib/tool/loadToolData";
import { pickRandomItem } from "@/utils/random";
import { useQuery } from "@tanstack/react-query";

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

const minAmount = 1;
const maxAmount = 12;

export const Route = createFileRoute("/tools/random/thai-name")({
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

function FormSection({
	setResults,
}: {
	setResults: (value: Result[]) => void;
}) {
	const { data: thaiNames } = useQuery<{
		maleNames: {
			th: string;
			en: string;
		}[];
		femaleNames: {
			th: string;
			en: string;
		}[];
		maleNicknames: {
			th: string;
			en: string;
		}[];
		femaleNicknames: {
			th: string;
			en: string;
		}[];
		lastNames: {
			th: string;
			en: string;
		}[];
	}>({
		queryKey: ["thai-names"],
		queryFn: () => fetch("/thai-names.json").then((r) => r.json()),
	});
	const form = useForm({
		defaultValues: {
			gender: "both",
			types: ["name", "last-name", "nickname"],
			languages: ["th", "en"],
			amount: 5,
		},
		onSubmit: ({ value }) => {
			if (!thaiNames) return;

			const items = Array.from({ length: value.amount }, () => {
				const gender =
					value.gender === "both"
						? pickRandomItem(GENDERS).value
						: value.gender;

				const randomLastName = pickRandomItem(thaiNames.lastNames);
				const lastName = value.types.includes("last-name")
					? {
							th: value.languages.includes("th") ? randomLastName.th : "",
							en: value.languages.includes("en") ? randomLastName.en : "",
						}
					: null;

				if (gender === "male") {
					const maleName = pickRandomItem(thaiNames.maleNames);
					const maleNickname = pickRandomItem(thaiNames.maleNicknames);

					return {
						name: value.types.includes("name")
							? {
									th: value.languages.includes("th") ? maleName.th : "",
									en: value.languages.includes("en") ? maleName.en : "",
								}
							: null,
						lastName,
						nickname: value.types.includes("nickname")
							? {
									th: value.languages.includes("th") ? maleNickname.th : "",
									en: value.languages.includes("en") ? maleNickname.en : "",
								}
							: null,
					};
				}

				const femaleName = pickRandomItem(thaiNames.femaleNames);
				const femaleNickname = pickRandomItem(thaiNames.femaleNicknames);

				return {
					name: value.types.includes("name")
						? {
								th: value.languages.includes("th") ? femaleName.th : "",
								en: value.languages.includes("en") ? femaleName.en : "",
							}
						: null,
					lastName,
					nickname: value.types.includes("nickname")
						? {
								th: value.languages.includes("th") ? femaleNickname.th : "",
								en: value.languages.includes("en") ? femaleNickname.en : "",
							}
						: null,
				};
			});
			setResults(items);
		},
	});

	return (
		<section>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="space-y-4"
			>
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 items-start gap-4">
					<form.Field name="gender">
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label>เพศ</Label>
								<RadioGroup
									onValueChange={field.handleChange}
									value={field.state.value}
									className="flex gap-4"
								>
									<div className="flex items-center gap-2">
										<RadioGroupItem value="both" id="both" />
										<Label htmlFor="both">ทั้งคู่</Label>
									</div>
									{GENDERS.map((gender) => (
										<div key={gender.value} className="flex items-center gap-2">
											<RadioGroupItem value={gender.value} id={gender.value} />
											<Label htmlFor={gender.value}>{gender.name}</Label>
										</div>
									))}
								</RadioGroup>
							</div>
						)}
					</form.Field>

					<form.Field name="types">
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label>ประเภท</Label>
								<div className="flex gap-4 flex-wrap">
									{TYPES.map((type) => (
										<div key={type.id} className="flex gap-2 items-center">
											<Checkbox
												id={type.id}
												checked={field.state.value.includes(type.id)}
												onCheckedChange={(checked) => {
													if (checked) {
														field.handleChange([...field.state.value, type.id]);
													} else {
														field.handleChange(
															field.state.value.filter((v) => v !== type.id),
														);
													}
												}}
											/>
											<Label htmlFor={type.id}>{type.name}</Label>
										</div>
									))}
								</div>
							</div>
						)}
					</form.Field>

					<form.Field name="languages">
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label>ภาษา</Label>
								<div className="flex gap-4">
									{LANGUAGES.map((language) => (
										<div key={language.id} className="flex gap-2 items-center">
											<Checkbox
												id={language.id}
												checked={field.state.value.includes(language.id)}
												onCheckedChange={(checked) => {
													if (checked) {
														field.handleChange([
															...field.state.value,
															language.id,
														]);
													} else {
														field.handleChange(
															field.state.value.filter(
																(v) => v !== language.id,
															),
														);
													}
												}}
											/>
											<Label htmlFor={language.id}>{language.name}</Label>
										</div>
									))}
								</div>
							</div>
						)}
					</form.Field>
					<form.Field name="amount">
						{(field) => (
							<div className="flex flex-col gap-2">
								<label htmlFor={field.name}>จำนวน</label>
								<div className="flex gap-2 items-center">
									<Input
										className="w-10 px-0 shrink-0 text-center"
										type="number"
										min={minAmount}
										max={maxAmount}
										id={field.name}
										name={field.name}
										autoComplete="off"
										value={field.state.value}
										onChange={(e) => {
											const newValue = e.target.valueAsNumber;
											if (newValue >= minAmount && newValue <= maxAmount) {
												field.handleChange(newValue);
											}
										}}
										onBlur={field.handleBlur}
									/>
									<Slider
										value={[field.state.value]}
										min={minAmount}
										max={maxAmount}
										onValueChange={(value) => {
											field.handleChange(Number(value[0]));
										}}
									/>
								</div>
							</div>
						)}
					</form.Field>
				</div>
				<Button>สุ่มชื่อไทย</Button>
			</form>
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
