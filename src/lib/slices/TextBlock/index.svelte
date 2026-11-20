<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.TextBlockSlice>;

	const { slice }: Props = $props();
</script>

<section class="text-block" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<PrismicRichText field={slice.primary.text} />
</section>

<style>
	.text-block {
		max-width: 65ch;
		line-height: 1.7;
	}

	.text-block :global(h2),
	.text-block :global(h3) {
		line-height: 1.2;
	}
</style>
