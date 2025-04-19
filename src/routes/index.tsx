import { Shuffle } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const TOOLS = [
      {
        title: "คำนวณดัชนีมวลกาย (BMI)",
        description:
          "เครื่องคำนวณ BMI ตรวจสอบน้ำหนักตามส่วนสูงของคุณ พร้อมแนะนำหมวดหมู่สุขภาพ",
        href: "/tools/calculator/bmi",
      },
      {
        title: "คำนวณดัชนีมวลกาย (BMI)",
        description:
          "เครื่องคำนวณ BMI ตรวจสอบน้ำหนักตามส่วนสูงของคุณ พร้อมแนะนำหมวดหมู่สุขภาพ",
        href: "/tools/calculator/bmi",
      },
      {
        title: "คำนวณดัชนีมวลกาย (BMI)",
        description:
          "เครื่องคำนวณ BMI ตรวจสอบน้ำหนักตามส่วนสูงของคุณ พร้อมแนะนำหมวดหมู่สุขภาพ",
        href: "/tools/calculator/bmi",
      },
    ];
    return {
      tools: TOOLS,
    };
  },
});

function Home() {
  const { tools } = Route.useLoaderData();

  return (
    <main className="py-16 container-sm">
      <section className="text-center mb-16 space-y-4">
        <h1 className="text-4xl font-bold">รวมมิตรเครื่องมือสารพัดประโยชน์</h1>
        <p className="text-base-content/75">
          เว็บเดียวที่รวมทุกเครื่องมือที่คุณต้องใช้ในชีวิตประจำวัน ทั้งสะดวก
          ใช้ง่าย และฟรี
        </p>
        <button
          // onClick={() => {
          //   const randomIndex = Math.floor(Math.random() * TOOLS.length);
          //   const randomTool = TOOLS[randomIndex];
          //   navigate({
          //     to: randomTool.href,
          //   });
          // }}
          className="btn btn-primary"
        >
          <Shuffle />
          สุ่มเครื่องมือ
        </button>
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
