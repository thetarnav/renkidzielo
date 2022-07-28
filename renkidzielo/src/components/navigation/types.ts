import { ComponentProps, JSX } from "solid-js"

export type RouteUID =
	| "start"
	| "lamps"
	| "belt-bags"
	| "paintings"
	| "gallery"
	| "contact"
	| "gallery"

export type Route = {
	path: string
	name: string
	uid: RouteUID
	icon: (props: ComponentProps<"svg">) => JSX.Element
}
