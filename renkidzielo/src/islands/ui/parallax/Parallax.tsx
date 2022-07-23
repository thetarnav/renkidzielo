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

const Parallax: ParentComponent<
	JSX.IntrinsicElements["div"] & {
		z: number
	}
> = props => {
	const [, attrs] = splitProps(props, ["z", "ref"])
	let parent!: HTMLDivElement

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

		const translateDistance = (window.innerHeight / 50) * props.z

		const a = ref.animate(
			[
				{ transform: `translateY(${-translateDistance}px)` },
				{ transform: `translateY(${translateDistance}px)` },
			],
			{ duration: 1000, iterations: Infinity },
		)
		a.pause()
		a.currentTime = 500

		const { top, height } = parent.getBoundingClientRect()

		const elPos = window.scrollY + top + height / 2
		const from = elPos - window.innerHeight
		const to = elPos + window.innerHeight

		scroll(({ y }) => {
			requestAnimationFrame(() => {
				const current = y.current + window.innerHeight / 2
				a.currentTime = clamp(0, 999, mapRange(current, from, to, 0, 999))
			})
		})
	})

	return (
		<div ref={parent} {...attrs}>
			{resolved}
		</div>
	)
}

export default Parallax
