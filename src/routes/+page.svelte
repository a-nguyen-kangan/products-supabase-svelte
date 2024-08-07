<script lang="ts">
  import supabase from "$lib/supabase";
  import { onMount } from "svelte";
  import type { Product } from "$lib/types";

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
  });

  async function getProducts() {
    const { data, error } = await supabase
      .from("Products_duplicate")
      .select("*");

    if (error) {
      console.log(error);
      return error;
    } else {
	  productList = data;
      return data;
    }
  }

  async function logInUser() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "person@people.com",
      password: "abcd1234",
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
	  loginStatus = false;
	  username = "";
      return error;
    } else {
	  loginStatus = true;
	  username = data.user.email!;
      return data;
    }
  }

  async function handleLoginButton() {
    let res = await loginUser();

    console.log(res);
  }

  async function handleGetProductsButton() {
    let res = await getProducts();

    console.log(res);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
	loginStatus = false;
	username = "";
	
	if (error) {
	  console.log(error);
	  return error;
	} else {
	  return "signed out";
	}
  }
</script>

<div class="container justify-center items-center">
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
  <div>
    <button
      type="button"
      class="btn variant-filled"
      on:click={handleGetProductsButton}>GetProducts</button
    >
  </div>
  <div id="products">
	<ul>
	{#each productList as product}
		<li>{product.id} {product.name} {product.quantity} ${product.price}</li>
	{/each}
	</ul>
	</div>
</div>
