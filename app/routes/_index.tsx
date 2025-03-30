import { Dices } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

export function meta() {
	return [
		{ title: "รวมมิตรเครื่องมือ - เครื่องมือออนไลน์ฟรี ใช้งานง่าย โหลดเร็ว" },
		{
			name: "description",
			content:
				"เว็บไซต์ที่รวมเครื่องมือออนไลน์ฟรี ใช้งานง่าย ไม่ต้องสมัครสมาชิก และโหลดเร็ว ช่วยให้ชีวิตของคุณสะดวกสบายขึ้น",
		},
		{
			name: "keywords",
			content: "เครื่องมือออนไลน์, เครื่องมือฟรี, สุ่มตัวเลข, สุ่มชื่อ, ใช้งานง่าย, โหลดเร็ว",
		},
		{ name: "author", content: "รวมมิตรเครื่องมือ" },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: "รวมมิตรเครื่องมือ - เครื่องมือออนไลน์ฟรี" },
		{
			name: "twitter:description",
			content: "รวมเครื่องมือออนไลน์ที่ใช้งานฟรี ไม่ต้องสมัคร โหลดเร็ว!",
		},
	];
}

export default function Home() {
	return (
		<>
			<div className="px-4 border-b">
				<div className="container border-x py-20 mx-auto text-center relative">
					<h1 className="font-medium text-6xl mb-2">รวมมิตรเครื่องมือ</h1>
					<h2 className="text-lg text-muted-foreground">
						เว็บรวมเครื่องมือทุกอย่างที่คุณ(อาจจะ)ต้องการ ใช้งานง่าย รวดเร็ว และฟรี
					</h2>
					<img
						alt="logo"
						className="absolute bottom-0 right-0 -scale-x-100 w-12 dark:invert md:w-24"
						src="/logo.svg"
					/>
				</div>
			</div>
			<div className="px-4">
				<div className="px-4 py-8 border-x container mx-auto space-y-8">
					<div className="space-y-4">
						<h3 className="font-medium">หมวดหมู่</h3>
						<ul className="flex gap-2">
							<li>
								<Button variant="outline" asChild>
									<Link to="/random" className="flex items-center gap-2">
										<Dices />
										สุ่ม
									</Link>
								</Button>
							</li>
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="font-medium">แนะนำ</h3>
						<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
							<li>
								<Link to="/random/number">
									<Card>
										<CardHeader>
											<CardTitle>สุ่มตัวเลข</CardTitle>
											<CardDescription>
												เครื่องมือนี้ช่วยให้คุณสามารถสร้างตัวเลขสุ่มระหว่างช่วงที่กำหนดได้อย่างง่ายดาย
											</CardDescription>
										</CardHeader>
									</Card>
								</Link>
							</li>
							<li>
								<Link to="/random/name">
									<Card>
										<CardHeader>
											<CardTitle>สุ่มชื่อ</CardTitle>
											<CardDescription>
												เครื่องมือนี้ช่วยให้คุณสามารถสร้างชื่อสุ่มจากข้อมูลที่กำหนดได้อย่างง่ายดาย
											</CardDescription>
										</CardHeader>
									</Card>
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="font-medium">สุ่ม</h3>
						<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
							<li>
								<Link to="/random/number">
									<Card>
										<CardHeader>
											<CardTitle>สุ่มตัวเลข</CardTitle>
											<CardDescription>
												เครื่องมือนี้ช่วยให้คุณสามารถสร้างตัวเลขสุ่มระหว่างช่วงที่กำหนดได้อย่างง่ายดาย
											</CardDescription>
										</CardHeader>
									</Card>
								</Link>
							</li>
							<li>
								<Link to="/random/name">
									<Card>
										<CardHeader>
											<CardTitle>สุ่มชื่อ</CardTitle>
											<CardDescription>
												เครื่องมือนี้ช่วยให้คุณสามารถสร้างชื่อสุ่มจากข้อมูลที่กำหนดได้อย่างง่ายดาย
											</CardDescription>
										</CardHeader>
									</Card>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
