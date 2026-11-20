<script>
	import { SliceSimulator, SliceZone } from '@prismicio/svelte';
	import { components } from '#lib/slices/index.ts';
</script>

<SliceSimulator>
	{#snippet children({ slices })}
		<SliceZone {slices} {components} />
	{/snippet}
</SliceSimulator>