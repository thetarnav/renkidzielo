import { Component, createSignal } from "solid-js"
import { Highlight } from "@/types/api"
import Slider from "@/islands/ui/slider/Slider"

const HighlightsSlider: Component<{ highlights: Highlight[] }> = props => {
	const [index, setIndex] = createSignal(0)

	return (
		<div class="relative w-screen aspect-w-4 aspect-h-5 mb-48">
			<Slider items={props.highlights} onSlideChange={setIndex}>
				{({ thumbnail, title }) => (
					<img class="w-full h-full object-cover" src={thumbnail} alt={title} />
				)}
			</Slider>
			<div class="absolute pointer-events-none bottom-0 right-0 mr-4 mb-4">{index()}</div>
		</div>
	)
}

export default HighlightsSlider
