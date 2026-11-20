# Trunk-based git workflow

`main` is the only long-lived branch and is always deployable. Work happens on short-lived feature branches merged via PR with squash merges and Conventional Commits; `main` is protected (PR + green CI, no direct pushes). Model changes must be committed before `prismic push`, so reviewing them as PRs fits this flow.
