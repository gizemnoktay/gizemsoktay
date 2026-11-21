<script lang="ts">
	// Minimal global header. Nav links only to sections that exist.
</script>

<header class="site-header">
	<a class="site-header__name" href="/">Gizem</a>
	<nav class="site-header__nav">
		<a href="/projects">Projects</a>
		<a href="/news">News</a>
	</nav>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-4) var(--space-6);
		background: color-mix(in srgb, var(--color-bg) 85%, transparent);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--color-border);
	}

	.site-header__name {
		font-weight: 600;
		letter-spacing: var(--tracking-tight);
		color: var(--color-fg);
		text-decoration: none;
		font-size: var(--text-lg);
	}

	.site-header__nav {
		display: flex;
		gap: var(--space-6);
	}

	.site-header__nav a {
		color: var(--color-fg-muted);
		text-decoration: none;
		font-size: var(--text-sm);
	}

	.site-header__nav a:hover {
		color: var(--color-fg);
	}
</style>
