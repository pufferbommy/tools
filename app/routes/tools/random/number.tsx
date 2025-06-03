import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

import ToolLayout from "@/components/tools/tool-layout";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { seo } from "@/utils/seo";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadToolData } from "@/lib/tool/loadToolData";
import { randomInRange } from "@/utils/random";

export const Route = createFileRoute("/tools/random/number")({
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
	const [number, setNumber] = useState<number | null>(null);
	const [isRandomizing, setIsRandomizing] = useState(false);
	const [histories, setHistories] = useState<number[]>([]);
	const animationFrameId = useRef<number | null>(null);

	const handleSubmit = (data: { min: number; max: number }) => {
		setIsRandomizing(true);

		if (animationFrameId.current) {
			cancelAnimationFrame(animationFrameId.current);
		}

		let start: number | null = null;
		const duration = 1000;

		const animate = (timestamp: number) => {
			if (start === null) start = timestamp;
			const elapsed = timestamp - start;

			const randomNumber = randomInRange(data.min, data.max);
			setNumber(randomNumber);

			if (elapsed < duration) {
				animationFrameId.current = requestAnimationFrame(animate);
			} else {
				setIsRandomizing(false);
				setHistories((prev) => [...prev, randomNumber]);
			}
		};

		animationFrameId.current = requestAnimationFrame(animate);
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
			<FormSection onSubmit={handleSubmit} />
			<RandomResultCard
				number={number}
				histories={histories}
				isRandomizing={isRandomizing}
			/>
		</ToolLayout>
	);
}

interface RandomNumber {
	min: number | "";
	max: number | "";
}

function FormSection({
	onSubmit,
}: {
	onSubmit: (value: RandomNumber) => void;
}) {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const form = useForm({
		defaultValues: {
			min: 0,
			max: 100,
		} as RandomNumber,
		onSubmit: ({ value }) => onSubmit(value),
	});

	return (
		<section>
			<form
				onSubmit={(e) => {
					setIsSubmitted(true);
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start mb-4">
					<form.Field
						name="min"
						validators={{
							onChange: ({ value }) => {
								return value === "" ? "กรุณากรอกตัวเลขต่ำสุด" : undefined;
							},
						}}
					>
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label>ตัวเลขต่ำสุด</Label>
								<Input
									type="number"
									value={field.state.value}
									onChange={(e) =>
										field.handleChange(
											!Number.isNaN(e.target.valueAsNumber)
												? e.target.valueAsNumber
												: "",
										)
									}
								/>
								{isSubmitted && !field.state.meta.isValid && (
									<em className="text-sm text-destructive">
										{field.state.meta.errors.join(", ")}
									</em>
								)}
							</div>
						)}
					</form.Field>
					<form.Field
						name="max"
						validators={{
							onChange: ({ value }) => {
								return value === "" ? "กรุณากรอกตัวเลขสูงสุด" : undefined;
							},
						}}
					>
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label>ตัวเลขสูงสุด</Label>
								<Input
									type="number"
									value={field.state.value}
									onChange={(e) =>
										field.handleChange(
											!Number.isNaN(e.target.valueAsNumber)
												? e.target.valueAsNumber
												: "",
										)
									}
								/>
								{isSubmitted && !field.state.meta.isValid && (
									<em className="text-sm text-destructive">
										{field.state.meta.errors.join(", ")}
									</em>
								)}
							</div>
						)}
					</form.Field>
				</div>
				<Button>สุ่มตัวเลข</Button>
			</form>
		</section>
	);
}

function RandomResultCard({
	number,
	isRandomizing,
	histories,
}: {
	number: number | null;
	isRandomizing: boolean;
	histories: number[];
}) {
	const [isCopyed, setIsCopyed] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleCopyClick = useCallback(() => {
		if (!number) return;

		navigator.clipboard.writeText(number.toString());
		toast.success(`คัดลอกเลข ${number} แล้ว 🎉`);

		setIsCopyed(true);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => setIsCopyed(false), 1000);
	}, [number]);

	return (
		<Card className="text-center group relative">
			<CardHeader>
				<CardTitle>ตัวเลขที่สุ่มได้</CardTitle>
			</CardHeader>
			<CardContent>
				<p
					className={cn(
						"text-8xl text-primary overflow-x-auto overflow-y-hidden",
						isRandomizing && "animate-pulse",
					)}
				>
					{number ? number : "?"}
				</p>
			</CardContent>
			<CardFooter className="text-muted-foreground justify-center">
				{histories.length > 0
					? `ประวัติล่าสุด: ${histories.join(", ")}`
					: "ยังไม่มีการสุ่มในรอบนี้ ลองสุ่มดูสิ!"}
			</CardFooter>
			<Button
				size="icon"
				className="absolute top-2 right-2"
				variant="ghost"
				onClick={handleCopyClick}
				disabled={!number || isRandomizing}
				aria-label="Copy number"
			>
				{isCopyed ? <ClipboardCheck /> : <Clipboard />}
			</Button>
		</Card>
	);
}
