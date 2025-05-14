import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { seo } from "@/utils/seo";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { converter, formatHsl, formatRgb, random } from "culori";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
	amount: z.number().min(1).max(10),
});

type FormSchema = z.infer<typeof FormSchema>;

const randomHexColor = (): string => {
	return `#${Math.floor(Math.random() * 0xffffff)
		.toString(16)
		.padStart(6, "0")}`;
};

export const Route = createFileRoute("/tools/colors/random/")({
	component: RouteComponent,
	loader: async (context) => {
		const pathname = context.location.pathname;
		const url = `${process.env.ORIGIN}${pathname}`;
		const initialColor = randomHexColor();
		return { url, initialColor };
	},
	head: () => ({
		meta: [
			...seo({
				title: "สุ่มสี",
				description: "สุ่มสีพร้อมรหัส HEX และ RGB สำหรับใช้ในงานออกแบบหรือเลือกสี",
				keywords: "สุ่มสี, เครื่องมือสุ่มสี, รหัสสี HEX, รหัสสี RGB, เครื่องมือออกแบบ, พาเลตสี",
			}),
		],
	}),
});

function RouteComponent() {
	const { url, initialColor } = Route.useLoaderData();

	const [colors, setColors] = useState<string[]>([initialColor]);

	const onSubmit = (data: FormSchema) => {
		setColors(Array.from({ length: data.amount }, randomHexColor));
	};

	const form = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			amount: 1,
		},
	});

	const formatOklch = (color: string | undefined) => {
		if (!color) return "";

		const oklch = converter("oklch")(color);

		return `oklch(${[oklch?.l.toFixed(2), oklch?.c.toFixed(4), oklch?.h?.toFixed(2)].join(" ")})`;
	};

	return (
		<ToolLayout
			url={url}
			title="สุ่มสี"
			description="สุ่มสีพร้อมรหัส HEX, RGB, HSL และ OKLCH สำหรับใช้ในงานออกแบบหรือเลือกสี"
			breadcrumbs={[
				{
					label: "เครื่องมือสี",
					href: "/tools/colors",
				},
				{
					label: "สุ่มสี",
					href: "/tools/colors/random",
				},
			]}
			items={[
				{
					id: "1",
					title: "วิธีการใช้งาน",
					content: (
						<ol className="list-decimal list-inside space-y-2">
							<li>คลิกปุ่ม "สุ่มสี" เพื่อดูผลลัพธ์ที่สร้างขึ้น</li>
							<li>หากต้องการสุ่มใหม่ สามารถกด "สุ่มสี" ได้อีกครั้ง</li>
						</ol>
					),
				},
			]}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
											max={10}
											{...field}
											onChange={(e) => {
												console.log(e.target.valueAsNumber);
												field.onChange(e.target.valueAsNumber);
											}}
										/>
										<Slider
											className="w-40"
											value={[field.value]}
											onValueChange={(value) =>
												field.onChange(Number(value[0]))
											}
											min={1}
											max={10}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button>สุ่มสี</Button>
				</form>
			</Form>
			<div className="grid grid-cols-3 gap-4">
				{colors.map((color) => (
					<Card key={color} className="pt-0 overflow-hidden">
						<CardHeader
							className="h-60"
							style={{
								backgroundColor: color,
							}}
						/>
						<CardContent className="space-y-3 text-sm">
							<div className="flex justify-between">
								HEX
								<span>{color}</span>
							</div>
							<div className="flex justify-between">
								RGB
								<span>{formatRgb(color)}</span>
							</div>
							<div className="flex justify-between">
								HSL
								<span>{formatHsl(color)}</span>
							</div>
							<div className="flex justify-between">
								OKLCH
								<span>{formatOklch(color)}</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</ToolLayout>
	);
}
