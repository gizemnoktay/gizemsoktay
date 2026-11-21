<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import { asDate, asText, isFilled } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>News</title>
</svelte:head>

<section class="news">
	<header class="news__header">
		<h1>News</h1>
	</header>

	<ul class="news__list">
		{#each data.news as item (item.id)}
			<li class="news__item">
				<PrismicLink document={item} class="news__card">
					{#if isFilled.image(item.data.hero)}
						<div class="news__thumb">
							<PrismicImage field={item.data.hero} loading="lazy" />
						</div>
					{/if}
					<div class="news__body">
						{#if item.data.date}
							<time class="news__date" datetime={item.data.date}>
								{asDate(item.data.date)?.toLocaleDateString('en', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</time>
						{/if}
						<h2 class="news__title">{asText(item.data.title) || item.uid}</h2>
						{#if item.data.summary}
							<p class="news__summary">{item.data.summary}</p>
						{/if}
					</div>
				</PrismicLink>
			</li>
		{/each}
	</ul>
</section>

<style>
	.news {
		max-width: var(--max-width-content);
		margin: 0 auto;
		padding: var(--space-16) var(--space-6);
	}

	.news__header h1 {
		font-size: var(--text-5xl);
		line-height: var(--leading-tight);
		letter-spacing: var(--tracking-tight);
		margin: 0 0 var(--space-12);
	}

	.news__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
	}

	:global(.news__card) {
		grid-template-columns: 240px 1fr;
		gap: var(--space-6);
		color: var(--color-fg);
		text-decoration: none;
		align-items: start;
	}

	@media (max-width: 600px) {
		:global(.news__card) {
			grid-template-columns: 1fr;
		}
	}

	.news__thumb :global(img) {
		width: 100%;
		height: auto;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: var(--radius-lg);
		display: block;
	}

	.news__date {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		color: var(--color-fg-subtle);
	}

	.news__title {
		font-size: var(--text-2xl);
		line-height: var(--leading-snug);
		letter-spacing: var(--tracking-tight);
		margin: var(--space-1) 0 var(--space-2);
	}

	.news__summary {
		font-size: var(--text-base);
		color: var(--color-fg-muted);
		margin: 0;
	}
</style>
