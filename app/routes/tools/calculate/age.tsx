import { useForm, useStore } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import ToolLayout from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { loadToolData } from "@/lib/tool/loadToolData";
import { seo } from "@/utils/seo";

type AgeResult = {
	years: number;
	months: number;
	days: number;
};

export const Route = createFileRoute("/tools/calculate/age")({
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
	const [age, setAge] = useState<AgeResult | null>(null);
	const [nextBirthday, setNextBirthday] = useState<AgeResult | null>(null);
	const [formattedDob, setFormattedDob] = useState("");
	const form = useForm({
		defaultValues: {
			dateOfBirth: new Date(new Date().getFullYear() - 20, 0, 1),
		},
		onSubmit: ({ value }) => {
			setFormattedDob(
				value.dateOfBirth.toLocaleDateString("th-TH", {
					dateStyle: "full",
				}),
			);
			setAge(calculateAge(value.dateOfBirth));
			setNextBirthday(calculateNextBirthday(value.dateOfBirth));
		},
	});

	const dateOfBirth = useStore(form.store, (state) => state.values.dateOfBirth);

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
							<li>กรอกวัน/เดือน/ปีเกิดของคุณ</li>
							<li>กดคำนวณอายุ</li>
							<li>ระบบจะแสดงผลลัพธ์อายุของคุณในรูปแบบ ปี เดือน วัน</li>
						</ol>
					),
				},
			]}
			url={url}
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="space-y-4"
			>
				<form.Field name="dateOfBirth">
					{(field) => (
						<div className="flex flex-col gap-2">
							<Label>วันเกิด</Label>
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
								<Select
									value={field.state.value.toLocaleDateString("th-TH", {
										day: "numeric",
									})}
									onValueChange={(value) => {
										const newDate = new Date(field.state.value);
										newDate.setDate(Number(value));
										field.handleChange(newDate);
									}}
								>
									<SelectTrigger className="w-full">
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
									value={field.state.value.getMonth().toString()}
									onValueChange={(selectedMonth) => {
										const currentDate = new Date(field.state.value);
										const updatedDate = new Date(currentDate);
										updatedDate.setMonth(Number(selectedMonth));

										if (updatedDate.getDate() !== currentDate.getDate()) {
											updatedDate.setDate(0);
										}

										field.handleChange(updatedDate);
									}}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="เดือน" className="truncate" />
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
									value={field.state.value.getFullYear().toString()}
									onValueChange={(value) => {
										const newDate = new Date(field.state.value);
										newDate.setFullYear(Number(value));
										field.handleChange(newDate);
									}}
								>
									<SelectTrigger className="w-full">
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
						</div>
					)}
				</form.Field>
				<div className="space-x-2">
					<Button type="button" onClick={handleResetClick} variant="secondary">
						รีเซ็ต
					</Button>
					<Button>คำนวณอายุ</Button>
				</div>
			</form>
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
