import { defineConfig } from "astro/config"
import solid from "@astrojs/solid-js"
import tailwind from "@astrojs/tailwind"
import Icons from "unplugin-icons/vite"
import { FileSystemIconLoader } from "unplugin-icons/loaders"

// https://astro.build/config
export default defineConfig({
	integrations: [
		solid(),
		tailwind({
			config: { applyBaseStyles: false },
		}),
	],
	vite: {
		plugins: [
			Icons({
				compiler: "solid",
				customCollections: {
					assets: FileSystemIconLoader("./assets/icons"),
				},
			}),
		],
		ssr: {
			// for ssr support
			// see https://github.com/solidjs-community/solid-primitives/tree/main/packages/props#ssr-support
			noExternal: ["@solid-primitives/props"],
		},
	},
})
