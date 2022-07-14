import { Component } from "solid-js"
import Button from "@/islands/ui/button/Button"
import { ETSY_URL, ALLEGRO_URL, ISTAGRAM_URL } from "@/utils/variables"

import styles from "./Socials.module.css"

const Socials: Component<{
	type?: "outline" | "contact"
}> = props => {
	return (
		<div class={`${styles.socials} type-${props.type ?? "outline"}`}>
			{/* <IconButton
    icon="ig"
    :href="links.ig"
    :class="type === 'contact' ? 'outline white' : ''"
  /> */}
			<Button
				anchor
				href={ETSY_URL}
				// :class="type === 'contact' ? 'outline white' : ''"
			>
				Etsy
			</Button>
			<Button
				anchor
				href={ALLEGRO_URL}
				// :trailing-icon="type === 'contact' ? 'bag' : ''"
			>
				Allegro
			</Button>
		</div>
	)
}
export default Socials
