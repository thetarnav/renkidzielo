import { Component, createMemo, createSignal } from "solid-js"
import { Transition } from "solid-transition-group"
import { Rerun } from "@solid-primitives/keyed"

import { Highlight } from "@/types/api"
import { bluuText } from "@/utils/utils"
import Slider from "@/islands/ui/slider/Slider"

import ChevronLeft from "~icons/assets/chevron-left"
import ChevronRight from "~icons/assets/chevron-right"

const HighlightsSlider: Component<{ highlights: Highlight[] }> = props => {
	const [index, setIndex] = createSignal(0)
	const activeItem = createMemo(() => props.highlights[index()])

	return (
		<div class="relative w-screen aspect-w-4 aspect-h-5 mb-48">
			<Slider items={props.highlights} onSlideChange={setIndex}>
				{({ thumbnail, title }) => (
					<img class="w-full h-full object-cover" src={thumbnail} alt={title} loading="lazy" />
				)}
			</Slider>

			<div
				class="
					absolute inset-x-0 top-1/2 h-1/2 pointer-events-none
					bg-gradient-to-t from-white to-transparent opacity-25 lg:hidden
				"
			/>

			<div
				class="
					absolute top-4 left-6 pointer-events-none lg:hidden
					flex items-center space-x-2 h-max
				"
			>
				<ChevronLeft />
				<span class="small flex [&>*]:w-3 text-center">
					<div>{index() + 1}</div>
					<div>/</div>
					<div>{props.highlights.length}</div>
				</span>
				<ChevronRight />
			</div>

			<Transition name="fade" mode="outin">
				<Rerun on={activeItem}>
					{({ title, description }) => (
						<div class="absolute top-full inset-x-0 -mt-11 mx-6">
							<a class="min-h-[5.5rem] bluu text-black underline cursor-pointer">
								{bluuText(title)}
							</a>
							<p class="hidden lg:block text-gray-800 mt-8">{description}</p>
						</div>
					)}
				</Rerun>
			</Transition>
		</div>
	)
}

export default HighlightsSlider
