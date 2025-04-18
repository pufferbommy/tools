import { createFileRoute, Link } from "@tanstack/react-router";
import { Shuffle } from "@phosphor-icons/react";

export const Route = createFileRoute("/")({
  component: Home,
});

const TOOLS = [
  {
    title: "คำนวณดัชนีมวลกาย (BMI)",
    description:
      "เครื่องคำนวณ BMI ตรวจสอบน้ำหนักตามส่วนสูงของคุณ พร้อมแนะนำหมวดหมู่สุขภาพ",
    href: "/tools/calculator/bmi",
  },
];

function Home() {
  const randomIndex = Math.floor(Math.random() * TOOLS.length);
  const randomTool = TOOLS[randomIndex];

  return (
    <main className="py-16 container">
      <section className="text-center mb-16 space-y-4">
        <h1 className="text-4xl font-bold">รวมมิตรเครื่องมือสารพัดประโยชน์</h1>
        <p className="text-base-content/75">
          เว็บเดียวที่รวมทุกเครื่องมือที่คุณต้องใช้ในชีวิตประจำวัน ทั้งสะดวก
          ใช้ง่าย และฟรี
        </p>
        <Link to={randomTool.href} className="btn btn-primary">
          <Shuffle />
          สุ่มเครื่องมือ
        </Link>
      </section>
      <section className="grid grid-cols-4">
        {TOOLS.map((tool) => (
          <Link to={tool.href} key={tool.href} className="card card-border">
            <div className="card-body">
              <h2 className="card-title">{tool.title}</h2>
              <p className="text-base-content/75">{tool.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
