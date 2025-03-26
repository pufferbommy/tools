import { Link } from "react-router";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
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
			<h1 className="text-2xl font-bold mb-2">รวมมิตรเครื่องมือ</h1>
			<p className="mb-4">
				เว็บไซต์ที่รวบรวมเครื่องมือต่างๆ ที่ช่วยให้ชีวิตของคุณง่ายขึ้นโดยไม่เสียค่าใช้จ่าย
			</p>
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
		</>
	);
}
