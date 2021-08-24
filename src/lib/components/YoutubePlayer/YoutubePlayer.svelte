<script lang="ts">
	import { onMount } from 'svelte';
	import YouTubePlayer from 'youtube-player';
	import type { YouTubePlayer as YouTubePlayerType } from 'youtube-player/dist/types';

	// import YTPlayer from 'yt-player';

	// export let src: string;
	export let videoId: string;
	// export let title = 'YouTube video player';

	let playerRef: HTMLDivElement;
	export let player: YouTubePlayerType;

	onMount(() => {
		player = YouTubePlayer(playerRef, { playerVars: { autoplay: 0 } });
		player.loadVideoById(videoId);
		player.stopVideo();

		// const YT = (window as any).YT;

		// player = new YT.Player('player', {
		// 	videoId
		// });

		// const player = playerRef.contentWindow.getElementById('youtube_player');
		// player = new YTPlayer(playerRef, {
		// 	modestBranding: true,
		// 	annotations: false,
		// 	related: false,
		// 	host: 'https://www.youtube-nocookie.com'
		// });
		// player.load(src);
	});
</script>

<svelte:head>
	<script src="https://www.youtube.com/iframe_api" async></script>
</svelte:head>

<div bind:this={playerRef} />
<!-- <iframe
	bind:this={playerRef}
	{src}
	{title}
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen
/> -->
