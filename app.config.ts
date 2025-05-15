import { defineConfig } from "@tanstack/react-start/config";
import { generateSitemap } from "tanstack-router-sitemap";
import tsConfigPaths from "vite-tsconfig-paths";

import { sitemap } from "./app/utils/sitemap";

export default defineConfig({
	server: {
		preset: "netlify",
	},
	tsr: {
		appDirectory: "app",
	},
	vite: {
		plugins: [
			generateSitemap(sitemap),
			tsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
		],
	},
});
