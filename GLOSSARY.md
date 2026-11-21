# Gizem's Personal Website

A portfolio site for a designer, built with SvelteKit and Prismic. Content is authored in Prismic and rendered as a static-first site on Netlify.

## Language

**Project**:
A portfolio entry (research or design project) authored as a Prismic `project` page type, shown at `/projects/:uid`. Definition still under discussion (research case study vs. design project).
_Avoid_: work, case study, portfolio item

**Publication**:
A published research output, listed on the `/publications` page (a Prismic `page` document).
_Avoid_: paper, article, output

**News**:
A short update or article authored as a Prismic `news` page type, shown at `/news/:uid`.
_Avoid_: blog post, article, post

**Page**:
A static content page (e.g. About, Contact) authored as a Prismic `page` page type, shown at `/:uid`.
_Avoid_: content page, info page

**Slice**:
A reusable section of a page, modeled in Prismic and rendered by a Svelte component.
_Avoid_: block, section, component

**Text Block**:
The shared slice containing a rich text field named `text`, used across project, news and page types.

**Preview**:
A draft-content session served from `/preview/*` and `/api/preview`, letting editors review unpublished changes.
_Avoid_: draft view

**Deploy preview**:
A Netlify preview deployment created automatically for each pull request.
_Avoid_: staging, preview environment
