// https://docs.astro.build/en/guides/styling/#postcss
module.exports = {
	plugins: {
		"postcss-import": {},
		// https://tailwindcss.com/docs/using-with-preprocessors#nesting
		"tailwindcss/nesting": {},
		// https://tailwindcss.com/docs/using-with-preprocessors#using-post-css-as-your-preprocessor
		tailwindcss: {},
		autoprefixer: {},
	},
}
