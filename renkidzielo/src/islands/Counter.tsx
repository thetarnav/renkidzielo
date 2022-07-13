import { Component, createSignal } from "solid-js"

const Counter: Component = props => {
	const [count, setCount] = createSignal(0)
	const increment = () => setCount(count() + 1)
	const decrement = () => setCount(count() - 1)
	return (
		<div class="p-4 border border-gray-800 flex divide-x divide-black [&>*]:p-2 [&>*]:bg-white">
			<button onClick={increment}>+</button>
			<div>{count}</div>
			<button onClick={decrement}>-</button>
		</div>
	)
}
export default Counter
