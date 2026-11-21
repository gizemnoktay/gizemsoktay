<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import { asDate, asText, isFilled } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<section class="projects">
	<header class="projects__header">
		<h1>Projects</h1>
	</header>

	<ul class="projects__grid">
		{#each data.projects as project (project.id)}
			<li class="projects__item">
				<PrismicLink document={project} class="projects__card">
					{#if isFilled.image(project.data.hero)}
						<div class="projects__thumb">
							<PrismicImage field={project.data.hero} loading="lazy" />
						</div>
					{/if}
					<div class="projects__body">
						<h2 class="projects__title">{asText(project.data.title) || project.uid}</h2>
						{#if project.data.summary}
							<p class="projects__summary">{project.data.summary}</p>
						{/if}
						{#if project.data.date}
							<time class="projects__date" datetime={project.data.date}>
								{asDate(project.data.date)?.toLocaleDateString('en', {
									year: 'numeric',
									month: 'short'
								})}
							</time>
						{/if}
					</div>
				</PrismicLink>
			</li>
		{/each}
	</ul>
</section>

<style>
	.projects {
		max-width: var(--max-width-wide);
		margin: 0 auto;
		padding: var(--space-16) var(--space-6);
	}

	.projects__header h1 {
		font-size: var(--text-5xl);
		line-height: var(--leading-tight);
		letter-spacing: var(--tracking-tight);
		margin: 0 0 var(--space-12);
	}

	.projects__grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-8);
	}

	@media (max-width: 900px) {
		.projects__grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.projects__grid {
			grid-template-columns: 1fr;
		}
	}

	:global(.projects__card) {
		color: var(--color-fg);
		text-decoration: none;
	}

	.projects__thumb :global(img) {
		width: 100%;
		height: auto;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: var(--radius-lg);
		display: block;
		margin-bottom: var(--space-3);
	}

	.projects__title {
		font-size: var(--text-xl);
		line-height: var(--leading-snug);
		letter-spacing: var(--tracking-tight);
		margin: 0 0 var(--space-2);
	}

	.projects__summary {
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
		margin: 0 0 var(--space-2);
	}

	.projects__date {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-fg-subtle);
	}
</style>
