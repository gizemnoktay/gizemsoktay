# AGENTS.md — Gizem's Personal Website

## Project

SvelteKit 5 + Prismic portfolio (projects + news). Static-first on Netlify.
See `docs/adr/` for architectural decisions and `GLOSSARY.md` for domain terms.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run check` / `npm run typecheck` — Svelte/TS type checking
- `npm run lint` — Prettier check + ESLint
- `npm run format` — Prettier write
- `npm run test` — unit + component tests (Vitest)
- `npx prismic pull` / `npx prismic push` — sync Prismic models (commit first)

## Code standards

- **Runes mode only.** Use `$state`, `$derived`, `$props`, `$effect` (sparingly). No legacy `export let`, `$:`, slots, `on:` directives.
- **TypeScript strict.** Annotate public APIs; prefer generated Prismic types (`Content.*`) over `any`.
- **Prismic access via `#lib/prismicio.ts`.** Fetch in `+page.server.ts` / `entries()`, never in components on the client.
- **Slices:** one component per slice in `src/lib/slices/<Name>/index.svelte`; register in `src/lib/slices/index.ts` (generated — don't hand-edit the export list).
- **Styling:** scoped `<style>`; use CSS custom properties for theme tokens; avoid global styles outside `app.html`.
- **Images:** use Prismic's imgix helpers (`asImageSrc`/`asImageWidthSrcSet`) with responsive `srcset` + `sizes` and `loading="lazy"`.
- **Naming:** components PascalCase; routes lowercase kebab-case; Prismic API IDs snake_case.

## Enforcement

- Prettier + ESLint run via `lint-staged` on commit; full `typecheck` + `test` run in the pre-commit hook.
- CI (`.github/workflows/ci.yml`) runs `check` + `build` on every PR and push to `main`.
- Keep `main` deployable: feature branches + PRs + squash merges.

## Testing

- Unit/component tests with Vitest (see `src/lib/vitest-examples/`).
- Add a test for any non-trivial logic; component tests for interactive slices.

## Content model changes

1. Edit via `npx prismic` CLI (or Type Builder).
2. Commit model files (`customtypes/`, `prismicio-types.d.ts`).
3. Run `npx prismic push` (git-gated).
4. Update routes/types if new page types are added.
