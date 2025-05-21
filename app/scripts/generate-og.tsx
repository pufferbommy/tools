import fs from "node:fs";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

import Logo from "@/components/logo";
import { CATEGORY_LIST } from "@/constants/categories";

const fontRegular = fs.readFileSync("./public/NotoSansThai-Regular.ttf");
const fontSemiBold = fs.readFileSync("./public/NotoSansThai-SemiBold.ttf");

const generateImage = async ({
	title,
	description,
}: { title: string; description: string }) => {
	const svg = await satori(
		<div
			style={{
				width: "100%",
				height: "100%",
				padding: "2rem",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				fontFamily: "Noto Sans Thai",
				background:
					"linear-gradient(to right bottom, hsl(340, 55%, 85%), hsl(340, 55%, 100%))",
				gap: "1rem",
				textAlign: "center",
			}}
		>
			<Logo height={96} />
			<h1 style={{ fontSize: "4rem", fontWeight: 600, margin: 0 }}>{title}</h1>
			<p
				style={{
					fontSize: "2rem",
					margin: 0,
				}}
			>
				{description}
			</p>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "NotoSansThai",
					data: fontRegular,
					weight: 400,
					style: "normal",
				},
				{
					name: "NotoSansThai",
					data: fontSemiBold,
					weight: 600,
					style: "normal",
				},
			],
		},
	);

	const png = new Resvg(svg).render().asPng();
	return png;
};

(async () => {
	const png = await generateImage({
		title: "รวมมิตรเครื่องมือ",
		description:
			"รวมมิตรเครื่องมือ คือ เว็บรวมเครื่องมือออนไลน์สารพัดประโยชน์ ใช้ง่าย รวดเร็ว ครอบคลุมทุกอย่างที่คุณต้องการ และฟรี 100%",
	});
	const filePath = path.join("./public/og", "/.png");
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, png);
	console.log("✅ Generated /.png");
	for (const [pathname, category] of CATEGORY_LIST) {
		const png = await generateImage(category);
		const filePath = path.join("./public/og", `${pathname}.png`);
		fs.mkdirSync(path.dirname(filePath), { recursive: true });
		fs.writeFileSync(filePath, png);
		console.log(`✅ Generated ${pathname}.png`);
		for (const tool of category.tools) {
			const png = await generateImage(tool);
			const filePath = path.join("./public/og", `${tool.url}.png`);
			fs.mkdirSync(path.dirname(filePath), { recursive: true });
			fs.writeFileSync(filePath, png);
			console.log(`✅ Generated ${tool.url}.png`);
		}
	}
})();
