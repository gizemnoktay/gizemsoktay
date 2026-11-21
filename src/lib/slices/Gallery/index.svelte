<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import type { SliceComponentProps } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.GallerySlice>;

	const { slice }: Props = $props();

	const columns = $derived(Number(slice?.primary?.columns ?? 3));
</script>

<figure
	class="gallery-slice"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	style="--cols: {columns}"
>
	<div class="gallery-slice__grid">
		{#each slice?.primary?.images ?? [] as item (item.image?.id ?? item.image?.url)}
			<figure class="gallery-slice__item">
				<PrismicImage field={item.image} loading="lazy" class="gallery-slice__img" />
				{#if item?.caption}
					<figcaption class="gallery-slice__caption">{item.caption}</figcaption>
				{/if}
			</figure>
		{/each}
	</div>
</figure>

<style>
	.gallery-slice {
		margin: var(--space-8) 0;
		max-width: var(--max-width-wide);
		margin-inline: auto;
	}

	.gallery-slice__grid {
		display: grid;
		grid-template-columns: repeat(var(--cols, 3), 1fr);
		gap: var(--space-4);
	}

	:global(.gallery-slice__img) {
		width: 100%;
		height: auto;
		border-radius: var(--radius-md);
		display: block;
	}

	.gallery-slice__caption {
		margin-top: var(--space-2);
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}

	@media (max-width: 768px) {
		.gallery-slice__grid {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
