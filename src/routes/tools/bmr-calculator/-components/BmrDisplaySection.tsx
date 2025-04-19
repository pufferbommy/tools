export function BmrDisplaySection({ bmr }: { bmr: number }) {
  return (
    <section className="card card-border">
      <div className="card-body">
        <h2 className="card-title">ค่าอัตราการเผาผลาญพลังงานพื้นฐาน (BMR)</h2>
        <p className="text-4xl">{bmr?.toFixed(0)} kcal</p>
        <div className="text-base-content/75">
          {bmr === null ? (
            "กรุณากรอกข้อมูลให้ครบถ้วนเพื่อคำนวณ BMR"
          ) : (
            <>
              ค่านี้แสดงปริมาณพลังงานที่ร่างกายต้องการใช้ในแต่ละวันขณะพักผ่อน
              เพื่อรักษาการทำงานพื้นฐานของร่างกาย เช่น การหายใจ การไหลเวียนโลหิต
              และการทำงานของอวัยวะต่าง ๆ
              <br />
              หากต้องการทราบปริมาณพลังงานที่เหมาะสมกับการใช้ชีวิตประจำวัน
              สามารถนำค่านี้ไปใช้ต่อในการคำนวณ <strong>TDEE</strong> ได้
            </>
          )}
        </div>
      </div>
    </section>
  );
}
