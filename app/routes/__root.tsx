// @ts-ignore
import fontsourceVariableNotoSansThaiCss from "@fontsource-variable/noto-sans-thai?url";
import type { QueryClient } from "@tanstack/react-query";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { NotFound } from "@/components/not-found";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
// @ts-ignore
import globalsCss from "@/styles/globals.css?url";
import { seo } from "@/utils/seo";
import { getOrigin } from "@/utils/get-origin";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	loader: () => ({
		origin: getOrigin(),
		isProduction: process.env.NODE_ENV === "production",
	}),
	head: ({ loaderData }) => ({
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
				image: `${loaderData.origin}/og/.png`,
			}),
		],
		links: [
			{
				rel: "stylesheet",
				href: fontsourceVariableNotoSansThaiCss,
			},
			{ rel: "stylesheet", href: globalsCss },
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
			...(loaderData.isProduction
				? [
						{
							async: true,
							src: "https://www.googletagmanager.com/gtag/js?id=G-KDBE7K328K",
						},
						{
							children: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){
						dataLayer.push(arguments);
					}
					gtag('js', new Date());
					gtag('config', 'G-KDBE7K328K');
				`,
						},
					]
				: []),
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
			<body className="min-h-dvh flex flex-col">
				<ThemeProvider
					attribute="class"
					enableSystem={false}
					disableTransitionOnChange
				>
					<Header />
					<main className="flex-1 flex flex-col">{children}</main>
					<Footer />
					<Toaster richColors />
				</ThemeProvider>
				<Scripts />
				<TanStackRouterDevtools position="bottom-left" />
			</body>
		</html>
	);
}
