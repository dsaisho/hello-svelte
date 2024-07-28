<script>
	export let data;
	$: console.log(data.session);
</script>

<h1>Welcome {data.session.user.email}</h1>

<img src={data.session.user.image} width="200" />
