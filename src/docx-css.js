/**
 * @ssi/brand · docx export CSS pack
 *
 * Lifted from Sahara-E-Office-main/src/branding.js (BRANDED_DOC_CSS) so every
 * Sahara app exports .docx with identical SSI letterhead, accent bar, table
 * styling, footer, etc.
 *
 * Usage with html-docx-js-typescript or similar:
 *
 *   import { brandedDocCss, wrapBrandedDoc } from '@ssi/brand/docx-css';
 *   const html = wrapBrandedDoc({ title, subtitle, innerHTML, docType: 'Report' });
 *   const blob = await asBlob(html);   // html-docx-js
 */

import { colors, fonts, organisation } from './tokens.js';

export const brandedDocCss = `
  body { font-family: ${fonts.body}; font-size: 11pt; color: ${colors.ink}; line-height: 1.5; margin: 0; }
  h1 { font-family: ${fonts.heading}; font-size: 24pt; color: ${colors.execBlueDeep}; margin: 18px 0 10px; letter-spacing: -0.01em; }
  h2 { font-family: ${fonts.heading}; font-size: 18pt; color: ${colors.execBlue};     margin: 14px 0 8px; }
  h3 { font-family: ${fonts.heading}; font-size: 13pt; color: ${colors.execBlueMid};  margin: 12px 0 6px; }
  .ssi-header { padding: 18px 24px; border-bottom: 2px solid ${colors.growthGold}; background: ${colors.offWhite}; display: table; width: 100%; }
  .ssi-header .logo { display: table-cell; width: 200px; vertical-align: middle; }
  .ssi-header .org  { display: table-cell; text-align: right; vertical-align: middle; font-size: 10pt; color: ${colors.inkMid}; }
  .ssi-header .org .name { font-family: ${fonts.heading}; font-size: 16pt; color: ${colors.execBlueDeep}; font-weight: 700; display: block; }
  .ssi-footer { padding: 14px 24px; border-top: 1px solid ${colors.rule}; font-size: 9.5pt; color: ${colors.inkLight}; text-align: center; margin-top: 28px; }
  .ssi-accent { height: 4px; background: linear-gradient(90deg, ${colors.execBlue} 0%, ${colors.growthGold} 50%, ${colors.sustainGreen} 100%); margin: 0; }
  table.data { border-collapse: collapse; width: 100%; margin: 12px 0; font-size: 10.5pt; }
  table.data th { background: ${colors.execBlueDeep}; color: ${colors.white}; padding: 8px 12px; text-align: left; font-weight: 700; border: 1px solid ${colors.execBlueDeep}; }
  table.data td { padding: 8px 12px; border: 1px solid #B8C2D1; vertical-align: top; }
  table.data tr:nth-child(even) td { background: ${colors.offWhite}; }
  .ssi-label { font-size: 9pt; font-weight: 700; color: ${colors.inkLight}; text-transform: uppercase; letter-spacing: 0.06em; display: block; margin-bottom: 2px; }
  .ssi-value { font-size: 11pt; color: ${colors.ink}; }
  .ssi-section { margin: 16px 0; padding: 12px 16px; background: ${colors.offWhite}; border-left: 3px solid ${colors.growthGold}; border-radius: 2px; }
  .ssi-total-row td { background: ${colors.growthGoldPale} !important; font-weight: 700; color: ${colors.execBlueDeep}; }
  .ssi-meta { font-family: ${fonts.mono}; font-size: 10pt; color: ${colors.inkLight}; }
`;

const _esc = (s) => String(s ?? "").replace(/[&<>"']/g,
  c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/**
 * Wrap an inner HTML body with the canonical SSI header, accent bar, title
 * block, and footer. Returns a full `<!DOCTYPE html>` string suitable for
 * html-docx-js conversion or direct print preview.
 *
 * @param {object} opts
 * @param {string} opts.title       - Document title (renders as <h1>)
 * @param {string} [opts.subtitle]  - Subtitle / sub-meta line
 * @param {string} opts.innerHTML   - The body content
 * @param {string} [opts.docType]   - Label shown in the top-right corner ("Report", "Invoice", etc.)
 * @param {string} [opts.logoDataUrl] - Optional base64 logo so it survives in the downloaded .docx
 */
export function wrapBrandedDoc({ title, subtitle, innerHTML, docType = "Document", logoDataUrl } = {}) {
  const org = organisation;
  const logoCell = logoDataUrl
    ? `<img src="${logoDataUrl}" alt="SSI" style="height:48px;display:block;"/>`
    : `<span style="font-family:${fonts.heading};font-size:22pt;font-weight:700;color:${colors.execBlueDeep};letter-spacing:0.01em;">SSI</span>`;
  const subtitleLine = subtitle ? `<div class="ssi-meta">${_esc(subtitle)}</div>` : "";
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${_esc(title || org.name)}</title>
<style>${brandedDocCss}</style></head>
<body>
  <div class="ssi-header">
    <div class="logo">${logoCell}</div>
    <div class="org">
      <span class="name">${org.name}</span>
      <span>${org.tagline}</span><br/>
      <span>${org.address} · ${org.email}</span>
    </div>
  </div>
  <div class="ssi-accent"></div>
  <div style="padding:28px 36px 0;">
    <div style="display:table;width:100%;margin-bottom:18px;">
      <div style="display:table-cell;">
        <h1 style="margin:0;">${_esc(title || docType)}</h1>
        ${subtitleLine}
      </div>
      <div style="display:table-cell;text-align:right;vertical-align:bottom;">
        <span class="ssi-label">${_esc(docType)}</span>
        <span class="ssi-meta">${today}</span>
      </div>
    </div>
    ${innerHTML}
  </div>
  <div class="ssi-footer">
    ${org.name} · ${org.tagline} · ${org.email} · ${org.phone}<br/>
    <span style="color:${colors.inkLight};opacity:.7;">This document is confidential and intended solely for the named recipient.</span>
  </div>
</body></html>`;
}
