import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { closest } from "color-2-name";
import { converter, formatHex, formatHsl, formatRgb, random } from "culori";
import { useState } from "react";
import { toast } from "sonner";

import ToolLayout from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { loadToolData } from "@/lib/tool/loadToolData";
import { seo } from "@/utils/seo";
import { Shuffle } from "lucide-react";
import { randomInRange, pickRandomItem } from "@/utils/random";

const colorCodes = ["hex", "rgb", "hsl", "oklch"] as const;

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
] as const;

const formatOklch = (color: string | undefined) => {
	if (!color) return "";

	const oklch = converter("oklch")(color);

	return `oklch(${[oklch?.l.toFixed(2), oklch?.c.toFixed(4), oklch?.h?.toFixed(2)].join(" ")})`;
};

const INITIAL_COLOR_COUNT = 3;
const minAmount = 1;
const maxAmount = INITIAL_COLOR_COUNT * 4;

const generateThemedColor = (theme: (typeof themes)[number]) => {
	const base = random();
	const oklch = converter("oklch")(base);

	if (!oklch) return formatHex(base);

	let { l: lightness, c: chroma, h: hue } = oklch;

	switch (theme.toLowerCase()) {
		case "vintage":
			// Muted, desaturated colors with warm undertones
			lightness = randomInRange(0.4, 0.7);
			chroma = randomInRange(0.03, 0.08);
			hue = randomInRange(20, 60); // Warm browns/oranges
			break;

		case "retro":
			// Bold, saturated colors from the 70s-80s
			lightness = randomInRange(0.5, 0.8);
			chroma = randomInRange(0.15, 0.25);
			hue = pickRandomItem([30, 60, 180, 280, 320]); // Orange, yellow, cyan, purple, magenta
			break;

		case "pastel":
			// Light, soft, desaturated colors
			lightness = randomInRange(0.8, 0.95);
			chroma = randomInRange(0.05, 0.12);
			hue = randomInRange(0, 360);
			break;

		case "neon":
			// Bright, highly saturated electric colors
			lightness = randomInRange(0.7, 0.9);
			chroma = randomInRange(0.25, 0.35);
			hue = pickRandomItem([120, 180, 240, 300, 330]); // Green, cyan, blue, purple, pink
			break;

		case "gold":
			// Golden, yellow, and warm metallic tones
			lightness = randomInRange(0.6, 0.85);
			chroma = randomInRange(0.12, 0.2);
			hue = randomInRange(40, 80); // Yellow to orange range
			break;

		case "light":
			// Very light, almost white colors
			lightness = randomInRange(0.85, 0.98);
			chroma = randomInRange(0.02, 0.08);
			hue = randomInRange(0, 360);
			break;

		case "dark":
			// Dark, near-black colors
			lightness = randomInRange(0.1, 0.3);
			chroma = randomInRange(0.05, 0.15);
			hue = randomInRange(0, 360);
			break;

		case "warm":
			// Warm reds, oranges, yellows
			lightness = randomInRange(0.4, 0.8);
			chroma = randomInRange(0.08, 0.18);
			hue = randomInRange(0, 90); // Red to yellow
			break;

		case "cold":
			// Cool blues, greens, purples
			lightness = randomInRange(0.4, 0.8);
			chroma = randomInRange(0.08, 0.18);
			hue = randomInRange(180, 300); // Cyan to purple
			break;

		case "fall":
		case "autumn":
			// Autumn colors: oranges, reds, browns, yellows
			lightness = randomInRange(0.3, 0.7);
			chroma = randomInRange(0.1, 0.2);
			hue = pickRandomItem([15, 30, 45, 60]); // Red-orange to yellow
			break;

		case "summer":
			// Bright, vibrant summer colors
			lightness = randomInRange(0.6, 0.9);
			chroma = randomInRange(0.15, 0.25);
			hue = pickRandomItem([60, 120, 180, 300]); // Yellow, green, cyan, magenta
			break;

		case "winter":
			// Cool blues, whites, and icy tones
			lightness = randomInRange(0.6, 0.9);
			chroma = randomInRange(0.05, 0.15);
			hue = randomInRange(180, 240); // Blue range
			break;

		case "spring":
			// Fresh greens, light pinks, soft yellows
			lightness = randomInRange(0.7, 0.9);
			chroma = randomInRange(0.08, 0.15);
			hue = pickRandomItem([90, 120, 330]); // Light green, green, pink
			break;

		case "happy":
			// Bright, cheerful colors
			lightness = randomInRange(0.7, 0.9);
			chroma = randomInRange(0.15, 0.25);
			hue = pickRandomItem([60, 120, 300, 330]); // Yellow, green, magenta, pink
			break;

		case "nature":
		case "earth":
			// Natural earth tones: browns, greens, tans
			lightness = randomInRange(0.3, 0.7);
			chroma = randomInRange(0.05, 0.15);
			hue = pickRandomItem([30, 60, 90, 120]); // Brown to green range
			break;

		case "night":
			// Dark blues, purples, blacks
			lightness = randomInRange(0.1, 0.4);
			chroma = randomInRange(0.05, 0.12);
			hue = randomInRange(210, 270); // Blue to purple
			break;

		case "space":
			// Deep purples, blues, blacks with occasional bright accents
			lightness = randomInRange(0.2, 0.6);
			chroma = randomInRange(0.08, 0.18);
			hue = pickRandomItem([240, 260, 280, 300]); // Blue to purple range
			break;

		case "rainbow":
			// Full spectrum of vibrant colors
			lightness = randomInRange(0.5, 0.8);
			chroma = randomInRange(0.15, 0.25);
			hue = randomInRange(0, 360);
			break;

		case "gradient":
			// Smooth transitional colors
			lightness = randomInRange(0.4, 0.8);
			chroma = randomInRange(0.1, 0.2);
			hue = randomInRange(0, 360);
			break;

		case "sunset":
			// Warm sunset colors: oranges, reds, purples, yellows
			lightness = randomInRange(0.4, 0.8);
			chroma = randomInRange(0.12, 0.22);
			hue = pickRandomItem([15, 30, 45, 280, 320]); // Orange-red and purple range
			break;

		case "sky":
			// Sky blues and cloud whites
			lightness = randomInRange(0.6, 0.95);
			chroma = randomInRange(0.05, 0.15);
			hue = randomInRange(180, 220); // Blue range
			break;

		case "sea":
			// Ocean blues and greens
			lightness = randomInRange(0.4, 0.8);
			chroma = randomInRange(0.1, 0.2);
			hue = randomInRange(150, 210); // Blue-green to blue
			break;

		case "kids":
			// Bright, playful primary colors
			lightness = randomInRange(0.6, 0.85);
			chroma = randomInRange(0.18, 0.28);
			hue = pickRandomItem([0, 60, 120, 240]); // Red, yellow, green, blue
			break;

		case "skin":
			// Skin tone variations
			lightness = randomInRange(0.4, 0.9);
			chroma = randomInRange(0.03, 0.12);
			hue = randomInRange(20, 60); // Orange to yellow range
			break;

		case "cream":
			// Cream, beige, off-white tones
			lightness = randomInRange(0.8, 0.95);
			chroma = randomInRange(0.02, 0.08);
			hue = randomInRange(40, 80); // Warm yellows
			break;

		case "food":
			// Food-inspired colors: browns, reds, greens, yellows
			lightness = randomInRange(0.3, 0.8);
			chroma = randomInRange(0.08, 0.18);
			hue = pickRandomItem([15, 30, 60, 120]); // Red, orange, yellow, green
			break;

		default:
			// Default: use original random color
			return oklch;
	}

	// Ensure values are within valid ranges
	lightness = Math.max(0, Math.min(1, lightness));
	chroma = Math.max(0, Math.min(0.4, chroma));
	hue = hue % 360;

	return {
		mode: "oklch" as const,
		l: lightness,
		c: chroma,
		h: hue,
	};
};

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
	color: string;
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
			colorCodes,
			themes: [] as (typeof themes)[number][],
		},
		onSubmit: ({ value }) => {
			setColors(
				Array.from({ length: value.amount }, () => {
					const theme =
						value.themes.length > 0 ? pickRandomItem(value.themes) : "";

					const hex =
						theme !== ""
							? formatHex(generateThemedColor(theme))
							: formatHex(random());

					return {
						color: formatHex(hex),
						rgb: value.colorCodes.includes("rgb") ? formatRgb(hex) : "",
						hex: value.colorCodes.includes("hex") ? hex : "",
						hsl: value.colorCodes.includes("hsl") ? formatHsl(hex) : "",
						oklch: value.colorCodes.includes("oklch") ? formatOklch(hex) : "",
						name: closest(hex as string).name,
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
				<div className="grid grid-cols-12 gap-8 border p-8 rounded-md space-y-4">
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
										<Label
											key={colorCode}
											className="flex uppercase size-full gap-2 items-center"
										>
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
											{colorCode}
										</Label>
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
			{colors.length > 0 ? (
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{colors.map((color, i) => (
						<Card key={color.color + i} className="pt-0 overflow-hidden">
							<CardHeader
								onClick={() => handleCopyClick(color.color)}
								className="aspect-video group cursor-pointer justify-center items-center"
								style={{
									backgroundColor: color.color,
								}}
							>
								<span className="text-white text-lg font-mono opacity-0 group-hover:opacity-100 transition-opacity">
									{color.color}
								</span>
							</CardHeader>
							<CardContent>
								<div className="capitalize font-bold">{color.name}</div>
								<div className="mt-2 grid grid-cols-2 gap-2 empty:hidden">
									{[color.hex, color.rgb, color.hsl, color.oklch]
										.filter(Boolean)
										.map((c) => (
											<Button
												key={color.color}
												onClick={() => handleCopyClick(c)}
												variant="outline"
												className="justify-between"
											>
												<span className="truncate">{c}</span>
											</Button>
										))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<Card className="py-10">
					<CardContent className="text-center text-muted-foreground">
						ลองสุ่มสีดูเลย!
					</CardContent>
				</Card>
			)}
		</ToolLayout>
	);
}
