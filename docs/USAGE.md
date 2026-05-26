# @ssi/brand — usage

Single source of truth for Sub-Sahara Institute brand tokens across the
Sahara product suite (Office, Forge, E-Asess, Cloud, DataViz).

## Install (during Phase 0, before this is published)

Each app references the package via a relative `file:` dependency so you
don't need an npm registry yet:

```json
{
  "dependencies": {
    "@ssi/brand": "file:../ssi-brand"
  }
}
```

Then `npm install` in each app.

## Use the Tailwind preset (Sahara-Forge, Sahara-E-Asess)

`tailwind.config.{js,ts}`:

```js
const ssiPreset = require('@ssi/brand/tailwind-preset');

module.exports = {
  presets: [ssiPreset],
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
};
```

You now have `bg-ssi-blue`, `text-ssi-gold`, `font-heading`, etc.
Remove any locally-declared `colors.ssi.*` from the app's old config.

## Use the CSS custom properties (any app)

```css
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Mono:wght@400;500&display=swap");
@import "@ssi/brand/css";

body { background: var(--bg); color: var(--text); font-family: var(--font-body); }
h1   { font-family: var(--font-heading); color: var(--exec-blue-deep); }
```

Both light (default) and dark themes are defined. Toggle via either
`data-theme="dark"` on `<html>` (E-Asess convention) or the `.dark` class
(Tailwind convention) — both work.

## Use the React helpers (Office, Forge)

```jsx
import { BrandHeader, SsiAccentBar, BrandFooter } from '@ssi/brand/react';
import logoUrl from '@ssi/brand/logos/header.png';

<>
  <BrandHeader logoSrc={logoUrl} subtitle="Enterprise Command Platform" />
  <SsiAccentBar />
  <main>{children}</main>
  <BrandFooter />
</>
```

## Branded .docx exports (Office, E-Asess)

```js
import { wrapBrandedDoc } from '@ssi/brand/docx-css';
import { asBlob } from 'html-docx-js-typescript';

const html = wrapBrandedDoc({
  title:    'Quarterly Report — Acme Holdings',
  subtitle: 'Q2 2026 · prepared by Sub-Sahara Institute',
  docType:  'Report',
  innerHTML: bodyHtml,
});

const blob = await asBlob(html);
saveAs(blob, 'acme-q2.docx');
```

## Migrating Sahara-Forge

Forge's `tailwind.config.ts` currently declares its own SSI tokens with
slightly different values (`#F0C84A` gold, `#1E3FA0` blue, `#22B14C` green,
Roboto everywhere). To migrate:

1. Add `@ssi/brand` as a dependency.
2. Replace the `theme.extend.colors.ssi` block + `fontFamily` entries with
   `presets: [require('@ssi/brand/tailwind-preset')]`.
3. Visual-QA the surfaces that use `font-display` or `font-headline` —
   they'll switch from Roboto to Cormorant Garamond (heading) / DM Sans
   (body). The Material-3 mappings (`primary`, `secondary`, etc.) stay if
   Forge wants them — keep those in the local config, just point them at
   the canonical hex values.

## Migrating Sahara-E-Office

Office's `src/branding.js` was the original source; this package is a
straight extraction. To migrate:

1. Add `@ssi/brand` as a dependency.
2. Replace `import { SSI_BRAND, BRANDED_DOC_CSS, wrapBrandedDoc } from "./branding"` with
   `import { organisation, brandedDocCss as BRANDED_DOC_CSS, wrapBrandedDoc } from "@ssi/brand"`.
3. Keep the old `src/branding.js` as a thin re-export shim until every
   importer is updated, then delete it.

## Versioning

Semver. Bump:

- **patch** for token value tweaks (color hex changes, etc.)
- **minor** for new exports (new component, new helper)
- **major** for breaking removals or renames

Tag the repo and the version in `package.json` in lockstep.
