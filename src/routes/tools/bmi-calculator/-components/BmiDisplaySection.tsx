import { useMemo } from "react";

export function BmiDisplaySection({ bmi }: { bmi: number }) {
  const bmiCategory = useMemo(() => {
    if (bmi === null) return "";
    if (bmi < 18.5) return "น้ำหนักน้อย / ผอม";
    if (bmi >= 18.5 && bmi <= 22.9) return "ปกติ";
    if (bmi >= 23 && bmi <= 24.9) return "น้ำหนักเกิน / โรคอ้วนระดับ 1";
    if (bmi >= 25 && bmi <= 29.9) return "อ้วน / โรคอ้วนระดับ 2";
    return "อ้วนมาก"; // >= 30
  }, [bmi]);

  return (
    <section className="card card-border">
      <div className="card-body">
        <h2 className="card-title">ค่าดัชนีมวลกาย (BMI)</h2>
        <p className="text-4xl">{bmi?.toFixed(1)}</p>
        <div className="text-base-content/75">
          {bmi === null ? (
            "กรุณากรอกน้ำหนักและส่วนสูงเพื่อคำนวณ BMI"
          ) : (
            <>
              ค่า BMI ของคุณอยู่ในเกณท์ <strong>{bmiCategory}</strong> ซึ่ง{" "}
              {bmiCategory === "ปกติ"
                ? "อยู่ในเกณฑ์ที่ดีต่อสุขภาพ 🎉"
                : bmiCategory === "น้ำหนักน้อย / ผอม"
                  ? "อาจต้องเพิ่มน้ำหนักให้เหมาะสม 💪"
                  : bmiCategory === "น้ำหนักเกิน / โรคอ้วนระดับ 1"
                    ? "ควรควบคุมน้ำหนักให้เหมาะสม 🏃‍♂️"
                    : bmiCategory === "อ้วน / โรคอ้วนระดับ 2"
                      ? "ควรลดน้ำหนักเพื่อสุขภาพที่ดี 🏋️‍♂️"
                      : "ควรลดน้ำหนักอย่างเร่งด่วน ⚠️"}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
