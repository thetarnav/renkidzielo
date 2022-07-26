import { Component, createMemo, createSignal, onMount } from "solid-js"
import { Transition } from "solid-transition-group"
import { Rerun } from "@solid-primitives/keyed"
import { animate } from "motion"

import { Highlight } from "@/types/api"
import { bluuText } from "@/utils/utils"
import Slider from "@islands/ui/slider/Slider"
import Button from "@islands/ui/button/Button"

import ChevronLeft from "~icons/assets/chevron-left"
import ChevronRight from "~icons/assets/chevron-right"
import EyeIcon from "~icons/assets/eye"

const HighlightsSlider: Component<{ highlights: Highlight[] }> = props => {
	const [index, setIndex] = createSignal(0)
	const activeItem = createMemo(() => props.highlights[index()])

	let prevH = 0
	let buttonContainer!: HTMLDivElement
	let detailsElement!: HTMLDivElement

	const onBeforeEnter = () => {
		requestAnimationFrame(() => {
			const newH = detailsElement.clientHeight
			if (newH !== prevH) {
				animate(buttonContainer, { y: [prevH - newH, 0] }, { duration: 0.3 })
			}
			prevH = newH
		})
	}
	onMount(() => {
		prevH = detailsElement.offsetHeight
	})

	return (
		<div
			class="relative aspect-portrait mb-48
				sm:mx-18 h:aspect-video"
		>
			<div class="w-full h-full sm:mt-4">
				<Slider items={props.highlights} onSlideChange={setIndex}>
					{({ thumbnail, title }) => (
						<img
							class="w-full h-full object-cover h:object-contain"
							src={thumbnail}
							alt={title}
							loading="lazy"
						/>
					)}
				</Slider>
			</div>

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

			<div class="absolute top-full inset-x-0">
				<div class="-mt-11 mx-6 flex flex-col">
					<Transition name="fade" mode="outin" onBeforeEnter={onBeforeEnter}>
						<Rerun on={activeItem}>
							{({ title, description }) => (
								<div ref={detailsElement}>
									<a class="min-h-[5.5rem] bluu text-black underline cursor-pointer">
										{bluuText(title)}
									</a>
									<p class="hidden lg:block text-gray-800 mt-8">{description}</p>
								</div>
							)}
						</Rerun>
					</Transition>
					<div class="self-end mt-8" ref={buttonContainer}>
						<Button trailingIcon={EyeIcon}>Zobacz Produkt</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HighlightsSlider
