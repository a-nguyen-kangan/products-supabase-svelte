<script lang="ts">
import supabase from '$lib/supabase';
import { onMount } from 'svelte';

let email: string = "";
let password: string = "";

onMount(async () => {
	// let login = await logInUser();
	// console.log(login);

	// let res = await getProducts()
	// console.log(res);

});


async function getProducts() {
	const { data, error } = await supabase
  		.from('Products_duplicate')
  		.select('*');

	if (error) {
		console.log(error);
		return error;
	} else {
		return data;
	}

}

async function logInUser() {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: 'person@people.com',
		password: 'abcd1234',
		});

		if (error) {
		console.log(error);
		return error;
	} else {
		return data;
	}
}

async function loginUser() {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
		});

	if (error) {
		console.log(error);
		return error;
	} else {
		return data;
	}
}

async function handleLoginButton() {
	let res = await loginUser();

	console.log(res)
}

async function handleGetProductsButton() {
	let res = await getProducts();

	console.log(res);
}

async function signOut() {
	const { error } = await supabase.auth.signOut()
}


</script>

<div class="container h-full mx-auto flex justify-center items-center">
<input type="text" class="border-2 border-gray-300 p-2" bind:value={email} />
<input type="text" class="border-2 border-gray-300 p-2" bind:value={password} />
<br>
<div>
	<button on:click={handleLoginButton}>login</button>
	<button on:click={signOut}>signOut</button>
</div>
<br>
<button on:click={handleGetProductsButton}>GetProducts</button>
</div>
