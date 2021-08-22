<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let votes: number;
	export let user_vote: number;

	let className = '';
	const dispatch = createEventDispatcher();

	export { className as class };

	function upvote() {
		if (user_vote === 1) {
			dispatch('unvote');
		} else {
			dispatch('upvote');
		}
	}

	function downvote() {
		if (user_vote === -1) {
			dispatch('unvote');
		} else {
			dispatch('downvote');
		}
	}
</script>

<div class="flex flex-col items-center -space-y-1 w-12 flex-shrink-0 {className}">
	<button on:click={upvote}>
		<svg
			class="w-7 h-7 {user_vote === 1 ? 'text-sky-500' : 'text-gray-300'}"
			viewBox="0 0 36 36"
			fill="currentColor"
		>
			<path d="M2 26h32L18 10 2 26z" />
		</svg>
	</button>
	<div class="font-lg font-semibold text-gray-500">
		{votes}
	</div>
	<button on:click={downvote}>
		<svg
			class="w-7 h-7 {user_vote === -1 ? 'text-orange-600' : 'text-gray-300'}"
			viewBox="0 0 36 36"
			fill="currentColor"
		>
			<path d="M2 10h32L18 26 2 10z" />
		</svg>
	</button>
</div>
