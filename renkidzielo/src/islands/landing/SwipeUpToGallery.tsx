import { Component } from "solid-js"
import { createVisibilityObserver } from "@solid-primitives/intersection-observer"
import styles from "./SwipeUpToGallery.module.css"

import ArrowUp from "~icons/assets/arrow-up"
import GridIcon from "~icons/assets/grid"

const SwipeUpToGallery: Component<{}> = props => {
	let ref!: HTMLDivElement
	const [isVisible] = createVisibilityObserver(() => ref, { threshold: 0.8 })

	return (
		<div ref={ref} class="relative text-center body font-medium lg:hidden">
			<div
				class={`${styles.gradient}
					absolute -z-1 inset-x-0 bottom-0 h-[130%]
					bg-gradient-to-t from-gray-200 to-transparent
				`}
			></div>
			<div
				class="p-14 flex justify-center items-center [&>*]:shrink-0
							transition-all delay-100 duration-500"
				classList={{
					"translate-y-full": !isVisible(),
				}}
			>
				<ArrowUp class="w-8" />
				<p class="w-fit">
					Przeciągnij palcem w górę by przejść do{" "}
					<a href="/gallery" class="text-primary font-semibold">
						Galerii
						<GridIcon class="inline ml-1 -mt-1" />
					</a>
				</p>
				<ArrowUp class="w-8" />
			</div>
		</div>
	)
}

export default SwipeUpToGallery
