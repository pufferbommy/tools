import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { closest } from "color-2-name";
import { converter, formatHex, formatHsl, formatRgb, random } from "culori";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import ToolLayout from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { loadToolData } from "@/lib/tool/loadToolData";

import { seo } from "@/utils/seo";

const formatOklch = (color: string | undefined) => {
	if (!color) return "";

	const oklch = converter("oklch")(color);

	return `oklch(${[oklch?.l.toFixed(2), oklch?.c.toFixed(4), oklch?.h?.toFixed(2)].join(" ")})`;
};

const INITIAL_COLOR_COUNT = 4;
const minAmount = 1;
const maxAmount = 12;

export const Route = createFileRoute("/tools/random/color")({
	component: RouteComponent,
	loader: (context) => loadToolData(context.location.pathname),
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

interface Color {
	rgb: string;
	hex: string;
	hsl: string;
	oklch: string;
	name: string;
}

function RouteComponent() {
	const { url, category, tool } = Route.useLoaderData();
	const [colors, setColors] = useState<Color[]>([]);
	const form = useForm({
		defaultValues: {
			amount: INITIAL_COLOR_COUNT,
		},
		onSubmit: ({ value }) => {
			setColors(
				Array.from({ length: value.amount }, () => {
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
		},
	});

	const handleCopyClick = (color: string) => {
		navigator.clipboard.writeText(color);
		toast.success(`คัดลอกรหัสสี ${color} แล้ว 🎉`);
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
							<li>คลิกปุ่ม "สุ่มสี" เพื่อดูผลลัพธ์ที่สร้างขึ้น</li>
							<li>หากต้องการสุ่มใหม่ สามารถกด "สุ่มสี" ได้อีกครั้ง</li>
						</ol>
					),
				},
			]}
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="space-y-4"
			>
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
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
				<Button>สุ่มสี</Button>
			</form>
			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{colors.map((color) => (
					<Card key={color.rgb} className="pt-0 overflow-hidden">
						<CardHeader
							className="aspect-[1/0.8]"
							style={{
								backgroundColor: color.rgb,
							}}
						/>
						<CardContent className="space-y-2">
							<div className="capitalize font-bold">{color.name}</div>
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
