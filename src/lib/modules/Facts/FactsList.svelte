<script>
	import Fact from './Fact.svelte';
	import { onMount } from 'svelte';

	let listData = [];
	onMount(async () => {
		const listDataReq = await fetch('/api/get-facts').then(
			async (response) => await response.json()
		);

		listData = listDataReq;
	});

	const deleteFact = async (id) => {
		await fetch(`/api/delete-fact?id=${id}`, {
			method: 'DELETE'
		});
		listData = listData.filter((fact) => fact.id !== id);
	};
</script>

<h2 class="center">Saved Facts</h2>
<div class="fact-list">
	{#each listData as fact}
		<Fact {fact} hideSave={true} on:delete={() => deleteFact(fact.id)} />
	{/each}
</div>

<style>
</style>
