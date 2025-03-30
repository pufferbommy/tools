import { Binary, CaseLower, CaseSensitive, House, Palette } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { cn } from "~/lib/utils";

function random() {
	return (
		<>
			<nav className="px-4 border-b">
				<ul className="flex text-sm justify-start container mx-auto [&_a]:border-x-[0.5px] [&>li:first-child>a]:border-l [&>li:last-child>a]:border-r border-r">
					<li>
						<NavLink
							end
							className={({ isActive }) =>
								cn(
									"px-4 py-2 inline-flex items-center gap-1 font-medium",
									!isActive && "text-muted-foreground",
								)
							}
							to="/random"
						>
							<House size={16} />
							สุ่มทั้งหมด
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								cn(
									"px-4 py-2 inline-flex items-center gap-1 font-medium",
									!isActive && "text-muted-foreground",
								)
							}
							to="/random/number"
						>
							<Binary size={16} />
							สุ่มตัวเลข
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								cn(
									"px-4 py-2 inline-flex items-center gap-1 font-medium",
									!isActive && "text-muted-foreground",
								)
							}
							to="/random/name"
						>
							<CaseSensitive size={16} />
							สุ่มชื่อ
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								cn(
									"px-4 py-2 inline-flex items-center gap-1 font-medium",
									!isActive && "text-muted-foreground",
								)
							}
							to="/random/color"
						>
							<Palette size={16} />
							สุ่มสี
						</NavLink>
					</li>
				</ul>
			</nav>
			<div className="px-4 flex-1 flex">
				<div className="container border-x divide-y mx-auto flex-1">
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default random;
