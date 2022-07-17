// import { Component, JSX, lazy, splitProps, Suspense } from "solid-js"
// import styles from "./styles.module.css"

// export type IconName =
// 	| "logo"
// 	| "logo-mono"
// 	| "home"
// 	| "lamp"
// 	| "painting"
// 	| "belt-bag"
// 	| "close"
// 	| "menu"
// 	| "arrow-down"
// 	| "arrow-up"
// 	| "arrow-right"
// 	| "arrow-left"
// 	| "istagram"

// const Icon: Component<{ name: IconName } & JSX.IntrinsicElements["svg"]> = props => {
// 	const IconComponent = lazy(() => import(`../../../../assets/icons/${props.name}.svg`))
// 	const [, attrs] = splitProps(props, ["name", "class"])
// 	return (
// 		<Suspense>
// 			<IconComponent class={`${styles["icon-component"]} ${props.class ?? ""}`} {...attrs} />
// 		</Suspense>
// 	)
// }
// export default Icon
