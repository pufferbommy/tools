import { Button } from "./ui/button";

export default function SiteFooter() {
  return (
    <footer className="border-t border-dashed">
      <div className="container py-4 flex justify-between text-sm">
        <p>
          © {new Date().getFullYear()} รวมมิตรเครื่องมือ —
          ขอบคุณที่ใช้เครื่องมือของเรา 💖
        </p>
        <nav>
          <Button className="p-0 h-auto font-normal" variant="link" asChild>
            <a href="/sitemap.xml">แผนผังเว็บไซต์</a>
          </Button>
        </nav>
      </div>
    </footer>
  );
}
