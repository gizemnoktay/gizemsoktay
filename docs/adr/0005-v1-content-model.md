# v1 content model: project, news, page

Prismic page types: `project` (hero image, summary, date, slices) at `/projects/:uid`, `news` (title, date, hero image, summary, slices) at `/news/:uid`, and `page` (title, slices) at `/:uid`. A shared `Text Block` slice (rich text) is connected to all three. Index pages (`/projects`, `/news`) fetch all items at build time. No pagination in v1.
