import { ParentComponent, splitProps, JSX, onMount } from "solid-js"
import { warn } from "@solid-primitives/utils"
import { scroll, animate } from "motion"

const Parallax: ParentComponent<
	JSX.IntrinsicElements["div"] & {
		distance: number
		container?: HTMLElement | undefined | string
	}
> = props => {
	const [, attrs] = splitProps(props, ["distance", "ref", "container"])
	let ref!: HTMLDivElement

	onMount(() => {
		const scrollEl = (() => {
			const el = props.container
			if (!el) return document.scrollingElement
			if (typeof el === "string") return document.querySelector(el)
			return el
		})()

		if (!(scrollEl instanceof HTMLElement)) {
			warn("Parallax: scrollingElement not found")
			return
		}

		scroll(
			animate(ref, {
				y: [0, (props.distance * -1) / ((scrollEl.scrollHeight - window.innerHeight) / 530000)],
			}),
			{ container: scrollEl },
		)
	})

	return (
		<div ref={ref} {...attrs}>
			{props.children}
		</div>
	)
}

export default Parallax
