import { ParentComponent, Show, JSX, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import styles from "./Button.module.css"

type ButtonProps = {
	outline?: boolean
	dark?: boolean
	noBackground?: boolean
}

const localPropKeys = ["children", "class", "outline", "dark", "noBackground"] as const

const Button: ParentComponent<
	(({ href: string } & JSX.IntrinsicElements["a"]) | JSX.IntrinsicElements["button"]) & ButtonProps
> = props => {
	const [, attrs] = splitProps(props, localPropKeys)
	const isAnchor = "href" in attrs

	return (
		<Dynamic
			component={isAnchor ? "a" : "button"}
			{...attrs}
			{...(isAnchor && { target: "_blank" })}
			class={styles.button}
			classList={{
				[styles["type-outline"]]: props.outline,
				[styles["type-dark"]]: props.dark,
				[styles["no-background"]]: props.noBackground,
			}}
		>
			{/* <Icon v-if="leadingIcon" :icon="leadingIcon" /> */}
			<Show when={"children" in props}>
				<span>{props.children}</span>
			</Show>
			{/* <Icon v-if="trailingIcon" :icon="trailingIcon" /> */}
		</Dynamic>
	)
}
export default Button
