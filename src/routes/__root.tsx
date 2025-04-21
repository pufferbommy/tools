import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import * as React from "react";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import fontsourceVariableNotoSansThaiCss from "@fontsource-variable/noto-sans-thai?url";

import { seo } from "~/utils/seo";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import appCss from "~/styles/app.css?url";
import { NotFound } from "~/components/NotFound";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "รวมมิตรเครื่องมือ | เครื่องมือออนไลน์ ใช้ง่ายและฟรี",
        description:
          "เว็บรวมเครื่องมือออนไลน์สารพัดประโยชน์ ใช้ง่าย รวดเร็ว ครอบคลุมทุกอย่างที่คุณต้องการ และฟรี 100% ไม่มีค่าใช้จ่ายใดๆ",
        keywords: "เครื่องมือออนไลน์, คำนวณ BMI, รวมเครื่องมือฟรี, เว็บฟรี",
      }),
    ],
    links: [
      {
        rel: "stylesheet",
        href: fontsourceVariableNotoSansThaiCss,
      },
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  loader: async () => {
    const TOOL_CATEGORIES = [
      {
        category: "เครื่องคำนวณ",
        items: [
          {
            title: "คำนวณดัชนีมวลกาย (BMI)",
            href: "/tools/calculators/bmi",
          },
          {
            title: "คำนวณการเผาผลาญพลังงาน (BMR)",
            href: "/tools/calculators/bmr",
          },
          {
            title: "คำนวณพลังงานต่อวัน (TDEE)",
            href: "/tools/calculators/tdee",
          },
        ],
      },
    ];
    return {
      categories: TOOL_CATEGORIES,
    };
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { categories } = Route.useLoaderData();

  return (
    <html data-theme="lofi" lang="th">
      <head>
        <HeadContent />
      </head>
      <body className="grid grid-rows-[auto_1fr] h-dvh">
        <Header />
        <main className="flex h-full overflow-auto">
          <div className="shrink-0 sticky shadow-sm top-0 w-80 border-r border-base-300 p-8">
            <ul className="menu w-full p-0">
              <li>
                <Link to="/">หน้าแรก</Link>
              </li>
              {categories.map((cat) => (
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
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-16">
              <div className="container-sm space-y-8">{children}</div>
            </div>
            <Footer />
          </div>
        </main>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
