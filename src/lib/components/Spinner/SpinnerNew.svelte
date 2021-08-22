<script lang="ts">
	const step = 30;
	let className = '';

	export { className as class };
</script>

<div class={className}>
	{#each Array(12) as item}
		{item}
	{/each}
</div>
