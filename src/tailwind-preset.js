/**
 * @ssi/brand · Tailwind preset
 *
 * Drop into any Sahara app's tailwind.config.{js,ts}:
 *
 *   const ssiPreset = require('@ssi/brand/tailwind-preset');
 *   module.exports = {
 *     presets: [ssiPreset],
 *     content: ['./src/**\/*.{js,jsx,ts,tsx,html}'],
 *   };
 *
 * Apps that already declare `colors.ssi.*` (Sahara-Forge) should remove their
 * local definitions so this preset wins.
 */

const { colors, fonts } = require('./tokens.js');

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Flat utility names matching the E-Asess convention.
        'ssi-blue':         colors.execBlue,
        'ssi-blue-deep':    colors.execBlueDeep,
        'ssi-blue-mid':     colors.execBlueMid,
        'ssi-gold':         colors.growthGold,
        'ssi-gold-light':   colors.growthGoldLight,
        'ssi-gold-pale':    colors.growthGoldPale,
        'ssi-green':        colors.sustainGreen,
        'ssi-green-deep':   colors.sustainGreenDeep,
        'ssi-green-light':  colors.sustainGreenLight,
        'ssi-white':        colors.white,
        'ssi-off-white':    colors.offWhite,
        'ssi-warm-gray':    colors.warmGray,
        'ssi-ink':          colors.ink,
        'ssi-ink-mid':      colors.inkMid,
        'ssi-ink-light':    colors.inkLight,
        'ssi-ink-muted':    colors.inkMuted,

        // ── Forge legacy aliases. The Forge codebase referenced these names
        //    against an older brand spec; we point them at canonical pigments
        //    so existing components don't break during the re-skin. ───────
        'ssi-gold-dark':    colors.growthGoldLight,    // was '#D4AD2E'
        'ssi-blue-light':   colors.execBlueMid,        // was '#2A4FBD'
        'ssi-yellow':       colors.growthGold,         // alias for ssi-gold
        'ssi-dark':         colors.ink,                // was '#1A1A2E'
        'ssi-darker':       colors.execBlueDeep,       // was '#111122'
        'ssi-off':          colors.offWhite,           // alias for ssi-off-white
        'ssi-light':        '#FAFAF8',
        'ssi-muted':        colors.inkMuted,
        'ssi-rule':         colors.warmGray,

        // Grouped namespace for apps that prefer `ssi.blue` shorthand.
        ssi: {
          blue:         colors.execBlue,
          'blue-deep':  colors.execBlueDeep,
          'blue-mid':   colors.execBlueMid,
          gold:         colors.growthGold,
          'gold-light': colors.growthGoldLight,
          'gold-pale':  colors.growthGoldPale,
          green:        colors.sustainGreen,
          'green-deep': colors.sustainGreenDeep,
          'green-light': colors.sustainGreenLight,
          white:        colors.white,
          off:          colors.offWhite,
          ink:          colors.ink,
          'ink-mid':    colors.inkMid,
          'ink-light':  colors.inkLight,
          muted:        colors.inkMuted,
          rule:         colors.rule,
        },
      },
      fontFamily: {
        body:    fonts.body.split(',').map(s => s.trim().replace(/^'|'$/g, '')),
        heading: fonts.heading.split(',').map(s => s.trim().replace(/^'|'$/g, '')),
        mono:    fonts.mono.split(',').map(s => s.trim().replace(/^'|'$/g, '')),
        // Aliases so existing app code keeps working.
        sans:    fonts.body.split(',').map(s => s.trim().replace(/^'|'$/g, '')),
        serif:   fonts.heading.split(',').map(s => s.trim().replace(/^'|'$/g, '')),
      },
    },
  },
};
