import { ParentComponent, Show, JSX, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import styles from "./Button.module.css"

const Button: ParentComponent<
	| ({ anchor: true } & JSX.IntrinsicElements["a"])
	| ({ anchor?: undefined } & JSX.IntrinsicElements["button"])
> = props => {
	const [, attrs] = splitProps(props, ["children", "anchor"])

	return (
		<Dynamic component={props.anchor ? "a" : "button"} {...attrs} class={styles.button}>
			{/* <Icon v-if="leadingIcon" :icon="leadingIcon" /> */}
			<Show when={"children" in props}>
				<span>{props.children}</span>
			</Show>
			{/* <Icon v-if="trailingIcon" :icon="trailingIcon" /> */}
		</Dynamic>
	)
}
export default Button
