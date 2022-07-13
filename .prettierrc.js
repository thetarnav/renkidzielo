module.exports = {
	// prettier-plugin-astro plugin is required for prettier to handle astro files
	// see: https://github.com/withastro/prettier-plugin-astro/blob/main/README.md
	plugins: [require.resolve("prettier-plugin-astro")],
	trailingComma: "all",
	tabWidth: 2,
	printWidth: 100,
	semi: false,
	singleQuote: false,
	useTabs: true,
	arrowParens: "avoid",
	bracketSpacing: true,
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
		{
			files: "*.md",
			options: {
				useTabs: false,
			},
		},
	],
}
