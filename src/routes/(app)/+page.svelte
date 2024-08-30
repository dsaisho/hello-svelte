<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { SignIn } from '@auth/sveltekit/components';
	import ReactComponent from '/src/react/ReactComponent.jsx';
	let reactCounter = 0;
	const handleReactEvent = (e) => {
		console.log('react event', e);
		reactCounter = e;
	};
	const reactProps = {
		prop1: 'this text is a prop that has been passed in from the parent svelte component',
		prop2: 123,
		cb: handleReactEvent
	};
	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#if reactCounter}
<div class='svelt-react'>
	<p>This is markup in the parent svelte component</p>
	<p>A callback was fired from the react component after 5 clicks were made.</p>
	<p>the callback function lives in the svelte parent</p>
	<br/>
	<p>'clickme' has been clicked <b>{reactCounter}</b> times</p>
</div>
	{/if}

<react:ReactComponent {...reactProps} />

<div>
	<p>this is data from .env file loaded in .layout.server.js and received as 'data'</p>
	secret:
	{data.secret}
	<br />
	session:
	<pre>{JSON.stringify(data, null, 1) || 'no session'}</pre>
</div>
<div>
	{#if data?.session?.user}
		<button on:click={signOut}>sign out</button>
	{:else}
		<button on:click={() => signIn('google')}>sign in - client</button>
		<SignIn provider="google">
			<span slot="submitButton">sign in - server</span>
		</SignIn>
	{/if}
</div>

<style>
	.svelt-react{
		width:300px;
		height:300px;
		border:black solid thin;
		padding:10px;
	}
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
