import { Component } from "solid-js"
import Button from "@/islands/ui/button/Button"
import IconButton from "@/islands/ui/button/IconButton"
import { ETSY_URL, ALLEGRO_URL, ISTAGRAM_URL } from "@/utils/variables"
import InstagramIcon from "~icons/assets/instagram"

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
			<IconButton icon={InstagramIcon} href={ISTAGRAM_URL} noBackground slimPadding>
				IG
			</IconButton>
			<Button href={ETSY_URL} noBackground slimPadding>
				Etsy
			</Button>
			<Button href={ALLEGRO_URL} noBackground slimPadding>
				Allegro
			</Button>
		</div>
	)
}
export default Socials
