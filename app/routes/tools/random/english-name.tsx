import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import ToolLayout from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ENGLISH_NAMES } from "@/constants/english-names";
import { GENDERS } from "@/constants/genders";
import { loadToolData } from "@/lib/tool/loadToolData";
import { pickRandomItem } from "@/utils/random";
import { seo } from "@/utils/seo";

const minAmount = 1;
const maxAmount = 12;

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

export const Route = createFileRoute("/tools/random/english-name")({
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
	const form = useForm({
		defaultValues: {
			gender: "both",
			types: ["name", "last-name", "nickname"],
			amount: 5,
		},
		onSubmit: ({ value }) => {
			const items = Array.from({ length: value.amount }, () => {
				const gender =
					value.gender === "both"
						? pickRandomItem(GENDERS).value
						: value.gender;
				const randomLastName = pickRandomItem(ENGLISH_NAMES.lastNames);
				const lastName = value.types.includes("last-name")
					? randomLastName
					: null;
				if (gender === "male") {
					const maleName = pickRandomItem(ENGLISH_NAMES.maleNames);
					const maleNickname = pickRandomItem(ENGLISH_NAMES.maleNicknames);

					return {
						name: value.types.includes("name") ? maleName : null,
						lastName,
						nickname: value.types.includes("nickname") ? maleNickname : null,
					};
				}

				const femaleName = pickRandomItem(ENGLISH_NAMES.femaleNames);
				const femaleNickname = pickRandomItem(ENGLISH_NAMES.femaleNicknames);

				return {
					name: value.types.includes("name") ? femaleName : null,
					lastName,
					nickname: value.types.includes("nickname") ? femaleNickname : null,
				};
			});
			setResults(items);
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
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
						<form.Field name="gender">
							{(field) => (
								<div className="flex flex-col gap-2">
									<Label>เพศ</Label>
									<RadioGroup
										onValueChange={field.handleChange}
										defaultValue={field.state.value}
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
								</div>
							)}
						</form.Field>
						<form.Field name="types">
							{(field) => (
								<div className="flex flex-col gap-2">
									<Label>ประเภท</Label>
									<div className="flex gap-4">
										{TYPES.map((type) => (
											<div key={type.id} className="flex gap-2 items-center">
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
					<Button>สุ่มชื่ออังกฤษ</Button>
				</form>
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
