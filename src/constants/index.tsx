import { Mars, Venus } from "lucide-react";

export const GENDERS = [
  {
    value: "male",
    name: "ชาย",
    icon: <Mars size={16} />,
  },
  {
    value: "female",
    name: "หญิง",
    icon: <Venus size={16} />,
  },
];

export const TOOL_CATEGORIES = [
  {
    category: "เครื่องคำนวณ",
    items: [
      {
        title: "คำนวณดัชนีมวลกาย (BMI)",
        href: "/tools/calculators/bmi",
        description: "คำนวณค่าดัชนีมวลกายของคุณเพื่อดูสุขภาพโดยรวม",
      },
      {
        title: "คำนวณการเผาผลาญพลังงาน (BMR)",
        href: "/tools/calculators/bmr",
        description: "หาค่าพลังงานพื้นฐานที่ร่างกายใช้ในแต่ละวัน",
      },
      {
        title: "คำนวณพลังงานต่อวัน (TDEE)",
        href: "/tools/calculators/tdee",
        description: "คำนวณพลังงานทั้งหมดที่ร่างกายใช้ รวมกิจกรรมต่างๆ",
      },
    ],
  },
];
