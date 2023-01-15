<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';
	import { selectedTracks } from '$lib/stores';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/atoms/Button.svelte';
	import Modal from '$lib/components/atoms/Modal.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';

	let selectedAddPlaylistId = '';
	let removeDuplicates = true;
	let newPlaylistName = '';
	let isOpen: boolean;

	let userEditablePlaylists: SpotifyApi.PlaylistObjectSimplified[] = [];

	async function loadModal() {
		isOpen = true;
		const res = await fetch('/builder/user/playlists');
		// TODO: error handling
		userEditablePlaylists = await res.json();
	}

	async function handleSubmit() {
		const res = await fetch('/builder/user/playlists', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				selectedTrackUris: $selectedTracks.map((track) => track.uri),
				id: selectedAddPlaylistId,
				removeDuplicates,
				newPlaylistName
			})
		});
		const resJson = await res.json();

		goto('spotify:playlist:' + resJson.snapshot_id);
		selectedAddPlaylistId = '';
		removeDuplicates = true;
		newPlaylistName = '';

		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<Heading slot="title" level="h2">Export Playlist</Heading>
	<p slot="description">Export your songs to a playlist</p>
	<div slot="content">
		<form on:submit|preventDefault={handleSubmit}>
			<select class="p-2 mt-4" name="selectedId" bind:value={selectedAddPlaylistId}>
				<option value="" disabled selected>Select a playlist</option>
				<option value="new">New playlist...</option>
				{#each userEditablePlaylists as playlist}
					<option value={playlist.id}>{playlist.name}</option>
				{/each}
			</select>
			{#if selectedAddPlaylistId === 'new'}
				<input
					name="newPlaylistName"
					bind:value={newPlaylistName}
					placeholder="Your playlist name"
				/>
			{/if}
			<label class="text-sm">
				Remove duplicates
				<input type="checkbox" bind:value={removeDuplicates} />
			</label>

			<Button type="submit" disabled={!selectedAddPlaylistId}>Export</Button>
			<Button type="button" on:click={() => (isOpen = false)} variant="inverted">Cancel</Button>
		</form>
	</div>
</Modal>

<Button on:click={loadModal} icon="mdi:open-in-new">Export</Button>
