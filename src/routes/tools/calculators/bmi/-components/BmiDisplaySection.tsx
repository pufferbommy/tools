import { useMemo } from "react";

export function BmiDisplaySection({ bmi }: { bmi: number | null }) {
  const bmiCategory = useMemo(() => {
    if (bmi === null) return "";
    if (bmi < 18.5) return "น้ำหนักน้อย / ผอม";
    if (bmi >= 18.5 && bmi <= 22.9) return "ปกติ";
    if (bmi >= 23 && bmi <= 24.9) return "น้ำหนักเกิน (อ้วนระดับ 1)";
    if (bmi >= 25 && bmi <= 29.9) return "อ้วน (อ้วนระดับ 2)";
    return "อ้วนมาก (อ้วนระดับ 3)";
  }, [bmi]);

  return (
    <section>
      <p>
        ค่าดัชนีมวลกาย (BMI) ของคุณคือ{" "}
        <strong className="text-primary">{bmi?.toFixed(1) || "?"}</strong> kg/m
        <sup>2</sup> อยู่ในเกณฑ์{" "}
        <strong className="text-primary">{bmiCategory || "?"}</strong>
      </p>
    </section>
  );
}
