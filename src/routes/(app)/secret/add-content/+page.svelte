<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import editjsHTML from 'editorjs-html';
	//import EditorJS from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import List from '@editorjs/list';
	import { page } from '$app/stores';

	let editor;
	let html = '';
	let editorOutput = {};
	let descriptionInput = '';
	let showPreview = false;
	let editorjs;

	const edjsParser = editjsHTML();

	$: hasOutput = editorOutput?.blocks?.length > 0;
	$: baseUrl = `${$page.url.protocol}//${$page.url.host}`;

	function createDescFromBody(text) {
		if (typeof text !== 'string') {
			return '';
		}
		// Flatten the text by replacing newlines with spaces
		const flattenedText = text.replace(/\n/g, ' ').replace('Text Heading List Image', '');
		return flattenedText.slice(0, 100);
	}

	const saveContent = async () => {
		const outputData = await editor.save();
		const jsonString = JSON.stringify(outputData);
		const description = descriptionInput
			? descriptionInput
			: createDescFromBody(editorjs.innerText);
		// Escape single quotes in the JSON string
		const escapedJsonString = jsonString.replace(/'/g, "''");
		console.log('this is description:', description);

		const response = await fetch('/api/handle-content', {
			method: 'POST',
			body: JSON.stringify({ userContent: escapedJsonString, description }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		goto('/secret/view-content');
	};

	const changed = () => {
		editor
			.save()
			.then((outputData) => {
				editorOutput = outputData;
				html = edjsParser.parse(outputData).join(' ');
			})
			.catch((error) => {
				console.log('Saving failed: ', error);
			});
	};

	onMount(async () => {
		let Image = await import('@editorjs/image');
		let EditorJS = await import('@editorjs/editorjs');
		editor = new EditorJS.default({
			placeholder: 'Start typing your content here...',
			tools: {
				header: {
					class: Header,
					inlineToolbar: ['link']
				},
				list: {
					class: List,
					inlineToolbar: true
				},
				//	image: SimpleImage,
				image: {
					class: Image.default,
					config: {
						endpoints: {
							byFile: '/api/upload-image', // Your backend file uploader endpoint
							byUrl: '/api/upload-image?url=1' // Your endpoint that provides uploading by Url
						}
					}
				}
			},
			onChange: (api, event) => {
				console.log("Now I know that Editor's content changed!", event);
				changed();
			}
		});
	});
</script>

<h1 class="center">Create your own content</h1>
Short description:
<input bind:value={descriptionInput} placeholder="enter a description" maxlength="255" />
<div class="editor-wrapper">
	<div id="editorjs" bind:this={editorjs}></div>
</div>
<button class={hasOutput ? '' : 'disabled'} on:click={saveContent}>Save Content</button>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if hasOutput}
	<div
		class="preview"
		on:click={() => {
			showPreview = !showPreview;
		}}
	>
		{#if showPreview}
			<h2>Hide Preview</h2>
		{:else}
			<h2>Show Preview</h2>
		{/if}
	</div>
	{#if showPreview}
		<div class="wrapper">
			<div class="preview">
				{@html html}
			</div>
		</div>
	{/if}
{/if}

<style>
	input {
		max-width: 650px;
		margin-bottom: 10px;
		padding: 4px;
	}
	.wrapper {
		background-color: rgb(212, 212, 212);
		max-width: 650px;
		padding: 10px;
		margin: 0;
		display: flex;
		& img {
			max-width: 50%;
		}
	}
	.editor-wrapper {
		& #editorjs {
			max-width: 650px;
			border: black solid thin;
			padding: 6px;
		}
	}

	button {
		margin-top: 10px;
		padding: 10px;
		background-color: rgb(0, 0, 0);
		color: white;
		border: none;
		cursor: pointer;
		width: fit-content;
		&.disabled {
			background-color: grey;
			cursor: not-allowed;
		}
	}
</style>
