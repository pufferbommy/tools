import { Link } from "@tanstack/react-router";
import Logo from "./Logo";
import { TOOL_CATEGORIES } from "~/constants";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="navbar shadow-sm px-8 flex justify-between w-full">
      <Link to="/" className="inline-flex gap-2 items-center font-bold">
        <Logo />
        รวมมิตรเครื่องมือ
      </Link>
      <div className="xl:hidden">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="btn btn-square btn-outline drawer-button"
            >
              <Menu />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <li>
                <Link to="/">หน้าแรก</Link>
              </li>
              {TOOL_CATEGORIES.map((cat) => (
                <li key={cat.category}>
                  <details open>
                    <summary>{cat.category}</summary>
                    <ul>
                      {cat.items.map((tool) => (
                        <li key={tool.href}>
                          <Link to={tool.href}>{tool.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
