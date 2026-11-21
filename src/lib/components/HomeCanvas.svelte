<script lang="ts">
	interface Shape {
		id: number;
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		color: string;
		kind: 'circle' | 'square';
		dragging: boolean;
	}

	const COLORS = [
		'var(--color-accent)',
		'var(--color-fg-muted)',
		'var(--color-fg-subtle)',
		'var(--color-border-strong)',
		'var(--color-accent-hover)'
	];

	let container: HTMLDivElement;
	let shapes = $state<Shape[]>([]);
	let raf = 0;
	let draggingId: number | null = null;
	let offset = { x: 0, y: 0 };

	function scatter() {
		const w = container?.clientWidth ?? window.innerWidth;
		const h = container?.clientHeight ?? window.innerHeight;
		const n = 16;
		shapes = Array.from({ length: n }, (_, i) => {
			const size = 40 + Math.random() * 50;
			const r = size / 2;
			return {
				id: i,
				x: r + Math.random() * (w - size),
				y: r + Math.random() * (h - size),
				vx: (Math.random() - 0.5) * 1.2,
				vy: (Math.random() - 0.5) * 1.2,
				size,
				color: COLORS[i % COLORS.length],
				kind: i % 2 === 0 ? 'circle' : 'square',
				dragging: false
			};
		});
	}

	function loop() {
		const w = container?.clientWidth ?? window.innerWidth;
		const h = container?.clientHeight ?? window.innerHeight;

		for (const s of shapes) {
			if (s.dragging) continue;
			s.x += s.vx;
			s.y += s.vy;
			const r = s.size / 2;
			if (s.x - r < 0) {
				s.x = r;
				s.vx = -s.vx;
			}
			if (s.x + r > w) {
				s.x = w - r;
				s.vx = -s.vx;
			}
			if (s.y - r < 0) {
				s.y = r;
				s.vy = -s.vy;
			}
			if (s.y + r > h) {
				s.y = h - r;
				s.vy = -s.vy;
			}
		}

		for (let i = 0; i < shapes.length; i++) {
			for (let j = i + 1; j < shapes.length; j++) {
				const a = shapes[i];
				const b = shapes[j];
				const dx = b.x - a.x;
				const dy = b.y - a.y;
				const dist = Math.hypot(dx, dy);
				const minDist = a.size / 2 + b.size / 2;
				if (dist > 0 && dist < minDist) {
					const overlap = minDist - dist;
					const nx = dx / dist;
					const ny = dy / dist;
					if (!a.dragging) {
						a.x -= (nx * overlap) / 2;
						a.y -= (ny * overlap) / 2;
					}
					if (!b.dragging) {
						b.x += (nx * overlap) / 2;
						b.y += (ny * overlap) / 2;
					}
					if (!a.dragging && !b.dragging) {
						const dvx = a.vx - b.vx;
						const dvy = a.vy - b.vy;
						const dot = dvx * nx + dvy * ny;
						if (dot > 0) {
							a.vx -= dot * nx;
							a.vy -= dot * ny;
							b.vx += dot * nx;
							b.vy += dot * ny;
						}
					}
				}
			}
		}

		shapes = shapes.map((s) => ({ ...s }));
		raf = requestAnimationFrame(loop);
	}

	function onPointerDown(e: PointerEvent, s: Shape) {
		draggingId = s.id;
		s.dragging = true;
		const rect = container.getBoundingClientRect();
		offset.x = e.clientX - rect.left - s.x;
		offset.y = e.clientY - rect.top - s.y;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (draggingId === null) return;
		const s = shapes.find((sh) => sh.id === draggingId);
		if (!s) return;
		const rect = container.getBoundingClientRect();
		const r = s.size / 2;
		s.x = Math.max(r, Math.min(rect.width - r, e.clientX - rect.left - offset.x));
		s.y = Math.max(r, Math.min(rect.height - r, e.clientY - rect.top - offset.y));
		shapes = shapes.map((sh) => (sh.id === s.id ? { ...s } : sh));
	}

	function onPointerUp() {
		if (draggingId === null) return;
		const s = shapes.find((sh) => sh.id === draggingId);
		if (s) s.dragging = false;
		draggingId = null;
		shapes = shapes.map((sh) => ({ ...sh }));
	}

	$effect(() => {
		scatter();
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	});
</script>

<div
	class="canvas"
	role="application"
	aria-label="Draggable shapes playground"
	bind:this={container}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onpointercancel={onPointerUp}
>
	{#each shapes as s (s.id)}
		<div
			class="shape shape--{s.kind}"
			role="button"
			tabindex="-1"
			aria-label="Draggable shape"
			style="left: {s.x - s.size / 2}px; top: {s.y -
				s.size / 2}px; width: {s.size}px; height: {s.size}px; background: {s.color};"
			onpointerdown={(e) => onPointerDown(e, s)}
		></div>
	{/each}

	<button class="reset" type="button" onclick={scatter}>Reset</button>
</div>

<style>
	.canvas {
		position: fixed;
		inset: 0;
		overflow: hidden;
		background: var(--color-bg);
		cursor: grab;
		z-index: 0;
	}

	.shape {
		position: absolute;
		border-radius: var(--radius-full);
		cursor: grab;
		touch-action: none;
		user-select: none;
		will-change: left, top;
		opacity: 0.85;
	}

	.shape--square {
		border-radius: var(--radius-md);
	}

	.shape:active {
		cursor: grabbing;
		opacity: 1;
	}

	.reset {
		position: fixed;
		bottom: var(--space-4);
		right: var(--space-4);
		z-index: 10;
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-bg-elevated);
		color: var(--color-fg);
		cursor: pointer;
	}
</style>
