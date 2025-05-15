import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { seo } from "@/utils/seo";

const FormSchema = z.object({
	dateOfBirth: z.date(),
});

type FormSchema = z.infer<typeof FormSchema>;

type AgeResult = {
	years: number;
	months: number;
	days: number;
};

export const Route = createFileRoute("/tools/calculators/age/")({
	component: RouteComponent,
	loader: async (context) => {
		const pathname = context.location.pathname;
		const url = `${process.env.ORIGIN}${pathname}`;
		return { url };
	},
	head: () => ({
		meta: seo({
			title: "คำนวณอายุ",
			description: "คำนวณอายุเป็นปี เดือน วัน จากวันเกิด",
			keywords: "คำนวณอายุ, อายุ, วันเกิด, คำนวณวันเกิด, คำนวณอายุจากวันเกิด",
		}),
	}),
});

function RouteComponent() {
	const { url } = Route.useLoaderData();

	const form = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			dateOfBirth: new Date(new Date().getFullYear() - 20, 0, 1),
		},
	});

	const [age, setAge] = useState<AgeResult | null>(null);
	const [nextBirthday, setNextBirthday] = useState<AgeResult | null>(null);
	const [formattedDob, setFormattedDob] = useState("");

	const dateOfBirth = form.watch("dateOfBirth");

	const handleResetClick = () => {
		form.reset();
		setAge(null);
		setNextBirthday(null);
		setFormattedDob("");
	};

	const calculateAge = (dateOfBirth: Date): AgeResult => {
		const today = new Date();
		let years = today.getFullYear() - dateOfBirth.getFullYear();
		let months = today.getMonth() - dateOfBirth.getMonth();
		let days = today.getDate() - dateOfBirth.getDate();

		if (days < 0) {
			months--;
			days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
		}

		if (months < 0) {
			years--;
			months += 12;
		}

		return {
			years,
			months,
			days,
		};
	};

	const calculateNextBirthday = (birthDate: Date): AgeResult => {
		const today = new Date();
		const nextBirthdayDate = new Date(
			today.getFullYear(),
			birthDate.getMonth(),
			birthDate.getDate(),
		);

		if (nextBirthdayDate < today) {
			nextBirthdayDate.setFullYear(today.getFullYear() + 1);
		}

		let years = nextBirthdayDate.getFullYear() - today.getFullYear();
		let months = nextBirthdayDate.getMonth() - today.getMonth();
		let days = nextBirthdayDate.getDate() - today.getDate();

		if (days < 0) {
			months--;
			const prevMonth = new Date(
				nextBirthdayDate.getFullYear(),
				nextBirthdayDate.getMonth(),
				0,
			).getDate();
			days += prevMonth;
		}

		if (months < 0) {
			years--;
			months += 12;
		}

		return { years, months, days };
	};

	const onSubmit = (data: FormSchema) => {
		setFormattedDob(
			data.dateOfBirth.toLocaleDateString("th-TH", {
				dateStyle: "full",
			}),
		);
		setAge(calculateAge(data.dateOfBirth));
		setNextBirthday(calculateNextBirthday(data.dateOfBirth));
	};

	const dates = useMemo(() => {
		const date = new Date(dateOfBirth.getFullYear(), dateOfBirth.getMonth(), 1);
		const dates: string[] = [];
		while (date.getMonth() === dateOfBirth.getMonth()) {
			dates.push(new Date(date).getDate().toString());
			date.setDate(date.getDate() + 1);
		}
		return dates;
	}, [dateOfBirth]);

	const months = useMemo(() => {
		const date = new Date(dateOfBirth.getFullYear(), 0, 1);
		const months: string[] = [];
		while (date.getFullYear() <= dateOfBirth.getFullYear()) {
			months.push(
				new Date(date).toLocaleDateString("th-TH", {
					month: "long",
				}),
			);
			date.setMonth(date.getMonth() + 1);
		}
		return months;
	}, [dateOfBirth]);

	const years = useMemo(() => {
		const now = new Date();
		const date = new Date(now.getFullYear() - 100, 0, 1);
		const years = [];
		while (date.getFullYear() <= now.getFullYear()) {
			years.push(new Date(date).getFullYear());
			date.setFullYear(date.getFullYear() + 1);
		}
		return years.reverse();
	}, []);

	return (
		<ToolLayout
			breadcrumbs={[
				{
					label: "เครื่องมือคำนวณ",
					href: "/tools/calculators",
				},
				{
					label: "คำนวณอายุ",
					href: "/tools/calculators/age",
				},
			]}
			title="คำนวณอายุ"
			description="เครื่องมือสำหรับคำนวณอายุจากวันเกิด"
			items={[
				{
					id: "1",
					title: "วิธีการใช้งาน",
					content: (
						<ol className="list-decimal list-inside space-y-2">
							<li>กรอกวัน/เดือน/ปีเกิดของคุณ</li>
							<li>กดคำนวณอายุ</li>
							<li>ระบบจะแสดงผลลัพธ์อายุของคุณในรูปแบบ ปี เดือน วัน</li>
						</ol>
					),
				},
			]}
			url={url}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="dateOfBirth"
						render={({ field }) => (
							<FormItem>
								<FormLabel>วันเกิด</FormLabel>
								<FormControl>
									<div className="flex flex-wrap gap-2">
										<Select
											value={field.value.toLocaleDateString("th-TH", {
												day: "numeric",
											})}
											onValueChange={(value) => {
												const newDate = new Date(field.value);
												newDate.setDate(Number(value));
												field.onChange(newDate);
											}}
										>
											<SelectTrigger className="w-[65.81px]">
												<SelectValue placeholder="วัน" />
											</SelectTrigger>
											<SelectContent>
												{dates.map((date) => (
													<SelectItem key={date} value={date}>
														{date}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<Select
											value={field.value.getMonth().toString()}
											onValueChange={(selectedMonth) => {
												const currentDate = new Date(field.value);
												const updatedDate = new Date(currentDate);
												updatedDate.setMonth(Number(selectedMonth));

												if (updatedDate.getDate() !== currentDate.getDate()) {
													updatedDate.setDate(0);
												}

												field.onChange(updatedDate);
											}}
										>
											<SelectTrigger className="w-[115.17px]">
												<SelectValue placeholder="เดือน" />
											</SelectTrigger>
											<SelectContent>
												{months.map((month, i) => (
													<SelectItem key={month} value={i.toString()}>
														{month}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<Select
											value={field.value.getFullYear().toString()}
											onValueChange={(value) => {
												const newDate = new Date(field.value);
												newDate.setFullYear(Number(value));
												field.onChange(newDate);
											}}
										>
											<SelectTrigger className="w-[81.83px]">
												<SelectValue placeholder="ปี" />
											</SelectTrigger>
											<SelectContent>
												{years.map((year) => (
													<SelectItem key={year} value={year.toString()}>
														{
															new Date(year, 0, 1)
																.toLocaleDateString("th-TH", {
																	year: "numeric",
																})
																.split(" ")[1]
														}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="space-x-2">
						<Button
							type="button"
							onClick={handleResetClick}
							variant="secondary"
						>
							รีเซ็ต
						</Button>
						<Button>คำนวณ</Button>
					</div>
				</form>
			</Form>
			{age && nextBirthday && (
				<Card>
					<CardContent>
						<p>
							ปัจจุบันคุณมีอายุ <span className="text-primary">{age.years}</span> ปี{" "}
							<span className="text-primary">{age.months}</span> เดือน{" "}
							<span className="text-primary">{age.days}</span> วัน
						</p>
						<p>คุณเกิดเมื่อ {formattedDob}</p>
						<p>
							วันเกิดถัดไปของคุณอีก{" "}
							<span className="text-primary">{nextBirthday.years}</span> ปี{" "}
							<span className="text-primary">{nextBirthday.months}</span> เดือน{" "}
							<span className="text-primary">{nextBirthday.days}</span> วัน
						</p>
					</CardContent>
				</Card>
			)}
		</ToolLayout>
	);
}
