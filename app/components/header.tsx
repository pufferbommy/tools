import { ModeToggle } from "./mode-toggle";

export default function Header() {
	return (
		<header className="border-b p-4 sticky top-0 bg-background z-10">
			<div className="container mx-auto flex items-center justify-between">
				<h1 className="font-bold">
					<a href="/">รวมมิตรเครื่องมือ</a>
				</h1>
				<nav>
					<ul className="flex gap-4 items-center">
						<li>
							<a href="/">หน้าหลัก</a>
						</li>
						<li>
							<a href="/random/number">สุ่มตัวเลข</a>
						</li>
						<li>
							<ModeToggle />
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
