# Gizem Oktay — Personal Website

Personal website of **Gizem Oktay**, a more-than-human researcher with a design
background, currently completing a PhD at the Industrial Design department of
TU/e (Eindhoven University of Technology).

- TU/e profile: https://research.tue.nl/p/en/persons/gizem-oktay

## Audience and goals

- **Audience:** researchers and designers.
- **Goals:** showcase research/design work, share news and updates, provide a
  publications index, introduce Gizem's background and approach, and make it easy
  to get in touch.
- **Primary calls to action:** browse projects → contact.

## Stack

- SvelteKit 5 (runes) with TypeScript, static-first on Netlify
- Prismic as the content backend (page types + slices)
- Vitest (unit + component), ESLint, Prettier, Husky pre-commit
- GitHub Actions for CI; Netlify for CD and content rebuilds

## Content model (Prismic)

| Type      | Route              | Purpose                                      |
|-----------|--------------------|----------------------------------------------|
| `project` | `/projects/:uid`   | Research/design case study                    |
| `news`    | `/news/:uid`       | Update or short article                      |
| `page`    | `/:uid`            | Static pages (About, Contact, Publications)  |

Shared slice: **Text Block** (rich text field `text`).

Index routes: `/projects`, `/news`. The `publications` page is a `page`-type
document with uid `publications` (served via the generic `/:uid` route) and
functions as a glossary/index of publications.

## Navigation

Home, Projects, News, Publications, About, Contact.

## Development

```sh
npm install
npm run dev          # dev server
npm run check        # Svelte/TS type checking
npm run typecheck    # alias for check
npm run lint         # Prettier check + ESLint
npm run format       # Prettier write
npm run test         # unit + component tests
npm run build        # production build
npm run preview      # preview production build
```

## Architecture

- `docs/adr/` — architectural decision records
- `GLOSSARY.md` — domain language

## Open questions

- **Definition of "Project"** (research case study vs. design project vs.
  publication) is still being discussed — see the PR for this branch.

## Deployment

Static-first on Netlify. See `.github/workflows/` and `netlify.toml`.
Content changes in Prismic trigger a Netlify rebuild via a webhook.
EOF
echo done