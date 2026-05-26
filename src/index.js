/**
 * @ssi/brand · default entry point
 *
 * Re-exports the most-used pieces so callers can write
 *   import { colors, fonts, T, BrandHeader, wrapBrandedDoc } from '@ssi/brand';
 *
 * For Tailwind config, use the dedicated subpath:
 *   const preset = require('@ssi/brand/tailwind-preset');
 */

export { colors, fonts, fontUrls, organisation, logos, T } from './tokens.js';
export { brandedDocCss, wrapBrandedDoc } from './docx-css.js';
export { SsiAccentBar, BrandHeader, BrandFooter } from './react.jsx';
