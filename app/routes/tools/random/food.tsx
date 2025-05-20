import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

import { type Food, FOODS } from "@/constants/foods";
import ToolLayout from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { loadToolData } from "@/lib/tool/loadToolData";
import { seo } from "@/utils/seo";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { pickRandomItem } from "@/utils/random";

const foodTypes = [
	{ value: "savory", label: "อาหารคาว", emoji: "🍛" },
	{ value: "dessert", label: "ของหวาน", emoji: "🍰" },
	{ value: "snack", label: "ของกินเล่น", emoji: "🧀" },
	{ value: "drink", label: "เครื่องดื่ม", emoji: "☕" },
];

const minAmount = 1;
const maxAmount = 10;

export const Route = createFileRoute("/tools/random/food")({
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
	const [foods, setFoods] = useState<Food[]>([]);
	const form = useForm({
		defaultValues: {
			types: ["savory"],
			amount: minAmount,
		},
		onSubmit: async ({ value }) => {
			setFoods(
				Array.from({ length: value.amount }).map(() => {
					const randomType = pickRandomItem(value.types);
					if (randomType === "savory") return pickRandomItem(FOODS);
					return pickRandomItem(FOODS);
				}),
			);
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
			<section>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
					className="space-y-8"
				>
					<div>
						<h2 className="mb-2">เลือกประเภทอาหาร</h2>
						<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
							<form.Field name="types">
								{(field) =>
									foodTypes.map((type) => (
										<Card
											key={type.value}
											className="shadow-[0_-0.125rem_0_inset] relative has-data-[state=checked]:border-primary transition-colors hover:border-primary [--tw-shadow-color:oklch(from_var(--border)_l_c_h_/_0.5)] hover:shadow-[0.25rem_0.25rem_0]"
										>
											<CardContent className="space-y-4">
												<div className="flex justify-between gap-2">
													<Checkbox
														id={type.value}
														value={type.value}
														className="order-1 after:absolute after:inset-0"
														defaultChecked={field.state.value.includes(
															type.value,
														)}
														onCheckedChange={(checked) =>
															checked
																? field.handleChange([
																		...field.state.value,
																		type.value,
																	])
																: field.handleChange(
																		field.state.value.filter(
																			(value) => value !== type.value,
																		),
																	)
														}
													/>
													{type.emoji}
												</div>
												<Label htmlFor={type.value}>{type.label}</Label>
											</CardContent>
										</Card>
									))
								}
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
													if (
														e.target.valueAsNumber < minAmount ||
														e.target.valueAsNumber > maxAmount
													) {
														return;
													}
													field.handleChange(e.target.valueAsNumber);
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
					</div>
					<Button>สุ่มอาหาร</Button>
				</form>
			</section>
			<section className="grid grid-cols-4 gap-4">
				<AnimatePresence mode="popLayout">
					{foods.map((food, i) => (
						<motion.div
							initial={{
								opacity: 0,
								scale: 0,
							}}
							animate={{
								opacity: 1,
								scale: 1,
							}}
							exit={{
								opacity: 0,
								scale: 0,
							}}
							key={food.name + i}
						>
							<Card>
								<CardHeader>
									<CardTitle>{food.name}</CardTitle>
									<CardDescription>{food.calories} กิโลแคลอรี่</CardDescription>
								</CardHeader>
							</Card>
						</motion.div>
					))}
				</AnimatePresence>
			</section>
		</ToolLayout>
	);
}
