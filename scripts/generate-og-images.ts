// import { promises as fs } from "fs";

// const tools = [
//   { slug: "bmi", title: "คำนวณ BMI", description: "ตรวจสอบดัชนีมวลกาย" },
//   {
//     slug: "tdee",
//     title: "คำนวณ TDEE",
//     description: "รู้พลังงานที่ใช้ในแต่ละวัน",
//   },
//   {
//     slug: "water",
//     title: "คำนวณปริมาณน้ำ",
//     description: "ดื่มน้ำให้พอเหมาะกับร่างกาย",
//   },
// ];

// async function generateAll() {
//   for (const tool of tools) {
//     const image = await renderOgImage({
//       title: tool.title,
//       description: tool.description,
//     });

//     const filePath = `public/og/og-${tool.slug}.png`;
//     await fs.writeFile(filePath, image);
//     console.log(`✅ Generated: ${filePath}`);
//   }
// }

// generateAll();
