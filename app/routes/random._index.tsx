import React from "react";

function RandomIndex() {
	return (
		<>
			<header className="text-center">
				<h1 className="text-4xl font-medium mb-3 text-primary">
					รวมมิตรเครื่องมือ - Tool Collection
				</h1>
				<p className="text-muted-foreground">
					เว็บไซต์นี้รวมเครื่องมือสุ่มต่างๆ ที่ช่วยให้คุณสามารถสร้างข้อมูลสุ่มได้อย่างง่ายดาย
					ใช้งานง่ายและรวดเร็ว
				</p>
			</header>
			<ul className="space-y-4">
				<li>
					<a href="/random/number" className="text-blue-500 hover:underline">
						สุ่มตัวเลข
					</a>
				</li>
				<li>
					<a href="/random/name" className="text-blue-500 hover:underline">
						สุ่มชื่อ
					</a>
				</li>
				<li>
					<a href="/random/color" className="text-blue-500 hover:underline">
						สุ่มสี
					</a>
				</li>
			</ul>
		</>
	);
}

export default RandomIndex;
