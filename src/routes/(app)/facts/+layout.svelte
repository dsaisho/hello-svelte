<svelte:head>
	<title>Facts</title>
	<meta name="description" content="page1" />
</svelte:head>

<nav>

		<a href="/facts/facts-generator">Facts Generator</a>

		<a href="/facts/saved-facts">Saved Facts</a>

</nav>

<slot />

<style>
	nav {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin: 10px;
	}
	nav a {
		text-decoration: none;
		color: black;
	}
	nav a {
		background-color: #68af4c;
		border: none;
		color: white;
		padding: 15px 25px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		cursor: pointer;
		&:nth-child(2) {
			background-color: #d1500b;
		}
	}
</style>
