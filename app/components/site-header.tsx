import { Link } from "@tanstack/react-router";

import Logo from "./Logo";

export function SiteHeader() {
  return (
    <header className="bg-background fixed top-0 z-50 flex h-(--header-height) px-4 py-3 w-full items-center border-b">
      <Link to="/" className="inline-flex gap-2 items-center font-semibold">
        <Logo />
        รวมมิตรเครื่องมือ
      </Link>
    </header>
  );
}
