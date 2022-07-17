import { Component } from "solid-js"
import { Dynamic } from "solid-js/web"
import styles from "./styles.module.css"

const IconFrame: Component<{
	icon: Component
	class?: string
	circle?: boolean
}> = props => {
	return (
		<figure
			class={`${styles.figure} ${props.class ?? ""}`}
			classList={{
				[styles.circle]: props.circle,
			}}
		>
			<Dynamic component={props.icon} />
		</figure>
	)
}
export default IconFrame
