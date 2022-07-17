import { ParentComponent, createSignal } from "solid-js"
import IconButton from "@islands/ui/button/IconButton"
import styles from "./mobileNav.module.css"
import MenuIcon from "~icons/assets/menu"
import CloseIcon from "~icons/assets/close"

const MobileNavOverlay: ParentComponent = props => {
	const [isOpen, setIsOpen] = createSignal(false)
	const toggle = () => setIsOpen(p => !p)

	return (
		<div class={styles["mobile-nav"]} classList={{ open: isOpen() }}>
			<IconButton
				icon={isOpen() ? CloseIcon : MenuIcon}
				class={styles["toggle-button"]}
				onClick={toggle}
			/>
			{props.children}
		</div>
	)
}
export default MobileNavOverlay
