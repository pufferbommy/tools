import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="navbar border-b border-b-base-content/10">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="inline-flex gap-2 items-center font-bold">
          <img src="/logo.png" width={32} alt="logo" className="invert-100" />
          รวมมิตรเครื่องมือ
        </Link>
        <ul className="menu menu-horizontal px-1 gap-2">
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
