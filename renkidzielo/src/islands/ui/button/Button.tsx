import { ParentComponent, Show, JSX, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import styles from "./Button.module.css"

export type ButtonLocalProps = {
	outline?: boolean
	dark?: boolean
	noBackground?: boolean
	slimPadding?: boolean
	square?: boolean
}

export type ButtonProps = ButtonLocalProps &
	(({ href: string } & JSX.IntrinsicElements["a"]) | JSX.IntrinsicElements["button"])

const localPropKeys = [
	"children",
	"class",
	"outline",
	"dark",
	"noBackground",
	"square",
	"slimPadding",
] as const

const Button: ParentComponent<ButtonProps> = props => {
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
				[styles["slim-padding"]]: props.slimPadding,
				[styles["square"]]: props.square,
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
