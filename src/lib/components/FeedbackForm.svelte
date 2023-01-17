<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import Modal from '$lib/components/atoms/Modal.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import SelectField from './atoms/SelectField.svelte';
	import InputField from './atoms/InputField.svelte';
	import TextAreaField from './atoms/TextAreaField.svelte';

	let isOpen: boolean = false;

	let form = {
		error: $page.error,
		category: 'feature',
		email: $page.data.session?.user?.email || ''
	};

	function openModal() {
		isOpen = true;
	}

	async function handleSubmit() {
		const res = await fetch('/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...form,
				sourceUrl: $page.route.id || '',
				userAgent: browser ? navigator.userAgent : null
			})
		});
		const resJson = await res.json();
		// TODO: Erro handling
		form = {
			error: $page.error,
			category: 'feature',
			email: $page.data.session?.user?.email || ''
		};
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<Heading slot="title" level="h2">Feedback</Heading>
	<p slot="description">We'd love to hear your feedback!</p>
	<div slot="content">
		<form on:submit|preventDefault={handleSubmit} class="space-y-3">
			<InputField name="email" bind:value={form.email} label="Email (optional)" />
			<SelectField name="category" bind:value={form.category} label="Category">
				<option value="feature">Feature</option>
				<option value="improvement">Improvement</option>
				<option value="bug">Bug</option>
				<option value="other">Other</option>
			</SelectField>
			{#if form.category === 'bug'}
				<TextAreaField
					name="reproduceSteps"
					bind:value={form.reproduceSteps}
					label="Steps to reproduce"
					placeholder="Select two songs, then change the tempo to 150-170."
				/>
				<TextAreaField
					name="expectedResult"
					bind:value={form.expectedResult}
					label="Expected result"
					placeholder="The selected songs should stay selected"
				/>
				<TextAreaField
					name="actualResult"
					bind:value={form.actualResult}
					label="Actual result"
					placeholder="The songs are no longer selected"
				/>
			{:else}
				<TextAreaField
					name="description"
					bind:value={form.description}
					label="Description"
					placeholder="I think it would be cool if..."
				/>
			{/if}
			<div>
				<Button type="submit" icon="mdi:send">Send</Button>
				<Button type="button" on:click={() => (isOpen = false)} variant="inverted">Cancel</Button>
			</div>
		</form>
	</div>
</Modal>
<Button on:click={openModal} variant="primary">
	<span class="tracking-wider text-xs"> FEEDBACK </span>
</Button>
