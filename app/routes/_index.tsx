import { Link } from "react-router";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

export function meta() {
	return [
		{ title: "รวมมิตรเครื่องมือ" },
		{
			name: "description",
			content: "เว็บไซต์นี้มีเครื่องมือต่างๆ ที่ช่วยทำให้ชีวิตของคุณง่ายขึ้น โดยไม่เสียค่าใช้จ่าย",
		},
	];
}

export default function Home() {
	return (
		<>
			<div className="mb-8">
				<h1 className="text-2xl font-bold">รวมมิตรเครื่องมือ</h1>
				<p>เว็บไซต์ที่รวบรวมเครื่องมือต่างๆ ที่ช่วยให้ชีวิตของคุณง่ายขึ้นโดยไม่เสียค่าใช้จ่าย</p>
			</div>
			<ul className="space-y-4">
				<li>
					<Link to="/random/number">
						<Card>
							<CardHeader>
								<CardTitle>สุ่มตัวเลข - Random Number</CardTitle>
								<CardDescription>
									เครื่องมือนี้ช่วยให้คุณสามารถสร้างตัวเลขสุ่มระหว่างช่วงที่กำหนดได้อย่างง่ายดาย.
									ใช้งานง่ายและรวดเร็ว.
								</CardDescription>
							</CardHeader>
						</Card>
					</Link>
				</li>
				<li>
					<Link to="/random/name">
						<Card>
							<CardHeader>
								<CardTitle>สุ่มชื่อ - Random Name</CardTitle>
								<CardDescription>
									เครื่องมือนี้ช่วยให้คุณสามารถสร้างชื่อสุ่มจากข้อมูลที่กำหนดได้อย่างง่ายดาย
									ใช้งานง่ายและรวดเร็ว
								</CardDescription>
							</CardHeader>
						</Card>
					</Link>
				</li>
			</ul>
		</>
	);
}
