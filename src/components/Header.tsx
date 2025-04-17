import { Link } from "@tanstack/react-router";

export default function Header() {
	return (
		<div className="navbar bg-base-100 shadow-sm">
			<div className="flex-1 flex">
				<Link to="/" className="inline-flex gap-2 items-center font-bold">
					<img src="/logo.png" width={32} alt="logo" />
					รวมมิตรเครื่องมือ
				</Link>
			</div>
			<ul className="menu menu-horizontal px-1 gap-2">
				<li><Link to="/blog">บล็อก</Link></li>
			</ul>
		</div>
	);
}
