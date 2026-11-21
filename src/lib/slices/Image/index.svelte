<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import type { SliceComponentProps } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.ImageSlice>;

	const { slice }: Props = $props();

	const size = $derived(slice?.primary?.size ?? 'content');
</script>

<figure
	class="image-slice image-slice--{size}"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<PrismicImage field={slice.primary.image} loading="lazy" class="image-slice__img" />
	{#if slice.primary?.caption}
		<figcaption class="image-slice__caption">{slice.primary.caption}</figcaption>
	{/if}
</figure>

<style>
	.image-slice {
		margin: var(--space-8) 0;
	}

	.image-slice--content {
		max-width: var(--max-width-text);
		margin-inline: auto;
	}

	.image-slice--wide {
		max-width: var(--max-width-content);
		margin-inline: auto;
	}

	.image-slice--full {
		max-width: var(--max-width-wide);
		margin-inline: auto;
	}

	:global(.image-slice__img) {
		width: 100%;
		height: auto;
		border-radius: var(--radius-md);
		display: block;
	}

	.image-slice__caption {
		margin-top: var(--space-2);
		font-size: var(--text-sm);
		color: var(--color-fg-muted);
	}
</style>
