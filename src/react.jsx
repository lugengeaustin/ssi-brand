/**
 * @ssi/brand · React helpers
 *
 * Drop-in <BrandHeader/> and <BrandFooter/> components plus a thin
 * <SsiAccentBar/> divider. All three read directly from the @ssi/brand
 * token set; no per-app duplication.
 *
 * Requires React 18+ as a peer dep.
 */

import React from 'react';
import { colors, fonts, organisation } from './tokens.js';

/** A thin tri-color accent bar — Office, Forge, and E-Asess already use this
 *  as the divider between header and content. */
export function SsiAccentBar({ style }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: 4,
        background: `linear-gradient(90deg, ${colors.execBlue} 0%, ${colors.growthGold} 50%, ${colors.sustainGreen} 100%)`,
        ...style,
      }}
    />
  );
}

/**
 * Canonical SSI header. Pass `logoSrc` if you've copied the logo into your
 * app's public/ folder; otherwise the "SSI" wordmark falls back automatically.
 */
export function BrandHeader({ logoSrc, subtitle, action, style }) {
  return (
    <header
      style={{
        padding: '14px 22px',
        background: colors.offWhite,
        borderBottom: `2px solid ${colors.growthGold}`,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        ...style,
      }}
    >
      {logoSrc
        ? <img src={logoSrc} alt={organisation.name} style={{ height: 36, display: 'block' }} />
        : <span style={{
            fontFamily: fonts.heading,
            fontSize: 22,
            fontWeight: 500,
            color: colors.execBlueDeep,
            letterSpacing: '0.01em',
          }}>SSI</span>}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 500, color: colors.execBlueDeep, lineHeight: 1.15 }}>
          {organisation.name}
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.inkMid, letterSpacing: '0.02em' }}>
          {subtitle ?? organisation.tagline}
        </div>
      </div>

      {action ? <div>{action}</div> : null}
    </header>
  );
}

/** Canonical SSI footer. Suitable for any printable view or modal. */
export function BrandFooter({ style }) {
  return (
    <footer
      style={{
        padding: '12px 22px',
        borderTop: `1px solid ${colors.rule}`,
        fontFamily: fonts.body,
        fontSize: 10,
        color: colors.inkLight,
        textAlign: 'center',
        ...style,
      }}
    >
      {organisation.name} · {organisation.tagline} · {organisation.email} · {organisation.phone}
    </footer>
  );
}
