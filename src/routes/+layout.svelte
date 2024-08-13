<script lang="ts">
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { AppBar, LightSwitch, storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import supabase from '$lib/supabase';
	import { loginUser } from '$lib/supabase_helpers';
	import { onMount } from 'svelte';

	let loginStatus: boolean = false;
	let username: string = "";

	let email: string = "";
	let password: string = "";

	onMount(async () => {
		let userStatus = await supabase.auth.getUser()
		console.log(userStatus);
		
		if (userStatus.error) {
			loginStatus = false;
		} else {
			username = userStatus.data.user.email!;
			loginStatus = true;
		}
  	});

	async function handleLoginButton() {
		let res = await loginUser(email, password);

		if (!res) {
			alert("Incorrect login credentials");
		} else {
			loginStatus = true;
			username = res.user.email!;
		}

		console.log(res);
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		loginStatus = false;
		username = "";

		if (error) {
			console.log(error);
		}
	}
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<span class="mr-2"><a href='/'>Home</a></span>
		<span><a href='/products'>Products</a></span>
	</svelte:fragment>
	<LightSwitch />
	<svelte:fragment slot="trail">
		<div class="container justify-center items-center w-screen" style="width:100%">
			{#if loginStatus}
			<h1 class="text-2xl">Login {loginStatus} {username}</h1>
			<button type="button" class="btn variant-filled" on:click={signOut}
			>signOut</button
		  >
			{:else}
			<input type="text" class="border-2 border-gray-300 p-2" bind:value={email} />
			<input
			  type="text"
			  class="border-2 border-gray-300 p-2"
			  bind:value={password}
			/>
			<br />
			<div>
			  <button
				type="button"
				class="btn variant-filled"
				on:click={handleLoginButton}>login</button
			  >
			</div>
			{/if}
		</div>
	</svelte:fragment>
</AppBar>



<slot />
