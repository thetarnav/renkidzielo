import { ParentComponent, splitProps, JSX, onMount, children } from "solid-js"
import { scroll } from "motion"

const clamp = (min: number, max: number, value: number) => Math.max(min, Math.min(max, value))

const mapRange = (
	value: number,
	in_min: number,
	in_max: number,
	out_min: number,
	out_max: number,
) => ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min

// const randomColor = () => {
// 	const r = Math.floor(Math.random() * 256)
// 	const g = Math.floor(Math.random() * 256)
// 	const b = Math.floor(Math.random() * 256)
// 	return `rgb(${r}, ${g}, ${b})`
// }

// const createWorldGuide = (y: number) => {
// 	;<Portal>
// 		<div
// 			class="absolute inset-x-0 z-[99999] h-px"
// 			style={{ top: `${y}px`, background: randomColor() }}
// 		/>
// 	</Portal>
// }

const localPropNames = ["z", "ref", "centerToScreen"] as const

const Parallax: ParentComponent<
	JSX.IntrinsicElements["div"] & {
		z: number
		centerToScreen?: boolean
	}
> = props => {
	const { z, centerToScreen = false } = props

	const resolved = children(() => props.children)

	onMount(() => {
		let _ref = resolved()
		let ref!: HTMLElement

		while (_ref instanceof HTMLElement && !ref) {
			if (getComputedStyle(_ref).display === "contents") _ref = _ref.firstChild
			else ref = _ref
		}
		if (!ref) {
			console.warn("Parallax children must be a single element")
			return
		}

		const vh = window.innerHeight
		const sh = document.body.scrollHeight
		const { top, height } = parent.getBoundingClientRect()

		/** y position of the elements center */
		const center = centerToScreen ? vh / 2 : window.scrollY + top + height / 2
		/** scroll distance in each directions from the element's center in which the parallax effect is applied */
		const runway = Math.max(center, sh - center)
		const from = center - runway
		const to = center + runway

		const translateDistance = (runway / vh) * 10 * z

		const a = ref.animate(
			[
				{ transform: `translateY(${-translateDistance}px)` },
				{ transform: `translateY(${translateDistance}px)` },
			],
			{ duration: 1000, iterations: Infinity },
		)
		a.pause()
		a.currentTime = 500

		scroll(({ y }) => {
			requestAnimationFrame(() => {
				const current = y.current + vh / 2
				a.currentTime = clamp(0, 999, mapRange(current, from, to, 0, 999))
			})
		})
	})

	const [, attrs] = splitProps(props, localPropNames)
	let parent!: HTMLDivElement
	return (
		<div ref={parent} {...attrs}>
			{resolved}
		</div>
	)
}

export default Parallax
