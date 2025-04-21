import { Link } from "@tanstack/react-router";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="navbar shadow-sm px-8">
      <Link to="/" className="inline-flex gap-2 items-center font-bold">
        <Logo />
        รวมมิตรเครื่องมือ
      </Link>
    </header>
  );
}
