import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
	return (
		<header className="border-b p-4 sticky top-0 bg-background z-10">
			<div className="container mx-auto flex items-center justify-between">
				<h1 className="font-bold">
					<Link to="/">รวมมิตรเครื่องมือ</Link>
				</h1>
				<nav>
					<ul className="flex gap-4 items-center">
						<li>
							<Link to="/">หน้าหลัก</Link>
						</li>
						<li>
							<Link to="/random/number">สุ่มตัวเลข</Link>
						</li>
						<li>
							<Link to="/random/name">สุ่มชื่อ</Link>
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
