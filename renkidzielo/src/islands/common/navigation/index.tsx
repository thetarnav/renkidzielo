import { ParentComponent, createSignal, createMemo } from "solid-js"
import { isServer } from "solid-js/web"
import { useWindowScrollPosition } from "@solid-primitives/scroll"
import IconButton from "@islands/ui/button/IconButton"
import MenuIcon from "~icons/assets/menu"
import CloseIcon from "~icons/assets/close"
import styles from "./styles.module.css"

export const MobileNavOverlay: ParentComponent = props => {
	const [isOpen, setIsOpen] = createSignal(false)
	const toggle = () => setIsOpen(p => !p)

	return (
		<div class={styles.wrapper}>
			<IconButton
				icon={isOpen() ? CloseIcon : MenuIcon}
				class={styles["toggle-button"]}
				onClick={toggle}
			/>
			<div class={styles["mobile-nav"]} classList={{ open: isOpen() }}>
				{props.children}
			</div>
		</div>
	)
}

export const DesktopNavOverlay: ParentComponent<{ class: string }> = props => {
	const scroll = useWindowScrollPosition()
	const scrolled = isServer ? () => false : createMemo(() => scroll.y > 50)

	return (
		<nav class={props.class} data-scrolled={scrolled()}>
			{props.children}
		</nav>
	)
}
