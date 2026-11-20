# Hybrid static-first rendering on Netlify

Public pages are prerendered (`prerender = "auto"` in the root layout) so visitors get static HTML, while only the `/preview/*` routes and `/api/preview` endpoint run as Netlify serverless functions. This keeps full-website Prismic previews working, which a pure `adapter-static` build cannot support.
