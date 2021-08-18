<script lang="ts">
	import TiptapEditor from '$lib/components/Tiptap/TiptapEditor.svelte';

	import { page } from '$app/stores';
</script>

{$page.path}
<div class="flex min-h-screen">
	<div class="w-full max-w-3xl">
		<div class="aspect-w-16 aspect-h-9">
			<iframe
				src="https://www.youtube-nocookie.com/embed/{$page.params.videoId}"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			/>
		</div>
	</div>

	<div class="prose max-w-prose p-4">
		<!-- <TiptapEditor documentId={$page.path} /> -->

		<!-- <p>
			Today we continue our dive deep into the foundations of how a neural net really works, by
			training one from scratch.
		</p>
		<p>
			We look at the sigmoid function, and see why it is that it's needed for classification models.
			We refactor our data input code to create batches, in the process learning about the
			DataLoader class. We also learn about a number of useful features of arrays and tensors in
			python, including view and the @ operator.
		</p>
		<p>
			Then we look more closely at how gradients are calculated and used in a PyTorch training loop.
			We go from a simple single-layer network, to create our first "deep" network from scratch, by
			adding non-linearities (with ReLU) to our network! We discuss why we need deep networks to get
			good results in practice.
		</p>
		<p>
			Finally, we start looking at the softmax activation function, which is used in most non-binary
			classification models.
		</p> -->
	</div>
</div>
