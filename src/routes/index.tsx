import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

const TOOLS = [
  {
    title: "คำนวณ BMI",
    description: "คำนวณดัชนีมวลกาย",
    href: "/tools/calculator/bmi",
  },
];

function Home() {
  return (
    <main className="text-center py-16 container mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        รวมมิตรเครื่องมือสารพัดประโยชน์
      </h1>
      <p className="text-base-content/75 mb-16">
        เว็บเดียวที่รวมทุกเครื่องมือที่คุณต้องใช้ในชีวิตประจำวัน ทั้งสะดวก
        ใช้ง่าย และฟรี
      </p>
      <div className="grid grid-cols-4">
        {TOOLS.map((tool) => (
          <Link
            to={tool.href}
            key={tool.href}
            className="card card-border border-base-content/10"
          >
            <div className="card-body">
              <h2 className="card-title">{tool.title}</h2>
              <p>{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
