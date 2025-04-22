import { Link } from "@tanstack/react-router";

import { TOOL_CATEGORIES } from "~/constants";

export default function Sidebar() {
  return (
    <aside className="shrink-0 sticky shadow-sm hidden xl:block top-0 w-80 border-r border-base-300 p-4">
      <nav aria-label="หมวดหมู่เครื่องมือ">
        <ul className="menu w-full p-0">
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
      </nav>
    </aside>
  );
}
