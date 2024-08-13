<script lang="ts">
  import supabase from "$lib/supabase";
  import { onMount } from "svelte";
  import type { Product } from "$lib/types";
  import { getAllProducts, loginUser } from "$lib/supabase_helpers";

  let email: string = "";
  let password: string = "";

  let productList: Product[] = [];
  let loginStatus: boolean = false;
  let username: string = "";

  onMount(async () => {
	let userStatus = await supabase.auth.getUser()
	console.log(userStatus);
	
	if (userStatus.error) {
		loginStatus = false;
	} else {
		username = userStatus.data.user.email!;
		loginStatus = true;
	}

	productList = await getAllProducts();
  });

  async function handleLoginButton() {
    let res = await loginUser(email, password);

	if (!res) {
		alert("Incorrect login credentials");
	} else {
		loginStatus = true;
		username = res.user.email!;
		productList = await getAllProducts();
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

	productList = [];
  }
</script>

<div class="container justify-center items-center w-screen" style="width:100%">
  <h1 class="text-2xl">Login {loginStatus} {username}</h1>
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
    <button type="button" class="btn variant-filled" on:click={signOut}
      >signOut</button
    >
  </div>
  <br />
</div>
