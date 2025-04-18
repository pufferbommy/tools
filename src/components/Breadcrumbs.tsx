import { Link } from "@tanstack/react-router";

export function Breadcrumbs(props: { children: React.ReactNode }) {
  return (
    <nav className="breadcrumbs text-sm">
      <ul className="text-base-content/50 [&>*:last-child]:text-base-content">
        {props.children}
      </ul>
    </nav>
  );
}

Breadcrumbs.Item = function BreadcrumbItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li>
      <Link to={href}>{children}</Link>
    </li>
  );
};
