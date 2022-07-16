import { Component } from "solid-js"
import { Dynamic } from "solid-js/web"
import styles from "./IconFrame.module.css"

const IconFrame: Component<{
	icon: Component
	class?: string
}> = props => {
	return (
		<figure class={`${styles.figure} ${props.class ?? ""}`}>
			<Dynamic component={props.icon} />
		</figure>
	)
}
export default IconFrame
