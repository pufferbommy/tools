import { useRef, useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { cn } from "~/lib/utils";

const DEFAULT_RANGE = {
	from: 0,
	to: 100,
};
const ANIMATION = { duration: 1000, interval: 50 };
const DIGIT_OPTIONS = [
	{ value: "custom", label: "กำหนดเอง" },
	{ value: "2", label: "สุ่มตัวเลข 2 หลัก" },
	{ value: "4", label: "สุ่มตัวเลข 4 หลัก" },
	{ value: "6", label: "สุ่มตัวเลข 6 หลัก" },
];

const getRandomNumber = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min;
const getRangeFromDigitOption = (option: string) => {
	if (option === "custom") return null;
	const digits = Number.parseInt(option);
	return {
		min: 10 ** (digits - 1),
		max: 10 ** digits - 1,
	};
};

export function meta() {
	return [
		{ title: "สุ่มตัวเลข - Random Number" },
		{
			name: "description",
			content:
				"เครื่องมือนี้ช่วยให้คุณสามารถสร้างตัวเลขสุ่มระหว่างช่วงที่กำหนดได้อย่างง่ายดาย. ใช้งานง่ายและรวดเร็ว.",
		},
	];
}

const RangeInputs = ({
	fromRef,
	toRef,
}: {
	fromRef: React.RefObject<HTMLInputElement | null>;
	toRef: React.RefObject<HTMLInputElement | null>;
}) => (
	<div className="flex gap-4 justify-center">
		<div className="flex flex-col gap-2">
			<Label htmlFor="from">เริ่มจาก (Minimum Value)</Label>
			<Input
				type="number"
				ref={fromRef}
				id="from"
				placeholder="กรุณาใส่ตัวเลขเริ่มต้น"
				defaultValue={DEFAULT_RANGE.from}
			/>
		</div>
		<div className="flex flex-col gap-2">
			<Label htmlFor="to">ถึง (Maximum Value)</Label>
			<Input
				type="number"
				ref={toRef}
				id="to"
				placeholder="กรุณาใส่ตัวเลขสิ้นสุด"
				defaultValue={DEFAULT_RANGE.to}
			/>
		</div>
	</div>
);

const Instructions = () => (
	<Card className="max-w-md">
		<CardHeader>
			<h2 className="font-bold">วิธีการใช้งานสุ่มตัวเลข - Random Number:</h2>
		</CardHeader>
		<CardContent>
			<ol className="list-decimal list-inside space-y-1">
				<li>เลือกโหมดการสุ่ม (กำหนดเองหรือจำนวนหลัก)</li>
				<li>ถ้ากำหนดเอง: ใส่ตัวเลขเริ่มต้นในช่อง "เริ่มจาก"</li>
				<li>ถ้ากำหนดเอง: ใส่ตัวเลขสิ้นสุดในช่อง "ถึง"</li>
				<li>กดปุ่ม "สุ่มตัวเลข" เพื่อสร้างตัวเลขสุ่ม</li>
				<li>ตัวเลขที่สุ่มได้จะแสดงด้านล่าง</li>
			</ol>
		</CardContent>
	</Card>
);

export default function RandomNumber() {
	const fromRef = useRef<HTMLInputElement>(null);
	const toRef = useRef<HTMLInputElement>(null);
	const [isAnimating, setIsAnimating] = useState(false);
	const [displayNumber, setDisplayNumber] = useState<number | null>(null);
	const [selectedOption, setSelectedOption] = useState("custom");

	const startAnimation = (min: number, max: number) => {
		setIsAnimating(true);
		const interval = setInterval(
			() => setDisplayNumber(getRandomNumber(min, max)),
			ANIMATION.interval,
		);

		setTimeout(() => {
			clearInterval(interval);
			setDisplayNumber(getRandomNumber(min, max));
			setIsAnimating(false);
		}, ANIMATION.duration);
	};

	const getDisplayPlaceholder = () =>
		selectedOption === "custom"
			? "?"
			: "?".repeat(Number.parseInt(selectedOption));

	const handleGenerateClick = () => {
		const range = getRangeFromDigitOption(selectedOption);
		const min = range
			? range.min
			: Number.parseInt(fromRef.current?.value || String(DEFAULT_RANGE.from));
		const max = range
			? range.max
			: Number.parseInt(toRef.current?.value || String(DEFAULT_RANGE.to));

		startAnimation(min, max);
	};

	return (
		<div className="flex flex-col items-center gap-6">
			<header className="text-center">
				<h1 className="text-4xl font-bold mb-4">สุ่มตัวเลข - Random Number</h1>
				<p>เครื่องมือนี้ช่วยให้คุณสามารถสร้างตัวเลขสุ่มระหว่างช่วงที่กำหนดได้อย่างง่ายดาย</p>
			</header>

			<RadioGroup
				className="flex gap-4"
				value={selectedOption}
				onValueChange={(value) => setSelectedOption(value)}
			>
				{DIGIT_OPTIONS.map(({ value, label }) => (
					<div key={value} className="flex items-center gap-2">
						<RadioGroupItem value={value} id={value} />
						<Label htmlFor={value}>{label}</Label>
					</div>
				))}
			</RadioGroup>

			{selectedOption === "custom" && (
				<RangeInputs fromRef={fromRef} toRef={toRef} />
			)}

			<h2 className={cn("text-8xl font-mono", isAnimating && "text-blue-500")}>
				{displayNumber ?? getDisplayPlaceholder()}
			</h2>

			<Button onClick={handleGenerateClick} disabled={isAnimating}>
				{isAnimating ? "กำลังสุ่มตัวเลข..." : "สุ่มตัวเลข"}
			</Button>

			<Instructions />
		</div>
	);
}
