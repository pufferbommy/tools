import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Slider } from "~/components/ui/slider";

export function meta() {
	return [
		{ title: "สุ่มชื่อ" },
		{
			name: "description",
			content:
				"สร้างชื่อสุ่มจากฐานข้อมูลชื่อที่กำหนดไว้ เลือกเพศ ประเภท และจำนวนได้ง่ายๆ ใช้งานสะดวก รวดเร็ว",
		},
		{ name: "keywords", content: "สุ่มชื่อ, ชื่อไทย, random name, name generator" },
		{ property: "og:title", content: "สุ่มชื่อ" },
		{ property: "og:description", content: "สร้างชื่อสุ่มจากฐานข้อมูลชื่อที่กำหนดไว้" },
		{ property: "og:type", content: "website" },
	];
}

const genders = [
	{
		id: "both",
		label: "ทั้งคู่",
	},
	{
		id: "male",
		label: "ชาย",
	},
	{
		id: "female",
		label: "หญิง",
	},
];

const types = [
	{
		id: "name",
		label: "ชื่อจริง",
	},
	{
		id: "last-name",
		label: "นามสกุล",
	},
	{
		id: "nickname",
		label: "ชื่อเล่น",
	},
];

const formSchema = z.object({
	gender: z.enum(["both", "male", "female"]),
	types: z.array(z.string()).min(1),
	amount: z.number().int().positive(),
});

const getNames = async (gender: "male" | "female") => {
	const response = await fetch(`/${gender}-names.json`);
	const data = await response.json();
	return data.items;
};

const getLastNames = async () => {
	const response = await fetch("/last-names.json");
	const data = await response.json();
	return data.items;
};

const getNicknames = async (gender: "male" | "female") => {
	const response = await fetch(`/${gender}-nicknames.json`);
	const data = await response.json();
	return data.items;
};

export default function RandomName() {
	const [results, setResults] = useState<
		{
			name: string;
			lastName: string;
			nickname: string;
		}[]
	>([]);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			gender: "both",
			types: ["name", "last-name", "nickname"],
			amount: 1,
		},
	});
	const { data: femaleNames } = useQuery({
		queryKey: ["female-names"],
		queryFn: async () => {
			return await getNames("female");
		},
	});
	const { data: maleNames } = useQuery({
		queryKey: ["male-names"],
		queryFn: async () => {
			return await getNames("male");
		},
	});
	const { data: lastNames } = useQuery({
		queryKey: ["last-names"],
		queryFn: getLastNames,
	});
	const { data: femaleNicknames } = useQuery({
		queryKey: ["female-nicknames"],
		queryFn: async () => getNicknames("female"),
	});
	const { data: maleNicknames } = useQuery({
		queryKey: ["male-nicknames"],
		queryFn: async () => getNicknames("male"),
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const items = Array.from({ length: values.amount }, () => {
			const lastName = values.types.includes("last-name")
				? lastNames[Math.floor(Math.random() * lastNames.length)]
				: "";
			const gender =
				values.gender === "both"
					? genders[Math.floor(Math.random() * (genders.length - 1)) + 1].id
					: values.gender;

			if (gender === "male") {
				return {
					name: values.types.includes("name")
						? maleNames[Math.floor(Math.random() * maleNames.length)]
						: "",
					lastName,
					nickname: values.types.includes("nickname")
						? maleNicknames[Math.floor(Math.random() * maleNicknames.length)]
						: "",
				};
			}
			return {
				name: values.types.includes("name")
					? femaleNames[Math.floor(Math.random() * femaleNames.length)]
					: "",
				lastName,
				nickname: values.types.includes("nickname")
					? femaleNicknames[Math.floor(Math.random() * femaleNicknames.length)]
					: "",
			};
		});
		setResults(items);
	}

	return (
		<>
			<div className="p-4 space-y-8 flex py-16 flex-col items-center">
				<header className="text-center">
					<h1 className="text-4xl font-medium mb-3 text-primary">สุ่มชื่อ</h1>
					<p className="text-muted-foreground">
						เครื่องมือนี้ช่วยให้คุณสามารถสร้างชื่อสุ่มจากข้อมูลที่กำหนดได้อย่างง่ายดาย
						ใช้งานง่ายและรวดเร็ว
					</p>
				</header>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid gap-8 w-full"
					>
						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem>
									<FormLabel>เพศ</FormLabel>
									<RadioGroup
										defaultValue={field.value}
										onValueChange={field.onChange}
										className="flex gap-4"
									>
										{genders.map((gender) => (
											<div key={gender.id} className="flex gap-2">
												<RadioGroupItem value={gender.id} id={gender.id} />
												<Label htmlFor={gender.id}>{gender.label}</Label>
											</div>
										))}
									</RadioGroup>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="types"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ประเภท</FormLabel>
									<div className="flex gap-4">
										{types.map((type) => (
											<FormItem key={type.id} className="flex">
												<FormControl>
													<Checkbox
														checked={field.value.includes(type.id)}
														onCheckedChange={(checked) => {
															field.onChange(
																checked
																	? [...field.value, type.id]
																	: field.value.filter(
																			(value) => value !== type.id,
																		),
															);
														}}
														id={type.id}
													/>
												</FormControl>
												<FormLabel htmlFor={type.id}>{type.label}</FormLabel>
											</FormItem>
										))}
									</div>
								</FormItem>
							)}
						/>

						{/* Amount Selection */}
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="amount">จำนวน: {field.value}</FormLabel>
									<FormControl>
										<Slider
											id="amount"
											value={[field.value]}
											onValueChange={(value) => field.onChange(value[0])}
											min={1}
											max={10}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<Button type="submit">สุ่มชื่อ</Button>
					</form>
				</Form>
			</div>

			{/* Results Display */}
			{results.length > 0 && (
				<div className="p-4">
					<h3>ผลลัพธ์</h3>
					<ul>
						{results.map((result, index) => (
							<li key={index}>
								{result.name} {result.lastName} ({result.nickname})
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
}
