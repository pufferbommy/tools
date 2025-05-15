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
import { closest } from "color-2-name";
import { converter, formatHex, formatHsl, formatRgb, random } from "culori";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formatOklch = (color: string | undefined) => {
	if (!color) return "";

	const oklch = converter("oklch")(color);

	return `oklch(${[oklch?.l.toFixed(2), oklch?.c.toFixed(4), oklch?.h?.toFixed(2)].join(" ")})`;
};

const INITIAL_COLOR_COUNT = 3;

const FormSchema = z.object({
	amount: z
		.number()
		.min(1)
		.max(INITIAL_COLOR_COUNT ** 2),
});

type FormSchema = z.infer<typeof FormSchema>;

export const Route = createFileRoute("/tools/colors/random/")({
	component: RouteComponent,
	loader: async (context) => {
		const pathname = context.location.pathname;
		const url = `${process.env.ORIGIN}${pathname}`;
		const initialColors = Array.from({ length: INITIAL_COLOR_COUNT }, () => {
			const rgb = formatRgb(random());
			return {
				rgb,
				hex: formatHex(rgb),
				hsl: formatHsl(rgb),
				oklch: formatOklch(rgb),
				name: closest(rgb).name,
			} as Color;
		});
		return { url, initialColors };
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

interface Color {
	rgb: string;
	hex: string;
	hsl: string;
	oklch: string;
	name: string;
}

function RouteComponent() {
	const { url, initialColors } = Route.useLoaderData();

	const [colors, setColors] = useState<Color[]>(initialColors);

	const form = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			amount: INITIAL_COLOR_COUNT,
		},
	});

	const onSubmit = (data: FormSchema) => {
		setColors(
			Array.from({ length: data.amount }, () => {
				const rgb = formatRgb(random());
				return {
					rgb,
					hex: formatHex(rgb),
					hsl: formatHsl(rgb),
					oklch: formatOklch(rgb),
					name: closest(rgb).name,
				} as Color;
			}),
		);
	};

	const handleCopyClick = (color: string) => {
		navigator.clipboard.writeText(color);
		toast.success(`คัดลอกรหัสสี ${color} แล้ว 🎉`);
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
											max={INITIAL_COLOR_COUNT ** 2}
											{...field}
											onChange={(e) => {
												field.onChange(e.target.valueAsNumber);
											}}
										/>
										<Slider
											className="w-40"
											value={[field.value]}
											min={1}
											max={INITIAL_COLOR_COUNT ** 2}
											onValueChange={(value) =>
												field.onChange(Number(value[0]))
											}
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
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{colors.map((color) => (
					<Card key={color.rgb} className="pt-0 overflow-hidden">
						<CardHeader
							className="aspect-[1/0.8]"
							style={{
								backgroundColor: color.rgb,
							}}
						/>
						<CardContent className="space-y-2">
							<div className="capitalize font-semibold">{color.name}</div>
							<div className="space-y-2">
								<div className="text-muted-foreground text-sm flex w-full justify-between">
									HEX
									<button
										type="button"
										onClick={() => handleCopyClick(color.hex)}
									>
										{color.hex}
									</button>
								</div>
								<div className="text-muted-foreground text-sm flex justify-between">
									RGB
									<button
										type="button"
										onClick={() => handleCopyClick(color.rgb)}
									>
										{color.rgb}
									</button>
								</div>
								<div className="text-muted-foreground text-sm flex justify-between">
									HSL
									<button
										type="button"
										onClick={() => handleCopyClick(color.hsl)}
									>
										{color.hsl}
									</button>
								</div>
								<div className="text-muted-foreground text-sm flex justify-between">
									OKLCH
									<button
										type="button"
										onClick={() => handleCopyClick(color.oklch)}
									>
										{color.oklch}
									</button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</ToolLayout>
	);
}
