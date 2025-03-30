import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function meta() {
	return [
		{ title: "สุ่มสี" },
		{
			name: "description",
			content: "สร้างสีสุ่มจากฐานข้อมูลสีที่กำหนดไว้ ใช้งานง่ายและรวดเร็ว",
		},
		{ name: "keywords", content: "สุ่มสี, random color, color generator" },
		{ property: "og:title", content: "สุ่มสี" },
		{ property: "og:description", content: "สร้างสีสุ่มจากฐานข้อมูลสีที่กำหนดไว้" },
		{ property: "og:type", content: "website" },
	];
}

const colors = [
	"#FF5733",
	"#33FF57",
	"#3357FF",
	"#F1C40F",
	"#8E44AD",
	"#E74C3C",
	"#3498DB",
	"#2ECC71",
	"#1ABC9C",
	"#9B59B6",
];

export default function RandomColor() {
	const [results, setResults] = useState<string[]>([]);

	function generateRandomColors(amount: number) {
		const selectedColors = [];
		for (let i = 0; i < amount; i++) {
			const randomColor = colors[Math.floor(Math.random() * colors.length)];
			selectedColors.push(randomColor);
		}
		setResults(selectedColors);
	}

	return (
		<>
			<header className="text-center">
				<h1 className="text-4xl font-medium mb-3 text-primary">สุ่มสี</h1>
				<p className="text-muted-foreground">
					เครื่องมือนี้ช่วยให้คุณสามารถสร้างสีสุ่มจากข้อมูลที่กำหนดได้อย่างง่ายดาย
					ใช้งานง่ายและรวดเร็ว
				</p>
			</header>

			<Button onClick={() => generateRandomColors(5)}>สุ่มสี</Button>

			{/* Results Display */}
			{results.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle>ผลลัพธ์</CardTitle>
					</CardHeader>
					<CardContent>
						<ul>
							{results.map((color, index) => (
								<li key={index} style={{ color }}>
									{color}
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			)}
		</>
	);
}
