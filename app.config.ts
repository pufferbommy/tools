import { defineConfig } from "@tanstack/react-start/config";
import { generateSitemap } from "tanstack-router-sitemap";
import { analyzer } from "vite-bundle-analyzer";
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
			analyzer(),
			tsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
		],
	},
});
