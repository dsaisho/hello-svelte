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
			<li>
				<a href="/globe">Globe</a>
			</li>

			{#if isSignedIn}
				<li>
					<a href="/secret">Secret Page</a>
					<!-- make nested list with this as parent-->
					<ul class="child">
						<li>
							<a href="/secret/view-content">view content</a>
						</li>
						<li>
							<a href="/secret/add-content">add content</a>
						</li>
					</ul>
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
	ul {
		display: flex;
	}
	li {
		list-style-type: none;
		display: inline-block;
		& a {
			background-color: rgba(40, 21, 4, 0.5);
			padding: 10px;
			margin: 0 3px;
			cursor: pointer;
			text-decoration: none;
			font-weight: bold;
			color: rgb(166, 161, 161);
		}
	}
	.child {
		display: none;
		margin-top:25px;
		padding:0px;		
		& a{
			background-color: rgba(54, 6, 6, 0.5);
		}
		
	}
	li:hover .child {
		display: block;
	}

</style>
