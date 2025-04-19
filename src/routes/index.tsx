import { createFileRoute, Link } from "@tanstack/react-router";
import { Shuffle } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const TOOLS = [
      {
        title: "เครื่องมือคำนวณดัชนีมวลกาย (BMI)",
        description:
          "เครื่องคำนวณ BMI ตรวจสอบน้ำหนักตามส่วนสูงของคุณ พร้อมแนะนำหมวดหมู่สุขภาพ",
        href: "/tools/bmi-calculator",
      },
      {
        title: "เครื่องมือคำนวณอัตราการเผาผลาญพลังงานพื้นฐาน (BMR)",
        description:
          "เครื่องคำนวณ BMR เพื่อประเมินปริมาณแคลอรี่ที่ร่างกายต้องการในแต่ละวัน ตามเพศ น้ำหนัก ส่วนสูง และอายุ",
        href: "/tools/bmr-calculator",
      },
    ];
    return {
      tools: TOOLS,
      randomToolHref: TOOLS[Math.floor(Math.random() * TOOLS.length)].href,
    };
  },
});

function RouteComponent() {
  const { tools, randomToolHref } = Route.useLoaderData();

  return (
    <main className="container-sm py-16 space-y-8">
      <section className="text-center mb-16 space-y-4">
        <h1 className="text-4xl font-bold">รวมมิตรเครื่องมือสารพัดประโยชน์</h1>
        <p className="text-base-content/75">
          เว็บเดียวที่รวมทุกเครื่องมือที่คุณต้องใช้ในชีวิตประจำวัน ทั้งสะดวก
          ใช้ง่าย และฟรี
        </p>
        <Link to={randomToolHref} className="btn btn-primary">
          <Shuffle size={16} />
          สุ่มเครื่องมือ
        </Link>
      </section>
      <section className="grid md:grid-cols-2 gap-4">
        {tools.map(({ href, title, description }) => (
          <Link to={href} key={href} className="card card-border">
            <div className="card-body">
              <h2 className="card-title">{title}</h2>
              <p className="text-base-content/75">{description}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
