import { Component, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import Button, { ButtonProps } from "./Button"

export type IconButtonProps = ButtonProps & {
	icon: Component
}

const IconButton: Component<IconButtonProps> = props => {
	const [, buttonProps] = splitProps(props, ["icon", "square"])

	return (
		<Button {...(buttonProps as ButtonProps)} square>
			<Dynamic component={props.icon} />
		</Button>
	)
}
export default IconButton
