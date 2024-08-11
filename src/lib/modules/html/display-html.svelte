<script>
	import editjsHTML from 'editorjs-html';
	const edjsParser = editjsHTML();
	export let content = '';
	$: htmlContent = generateHTML(content);

	const generateHTML = (content) => {
        if (!content) {
            return 'waiting for content';
        }
		const data = JSON.parse(content);

		return edjsParser.parse(data).join(' ');
	};
</script>

<div class="html-container">
	<div>{@html htmlContent}</div>
</div>

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
</style>
