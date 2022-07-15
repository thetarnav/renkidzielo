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
	// @ts-expect-error ssr field is missing in the type definition
	ssr: {
		// for ssr support
		// see https://github.com/solidjs-community/solid-primitives/tree/main/packages/props#ssr-support
		noExternal: ["@solid-primitives/props"],
	},
})
