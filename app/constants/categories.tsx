import type { TRoutes } from "@/utils/sitemap";

interface Tool {
	url: TRoutes;
	title: string;
	description?: string;
}

interface Category {
	title: string;
	description: string;
	keywords: string;
	tools: Tool[];
}

export const CATEGORY_MAP: Record<string, Category> = {
	"/tools/random": {
		title: "เครื่องมือสุ่ม",
		description: "เครื่องมือสุ่มตัวเลข ชื่อไทย ชื่ออังกฤษ",
		keywords: "สุ่มตัวเลข, สุ่มชื่อไทย, สุ่มชื่ออังกฤษ",
		tools: [
			{
				title: "สุ่มตัวเลข",
				url: "/tools/random/number",
				description: "สร้างตัวเลขสุ่มภายในช่วงที่คุณระบุ",
			},
			{
				title: "สุ่มชื่อไทย",
				url: "/tools/random/thai-name",
				description: "สุ่มชื่อไทย",
			},
			{
				title: "สุ่มชื่ออังกฤษ",
				url: "/tools/random/english-name",
				description: "สุ่มชื่ออังกฤษ",
			},
		],
	},
	"/tools/calculators": {
		title: "เครื่องมือคำนวณ",
		description: "เครื่องมือคำนวณที่ช่วยให้คุณทำการคำนวณต่างๆ ได้อย่างง่ายดาย",
		keywords: "เครื่องมือคำนวณ, คำนวณ BMI, คำนวณอายุ, คำนวณเปอร์เซ็นต์, คำนวณดอกเบี้ย",
		tools: [
			{
				title: "คำนวณดัชนีมวลกาย (BMI)",
				url: "/tools/calculators/bmi",
				description: "คำนวณค่า BMI เพื่อประเมินรูปร่าง",
			},
			{
				title: "คำนวณการเผาผลาญพลังงาน (BMR)",
				url: "/tools/calculators/bmr",
				description: "คำนวณอัตราเผาผลาญพลังงานพื้นฐาน",
			},
			{
				title: "คำนวณพลังงานต่อวัน (TDEE)",
				url: "/tools/calculators/tdee",
				description: "คำนวณพลังงานที่ร่างกายต้องการต่อวัน",
			},
			{
				title: "คำนวณอายุ",
				url: "/tools/calculators/age",
				description: "คำนวณอายุเป็นปี เดือน วัน จากวันเกิด",
			},
		],
	},
	"/tools/colors": {
		title: "เครื่องมือสี",
		description: "เครื่องมือคำนวณที่ช่วยให้คุณทำการคำนวณต่างๆ ได้อย่างง่ายดาย",
		keywords: "เครื่องมือสี, สุ่มสี, HEX, RGB",
		tools: [
			{
				title: "สุ่มสี",
				url: "/tools/colors/random",
				description: "สุ่มสีพร้อมรหัส HEX และ RGB สำหรับใช้ในงานออกแบบหรือเลือกสี",
			},
		],
	},
};

export const CATEGORY_LIST = Object.entries(CATEGORY_MAP);
