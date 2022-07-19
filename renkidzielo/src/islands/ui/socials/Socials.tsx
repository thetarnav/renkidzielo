import { Component } from "solid-js"
import Button, { ButtonProps } from "@/islands/ui/button/Button"
import IconButton from "@/islands/ui/button/IconButton"
import { ETSY_URL, ALLEGRO_URL, ISTAGRAM_URL } from "@/utils/variables"
import InstagramIcon from "~icons/assets/instagram"

import styles from "./Socials.module.css"

const Socials: Component<{
	class?: string
	dark?: boolean
}> = props => {
	const btnProps: ButtonProps = {
		noBackground: true,
		dark: !props.dark,
	}
	return (
		<div
			class={`${styles.socials} ${props.class ?? ""}`}
			classList={{
				[styles["dark"]]: props.dark,
			}}
		>
			<IconButton icon={InstagramIcon} href={ISTAGRAM_URL} {...btnProps}>
				IG
			</IconButton>
			<Button href={ETSY_URL} {...btnProps} slimPadding>
				Etsy
			</Button>
			<Button href={ALLEGRO_URL} {...btnProps} slimPadding>
				Allegro
			</Button>
		</div>
	)
}
export default Socials
