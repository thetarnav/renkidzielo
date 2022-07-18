import { Accessor, For, JSX } from "solid-js"
import { debounce } from "@solid-primitives/scheduled"

function getSlideIndex(container: HTMLElement, margin: number): number {
	const { scrollLeft, clientWidth } = container
	const scroll = scrollLeft + clientWidth / 2
	const slideWidth = clientWidth + margin
	return Math.floor(scroll / slideWidth)
}

function Slider<T>(props: {
	items: readonly T[]
	children: (item: T, index: Accessor<number>) => JSX.Element
	onSlideChange?: (index: number) => void
}): JSX.Element {
	let currentIndex = 0
	const margin = 42

	const handleScroll =
		props.onSlideChange &&
		debounce(() => {
			const index = getSlideIndex(container, margin)
			if (index !== currentIndex) {
				props.onSlideChange!(index)
				currentIndex = index
			}
		}, 100)

	let container!: HTMLDivElement
	return (
		<div
			class="
				h-full w-full flex space-x-12
				overflow-y-scroll scroll-smooth snap-x snap-mandatory
			"
			ref={container}
			onScroll={handleScroll}
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
