import { ParentComponent, createSignal, Show } from "solid-js"

const ContactButton: ParentComponent = props => {
	const [showOverlay, setShowOverlay] = createSignal(false)

	return (
		<div>
			<button onClick={() => setShowOverlay(p => !p)}>Kontakt</button>
			<div>
				<Show when={showOverlay()}>{props.children}</Show>
			</div>
		</div>
	)
}

// aefsrgdh

export default ContactButton
