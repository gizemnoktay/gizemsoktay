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

<article class="project">
	{#if isFilled.image(data.page.data.hero)}
		<div class="project__hero">
			<PrismicImage field={data.page.data.hero} loading="eager" />
		</div>
	{/if}

	<header class="project__header">
		<PrismicRichText field={data.page.data.title} />

		{#if data.page.data.summary}
			<p class="project__summary">{data.page.data.summary}</p>
		{/if}

		<dl class="project__meta">
			{#if data.page.data.date}
				<div class="project__meta-item">
					<dt>Date</dt>
					<dd>
						{asDate(data.page.data.date)?.toLocaleDateString('en', {
							year: 'numeric',
							month: 'long'
						})}
					</dd>
				</div>
			{/if}
			{#each data.page.data.credits ?? [] as credit ((credit.name ?? '') + (credit.role ?? ''))}
				<div class="project__meta-item">
					<dt>{credit.role || 'Credit'}</dt>
					<dd>{credit.name}</dd>
				</div>
			{/each}
		</dl>
	</header>

	<div class="project__body">
		<SliceZone slices={data.page.data.slices} {components} />
	</div>

	<footer class="project__footer">
		<a class="project__back" href="/projects">← All projects</a>
	</footer>
</article>

<style>
	.project {
		color: var(--color-fg);
	}

	.project__hero {
		max-width: var(--max-width-wide);
		margin: 0 auto var(--space-12);
	}

	.project__hero :global(img) {
		width: 100%;
		height: auto;
		display: block;
		border-radius: var(--radius-lg);
	}

	.project__header {
		max-width: var(--max-width-text);
		margin: 0 auto var(--space-12);
	}

	.project__header :global(h1) {
		font-size: var(--text-5xl);
		line-height: var(--leading-tight);
		letter-spacing: var(--tracking-tight);
		margin: 0 0 var(--space-4);
	}

	.project__summary {
		font-size: var(--text-xl);
		line-height: var(--leading-snug);
		color: var(--color-fg-muted);
		margin: 0 0 var(--space-6);
	}

	.project__meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-6);
		margin: 0;
		padding-top: var(--space-6);
		border-top: 1px solid var(--color-border);
	}

	.project__meta-item {
		margin: 0;
	}

	.project__meta-item dt {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		color: var(--color-fg-subtle);
		margin-bottom: var(--space-1);
	}

	.project__meta-item dd {
		margin: 0;
		font-size: var(--text-base);
	}

	.project__body {
		max-width: var(--max-width-content);
		margin: 0 auto;
	}

	.project__footer {
		max-width: var(--max-width-text);
		margin: var(--space-16) auto 0;
		padding-top: var(--space-6);
		border-top: 1px solid var(--color-border);
	}

	.project__back {
		color: var(--color-link);
		text-decoration: none;
	}

	.project__back:hover {
		text-decoration: underline;
	}
</style>
