<script lang="ts">
	import { PrismicLink } from "@prismicio/svelte";
	import { asText } from "@prismicio/client";
	import type { PageProps } from "./$types";

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>News</title>
</svelte:head>

<section class="news">
	<h1>News</h1>
	<ul>
		{#each data.news as item (item.id)}
			<li>
				<PrismicLink document={item}>
					{asText(item.data.title) || item.uid}
				</PrismicLink>
			</li>
		{/each}
	</ul>
</section>
