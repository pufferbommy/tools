import { Shuffle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";

import { Card, CardContent } from "@/components/ui/card";
import { seo } from "@/utils/seo";
import ToolLayout from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { GENDERS } from "@/constants/genders";
import { loadToolData } from "@/lib/tool/loadToolData";
import { pickRandomItem } from "@/utils/random";
import Loading from "@/components/loading";

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
	const [isRandomizing, setIsRandomizing] = useState(false);
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
			gender: ["male", "female"],
			types: ["name", "last-name", "nickname"],
			languages: ["th", "en"],
			amount: 5,
		},
		onSubmit: ({ value }) => {
			if (!thaiNames) return;

			setIsRandomizing(true);

			const items = Array.from({ length: value.amount }, () => {
				const gender = pickRandomItem(value.gender);

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

			setTimeout(() => {
				setResults(items);
				setIsRandomizing(false);
			}, 1500);
		},
	});

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
			<section>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
					className="space-y-4"
				>
					<div className="grid grid-cols-12 gap-x-4 gap-y-8">
						<form.Field name="gender">
							{(field) => (
								<div className="col-span-full sm:col-span-3 lg:col-span-2 flex flex-col gap-3">
									<Label>เพศ</Label>
									{GENDERS.map((gender) => (
										<div key={gender.value} className="flex gap-3 items-center">
											<Checkbox
												id={gender.value}
												checked={field.state.value.includes(gender.value)}
												onCheckedChange={(checked) => {
													if (checked) {
														field.handleChange([
															...field.state.value,
															gender.value,
														]);
													} else {
														field.handleChange(
															field.state.value.filter(
																(v) => v !== gender.value,
															),
														);
													}
												}}
											/>
											<Label htmlFor={gender.value}>{gender.name}</Label>
										</div>
									))}
								</div>
							)}
						</form.Field>
						<form.Field name="types">
							{(field) => (
								<div className="col-span-full sm:col-span-3 lg:col-span-2 flex flex-col gap-3">
									<Label>ประเภท</Label>
									<div className="flex flex-col gap-4">
										{TYPES.map((type) => (
											<div key={type.id} className="flex gap-3 items-center">
												<Checkbox
													id={type.id}
													checked={field.state.value.includes(type.id)}
													onCheckedChange={(checked) => {
														if (checked) {
															field.handleChange([
																...field.state.value,
																type.id,
															]);
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
								<div className="col-span-full sm:col-span-3 lg:col-span-2 flex flex-col gap-3">
									<Label>ภาษา</Label>
									<div className="flex flex-col gap-3">
										{LANGUAGES.map((language) => (
											<div
												key={language.id}
												className="flex gap-3 items-center"
											>
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
								<div className="col-span-full sm:col-span-3 lg:col-span-2 flex flex-col gap-2">
									<Label htmlFor={field.name}>จำนวน</Label>
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
												if (newValue < minAmount) {
													field.handleChange(minAmount);
												} else if (newValue > maxAmount) {
													field.handleChange(maxAmount);
												} else {
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
					<div className="text-center">
						<Button disabled={isRandomizing} variant="outlinePrimary">
							สุ่มชื่อเลย
							<Shuffle />
						</Button>
					</div>
				</form>
			</section>
			<Card className="text-center group relative py-10 min-h-[122px]">
				<CardContent className="space-y-8 flex flex-col justify-center">
					{isRandomizing ? (
						<Loading />
					) : results.length === 0 ? (
						<p className="text-muted-foreground">ลองสุ่มชื่อดูเลย!</p>
					) : (
						results.map((result) => (
							<div key={Object.values(result).join()}>
								{(["th", "en"] as const).map((lang) => (
									<div key={`${Object.values(result).join()}${lang}`}>
										{(result.name?.[lang] ||
											result.lastName?.[lang] ||
											result.nickname?.[lang]) && (
											<div>
												{result.name?.[lang]} {result.lastName?.[lang]}{" "}
												{result.nickname?.[lang] && (
													<span className="text-muted-foreground hover:text-secondary">
														{(result.name?.[lang] || result.lastName?.[lang]) &&
															" "}
														{result.nickname?.[lang]}
													</span>
												)}
											</div>
										)}
									</div>
								))}
							</div>
						))
					)}
				</CardContent>
			</Card>
		</ToolLayout>
	);
}
