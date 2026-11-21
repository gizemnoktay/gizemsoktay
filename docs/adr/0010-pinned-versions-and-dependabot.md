# Pin dependency versions and use Dependabot

All `package.json` versions are exact (no `^`/`~`) and `.npmrc` sets `save-exact=true`, so installs are reproducible. Dependency updates are proposed weekly by GitHub Dependabot (npm + GitHub Actions ecosystems) as grouped PRs, keeping the lockfile and pins in sync. Renovate was considered but Dependabot is built into GitHub and sufficient for this small site.
