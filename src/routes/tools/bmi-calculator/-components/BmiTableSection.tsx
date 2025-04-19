import { cn } from "~/lib/utils";

export function BmiTableSection({ bmi }: { bmi: number | null }) {
  const rows = [
    {
      range: "< 18.5",
      label: "น้ำหนักน้อย / ผอม",
      desc: "เสี่ยงต่อการขาดสารอาหาร",
      highlight: bmi !== null && bmi < 18.5,
    },
    {
      range: "18.5 – 22.9",
      label: "ปกติ",
      desc: "สุขภาพดี ห่างไกลโรค",
      highlight: bmi !== null && bmi <= 22.9 && bmi >= 18.5,
    },
    {
      range: "23.0 – 24.9",
      label: "น้ำหนักเกิน / โรคอ้วนระดับ 1",
      desc: "เริ่มมีความเสี่ยง",
      highlight: bmi !== null && bmi <= 24.9 && bmi >= 23,
    },
    {
      range: "25.0 – 29.9",
      label: "อ้วน / โรคอ้วนระดับ 2",
      desc: "เสี่ยงโรคเบาหวาน/ความดัน",
      highlight: bmi !== null && bmi <= 29.9 && bmi >= 25,
    },
    {
      range: "≥ 30.0",
      label: "อ้วนมาก / โรคอ้วนระดับ 3",
      desc: "เสี่ยงโรคร้ายแรง ต้องควบคุมทันที",
      highlight: bmi !== null && bmi >= 30,
    },
  ];

  return (
    <section className="card card-border">
      <div className="card-body">
        <table className="table [&_tr]:hover:bg-base-200">
          <thead>
            <tr>
              <th>ช่วงค่า BMI</th>
              <th>อยู่ในเกณท์</th>
              <th>คำอธิบาย</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.range}
                className={cn(
                  row.highlight && "bg-primary/10 hover:bg-primary/20!"
                )}
              >
                <td>{row.range}</td>
                <td>{row.label}</td>
                <td>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
