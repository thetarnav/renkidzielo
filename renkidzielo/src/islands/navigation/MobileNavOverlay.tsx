import { ParentComponent, createSignal } from "solid-js"
import styles from "./mobileNav.module.css"

const MobileNavOverlay: ParentComponent = props => {
	const [isOpen, setIsOpen] = createSignal(false)
	const toggle = () => setIsOpen(p => !p)

	return (
		<div class={styles["mobile-nav"]} classList={{ open: isOpen() }}>
			{props.children}
			{/* TODO: replace by a IconButton once it's done */}
			<button class={styles["toggle-button"]} onClick={toggle}>
				{isOpen() ? "Close" : "Open"}
			</button>
		</div>
	)
}
export default MobileNavOverlay
