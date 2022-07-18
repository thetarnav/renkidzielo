export const bluuText = (text: string): string =>
	text.replace(/ą/g, "a").replace(/Ą/g, "A").replace(/ę/g, "e").replace(/Ę/g, "E")
