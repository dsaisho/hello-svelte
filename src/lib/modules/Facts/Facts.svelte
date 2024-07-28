<script>
    import Fact from './Fact.svelte';

    let loading = false;
    let facts=[];

	const generateClicked = async () => {
        loading=true;
        const factData = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
        .then(response => response.json())  
        .then(data => {
            console.log('data',data);
            return data;
        })
        
        const isNotUsed = !facts.find(obj => obj.id === factData.id);

        if(isNotUsed){
            facts.unshift(factData)
            facts=[...facts];
        }
        loading=false;
    }

	const removeFact = (id)=>{
		console.log('removing',id)
		const updatedFacts = facts.filter((obj) => obj.id !== id);
		facts = [...updatedFacts];
	}

	const saveFact = async(fact)=>{

		const saveReq = await fetch(`/api/insert-fact?fact=${encodeURIComponent(fact.text)}`)
						.then(async response => await response.json())

		console.log('saveReq',saveReq);

		const objectToUpdate = facts.find(obj => obj.id === fact.id);
		if (objectToUpdate) {
			// If the object is found, update its 'selected' property to true
			objectToUpdate.saved = true;
		} 
		facts = [...facts];
	}
</script>


<section>
    <p class='section-title'>Create Random Fact Word Circle</p>
	<button on:click={generateClicked} class="generate btn">Generate</button>
	<p>Fact count {facts.length }</p>
    {#if loading}
        <p>Loading...</p>
    {/if}
    {#each facts as fact (fact.id)}
        <Fact fact={fact} on:delete={()=>removeFact(fact.id)} on:save={()=>saveFact(fact)}   />
    {/each}
</section>

<style>
	section {
		text-align: center;
		& .section-title {
			font-size: 20px;
			font-weight: bold;
		}
	}
	.generate {
		width: fit-content;
		margin: 0 auto;
		background-color: #4caf50;
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		cursor: pointer;
	}
</style>
