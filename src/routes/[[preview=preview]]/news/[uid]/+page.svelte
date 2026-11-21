<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '#lib/slices/index.ts';
	import { asDate, asText, isFilled } from '@prismicio/client';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{asText(data.page.data.title) || data.page.uid}</title>
</svelte:head>

<article class="news">
	{#if isFilled.image(data.page.data.hero)}
		<div class="news__hero">
			<PrismicImage field={data.page.data.hero} loading="eager" />
		</div>
	{/if}

	<header class="news__header">
		<PrismicRichText field={data.page.data.title} />

		<div class="news__meta">
			{#if data.page.data.date}
				<time datetime={data.page.data.date}>
					{asDate(data.page.data.date)?.toLocaleDateString('en', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
			{/if}
			{#if data.page.data.summary}
				<span class="news__summary">{data.page.data.summary}</span>
			{/if}
		</div>
	</header>

	<div class="news__body">
		<SliceZone slices={data.page.data.slices} {components} />
	</div>

	<footer class="news__footer">
		<a class="news__back" href="/news">← All news</a>
	</footer>
</article>

<style>
	.news {
		color: var(--color-fg);
	}

	.news__hero {
		max-width: var(--max-width-content);
		margin: 0 auto var(--space-12);
	}

	.news__hero :global(img) {
		width: 100%;
		height: auto;
		display: block;
		border-radius: var(--radius-lg);
	}

	.news__header {
		max-width: var(--max-width-text);
		margin: 0 auto var(--space-12);
	}

	.news__header :global(h1) {
		font-size: var(--text-4xl);
		line-height: var(--leading-tight);
		letter-spacing: var(--tracking-tight);
		margin: 0 0 var(--space-4);
	}

	.news__meta {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		padding-top: var(--space-4);
		border-top: 1px solid var(--color-border);
	}

	.news__meta time {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		color: var(--color-fg-subtle);
	}

	.news__summary {
		font-size: var(--text-lg);
		color: var(--color-fg-muted);
	}

	.news__body {
		max-width: var(--max-width-content);
		margin: 0 auto;
	}

	.news__footer {
		max-width: var(--max-width-text);
		margin: var(--space-16) auto 0;
		padding-top: var(--space-6);
		border-top: 1px solid var(--color-border);
	}

	.news__back {
		color: var(--color-link);
		text-decoration: none;
	}

	.news__back:hover {
		text-decoration: underline;
	}
</style>
