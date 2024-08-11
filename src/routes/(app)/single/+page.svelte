<script>
	import DisplayHTML from '$lib/modules/html/display-html.svelte';
    export let data;
    $: content = data.content.content;
</script>
<h1>{data.content.description}</h1>
<DisplayHTML {content} />