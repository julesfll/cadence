<script lang="ts">
	import { selectedTracks } from '$lib/stores';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/atoms/Button.svelte';
	import Modal from '$lib/components/atoms/Modal.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import SelectField from '$lib/components/atoms/SelectField.svelte';
	import InputField from '$lib/components/atoms/InputField.svelte';
	import CheckboxField from '$lib/components/atoms/CheckboxField.svelte';
	import Icon from '@iconify/svelte';

	enum State {
		Form,
		Finished
	}

	let form = {
		selectedAddPlaylistId: '',
		removeDuplicates: true,
		newPlaylistName: ''
	};
	let isOpen: boolean;
	let currentState: State = State.Form;
	let receivedPlaylistId: string;

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
				id: form.selectedAddPlaylistId,
				removeDuplicates: form.removeDuplicates,
				newPlaylistName: form.newPlaylistName
			})
		});
		const resJson = await res.json();
		// TODO: error handling
		receivedPlaylistId = resJson.playlistId;
		currentState = State.Finished;

		form = {
			selectedAddPlaylistId: '',
			removeDuplicates: true,
			newPlaylistName: ''
		};
	}

	function handleFinish() {
		isOpen = false;
		currentState = State.Form;
	}
</script>

{#if currentState === State.Form}
	<Modal bind:isOpen>
		<Heading slot="title" level="h2">Export Playlist</Heading>
		<p slot="description">Export your songs to a playlist</p>
		<div slot="content">
			<form on:submit|preventDefault={handleSubmit} class="space-y-3">
				<SelectField name="selectedId" bind:value={form.selectedAddPlaylistId}>
					<option value="" disabled selected>Select a playlist</option>
					<option value="new">New playlist...</option>
					{#each userEditablePlaylists as playlist}
						<option value={playlist.id}>{playlist.name}</option>
					{/each}
				</SelectField>
				{#if form.selectedAddPlaylistId === 'new'}
					<div class="mt-2">
						<InputField
							name="newPlaylistName"
							bind:value={form.newPlaylistName}
							placeholder="Your playlist name"
							required={form.selectedAddPlaylistId === 'new'}
						/>
					</div>
				{/if}
				<CheckboxField
					name="removeDuplicates"
					label="Remove duplicates"
					bind:checked={form.removeDuplicates}
				/>

				<Button type="submit" disabled={!form.selectedAddPlaylistId}>Export</Button>
				<Button type="button" on:click={() => (isOpen = false)} variant="inverted">Cancel</Button>
			</form>
		</div>
	</Modal>
{:else}
	<Modal bind:isOpen>
		<Heading slot="title" level="h2">Success!</Heading>
		<p slot="description">Your songs have been added to the playlist.</p>
		<div slot="content">
			<div class="mt-3 mb-3 flex justify-between flex-wrap">
				<a
					class="text-gray-900 bg-green-500 hover:bg-green-600 focus:ring-green-300 px-3 inline-flex items-center rounded-lg py-2.5 text-center text-sm focus:ring-4 focus:outline-none font-medium"
					href="spotify:playlist:{receivedPlaylistId}"
				>
					<div class="w-5 h-5 mr-2 -ml-1">
						<Icon icon="mdi:spotify" aria-hidden="true" class="w-5 h-5" />
					</div>
					Open in Spotify
				</a>
				<a
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 px-3 inline-flex items-center rounded-lg py-2.5 text-center text-sm focus:ring-4 focus:outline-none font-medium"
					href="/builder/playlists/{receivedPlaylistId}"
				>
					<div class="w-5 h-5 mr-2 -ml-1">
						<Icon icon="mdi:music-note-eighth" aria-hidden="true" class="w-5 h-5" />
					</div>
					View in Cadence
				</a>
			</div>
			<div class="text-center">
				<Button icon="mdi:close" type="button" on:click={handleFinish} variant="inverted"
					>Close</Button
				>
			</div>
		</div>
	</Modal>
{/if}
<Button on:click={loadModal} icon="mdi:open-in-new"><slot /></Button>
