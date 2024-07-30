<script>
	import { onMount } from 'svelte';
	import editjsHTML from 'editorjs-html';
	//import EditorJS from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import List from '@editorjs/list';

	let editor;
	const edjsParser = editjsHTML();
	let html = '';
	const changed = () => {
		editor
			.save()
			.then((outputData) => {
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

<div>
	{@html html}
</div>
<div id="editorjs"></div>
