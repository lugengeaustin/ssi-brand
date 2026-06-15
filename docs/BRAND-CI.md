# Keeping the brand constant in CI

`@ssi/brand` ships a linter, `ssi-brand-lint`, that fails a build when app source
hardcodes a hex color or a non-Roboto font instead of using the tokens. Wire it
into every Sahara app's CI so Calm Studio can't drift — drift gets rejected
automatically instead of relying on review.

## Per-app setup

1. Depend on the package via the **public https tarball** for a tagged release:

   ```jsonc
   // package.json
   "devDependencies": {
     "@ssi/brand": "https://github.com/lugengeaustin/ssi-brand/archive/refs/tags/v1.0.0.tar.gz"
   }
   ```

   > Why a tarball and not `github:lugengeaustin/ssi-brand#v1.0.0`? npm canonicalizes
   > GitHub `git+https` URLs to `git+ssh` in the lockfile, and CI runners / Vercel
   > builds have no SSH key — so the git form fails with `Permission denied
   > (publickey)` even on a public repo. The https tarball uses no git protocol,
   > needs no credentials, and installs anonymously in every environment. `ssi-brand`
   > is public, so this works with zero secret setup. Bump the tag in the URL to
   > upgrade.

2. Add a script:

   ```jsonc
   "scripts": { "brand-lint": "ssi-brand-lint src" }
   ```

3. (Optional) `brand-lint.config.json` at the repo root to allowlist a file that
   legitimately maps tokens (e.g. a Tailwind config or a global stylesheet):

   ```json
   { "scan": ["src"], "allow": ["src/styles/theme.css"] }
   ```

   Token files (`tokens.*`, `brand.css`, `tailwind.config.*`, `globals.css`,
   `theme.*`, `docx-css.*`, `*.d.ts`) are allowlisted by default.

4. Add the CI job (`.github/workflows/ci.yml`):

   ```yaml
   name: CI
   on: [push, pull_request]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with: { node-version: 20 }
         - run: npm ci
         - run: npm run build --if-present   # typecheck / bundle
         - run: npm run brand-lint
   ```

## What it flags

- Hardcoded hex colors (`#1A3F8F`, `#fff`, …) in `.css/.scss/.ts/.tsx/.js/.jsx/.html/.vue`.
- `font-family` / `fontFamily` set to anything other than Roboto, a CSS var, a
  `fonts.*` token, or a generic keyword.

It does **not** flag values inside allowlisted token-definition files — those are
where the palette is allowed to live.

## Rollout order

Forge and Accounting first (they already track close to the palette), then
E-Office and E-Asess. Expect the first run in each app to surface real violations
(that's the point) — fix by routing them through `var(--…)` / `colors.*` /
`ssi-*` Tailwind utilities.
