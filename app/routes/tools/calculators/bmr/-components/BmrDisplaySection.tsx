export function BmrDisplaySection({ bmr }: { bmr: number | null }) {
  return (
    <section className="space-y-4">
      <p>
        ค่าการเผาผลาญพลังงาน (BMR) ของคุณคือ{" "}
        <strong className="text-primary">{bmr?.toFixed(1) || "?"}</strong>{" "}
        แคลอรี่ต่อวัน
      </p>
      <p>
        ค่านี้แสดงถึงจำนวนแคลอรี่ที่ร่างกายต้องใช้ในแต่ละวันเพื่อทำงานพื้นฐาน
        เช่น การหายใจและการรักษาอุณหภูมิร่างกาย โดยไม่รวมกิจกรรมอื่นๆ ที่คุณทำ
        เช่น การเดินหรือออกกำลังกาย
      </p>
    </section>
  );
}
