<script lang="ts">
	import TrackItem from './TrackItem.svelte';
	import AudioPlayer from '$lib/components/AudioPlayer.svelte';
	import { filterTracks } from '$lib/utils';
	import { selectedTracks, trackFilter } from '$lib/stores';
	import type { TrackWithTempo } from '$lib/types';
	import Heading from './atoms/Heading.svelte';
	import Icon from '@iconify/svelte';
	import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
	import Button from './atoms/Button.svelte';

	export let tracks: TrackWithTempo[];
	export let showAlbum = true;
	export let showHidden = true;
	export let isDrawer = false;

	let src: string | null;
	let playTrack: () => void;
	let pauseTrack: () => void;

	$: [shownTracks, hiddenTracks] = filterTracks(tracks, $trackFilter);

	function addAll() {
		shownTracks.forEach((track) => {
			if (!$selectedTracks.some((trackInList) => trackInList.id === track.id)) {
				$selectedTracks = [...$selectedTracks, track];
			}
		});
	}

	function handlePlayTrack(newSrc: string | null) {
		src = newSrc;
		playTrack();
	}

	function handlePauseTrack() {
		pauseTrack();
	}
</script>

<AudioPlayer bind:playTrack bind:pauseTrack {src} />
{#if !isDrawer}
	<div class="py-3">
		<Button icon="mdi:plus" on:click={addAll}>Add all shown</Button>
	</div>
{/if}
<ul class="mb-2">
	{#each isDrawer ? $selectedTracks : shownTracks as track, i}
		<li>
			<TrackItem {track} {handlePlayTrack} {handlePauseTrack} {showAlbum} />
		</li>
	{/each}
</ul>
{#if showHidden && !isDrawer}
	<Disclosure let:open>
		<DisclosureButton>
			<div class="flex items-center text-gray-900 mb-2">
				<h3 class=" text-3xl font-bold">
					{hiddenTracks.length} hidden song{hiddenTracks.length === 1 ? '' : 's'}
				</h3>
				<Icon icon={`mdi:chevron-${open ? 'up' : 'down'}`} class="ml-1 h-7 w-7" />
			</div>
		</DisclosureButton>
		<DisclosurePanel>
			<ul>
				{#each hiddenTracks as track, i}
					<li>
						<TrackItem {track} {handlePlayTrack} {handlePauseTrack} {showAlbum} />
					</li>
				{/each}
			</ul>
		</DisclosurePanel>
	</Disclosure>
{/if}
