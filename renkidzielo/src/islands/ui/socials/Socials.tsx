import { Component } from "solid-js"
import Button from "@/islands/ui/button/Button"
import { ETSY_URL, ALLEGRO_URL, ISTAGRAM_URL } from "@/utils/variables"

import styles from "./Socials.module.css"

const Socials: Component<{
	class?: string
	dark?: boolean
}> = props => {
	return (
		<div
			class={`${styles.socials} ${props.class ?? ""}`}
			classList={{
				[styles["dark"]]: props.dark,
			}}
		>
			{/* Replace with IconButton */}
			<Button href={ISTAGRAM_URL} noBackground>
				IG
			</Button>
			<Button href={ETSY_URL} noBackground>
				Etsy
			</Button>
			<Button href={ALLEGRO_URL} noBackground>
				Allegro
			</Button>
		</div>
	)
}
export default Socials
