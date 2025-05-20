// @ts-ignore
import fontsourceVariableNotoSansThaiCss from "@fontsource-variable/noto-sans-thai?url";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { NotFound } from "@/components/not-found";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
// @ts-ignore
import appCss from "@/styles/app.css?url";
import { seo } from "@/utils/seo";

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
			{
				name: "google-site-verification",
				content: "NOC2Z-H5bvAPpv5DX_pd6blYsg4xWUbrevyoBQAPv3c",
			},
			...seo({
				description:
					"รวมมิตรเครื่องมือ คือ เว็บรวมเครื่องมือออนไลน์สารพัดประโยชน์ ใช้ง่าย รวดเร็ว ครอบคลุมทุกอย่างที่คุณต้องการ และฟรี 100%",
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
		scripts: [
			{
				async: true,
				src: "https://www.googletagmanager.com/gtag/js?id=G-KDBE7K328K",
			},
			{
				children: `window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-KDBE7K328K');`,
			},
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
		<html suppressHydrationWarning lang="th">
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider
					attribute="class"
					enableSystem={false}
					disableTransitionOnChange
				>
					<div className="min-h-dvh flex flex-col">
						<Header />
						<div className="flex-1 flex flex-col">{children}</div>
						<Footer />
					</div>
					<Toaster richColors />
				</ThemeProvider>
				<Scripts />
				<TanStackRouterDevtools position="bottom-left" />
			</body>
		</html>
	);
}
