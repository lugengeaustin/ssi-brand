# Changelog

## 1.0.0 — Calm Studio (canonical)

**Calm Studio is now the single SSI design language.** This is a values-only
swap: every exported key name (`colors.*`, `fonts.*`, `T.*`, CSS `--variables`,
Tailwind `ssi-*` utilities) is preserved, so consuming apps need no import
changes — they pick up the new look on upgrade.

### Changed
- **Palette** → Brand Blue `#1E3FA0`, Gold `#F0C84A`, Green `#22B14C`, off-white
  canvas `#F8F7F2`, ink `#1A1D24`, muted `#5C6470`, hairline `#E3E6EC`, red
  `#C0392B` (errors/risks only). Previous Executive Blue `#1A3F8F` / Growth Gold
  `#F2B705` / Sustain Green `#1FA84E` retired.
- **Type** → Roboto (body + headings, headings weight 500) and Roboto Mono.
  DM Sans / Cormorant Garamond / DM Mono retired. `fontUrls.google` updated.
- **Dark theme** → canvas `#1A1A2E` (Calm Studio dark), replacing the generic
  GitHub-dark palette.
- **Tokens** → added `--radius-card: 18px` and a single whisper `--shadow`.
- **React** → header marks drop to weight 500 (no weight-700 headings).
- **`T` gradients** → flattened to solid brand pigments (Calm Studio is flat);
  keys (`gradPrimary`, `gradEmerald`, `gradAmber`, `gradCoral`) retained for
  compatibility.

### Compatibility
- No export removed or renamed. `tailwind-preset.js`, `docx-css.js`, and
  `react.jsx` all derive from `tokens.js`, so the swap propagates automatically.
- The tri-colour `.ssi-accent-bar` / `<SsiAccentBar/>` divider is retained as a
  deliberate 4px brand rule.

### Adoption
Apps re-vendoring this package (e.g. Forge's `packages/ssi-brand`) or bumping the
dependency get Calm Studio with no code changes. Component-level adoption
(pills, `.num` mono figures, status pills) is per-app Phase 2 work.
