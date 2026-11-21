# Visual design system: tokens, typography, spacing, color

Status: Accepted (v1). Supersedes the "visual design system" item deferred in ADR-0009.

## Context

ADR-0009 deferred the visual design system (along with analytics, a11y targets, perf budgets, error monitoring, font strategy) to follow-up issues. Issue #6 captured the research: five reference portfolio sites (jkane.co, nataliealmosa.ca, nadiacw.com, oxman.com, saraandreasson.com) and the need to settle visual language, page block structure, fonts, spacing, color, and component tooling.

This ADR records the settled decisions. The remaining deferred items (analytics, a11y targets, perf budgets, error monitoring, dark mode) stay tracked separately.

## Decisions

### Visual language

- **North star:** a hybrid. Spacious, grid-friendly layouts with room for playful composition (nadiacw.com), combined with structured editorial case studies (oxman.com). Playful elements from nataliealmosa.ca (mono accents, personality) are explored later.
- **Theme:** light only in v1. Token architecture is dark-ready (see below).
- **Density:** spacious. Large section spacing, generous gutters, wide container with a narrow text column.

### Color

- **Warm paper** palette (v1), defined as semantic tokens in `src/lib/styles/tokens.css`:
  - Background `#f4efe6`, elevated `#faf6ee`, sunken `#ece6da`
  - Ink `#1c1a17`, muted `#5a554d`, subtle `#8a8378`
  - Border `#e3d9c8`, strong `#cfc3ad`
  - Accent (terracotta) `#b85c38`, hover `#9a4a2c`, accent fg `#faf6ee`
- Monochrome + single accent. Accent reserved for links, CTAs, focus, active states.
- Dark variant: override the same `--color-*` tokens under `[data-theme="dark"]` (already scaffolded in tokens.css). No component changes needed.

### Typography

- **Single family v1:** Geist (sans) + Geist Mono (mono, for code/playful moments). Loaded via Google Fonts in `app.html`.
- Type scale: `--text-xs` (12) … `--text-6xl` (64), rem-based.
- Line height: tight `1.1` (headings), normal `1.5` (body), relaxed `1.7` (long text). Headings use `--tracking-tight` (-0.02em).
- A serif/display pairing is deferred.

### Spacing & grid

- 4px base. Scale: `--space-1` (4) … `--space-32` (128).
- **Hybrid layout:** narrow text column (`--max-width-text` 42rem / 65ch) inside a wide container (`--max-width-wide` 80rem). Images and grids can break out to `--max-width-content` (72rem) or full width.
- 12-column grid (`--grid-columns`, `--grid-gutter` = `--space-6`).
- Radius scale `--radius-sm` … `--radius-full`.

### Tokens: location & format

- `src/lib/styles/tokens.css`, imported once in `src/routes/+layout.svelte`. Defines CSS custom properties on `:root` (and `[data-theme="dark"]`).
- Components consume tokens via scoped `<style>`; no Tailwind. Aligns with AGENTS.md.

### Page blocks

**Project page (`/projects/:uid`):**

- Hero image (full-bleed, from `hero` field)
- Title + summary + date + credits metadata
- Body: slices (Text Block, Image, Gallery) in a narrow column with breakout images
- Credits (collaborators/roles) — repeatable group field on `project`
- "Next project" navigation (template-level)

**News page (`/news/:uid`):**

- Title + date + hero + body (Text Block, Image slices) — minimal, blog-post-like.

### Slices (content model)

- Existing: `text_block` (shared).
- New (scaffolded, pending `prismic push` type regen): `image` (single image + caption + size), `gallery` (grid of images + columns).
- Credits stored as a repeatable group field on `project` (simpler than a slice).
- Deferred: quote/pull-quote, section heading/divider, tags/categories, related news, share links.

### Component tooling

- **No Storybook/Histoire in v1.** Use a dev-only kitchen-sink route at `/dev/design` (gated to dev mode, not prerendered) plus Vitest component tests. Revisit if slice library exceeds ~10 components.

### Showcase route

- `/dev/design` renders tokens, type scale, spacing scale, color swatches, and sample components. Returns 404 in production.

## Consequences

- New slices (`image`, `gallery`) and the `credits` group field on `project` require a Prismic push to sync the remote repository and regenerate `prismicio-types.d.ts`. Until then they are scaffolded with loose typing.
- ADR-0009 updated to remove "visual design system" from the deferred list.
- Follow-up issues remain for: analytics, accessibility targets, performance budgets, error monitoring, dark mode, font pairing, quote/section slices.
