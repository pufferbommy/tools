import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/calculator/bmi")({
  component: RouteComponent,
});

const socials = [
  {
    icon: <Icon icon="bi:facebook" />,
    link: "https://facebook.com/sharer/sharer.php?u=URL",
  },
  {
    link: "https://twitter.com/intent/post?url=URL&text=ข้อความ",
    icon: <Icon icon="bi:twitter-x" />,
  },
  {
    link: "https://social-plugins.line.me/lineit/share?url=URL",
    icon: <Icon icon="bi:line" />,
  },
  {
    link: "https://www.reddit.com/submit?url=URL&title=ข้อความ",
    icon: <Icon icon="bi:reddit" />,
  },
  {
    link: "fb-messenger://share/?link=URL",
    icon: <Icon icon="bi:messenger" />,
  },
];

function RouteComponent() {
  return (
    <main className="py-16 container mx-auto space-y-8">
      <section className="text-center">
        <h1 className="text-4xl mb-4 font-bold">คำนวณดัชนีมวลกาย (BMI)</h1>
        <p className="text-base-content/75">
          เครื่องคำนวณ BMI ตรวจสอบน้ำหนักตามส่วนสูงของคุณ
          พร้อมแนะนำหมวดหมู่สุขภาพ
        </p>
      </section>
      <section>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">ระดับค่า BMI</h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="w-[150px]">ช่วงค่า BMI</th>
                    <th>หมวดหมู่</th>
                    <th>คำอธิบาย</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>&lt; 18.5</td>
                    <td>ผอมเกินไป</td>
                    <td>เสี่ยงต่อการขาดสารอาหาร</td>
                  </tr>
                  <tr>
                    <td>18.5 – 22.9</td>
                    <td>ปกติ</td>
                    <td>สุขภาพดี ห่างไกลโรค</td>
                  </tr>
                  <tr>
                    <td>23.0 – 24.9</td>
                    <td>น้ำหนักเกิน</td>
                    <td>เริ่มมีความเสี่ยง</td>
                  </tr>
                  <tr>
                    <td>25.0 – 29.9</td>
                    <td>อ้วน</td>
                    <td>เสี่ยงโรคเบาหวาน/ความดัน</td>
                  </tr>
                  <tr>
                    <td>≥ 30.0</td>
                    <td>อ้วนมาก</td>
                    <td>เสี่ยงโรคร้ายแรง ต้องควบคุมทันที</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center gap-4">
        <h2>แชร์ไปยัง</h2>
        <div className="flex gap-2">
          {socials.map((social) => (
            <a href={social.link} key={social.link} className="btn btn-square">
              {social.icon}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
