<script lang="ts">
	import { PrismicRichText } from '@prismicio/svelte';

	const typeScale = [
		{ name: '--text-6xl', size: 'var(--text-6xl)', sample: 'Display' },
		{ name: '--text-5xl', size: 'var(--text-5xl)', sample: 'Heading 1' },
		{ name: '--text-4xl', size: 'var(--text-4xl)', sample: 'Heading 2' },
		{ name: '--text-3xl', size: 'var(--text-3xl)', sample: 'Heading 3' },
		{ name: '--text-2xl', size: 'var(--text-2xl)', sample: 'Heading 4' },
		{ name: '--text-xl', size: 'var(--text-xl)', sample: 'Lead paragraph' },
		{ name: '--text-lg', size: 'var(--text-lg)', sample: 'Large body' },
		{
			name: '--text-base',
			size: 'var(--text-base)',
			sample: 'Body text — the quick brown fox jumps over the lazy dog.'
		},
		{ name: '--text-sm', size: 'var(--text-sm)', sample: 'Small / meta text' },
		{ name: '--text-xs', size: 'var(--text-xs)', sample: 'Caption / label' }
	];

	const spaces = [
		{ name: '--space-1', v: 'var(--space-1)' },
		{ name: '--space-2', v: 'var(--space-2)' },
		{ name: '--space-3', v: 'var(--space-3)' },
		{ name: '--space-4', v: 'var(--space-4)' },
		{ name: '--space-6', v: 'var(--space-6)' },
		{ name: '--space-8', v: 'var(--space-8)' },
		{ name: '--space-12', v: 'var(--space-12)' },
		{ name: '--space-16', v: 'var(--space-16)' },
		{ name: '--space-24', v: 'var(--space-24)' },
		{ name: '--space-32', v: 'var(--space-32)' }
	];

	const colors = [
		{ name: '--color-bg', value: 'var(--color-bg)', hex: '#f4efe6' },
		{ name: '--color-bg-elevated', value: 'var(--color-bg-elevated)', hex: '#faf6ee' },
		{ name: '--color-bg-sunken', value: 'var(--color-bg-sunken)', hex: '#ece6da' },
		{ name: '--color-fg', value: 'var(--color-fg)', hex: '#1c1a17' },
		{ name: '--color-fg-muted', value: 'var(--color-fg-muted)', hex: '#5a554d' },
		{ name: '--color-fg-subtle', value: 'var(--color-fg-subtle)', hex: '#8a8378' },
		{ name: '--color-border', value: 'var(--color-border)', hex: '#e3d9c8' },
		{ name: '--color-border-strong', value: 'var(--color-border-strong)', hex: '#cfc3ad' },
		{ name: '--color-accent', value: 'var(--color-accent)', hex: '#b85c38' },
		{ name: '--color-accent-hover', value: 'var(--color-accent-hover)', hex: '#9a4a2c' }
	];
</script>

<svelte:head>
	<title>Design system (dev)</title>
</svelte:head>

<main class="design">
	<header class="design__header">
		<h1>Design system</h1>
		<p class="meta">Dev-only showcase. Warm paper palette · Geist · hybrid grid.</p>
	</header>

	<section class="design__section">
		<h2>Color tokens</h2>
		<div class="swatches">
			{#each colors as c (c.name)}
				<div class="swatch">
					<div class="swatch__chip" style="background: {c.value}"></div>
					<div class="swatch__name">{c.name}</div>
					<div class="swatch__hex">{c.hex}</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="design__section">
		<h2>Typography scale</h2>
		<div class="type-scale">
			{#each typeScale as t (t.name)}
				<div class="type-row">
					<span class="type-row__label">{t.name}</span>
					<span class="type-row__sample" style="font-size: {t.size}">{t.sample}</span>
				</div>
			{/each}
		</div>
		<p class="meta" style="margin-top: var(--space-4)">
			Body uses <code>--leading-normal</code> (1.5), headings <code>--leading-tight</code> (1.1)
			with <code>--tracking-tight</code>.
		</p>
	</section>

	<section class="design__section">
		<h2>Spacing scale</h2>
		<div class="space-scale">
			{#each spaces as s (s.name)}
				<div class="space-row">
					<span class="space-row__label">{s.name}</span>
					<span class="space-row__bar" style="width: {s.v}"></span>
				</div>
			{/each}
		</div>
	</section>

	<section class="design__section">
		<h2>Components</h2>
		<div class="component-grid">
			<button class="btn btn--primary">Primary button</button>
			<button class="btn btn--secondary">Secondary button</button>
			<button class="link" type="button">Text link</button>
		</div>
		<div class="card">
			<h3>Card surface</h3>
			<p class="meta">Elevated background with border.</p>
			<p>Body text inside a card. Max width stays readable.</p>
		</div>
		<div class="prose">
			<h3>Prose container (max-width: var(--max-width-text))</h3>
			<p>
				Long-form body text lives in a narrow column for readability, while images and grids can
				break out to the full content width. This is the hybrid layout (Q7).
			</p>
		</div>
	</section>

	<section class="design__section">
		<h2>Hybrid grid (12 columns)</h2>
		<div class="grid-demo">
			{#each Array(12) as _, i (i)}
				<div class="grid-col">{i + 1}</div>
			{/each}
		</div>
	</section>
</main>

<style>
	.design {
		max-width: var(--max-width-wide);
		margin: 0 auto;
		padding: var(--space-16) var(--space-6);
	}

	.design__header {
		margin-bottom: var(--space-16);
	}

	.design__header h1 {
		font-size: var(--text-5xl);
		line-height: var(--leading-tight);
		letter-spacing: var(--tracking-tight);
		margin: 0 0 var(--space-2);
	}

	.meta {
		color: var(--color-fg-muted);
		font-size: var(--text-sm);
		margin: 0;
	}

	.design__section {
		margin-bottom: var(--space-24);
	}

	.design__section h2 {
		font-size: var(--text-2xl);
		line-height: var(--leading-tight);
		letter-spacing: var(--tracking-tight);
		margin: 0 0 var(--space-6);
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--color-border);
	}

	.swatches {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: var(--space-4);
	}

	.swatch {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.swatch__chip {
		height: 56px;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.swatch__name {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-fg-muted);
	}

	.swatch__hex {
		font-size: var(--text-sm);
	}

	.type-scale {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.type-row {
		display: grid;
		grid-template-columns: 160px 1fr;
		align-items: baseline;
		gap: var(--space-4);
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--color-border);
	}

	.type-row__label {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-fg-muted);
	}

	.type-row__sample {
		line-height: var(--leading-tight);
		letter-spacing: var(--tracking-tight);
	}

	.space-scale {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.space-row {
		display: grid;
		grid-template-columns: 140px 1fr;
		align-items: center;
		gap: var(--space-4);
	}

	.space-row__label {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-fg-muted);
	}

	.space-row__bar {
		height: 8px;
		background: var(--color-accent);
		border-radius: var(--radius-full);
		min-width: 4px;
	}

	.component-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		align-items: center;
		margin-bottom: var(--space-6);
	}

	.btn {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 500;
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.btn--primary {
		background: var(--color-accent);
		color: var(--color-accent-fg);
		border-color: var(--color-accent);
	}

	.btn--primary:hover {
		background: var(--color-accent-hover);
		border-color: var(--color-accent-hover);
	}

	.btn--secondary {
		background: transparent;
		color: var(--color-fg);
	}

	.link {
		color: var(--color-link);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.card {
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		max-width: var(--max-width-text);
	}

	.card h3 {
		font-size: var(--text-lg);
		margin: 0 0 var(--space-2);
	}

	.prose {
		max-width: var(--max-width-text);
		margin-top: var(--space-6);
	}

	.prose h3 {
		font-size: var(--text-xl);
		margin: 0 0 var(--space-2);
	}

	.grid-demo {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: var(--grid-gutter);
	}

	.grid-col {
		background: var(--color-bg-sunken);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		padding: var(--space-3);
		text-align: center;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-fg-muted);
	}

	@media (max-width: 768px) {
		.grid-demo {
			grid-template-columns: repeat(4, 1fr);
		}
		.type-row {
			grid-template-columns: 1fr;
		}
	}
</style>
