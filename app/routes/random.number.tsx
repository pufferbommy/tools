import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

const MotionNumberFlow = motion(NumberFlow);
const DEFAULT_RANGE = {
	from: 0,
	to: 100,
};
const DIGIT_OPTIONS = [
	{ value: "custom", label: "กำหนดเอง" },
	{ value: "2", label: "สุ่มตัวเลข 2 หลัก" },
	{ value: "4", label: "สุ่มตัวเลข 4 หลัก" },
	{ value: "6", label: "สุ่มตัวเลข 6 หลัก" },
];

export function meta() {
	return [
		{ title: "สุ่มตัวเลข" },
		{
			name: "description",
			content:
				"เครื่องมือนี้ช่วยให้คุณสามารถสร้างตัวเลขสุ่มระหว่างช่วงที่กำหนดได้อย่างง่ายดาย. ใช้งานง่ายและรวดเร็ว.",
		},
	];
}

export default function RandomNumber() {
	const fromRef = useRef<HTMLInputElement>(null);
	const toRef = useRef<HTMLInputElement>(null);
	const [number, setNumber] = useState<number>(0);
	const [selectedOption, setSelectedOption] = useState("custom");
	const [isRandomized, setIsRandomized] = useState(false);

	const handleGenerateClick = () => {
		const range = getRangeFromDigitOption(selectedOption);
		const min = range
			? range.min
			: Number.parseInt(fromRef.current?.value || String(DEFAULT_RANGE.from));
		const max = range
			? range.max
			: Number.parseInt(toRef.current?.value || String(DEFAULT_RANGE.to));

		setNumber(getRandomNumber(min, max));
		setIsRandomized(true);
	};

	return (
		<>
			<div className="p-4 space-y-8 flex py-16 flex-col items-center">
				<h1 className="text-4xl text-center font-medium">สุ่มตัวเลข</h1>
				<DigitOptions
					selectedOption={selectedOption}
					setSelectedOption={setSelectedOption}
				/>
				{selectedOption === "custom" && (
					<RangeInputs fromRef={fromRef} toRef={toRef} />
				)}
				<NumberDisplay
					number={number}
					isRandomized={isRandomized}
					selectedOption={selectedOption}
				/>
				<Button onClick={handleGenerateClick}>สุ่มตัวเลข</Button>
			</div>
			<Instructions />
		</>
	);
}

function DigitOptions(props: {
	selectedOption: string;
	setSelectedOption: (value: string) => void;
}) {
	return (
		<RadioGroup
			className="flex flex-wrap justify-center gap-4"
			value={props.selectedOption}
			onValueChange={(value) => props.setSelectedOption(value)}
		>
			{DIGIT_OPTIONS.map(({ value, label }) => (
				<div key={value} className="flex items-center gap-2">
					<RadioGroupItem value={value} id={value} />
					<Label htmlFor={value}>{label}</Label>
				</div>
			))}
		</RadioGroup>
	);
}

function RangeInputs({
	fromRef,
	toRef,
}: {
	fromRef: React.RefObject<HTMLInputElement | null>;
	toRef: React.RefObject<HTMLInputElement | null>;
}) {
	return (
		<div className="flex flex-col sm:flex-row gap-4 justify-center">
			<div className="flex flex-col gap-2">
				<Label htmlFor="from">เริ่ม</Label>
				<Input
					type="number"
					ref={fromRef}
					id="from"
					placeholder="กรุณาใส่ตัวเลขเริ่มต้น"
					defaultValue={DEFAULT_RANGE.from}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="to">ถึง</Label>
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
}

function NumberDisplay(props: {
	number: number;
	isRandomized: boolean;
	selectedOption: string;
}) {
	const placeholder =
		props.selectedOption === "custom"
			? "?"
			: "?".repeat(Number.parseInt(props.selectedOption));

	return (
		<div className="text-8xl relative">
			<MotionNumberFlow
				format={{
					useGrouping: false,
				}}
				initial={{ opacity: 0 }}
				animate={{
					opacity: props.isRandomized ? 1 : 0,
				}}
				value={props.number}
			/>
			<AnimatePresence>
				{!props.isRandomized && (
					<motion.span
						exit={{ opacity: 0 }}
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
					>
						{placeholder}
					</motion.span>
				)}
			</AnimatePresence>
		</div>
	);
}

function Instructions() {
	return (
		<div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
			<div className="space-y-2 p-4">
				<h2 className="font-medium">คืออะไรใช้ทำอะไร</h2>
				<ol className="list-decimal list-inside space-y-1 text-muted-foreground">
					<li>สุ่มตัวเลขเพื่อสร้างตัวเลขที่ไม่ซ้ำกัน</li>
					<li>สามารถกำหนดช่วงตัวเลขที่ต้องการสุ่มได้</li>
					<li>กดปุ่มเพื่อดูผลลัพธ์ของตัวเลขที่สุ่มได้</li>
					<li>สามารถสุ่มใหม่ได้ทันทีเมื่อกดปุ่มอีกครั้ง</li>
				</ol>
			</div>
			<div className="space-y-2 p-4">
				<h2 className="font-medium">วิธีการใช้งานสุ่มตัวเลข</h2>
				<ol className="list-decimal list-inside space-y-1 text-muted-foreground">
					<li>เลือกโหมดการสุ่มจากตัวเลือกด้านบน</li>
					<li>ถ้าเลือก "กำหนดเอง" ใส่ช่วงตัวเลขที่ต้องการ</li>
					<li>กดปุ่ม "สุ่มตัวเลข" เพื่อดูผลลัพธ์</li>
					<li>สามารถกดซ้ำเพื่อสุ่มตัวเลขใหม่ได้ทันที</li>
				</ol>
			</div>
		</div>
	);
}

function getRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRangeFromDigitOption(option: string) {
	if (option === "custom") return null;
	const digits = Number.parseInt(option);
	return {
		min: 10 ** (digits - 1),
		max: 10 ** digits - 1,
	};
}
