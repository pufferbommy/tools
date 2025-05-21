import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import ToolLayout from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { loadToolData } from "@/lib/tool/loadToolData";
import { pickRandomItem } from "@/utils/random";
import { seo } from "@/utils/seo";

const foodTypes = [
	{ value: "savory", label: "อาหารคาว", emoji: "🍛" },
	{ value: "dessert", label: "ของหวาน", emoji: "🍰" },
	{ value: "snack", label: "ของกินเล่น", emoji: "🧀" },
	{ value: "drink", label: "เครื่องดื่ม", emoji: "☕" },
];

const minAmount = 1;
const maxAmount = 12;

interface Food {
	name: string;
	calories: number;
}

export const Route = createFileRoute("/tools/random/food")({
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
					if (randomType === "savory" && savories) {
						return pickRandomItem(savories);
					}
					if (randomType === "dessert" && desserts) {
						return pickRandomItem(desserts);
					}
					if (randomType === "snack" && snacks) {
						return pickRandomItem(snacks);
					}
					return pickRandomItem(drinks as Food[]);
				}),
			);
		},
	});
	const { data: savories } = useQuery({
		queryKey: ["savories"],
		queryFn: () => fetch("/savories.json").then<Food[]>((r) => r.json()),
	});
	const { data: desserts, refetch: refetchDesserts } = useQuery({
		queryKey: ["desserts"],
		enabled: false,
		queryFn: () => fetch("/desserts.json").then<Food[]>((r) => r.json()),
	});
	const { data: snacks, refetch: refetchSnacks } = useQuery({
		queryKey: ["snacks"],
		enabled: false,
		queryFn: () => fetch("/snacks.json").then<Food[]>((r) => r.json()),
	});
	const { data: drinks, refetch: refetchDrinks } = useQuery({
		queryKey: ["drinks"],
		enabled: false,
		queryFn: () => fetch("/drinks.json").then<Food[]>((r) => r.json()),
	});
	const [isSubmitted, setIsSubmitted] = useState(false);

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
							<li>
								เลือกประเภทอาหารที่ต้องการสุ่ม (อาหารคาว, ของหวาน, ขนมขบเคี้ยว, เครื่องดื่ม)
							</li>
							<li>คลิกปุ่ม "สุ่มอาหาร" เพื่อสุ่มอาหารจากประเภทที่เลือก</li>
							<li>ดูผลลัพธ์อาหารที่สุ่มได้</li>
							<li>ต้องการสุ่มอาหารใหม่? กดปุ่ม "สุ่มอาหาร" ได้อีกครั้งเลย!</li>
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
						setIsSubmitted(true);
					}}
					className="space-y-8"
				>
					<div>
						<h2 className="mb-2">เลือกประเภทอาหาร</h2>
						<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
							<form.Field
								name="types"
								validators={{
									onChange: ({ value }) =>
										value.length < 1 ? "กรุณาเลือกอย่างน้อยหนึ่งประเภท" : undefined,
								}}
							>
								{(field) => (
									<>
										{foodTypes.map((type) => (
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
															onCheckedChange={(checked) => {
																if (checked) {
																	if (type.value === "dessert" && !desserts) {
																		refetchDesserts();
																	} else if (
																		type.value === "snack" &&
																		!snacks
																	) {
																		refetchSnacks();
																	} else if (
																		type.value === "drink" &&
																		!drinks
																	) {
																		refetchDrinks();
																	}
																	field.handleChange([
																		...field.state.value,
																		type.value,
																	]);
																} else {
																	field.handleChange(
																		field.state.value.filter(
																			(value) => value !== type.value,
																		),
																	);
																}
															}}
														/>
														{type.emoji}
													</div>
													<Label htmlFor={type.value}>{type.label}</Label>
												</CardContent>
											</Card>
										))}
										{!field.state.meta.isValid && isSubmitted && (
											<em className="col-span-full text-sm text-destructive">
												{field.state.meta.errors.join(", ")}
											</em>
										)}
									</>
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
			<section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
