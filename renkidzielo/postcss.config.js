const path = require("path")

// https://docs.astro.build/en/guides/styling/#postcss
module.exports = {
	plugins: [
		// https://tailwindcss.com/docs/using-with-preprocessors#nesting
		require("tailwindcss/nesting"),
		// https://tailwindcss.com/docs/using-with-preprocessors#using-post-css-as-your-preprocessor
		require("tailwindcss"),
		require("autoprefixer"),
	],
}
