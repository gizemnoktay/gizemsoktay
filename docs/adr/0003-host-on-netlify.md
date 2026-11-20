# Host on Netlify

Netlify serves the prerendered files and runs the preview functions, provides branch-deploy previews for PRs, and has a documented Prismic rebuild-hook flow. We keep DNS at the registrar and use `www` as the primary domain (apex redirects to `www`) to avoid the apex A-record performance caveat with third-party DNS.
