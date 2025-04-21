import { createFileRoute, Link } from "@tanstack/react-router";
import { Shuffle } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const TOOLS = [
      {
        title: "เครื่องคำนวณดัชนีมวลกาย (BMI)",
        description:
          "ประเมินน้ำหนักของคุณว่าอยู่ในเกณฑ์ผอม ปกติ หรืออ้วน จากความสัมพันธ์ระหว่างน้ำหนักและส่วนสูง",
        href: "/tools/calculators/bmi",
      },
      {
        title: "เครื่องคำนวณการเผาผลาญพลังงาน (BMR)",
        description:
          "คำนวณพลังงานที่ร่างกายต้องใช้ในแต่ละวันขณะพัก ช่วยวางแผนควบคุมหรือเพิ่มน้ำหนักได้แม่นยำขึ้น",
        href: "/tools/calculators/bmr",
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
    <>
      {/* <section className="space-y-4">
        <div className="flex items-start gap-4 justify-between">
          <h1 className="text-4xl font-bold min-w-0 break-all">{title}</h1>
          <SocialShare url={url} text={title} />
        </div>
      </section> */}
      <section className="space-y-4">
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
      <section className="grid grid-cols-3 gap-4">
        {tools.map(({ href, title, description }) => (
          <Link to={href} key={href} className="card card-border">
            <div className="card-body">
              <h2 className="card-title">{title}</h2>
              <p className="text-base-content/75">{description}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
