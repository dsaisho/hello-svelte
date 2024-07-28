<script>
	import { createEventDispatcher } from 'svelte';
	export let fact;
	export let hideSave = false;
	let dispatch = createEventDispatcher();

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="fact {fact.saved ? 'selected' : ''}" >
	<p>{fact.text || ''}</p> <div class='btn-container'>
		{#if !fact.saved}
			<button  on:click={()=>dispatch('delete')} class="delete btn">delete</button>
			{#if !hideSave}
				<button class="save btn"on:click={()=>dispatch('save')}>save</button>
			{/if}
		{/if}
	</div>
</div>

<style>
	.fact{
		display:flex;
		flex-direction:row;
		background-color:grey;	
		margin-bottom:10px;
		&.selected{
			background-color: #4caf50;
		}
		& p{
			width: 80%;
			text-align: left;
			padding: 10px;
			margin: 10px;
			font-size: 16px;
			margin-right:0px;
		}
		& .btn-container{
			width:20%;
			display:flex;
			justify-content:center;
			align-items:center;
			gap:10px;
			& .btn{
				background-color: #4caf50;
				border: none;
				color: white;
				padding: 15px 25px;
				text-align: center;
				text-decoration: none;
				display: inline-block;
				cursor:pointer;
			}
			& .delete{
				background-color: #f44336;
			}
		}
	}
</style>