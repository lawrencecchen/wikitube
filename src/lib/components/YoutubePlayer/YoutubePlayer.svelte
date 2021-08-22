<script lang="ts">
	export let src: string;
	export let title = 'YouTube video player';
</script>

<iframe
	{src}
	{title}
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen
/>
