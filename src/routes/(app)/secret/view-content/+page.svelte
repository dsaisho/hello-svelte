<script>
	import { onMount } from 'svelte';
	import editjsHTML from 'editorjs-html';

	const edjsParser = editjsHTML();

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

	const generateHTML = (content) => {
		const data = JSON.parse(content);
		return edjsParser.parse(data).join(' ');
	};
</script>
<h1 class="center">Your content</h1>
{#each userContent as { content, id, description, showContent } (id)}
	<div class="list-item {showContent ? 'selected' : ''}" on:click={() => itemClicked(id)}>
		<div>{description}</div>
	</div>
	{#if showContent}
		<div class="html-container">
			<div>{@html generateHTML(content)}</div>
		</div>
	{/if}
{/each}

<style>
	.html-container {
		border: 1px solid black;
		padding: 10px;
		margin: 0px 10px;
		margin-top: 0px;
		max-width: 650px;
		& img {
			max-width: 100%;
		}
	}

	.list-item {
		cursor: pointer;
		padding: 5px 10px;
		margin: 2px 10px;

		border: 1px solid black;
		max-width: 650px;
		&.selected {
			background-color: rgb(212, 212, 212);
			margin-bottom: 0px;
		}
		&:hover {
			background-color: rgb(212, 212, 212);
		}
	}
</style>
