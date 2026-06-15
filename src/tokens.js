/**
 * @ssi/brand · canonical SSI design tokens
 *
 * Single source of truth for colors, typography, and brand metadata across
 * the Sahara product suite (Office, Forge, E-Asess, Cloud, DataViz).
 *
 * v1.0.0 — "Calm Studio" is the canonical SSI design language: Roboto +
 * Roboto Mono, Brand Blue / Gold / Green, off-white canvas, pill components,
 * light + dark. Every export KEY NAME below is preserved from the previous
 * release; only the VALUES changed, so apps that reference `colors.execBlue`,
 * `T.gold`, `fonts.body`, etc. keep working and simply pick up the new look.
 */

export const colors = {
  // ── BRAND BLUE (primary action, active nav) ──────────────────────
  execBlue:        "#1E3FA0",   // Calm Studio --blue
  execBlueDeep:    "#152C70",   // hover / pressed
  execBlueMid:     "#28469A",

  // ── BRAND GOLD (progress, live / attention) ──────────────────────
  growthGold:      "#F0C84A",   // Calm Studio --gold
  growthGoldLight: "#F4D67A",
  growthGoldPale:  "#FBEFC8",

  // ── BRAND GREEN (success / complete) ─────────────────────────────
  sustainGreen:      "#22B14C", // Calm Studio --green
  sustainGreenDeep:  "#178038",
  sustainGreenLight: "#3FC768",

  // ── NEUTRALS ─────────────────────────────────────────────────────
  white:    "#FFFFFF",
  offWhite: "#F8F7F2",   // Calm Studio --bg (off-white canvas)
  warmGray: "#ECEBE6",   // soft warm fill
  ink:      "#1A1D24",   // Calm Studio --ink (primary text)
  inkMid:   "#3A4150",
  inkLight: "#3F4753",
  inkMuted: "#5C6470",   // Calm Studio --muted (secondary text)
  line:     "#E3E6EC",   // Calm Studio --border (hairline / dividers)

  // ── STATE (red is reserved for risks / errors only) ──────────────
  error:   "#C0392B",    // Calm Studio --red
  warning: "#C77700",    // readable amber, distinct from progress gold

  // ── RULES (hairlines, dividers) ──────────────────────────────────
  rule:     "rgba(30, 63, 160, 0.12)",   // brand blue @ 12% opacity (Calm --line feel)
  goldRule: "rgba(240, 200, 74, 0.35)",  // brand gold @ 35% opacity
};

export const fonts = {
  // Calm Studio is Roboto end to end — headings are Roboto weight 500, never a serif.
  body:    "'Roboto', 'Helvetica Neue', Arial, sans-serif",
  heading: "'Roboto', 'Helvetica Neue', Arial, sans-serif",
  mono:    "'Roboto Mono', ui-monospace, 'Courier New', monospace",
};

export const fontUrls = {
  // Single Google Fonts request that pulls every weight Calm Studio uses.
  google: "https://fonts.googleapis.com/css2?" +
          "family=Roboto:wght@300;400;500;700&" +
          "family=Roboto+Mono:wght@400;500&display=swap",
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
// their local copy. Key names are preserved; Calm Studio mutes gradients to
// flat brand pigments (Calm Studio uses no gradients), but the keys remain so
// existing references don't break.
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
  // Calm Studio is flat. These keys persist for compatibility but resolve to
  // solid brand pigments rather than gradients.
  gradPrimary: colors.execBlue,
  gradEmerald: colors.sustainGreen,
  gradAmber:   colors.growthGold,
  gradCoral:   colors.error,
};
