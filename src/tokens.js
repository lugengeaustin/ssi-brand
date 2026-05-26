/**
 * @ssi/brand · canonical SSI design tokens
 *
 * Single source of truth for colors, typography, and brand metadata across
 * the Sahara product suite (Office, Forge, E-Asess, Cloud, DataViz).
 *
 * Tokens lifted from Sahara-E-Asess-main/tailwind.config.js + globals.css —
 * which itself originates from SSI_Brand_Identity_Blueprint.html.
 *
 * Sahara-E-Office and Sahara-E-Asess already use this token set verbatim.
 * Sahara-Forge currently uses an older variant (Roboto + #F0C84A); align it
 * to these values during the Phase 3 re-skin.
 */

export const colors = {
  // ── EXECUTIVE BLUE (primary) ─────────────────────────────────────
  execBlue:        "#1A3F8F",
  execBlueDeep:    "#0D2456",
  execBlueMid:     "#1E4FA3",

  // ── GROWTH GOLD (accent / CTA) ───────────────────────────────────
  growthGold:      "#F2B705",
  growthGoldLight: "#F7CB45",
  growthGoldPale:  "#FDF3CC",

  // ── SUSTAIN GREEN (success / live) ───────────────────────────────
  sustainGreen:      "#1FA84E",
  sustainGreenDeep:  "#156B35",
  sustainGreenLight: "#27C45E",

  // ── NEUTRALS ─────────────────────────────────────────────────────
  white:    "#FFFFFF",
  offWhite: "#F8F7F4",
  warmGray: "#E8E5E0",
  ink:      "#0D1A2E",
  inkMid:   "#2C3E55",
  inkLight: "#4A5A6E",
  inkMuted: "#6B7280",

  // ── STATE ────────────────────────────────────────────────────────
  error:   "#EF4444",
  warning: "#F59E0B",

  // ── RULES (hairlines, dividers) ──────────────────────────────────
  rule:     "rgba(26, 63, 143, 0.12)",   // exec-blue @ 12% opacity
  goldRule: "rgba(242, 183, 5, 0.35)",   // growth-gold @ 35% opacity
};

export const fonts = {
  body:    "'DM Sans', 'Calibri', 'Segoe UI', Arial, sans-serif",
  heading: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
  mono:    "'DM Mono', ui-monospace, 'Courier New', monospace",
};

export const fontUrls = {
  // Single Google Fonts request that pulls every weight every app uses.
  google: "https://fonts.googleapis.com/css2?" +
          "family=DM+Sans:wght@300;400;500;600;700&" +
          "family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&" +
          "family=DM+Mono:wght@400;500&display=swap",
};

export const organisation = {
  name:    "Sub-Sahara Institute",
  short:   "SSI",
  tagline: "Excellence in Africa's Development",
  email:   "info@ssi.co.ke",
  phone:   "+254 722 100 001",
  address: "Nairobi, Kenya",
  website: "https://ssi.co.ke",
};

export const logos = {
  // Relative paths within the @ssi/brand package. Apps should either:
  //   - Copy the .png files from node_modules/@ssi/brand/assets/logos/ at
  //     build time into their public/ folder, OR
  //   - Use the package's exported asset paths directly via the bundler.
  wordmark: "@ssi/brand/logos/wordmark.png",  // primary mark, 2026 wordmark
  header:   "@ssi/brand/logos/header.png",    // horizontal header strip
  mark:     "@ssi/brand/logos/mark.png",      // square/standalone mark
};

// Convenience: the legacy `T` palette object used inside E-Office.
// Apps migrating to @ssi/brand can `import { T } from "@ssi/brand"` and drop
// their local copy.
export const T = {
  execBlue:    colors.execBlue,
  execBlueC:   colors.execBlueDeep,
  cobalt:      colors.execBlue,
  cobaltC:     colors.execBlueDeep,
  gold:        colors.growthGold,
  goldC:       colors.growthGoldLight,
  emerald:     colors.sustainGreen,
  emeraldC:    colors.sustainGreenDeep,
  onyx:        colors.ink,
  slate:       colors.inkMid,
  muted:       colors.inkMuted,
  surface:     colors.offWhite,
  white:       colors.white,
  rule:        colors.rule,
  coral:       colors.error,
  amber:       colors.warning,
  gradPrimary: `linear-gradient(135deg, ${colors.execBlueDeep} 0%, ${colors.execBlue} 100%)`,
  gradEmerald: `linear-gradient(135deg, ${colors.sustainGreenDeep} 0%, ${colors.sustainGreen} 100%)`,
  gradAmber:   `linear-gradient(135deg, ${colors.growthGold} 0%, ${colors.growthGoldLight} 100%)`,
  gradCoral:   "linear-gradient(135deg, #B91C1C 0%, #EF4444 100%)",
};
