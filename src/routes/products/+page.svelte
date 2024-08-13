<script lang="ts">
import { onMount } from "svelte";
import { getAllProducts } from "$lib/supabase_helpers";
import type { Product } from "$lib/types";

export let data: any;
let productList: Product[] = [];

onMount(async () => {
    let user = await data.supabase.auth.getUser();

    if (user.error) {
        console.log("Not logged in");
    } else {
        console.log("Logged in");
        productList = await getAllProducts();
    }
});
</script>

<h1>Products Page</h1>

{#if productList.length === 0}
		<h1>Not logged in</h1>
	{:else}
	<table class="table table-hover">
		<thead>
			<tr>
				<th>id</th>
				<th>name</th>
				<th>quantity</th>
				<th>price</th>
			</tr>
		</thead>
		<tbody>
			{#each productList as product}
				<tr>
					<td>{product.id}</td>
					<td>{product.name}</td>
					<td>{product.quantity}</td>
					<td>${product.price}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}