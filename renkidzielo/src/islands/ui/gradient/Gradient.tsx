import { Component } from "solid-js"
import styles from "./gradient.module.css"

type GradientProps = {
	class?: string
	shape?: string
	position?: string
	start?: string
	stop?: string
	colorFrom?: string
	colorTo?: string
}

const Gradient: Component<GradientProps> = props => {
	return (
		<div
			style={{
				...("shape" in props && { "--gradient-shape": props.shape }),
				...("position" in props && { "--gradient-position": props.position }),
				...("start" in props && { "--gradient-start": props.start }),
				...("stop" in props && { "--gradient-stop": props.stop }),
				...("colorFrom" in props && { "--gradient-color-from": props.colorFrom }),
				...("colorTo" in props && { "--gradient-color-to": props.colorTo }),
			}}
			class={`${styles.gradient} ${"class" in props ? props.class : ""}`}
		></div>
	)
}
export default Gradient
