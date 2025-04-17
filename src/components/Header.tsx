import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

const NAVIGATION_ITEMS = [
	{
		href: "/",
		label: "หน้าแรก",
	},
	{
		href: "/random",
		label: "เครื่องมือสุ่ม",
	},
	{
		href: "/calculator",
		label: "เครื่องมือคำนวณ",
	},
	{
		href: "/blog",
		label: "บล็อก",
	},
];

export default function Header() {
	const [scrollPos, setScrollPos] = useState(0);

	useEffect(() => {
		const handleScroll = () => setScrollPos(window.scrollY);

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="navbar bg-base-100 shadow-sm">
		<div className="flex-1">
			<a className="btn btn-ghost text-lg">
				<img src="/logo.png" width={32} alt="logo" className="dark:invert" />
				รวมมิตรเครื่องมือ
			</a>
		</div>
		<div className="flex-none">
			<ul className="menu menu-horizontal px-1">
				<li><a>Link</a></li>
				<li>
					<details>
						<summary>Parent</summary>
						<ul className="bg-base-100 rounded-t-none p-2">
							<li><a>Link 1</a></li>
							<li><a>Link 2</a></li>
						</ul>
					</details>
				</li>
			</ul>
		</div>
	</div>
		// <header
		// 	className={cn(
		// 		scrollPos > 0 ? "border-border" : "border-transparent",
		// 		"border-b sticky top-0 transition-colors px-4 py-2",
		// 	)}
		// >
		// 	<div className="container mx-auto flex items-center justify-between">
		// 		<Link to="/" className="inline-flex gap-2 items-center font-semibold">
		// 			<img src="/logo.png" width={48} alt="logo" className="dark:invert" />
		// 			รวมมิตรเครื่องมือ
		// 		</Link>
		// 		<nav className="flex items-center gap-2">
		// 			{NAVIGATION_ITEMS.map((item) => (
		// 				<Link key={item.href} className="btn" to={item.href}>{item.label}</Link>
		// 			))}
		// 		</nav>
		// 	</div>
		// </header>
	);
}
