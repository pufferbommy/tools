import { Button } from "./ui/button";

export default function Footer() {
	return (
		<footer className="border-t border-dashed">
			<div className="container py-4 flex justify-between text-sm">
				<p>© {new Date().getFullYear()} RuammitTools - All rights reserved</p>
				<nav>
					<Button
						className="p-0 h-auto font-normal text-inherit"
						variant="link"
						asChild
					>
						<a href="/sitemap.xml">Sitemap</a>
					</Button>
				</nav>
			</div>
		</footer>
	);
}
