import { Accessor, For, JSX } from "solid-js"
import { debounce } from "@solid-primitives/scheduled"

function Slider<T>(props: {
	items: readonly T[]
	children: (item: T, index: Accessor<number>) => JSX.Element
	onSlideChange?: (index: number) => void
}): JSX.Element {
	let currentIndex = 0
	const margin = 54

	const handleScroll =
		props.onSlideChange &&
		debounce(() => {
			const { scrollLeft, scrollWidth, clientWidth } = container
			const { items } = props
			const maxScroll = scrollWidth - clientWidth
			const itemsScrolled = Math.floor((scrollLeft / maxScroll) * items.length)
			const scrolled = scrollLeft - itemsScrolled * margin
			const index = Math.floor((scrolled / maxScroll) * items.length)
			if (index !== currentIndex) {
				props.onSlideChange!(index)
				currentIndex = index
			}
		}, 100)

	let container!: HTMLDivElement
	return (
		<div
			class="
				h-full w-full flex space-x-16
				overflow-y-scroll scroll-smooth snap-x snap-mandatory
			"
			ref={container}
			onscroll={handleScroll}
		>
			<For each={props.items}>
				{(item, index) => (
					<figure
						class="
							relative w-full h-full flex-shrink-0 overflow-hidden
							snap-center
						"
					>
						{props.children(item, index)}
					</figure>
				)}
			</For>
		</div>
	)
}
export default Slider
