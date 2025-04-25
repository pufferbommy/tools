import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type BmiRow = {
  range: string;
  label: string;
  desc: string;
  isHighlighted: (bmi: number | null) => boolean;
};

const bmiRows: BmiRow[] = [
  {
    range: "< 18.5",
    label: "น้ำหนักน้อย / ผอม",
    desc: "ร่างกายอาจขาดสารอาหาร และภูมิคุ้มกันต่ำ — ควรเพิ่มปริมาณอาหาร และเลือกที่มีคุณค่าทางโภชนาการ",
    isHighlighted: (bmi) => bmi !== null && bmi < 18.5,
  },
  {
    range: "18.5 – 22.9",
    label: "น้ำหนักปกติ",
    desc: "สุขภาพดี สมดุลเหมาะสม ✨ — รักษาน้ำหนักให้อยู่ในช่วงนี้ด้วยอาหารครบ 5 หมู่ และการออกกำลังกายสม่ำเสมอ",
    isHighlighted: (bmi) => bmi !== null && bmi >= 18.5 && bmi <= 22.9,
  },
  {
    range: "23.0 – 24.9",
    label: "น้ำหนักเกิน (อ้วนระดับ 1)",
    desc: "เริ่มมีความเสี่ยงต่อโรคเรื้อรัง — แนะนำให้ควบคุมอาหาร และเพิ่มการออกกำลังกาย",
    isHighlighted: (bmi) => bmi !== null && bmi >= 23 && bmi <= 24.9,
  },
  {
    range: "25.0 – 29.9",
    label: "อ้วน (อ้วนระดับ 2)",
    desc: "เสี่ยงต่อโรคเบาหวาน ความดัน และไขมันในเลือดสูง — ควรปรับพฤติกรรมการกิน และออกกำลังกายอย่างจริงจัง",
    isHighlighted: (bmi) => bmi !== null && bmi >= 25 && bmi <= 29.9,
  },
  {
    range: "≥ 30.0",
    label: "อ้วนมาก (อ้วนระดับ 3)",
    desc: "เสี่ยงโรคร้ายแรง เช่น หัวใจ เบาหวานขั้นสูง — ควรปรึกษาผู้เชี่ยวชาญ และเริ่มวางแผนดูแลสุขภาพอย่างเข้มข้น",
    isHighlighted: (bmi) => bmi !== null && bmi >= 30,
  },
];

export function BmiTableSection({ bmi }: { bmi: number | null }) {
  return (
    <section className="overflow-x-auto border rounded">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ช่วงค่า BMI</TableHead>
            <TableHead>อยู่ในเกณฑ์</TableHead>
            <TableHead>คำอธิบาย</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bmiRows.map((row) => (
            <TableRow key={row.range}>
              <TableCell>{row.range}</TableCell>
              <TableCell>{row.label}</TableCell>
              <TableCell>{row.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
