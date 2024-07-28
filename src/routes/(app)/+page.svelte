<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { SignIn } from '@auth/sveltekit/components';
	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<div>
	<p>this is data from .env file loaded in .layout.server.js and received as 'data'</p>
	secret:
	{data.secret}
	<br />
	session:
	<pre>{JSON.stringify(data?.session?.user,null,1) || 'no session'}</pre>
</div>
<div>
	{#if data?.session?.user}
		<button on:click={signOut}>sign out</button>
	{:else}
		<button on:click={() => signIn('google')}>sign in - client</button>
		<SignIn provider='google'>
			<span slot="submitButton">sign in - server</span>
		</SignIn>
	{/if}
</div>


<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
