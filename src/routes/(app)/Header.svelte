<script>
	import { page } from '$app/stores';

</script>

<header>


	<nav>

		<ul>
			<li>
				<a href="/">Home</a>
		
			</li>

			<li>
		
				<a href="/facts">Word Circle</a>
			</li>

		</ul>

	</nav>

</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		height:100px;
		background-color:darkslategrey;
	}
	li{
		list-style-type:none;
		display:inline-block;
		padding:10px;
		background-color:rgba(40, 21, 4,.5);
		margin:0 3px;
		cursor:pointer;
		& a{
			text-decoration:none;
			font-weight:bold;
			color:rgb(166, 161, 161);
		}
	}


</style>
