<script lang="ts">
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import favicon from '#lib/assets/favicon.svg';
	import Header from '#lib/components/Header.svelte';
	import '#lib/styles/tokens.css';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
{@render children()}
<PrismicPreview repositoryName={data.repositoryName} />
