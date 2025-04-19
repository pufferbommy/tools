import { Link } from "@tanstack/react-router";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="navbar bg-base-100 z-10 sticky top-0 border-b border-base-300">
      <div className="container flex justify-between">
        <Link to="/" className="inline-flex gap-2 items-center font-bold">
          <Logo />
          รวมมิตรเครื่องมือ
        </Link>
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link to="/">หน้าแรก</Link>
          </li>
          <li>
            <Link to="/random">เครื่องมือสุ่ม</Link>
          </li>
          <li>
            <Link to="/calculator">เครื่องมือคำนวณ</Link>
          </li>
          <li>
            <Link to="/blog">บล็อก</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
