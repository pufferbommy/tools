import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { closest } from "color-2-name";
import { converter, formatHex, formatHsl, formatRgb, random } from "culori";
import { useState } from "react";
import { toast } from "sonner";

import ToolLayout from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { loadToolData } from "@/lib/tool/loadToolData";

import { seo } from "@/utils/seo";
import { Shuffle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const colorCodes = ["hex", "rgb", "hsl", "oklch"];

const themes = [
	"Vintage",
	"Retro",
	"Pastel",
	"Neon",
	"Gold",
	"Light",
	"Dark",
	"Warm",
	"Cold",
	"Fall",
	"Summer",
	"Winter",
	"Spring",
	"Happy",
	"Nature",
	"Earth",
	"Night",
	"Space",
	"Rainbow",
	"Gradient",
	"Sunset",
	"Sky",
	"Sea",
	"Kids",
	"Skin",
	"Cream",
	"Food",
];

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
			colorCodes: ["hex", "rgb", "hsl", "oklch"],
			themes: [] as string[],
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
							<li>เลือกจำนวนสีที่ต้องการสุ่ม (ตั้งแต่ 1 สีขึ้นไป)</li>
							<li>เลือกประเภทค่าที่ต้องการแสดงผล</li>
							<li>เลือกธีมหรืออารมณ์ของสีที่ต้องการ</li>
							<li>คลิกปุ่ม "สุ่มสีเลย" เพื่อดูผลลัพธ์ที่สร้างขึ้น</li>
							<li>หากต้องการสุ่มใหม่ สามารถกด "สุ่มสีเลย" ได้อีกครั้ง</li>
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
				className="space-y-8"
			>
				<div className="grid grid-cols-12 gap-8 border border-dashed p-8 rounded-md space-y-4">
					<form.Field name="amount">
						{(field) => (
							<div className="flex flex-col col-span-full md:col-span-3 gap-4">
								<Label htmlFor={field.name}>จำนวนสี</Label>
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
										className="w-full"
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
					<form.Field name="colorCodes">
						{(field) => (
							<div className="flex flex-col col-span-full md:col-span-2 gap-4">
								<Label>แสดงรหัสสี</Label>
								<div className="grid gap-2">
									{colorCodes.map((colorCode) => (
										<div key={colorCode} className="flex gap-2 items-center">
											<Checkbox
												id={colorCode}
												checked={field.state.value.includes(colorCode)}
												onCheckedChange={(checked) => {
													if (checked) {
														field.handleChange([
															...field.state.value,
															colorCode,
														]);
													} else {
														field.handleChange(
															field.state.value.filter((v) => v !== colorCode),
														);
													}
												}}
											/>
											<Label
												className="uppercase size-full"
												htmlFor={colorCode}
											>
												{colorCode}
											</Label>
										</div>
									))}
								</div>
							</div>
						)}
					</form.Field>
					<form.Field name="themes">
						{(field) => (
							<div className="flex flex-col col-span-full md:col-span-7 gap-4">
								<Label>
									ธีมสี{" "}
									<span className="text-muted-foreground">
										(เลือกธีมสีเพื่อสุ่มสีที่ตรงตามความต้องการมากขึ้น)
									</span>
								</Label>
								<div className="flex flex-wrap gap-2">
									{themes.map((theme) => (
										<Button
											type="button"
											size="sm"
											onClick={() => {
												if (field.state.value.includes(theme)) {
													field.handleChange(
														field.state.value.filter((t) => t !== theme),
													);
												} else {
													field.handleChange([theme, ...field.state.value]);
												}
											}}
											variant={
												field.state.value.includes(theme)
													? "secondary"
													: "outline"
											}
											key={theme}
										>
											{theme}
										</Button>
									))}
								</div>
							</div>
						)}
					</form.Field>
				</div>
				<div className="text-center">
					<Button>
						<Shuffle /> สุ่มสีเลย
					</Button>
				</div>
			</form>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				{colors.map((color) => (
					<Card key={color.rgb} className="pt-0 overflow-hidden">
						<CardHeader
							onClick={() => handleCopyClick(color.hex)}
							className="aspect-video group cursor-pointer justify-center items-center"
							style={{
								backgroundColor: color.rgb,
							}}
						>
							<span className="text-white text-lg font-mono opacity-0 group-hover:opacity-100 transition-opacity">
								{color.hex}
							</span>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="capitalize font-bold">{color.name}</div>
							<div className="grid grid-cols-2 gap-2">
								{[color.hex, color.rgb, color.hsl, color.oklch].map((c) => (
									<Tooltip key={c}>
										<TooltipTrigger asChild>
											<Button
												onClick={() => handleCopyClick(c)}
												variant="outline"
												className="justify-between"
											>
												<span className="truncate">{c}</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent>{c}</TooltipContent>
									</Tooltip>
								))}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</ToolLayout>
	);
}
