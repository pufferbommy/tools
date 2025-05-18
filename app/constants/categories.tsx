import type { TRoutes } from "@/utils/sitemap";

export interface Tool {
	url: TRoutes;
	shortTitle: string;
	title: string;
	description: string;
	keywords: string;
}

export interface Category {
	title: string;
	description: string;
	keywords: string;
	tools: Tool[];
}

export const CATEGORY_MAP: Record<string, Category> = {
	"/tools/random": {
		title: "เครื่องมือสุ่ม",
		description:
			"เครื่องมือสุ่มตัวเลขและชื่อแบบง่าย ๆ ใช้งานฟรี เหมาะสำหรับการเล่นเกม การตั้งชื่อ หรือใช้ในกิจกรรมต่าง ๆ",
		keywords: "สุ่ม, สุ่มตัวเลข, สุ่มชื่อ, สุ่มชื่อไทย, สุ่มชื่ออังกฤษ",
		tools: [
			{
				shortTitle: "สุ่มเลข",
				title: "เครื่องมือสุ่มตัวเลข",
				url: "/tools/random/number",
				description:
					"สร้างตัวเลขแบบสุ่มภายในช่วงที่คุณกำหนด เหมาะกับเกม การจับฉลาก หรือการทดลอง",
				keywords: "สุ่มเลข, random number, จับฉลาก, สุ่มตัวเลขออนไลน์, เครื่องสุ่มเลข",
			},
			{
				shortTitle: "สุ่มชื่อไทย",
				title: "เครื่องมือสุ่มชื่อไทย",
				url: "/tools/random/thai-name",
				description: "สุ่มชื่อไทยแบบสุ่ม ใช้สำหรับตั้งชื่อตัวละคร หรือกิจกรรมที่ต้องใช้ชื่อ",
				keywords:
					"สุ่มชื่อไทย, ชื่อไทย, ตั้งชื่อตัวละคร, สุ่มชื่อผู้ชาย, สุ่มชื่อผู้หญิง, random thai name",
			},
			{
				shortTitle: "สุ่มชื่ออังกฤษ",
				title: "เครื่องมือสุ่มชื่ออังกฤษ",
				url: "/tools/random/english-name",
				description:
					"สุ่มชื่อภาษาอังกฤษทั้งชื่อจริงและนามสกุล ใช้ได้ทั้งตั้งชื่อเล่นหรือโปรเจกต์ต่าง ๆ",
				keywords:
					"สุ่มชื่ออังกฤษ, ชื่อภาษาอังกฤษ, ชื่อเล่นอังกฤษ, random english name, ชื่อฝรั่ง",
			},
		],
	},
	"/tools/calculators": {
		title: "เครื่องมือคำนวณ",
		description:
			"รวมเครื่องมือคำนวณพื้นฐานที่จำเป็นในชีวิตประจำวัน เช่น BMI, BMR, อายุ และพลังงานที่ใช้ในแต่ละวัน",
		keywords: "เครื่องมือคำนวณ, คำนวณ BMI, คำนวณ BMR, คำนวณอายุ, คำนวณ TDEE",
		tools: [
			{
				shortTitle: "คำนวณ BMI",
				title: "เครื่องคำนวณดัชนีมวลกาย (BMI)",
				url: "/tools/calculators/bmi",
				description:
					"คำนวณค่า BMI เพื่อตรวจสอบว่าคุณอยู่ในเกณฑ์น้ำหนักที่เหมาะสมหรือไม่ พร้อมคำแนะนำ",
				keywords:
					"คำนวณ BMI, ดัชนีมวลกาย, bmi calculator, ตรวจสุขภาพ, น้ำหนักเกิน, ผอมเกิน",
			},
			{
				shortTitle: "คำนวณ BMR",
				title: "เครื่องคำนวณอัตราเผาผลาญพลังงาน (BMR)",
				url: "/tools/calculators/bmr",
				description: "คำนวณพลังงานขั้นต่ำที่ร่างกายต้องการต่อวันเพื่อการมีชีวิตอยู่",
				keywords:
					"คำนวณ BMR, bmr คืออะไร, เผาผลาญพลังงาน, basal metabolic rate, พลังงานพื้นฐาน",
			},
			{
				shortTitle: "คำนวณ TDEE",
				title: "เครื่องคำนวณพลังงานที่ใช้ต่อวัน (TDEE)",
				url: "/tools/calculators/tdee",
				description:
					"คำนวณพลังงานที่ใช้จริงในแต่ละวันตามกิจกรรมของคุณ เหมาะสำหรับวางแผนลดน้ำหนักหรือเพิ่มน้ำหนัก",
				keywords:
					"คำนวณ TDEE, พลังงานที่ใช้ต่อวัน, ลดน้ำหนัก, เพิ่มน้ำหนัก, tdee calculator, พลังงานเผาผลาญ",
			},
			{
				shortTitle: "คำนวณอายุ",
				title: "เครื่องคำนวณอายุ",
				url: "/tools/calculators/age",
				description: "คำนวณอายุของคุณอย่างแม่นยำ ทั้งปี เดือน และวัน จากวันเกิด",
				keywords: "คำนวณอายุ, age calculator, นับอายุ, วันเกิด, คำนวณปีเกิด, อายุเท่าไร",
			},
		],
	},
	"/tools/colors": {
		title: "เครื่องมือสี",
		description:
			"เครื่องมือสำหรับนักออกแบบ ช่วยสุ่มสีแบบมีรหัส HEX/RGB ใช้สำหรับงานกราฟิก เว็บ หรือเลือกโทนสี",
		keywords: "เครื่องมือสี, สุ่มสี, สี HEX, สี RGB, random color",
		tools: [
			{
				shortTitle: "สุ่มสี",
				title: "เครื่องมือสุ่มสี",
				url: "/tools/colors/random",
				description:
					"สุ่มสีแบบสุ่ม พร้อมแสดงรหัส HEX และ RGB ใช้ได้กับงานออกแบบ UX/UI หรือกราฟิก",
				keywords:
					"สุ่มสี, random color, สีสำหรับออกแบบ, HEX color, RGB color, โทนสี, สุ่มโทนสี",
			},
		],
	},
};

export const CATEGORY_LIST = Object.entries(CATEGORY_MAP);
