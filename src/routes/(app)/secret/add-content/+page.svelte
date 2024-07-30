<script>
	import { onMount } from 'svelte';
	import editjsHTML from 'editorjs-html';
	//import EditorJS from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import List from '@editorjs/list';

	let editor;
	let html = '';
  let editorOutput = {};
  
	const edjsParser = editjsHTML();

  $: hasOutput = editorOutput?.blocks?.length > 0


  const saveContent = async ()=>{
    const outputData = await editor.save();
    console.log('outputData ', outputData);
  }


	const changed = () => {
		editor
			.save()
			.then((outputData) => {
        editorOutput = outputData;
				html = edjsParser.parse(outputData).join(' ');
				console.log('html ', html);
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
							byFile: 'http://localhost:5173/api/upload-image', // Your backend file uploader endpoint
							byUrl: 'http://localhost:3000/fetchUrl' // Your endpoint that provides uploading by Url
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

<div class="wrapper">
	<div class="preview">
		{@html html}
	</div>
</div>
<h1 class="center">Create your own content</h1>
<div class="editor-wrapper">
	<div id="editorjs"></div>
</div>
<button class="{hasOutput ? '':'disabled'}" on:click={saveContent}>Save Content</button>
<style>
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
  .editor-wrapper{
    & #editorjs{
      max-width:650px;
      border:black solid thin;
      padding: 6px;
    }
  }

  button{
    margin-top: 10px;
    padding: 10px;
    background-color: rgb(0, 0, 0);
    color: white;
    border: none;
    cursor: pointer;
    width:fit-content;
    &.disabled{
      background-color: grey;
      cursor: not-allowed;
    }
  }
</style>
