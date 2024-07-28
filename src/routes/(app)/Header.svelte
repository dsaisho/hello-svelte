<script>
	import { page } from '$app/stores';
	export let isSignedIn = false;
</script>

<header>
	<nav>
		<ul>
			<li>
				<a href="/">Home</a>
			</li>

			<li>
				<a href="/facts">Facts Stuff</a>
			</li>

			{#if isSignedIn}
				<li>
					<a href="/secret">Secret Page</a>
				</li>
			{/if}
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		height: 100px;
		background-color: darkslategrey;
	}
	li {
		list-style-type: none;
		display: inline-block;
		padding: 10px;
		background-color: rgba(40, 21, 4, 0.5);
		margin: 0 3px;
		cursor: pointer;
		& a {
			text-decoration: none;
			font-weight: bold;
			color: rgb(166, 161, 161);
		}
	}
</style>
