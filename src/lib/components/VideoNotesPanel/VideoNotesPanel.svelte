<script lang="ts">
	import { page } from '$app/stores';
	import Tab from '$lib/components/Tabs/Tab.svelte';
	import TabList from '$lib/components/Tabs/TabList.svelte';
	import TabPanel from '$lib/components/Tabs/TabPanel.svelte';
	import TabPanels from '$lib/components/Tabs/TabPanels.svelte';
	import Tabs from '$lib/components/Tabs/Tabs.svelte';
	import RealtimeEditor from '$lib/components/Tiptap/RealtimeEditor.svelte';
	import ProfileButton from '../ProfileButton/ProfileButton.svelte';
</script>

<div class="flex-1">
	<Tabs class="h-full flex flex-col">
		<div class="px-4 py-2 flex items-baseline">
			<TabList class="space-x-2" activeClass="bg-gray-200/75">
				<Tab
					class="font-medium text-gray-700 text-sm rounded px-3 py-1 transition hover:bg-gray-200/75"
				>
					Wiki
				</Tab>
				<Tab
					class="font-medium text-gray-700 text-sm rounded px-3 py-1 transition hover:bg-gray-200/75"
				>
					Timestamps
				</Tab>
			</TabList>

			<div class="mr-0 ml-auto">
				<ProfileButton />
			</div>
		</div>
		<TabPanels class="flex-1 flex flex-col h-full overflow-hidden">
			<TabPanel class="flex-1 max-h-full flex flex-col overflow-auto">
				<RealtimeEditor
					wrapperClass="flex-grow"
					class="prose prose-notion max-w-prose h-full mx-auto px-4 pt-5 pb-20 whitespace-pre-wrap"
					documentId={$page.params.videoId}
				/>
			</TabPanel>
			<TabPanel class="flex-1 max-h-full flex flex-col overflow-auto">
				<RealtimeEditor
					wrapperClass="flex-grow"
					class="prose prose-notion max-w-prose h-full mx-auto px-4 pt-5 pb-20 whitespace-pre-wrap"
					documentId="{$page.params.videoId}/timestamps"
				/>
			</TabPanel>
		</TabPanels>
	</Tabs>
	<!-- <div class="px-4 py-2 space-x-2">
		<button class="font-medium text-gray-700 text-sm rounded px-3 py-1 bg-gray-200/75" >
			Wiki
		</button>
		<button class="font-medium text-gray-700 text-sm rounded px-3 py-1" >
			Timestamps
		</button>
	</div> -->
</div>
