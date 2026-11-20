# Standardize on npm and Node 24

The repo uses npm (single lockfile; `pnpm-lock.yaml` removed) and pins Node 24 LTS via `.nvmrc` and `package.json` engines. CI uses `node-version: 24` with npm caching.
