import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { GENDERS } from "@/constants/genders";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ACTIVITY_LEVELS = [
	{ value: 1.2, label: "🏢 ไม่ออกกำลังกายเลย (นั่งทำงานทั้งวัน)" },
	{ value: 1.375, label: "🚶‍♂️ ออกกำลังกายเบาๆ (1–2 วัน/สัปดาห์)" },
	{ value: 1.55, label: "🏃‍♂️ ออกกำลังกายปานกลาง (3–5 วัน/สัปดาห์)" },
	{ value: 1.725, label: "💪 ออกกำลังกายหนัก (6–7 วัน/สัปดาห์)" },
	{ value: 1.9, label: "🔥 ออกกำลังกายหนักมาก (เช้า–เย็น หรืองานใช้แรงเยอะ)" },
];

const FormSchema = z.object({
	gender: z.enum(["male", "female"]),
	age: z.number({
		message: "กรุณากรอกอายุ",
	}),
	weight: z.number({
		message: "กรุณากรอกน้ำหนัก",
	}),
	height: z.number({
		message: "กรุณากรอกส่วนสูง",
	}),
	activity: z.number({
		message: "กรุณาเลือกระดับกิจกรรม",
	}),
});

type FormSchema = z.infer<typeof FormSchema>;

export function TdeeCalculatorSection({
	setTdee,
}: {
	setTdee: (value: number | null) => void;
}) {
	const form = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			gender: "male",
			age: "" as unknown as number,
			weight: "" as unknown as number,
			height: "" as unknown as number,
			activity: 1.2 as number,
		},
	});

	const onSubmit = (data: FormSchema) => {
		const heightMeters = data.height / 100; // Convert cm to m
		const bmr =
			data.gender === "male"
				? 10 * data.weight + 6.25 * heightMeters - 5 * data.age + 5
				: 10 * data.weight + 6.25 * heightMeters - 5 * data.age - 161;
		const tdee = bmr * data.activity;
		return setTdee(tdee);
	};

	const handleResetClick = () => {
		form.reset();
		setTdee(null);
	};

	return (
		<section>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="gender"
						render={({ field: { value, onChange } }) => (
							<FormItem>
								<FormLabel>เพศ</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={onChange}
										defaultValue={value}
										className="flex gap-4"
									>
										{GENDERS.map((gender) => (
											<div className="flex items-center gap-2">
												<RadioGroupItem
													value={gender.value}
													id={gender.value}
												/>
												<Label htmlFor={gender.value}>{gender.name}</Label>
											</div>
										))}
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid items-start sm:grid-cols-2 lg:grid-cols-3 gap-4">
						<FormField
							control={form.control}
							name="age"
							render={({ field }) => (
								<FormItem>
									<FormLabel>อายุ</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											onChange={(e) => field.onChange(e.target.valueAsNumber)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="weight"
							render={({ field }) => (
								<FormItem>
									<FormLabel>น้ำหนัก (กิโลกรัม)</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											onChange={(e) => field.onChange(e.target.valueAsNumber)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="height"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ส่วนสูง (เซนติเมตร)</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											onChange={(e) => field.onChange(e.target.valueAsNumber)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="activity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ระดับกิจกรรม</FormLabel>
								<FormControl>
									<Select
										defaultValue={field.value.toString()}
										onValueChange={(value) => field.onChange(Number(value))}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="เลือกระดับกิจกรรม" />
										</SelectTrigger>
										<SelectContent>
											{ACTIVITY_LEVELS.map((level) => (
												<SelectItem
													key={level.value}
													value={level.value.toString()}
												>
													{level.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="space-x-2">
						<Button>คำนวณ</Button>
						<Button type="button" onClick={handleResetClick} variant="outline">
							รีเซ็ต
						</Button>
					</div>
				</form>
			</Form>
		</section>
	);
}
