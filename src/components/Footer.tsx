import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className="border-t border-base-content/10">
      <div className="container mx-auto footer sm:footer-horizontal p-4">
        <aside className="grid-flow-col items-center gap-2">
          <img src="/logo.png" width={32} alt="logo" className="invert-100" />
          <p className="text-sm">
            © {new Date().getFullYear()} รวมมิตรเครื่องมือ — Made with{" "}
            <span role="img" aria-label="love" className="text-red-500">
              ❤️
            </span>
          </p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a href="#" aria-label="Twitter">
            <Icon icon="bi:twitter-x" width={24} height={24} />
          </a>
          <a href="#" aria-label="Facebook">
            <Icon icon="bi:facebook" width={24} height={24} />
          </a>
        </nav>
      </div>
    </footer>
  );
}
