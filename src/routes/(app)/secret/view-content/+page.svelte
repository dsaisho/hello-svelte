<script>
	import { onMount } from 'svelte';
	import DisplayHTML from '$lib/modules/html/display-html.svelte';
	import { goto } from '$app/navigation';
	let userContent = [];

	onMount(async () => {
		userContent = await fetch('/api/handle-content').then(
			async (response) => await response.json()
		);
	});

	const itemClicked = (id) => {
		const updatedContent = userContent.map((content) => {
			if (content.id === id) {
				content.showContent = content.hasOwnProperty('showContent') ? !content.showContent : true;
			}
			return content;
		});

		userContent = updatedContent;
	};
	const viewClicked = (id)=>{
		goto(`/single?contentid=${id}`);
	}
	const copyClicked = (id)=>{
		const url = window.location.origin + `/single?contentid=${id}`;
		navigator.clipboard.writeText(url)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
	}
</script>

<h1 class="center">Your content</h1>
{#each userContent as { content, id, description, showContent } (id)}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="list-item {showContent ? 'selected' : ''}" on:click={() => itemClicked(id)}>
		<div class="desc">{description}</div>
		<div class="btn_container">
			<div class="view"on:click|stopPropagation={() => viewClicked(id)}>view</div>
			<div class="copy" on:click|stopPropagation={() => copyClicked(id)}>copy</div>
		</div>
	</div>
	{#if showContent}
		<DisplayHTML {content} />
	{/if}
{/each}

<style>
	.list-item {
		cursor: pointer;
		padding: 5px 10px;
		margin: 2px 10px;
		display: flex;
		justify-content: space-between;
		border: 1px solid black;
		max-width: 650px;
		&.selected {
			background-color: rgb(212, 212, 212);
			margin-bottom: 0px;
		}
		&:hover {
			background-color: rgb(212, 212, 212);
		}
		& .btn_container {
			display: flex;
			gap:10px;
		}
	}
</style>
