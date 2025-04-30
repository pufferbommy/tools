import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import fontsourceVariableNotoSansThaiCss from "@fontsource-variable/noto-sans-thai?url";

import { seo } from "@/utils/seo";
import appCss from "@/styles/app.css?url";
import SiteFooter from "@/components/SiteFooter";
import { NotFound } from "@/components/NotFound";
import { SiteHeader } from "@/components/site-header";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { Toaster } from "@/components/ui/sonner";
import SearchContextProvider from "@/contexts/search";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        name: "google-site-verification",
        content: "NOC2Z-H5bvAPpv5DX_pd6blYsg4xWUbrevyoBQAPv3c",
      },
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
  return (
    <html lang="th">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh flex flex-col">
        <SearchContextProvider>
          <SiteHeader />
          <div className="flex-1 flex flex-col">{children}</div>
          <SiteFooter />
        </SearchContextProvider>
        <Toaster />
        <TanStackRouterDevtools position="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}
