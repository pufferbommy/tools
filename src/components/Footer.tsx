import { Link } from "@tanstack/react-router";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t shadow-sm border-base-300 px-8 py-4">
      <div className="container-sm footer sm:footer-horizontal">
        <p>© {new Date().getFullYear()} Ruammit Tools — Made with ❤️</p>
        <nav className="w-full justify-end">
          <a href="/sitemap.xml">Sitemap</a>
        </nav>
      </div>
    </footer>
  );
}
