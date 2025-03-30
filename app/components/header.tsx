import { Link, NavLink } from "react-router";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
	return (
		<header className="border-b px-4">
			<div className="container border-x py-2 px-4 mx-auto flex items-center justify-between">
				<h1 className="flex-1">
					<Link to="/" className="font-medium flex items-center gap-2">
						<img src="/logo-mini.png" alt="logo" className="w-12 dark:invert" />
						รวมมิตรเครื่องมือ
					</Link>
				</h1>
				<nav>
					<ul>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? "font-medium" : "text-muted-foreground"
								}
								to="/random"
							>
								สุ่ม
							</NavLink>
						</li>
					</ul>
				</nav>
				<div className="flex-1 flex justify-end">
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
