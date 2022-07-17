import { Component } from "solid-js"
import IconFrame from "./IconFrame"
import styles from "./styles.module.css"

const IconRing: Component<{
	icon: Component
	class?: string
}> = props => {
	return (
		<IconFrame icon={props.icon} circle class={`${styles["icon-ring"]} ${props.class ?? ""}`} />
	)
}
export default IconRing
