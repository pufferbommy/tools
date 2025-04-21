import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t shadow-sm border-base-300 px-8 py-4">
      <div className="container-sm footer sm:footer-horizontal">
        © {new Date().getFullYear()} รวมมิตรเครื่องมือ — Made with ❤️
      </div>
    </footer>
  );
}
