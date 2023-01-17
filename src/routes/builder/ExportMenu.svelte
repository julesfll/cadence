<script lang="ts">
	import { selectedTracks } from '$lib/stores';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/atoms/Button.svelte';
	import Modal from '$lib/components/atoms/Modal.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import SelectField from '$lib/components/atoms/SelectField.svelte';
	import InputField from '$lib/components/atoms/InputField.svelte';
	import CheckboxField from '$lib/components/atoms/CheckboxField.svelte';

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
		<form on:submit|preventDefault={handleSubmit} class="space-y-3">
			<SelectField name="selectedId" bind:value={selectedAddPlaylistId}>
				<option value="" disabled selected>Select a playlist</option>
				<option value="new">New playlist...</option>
				{#each userEditablePlaylists as playlist}
					<option value={playlist.id}>{playlist.name}</option>
				{/each}
			</SelectField>
			{#if selectedAddPlaylistId === 'new'}
				<div class="mt-2">
					<InputField
						name="newPlaylistName"
						bind:value={newPlaylistName}
						placeholder="Your playlist name"
						required={selectedAddPlaylistId === 'new'}
					/>
				</div>
			{/if}
			<CheckboxField
				name="removeDuplicates"
				label="Remove duplicates"
				bind:checked={removeDuplicates}
			/>

			<Button type="submit" disabled={!selectedAddPlaylistId}>Export</Button>
			<Button type="button" on:click={() => (isOpen = false)} variant="inverted">Cancel</Button>
		</form>
	</div>
</Modal>

<Button on:click={loadModal} icon="mdi:open-in-new"><slot /></Button>
