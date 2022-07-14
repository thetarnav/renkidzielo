import { defineConfig } from "astro/config"
import solid from "@astrojs/solid-js"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
	integrations: [
		solid(),
		tailwind({
			config: { applyBaseStyles: false },
		}),
	],
	vite: {
		ssr: {
			// for ssr support
			// see https://github.com/solidjs-community/solid-primitives/tree/main/packages/props#ssr-support
			noExternal: ["@solid-primitives/props"],
		},
	},
})
