<script lang="ts">
	import { PrismicLink } from "@prismicio/svelte";
	import { asText } from "@prismicio/client";
	import type { PageProps } from "./$types";

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<section class="projects">
	<h1>Projects</h1>
	<ul>
		{#each data.projects as project (project.id)}
			<li>
				<PrismicLink document={project}>
					{asText(project.data.title) || project.uid}
				</PrismicLink>
			</li>
		{/each}
	</ul>
</section>
