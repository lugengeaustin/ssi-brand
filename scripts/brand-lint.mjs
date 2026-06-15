#!/usr/bin/env node
/**
 * @ssi/brand · brand-lint
 *
 * Fails (exit 1) when application source hardcodes a hex color or a non-Roboto
 * font-family instead of going through the @ssi/brand tokens. This is what keeps
 * the Calm Studio identity from drifting: wire it into CI and the build rejects
 * off-brand values automatically.
 *
 * Usage:
 *   node scripts/brand-lint.mjs [dir ...]        # defaults to ./src
 *   node scripts/brand-lint.mjs --allow a.css    # extra allowlisted file (regex)
 *
 * Config (optional): brand-lint.config.json at repo root:
 *   { "scan": ["src"], "allow": ["src/theme/tokens.ts"] }
 *
 * Allowlisted by default: the token-definition files that legitimately DECLARE
 * the palette (tokens, brand.css, tailwind preset and config, theme/token files).
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, basename, relative } from "node:path";

const ROOT = process.cwd();
const EXT = new Set([".css", ".scss", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".html", ".vue"]);

// Files that are ALLOWED to contain raw hex / font names because they define the system.
const DEFAULT_ALLOW = [
  /(^|\/)tokens\.[jt]s$/,
  /(^|\/)brand\.css$/,
  /tailwind[.-](preset|config)\.[jt]s$/,
  /(^|\/)(theme|tokens|palette|design-tokens)\.[jt]sx?$/,
  /(^|\/)globals?\.css$/,            // app global stylesheet that @imports brand + maps vars
  /(^|\/)docx-css\.[jt]s$/,          // brand package: docx export style definitions
  /\.d\.ts$/,
];

// Hex anywhere in code/style.
const HEX = /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{1})?(?:[0-9a-fA-F]{2})?(?:[0-9a-fA-F]{2})?\b/g;
// font-family with a literal family that isn't Roboto / a CSS var / inherit.
const FONT = /font-?family\s*[:=]\s*["'`]?([^;"'`}\n]+)/gi;
const ALLOWED_FONT_TOKENS = /(roboto|var\(|inherit|initial|unset|--font|fonts\.|theme\(|monospace$|sans-serif$|ui-monospace)/i;

const args = process.argv.slice(2);
let scanDirs = [];
const extraAllow = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--allow") extraAllow.push(args[++i]);
  else scanDirs.push(args[i]);
}

let cfg = {};
const cfgPath = join(ROOT, "brand-lint.config.json");
if (existsSync(cfgPath)) { try { cfg = JSON.parse(readFileSync(cfgPath, "utf8")); } catch {} }
if (!scanDirs.length) scanDirs = cfg.scan || ["src"];
const allowList = [...DEFAULT_ALLOW, ...(cfg.allow || []).map((s) => new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))), ...extraAllow.map((s) => new RegExp(s))];

const isAllowed = (rel) => allowList.some((re) => re.test(rel));

function walk(dir, out = []) {
  let entries = [];
  try { entries = readdirSync(dir); } catch { return out; }
  for (const e of entries) {
    if (e === "node_modules" || e === ".git" || e === "dist" || e === "build" || e === ".next") continue;
    const p = join(dir, e);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (EXT.has(p.slice(p.lastIndexOf(".")))) out.push(p);
  }
  return out;
}

const violations = [];
for (const d of scanDirs) {
  for (const file of walk(join(ROOT, d))) {
    const rel = relative(ROOT, file);
    if (isAllowed(rel)) continue;
    const text = readFileSync(file, "utf8");
    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      // skip comments-only lines cheaply
      const hexes = line.match(HEX);
      if (hexes) for (const h of hexes) violations.push({ rel, ln: i + 1, kind: "hex", val: h, src: line.trim().slice(0, 100) });
      let m;
      FONT.lastIndex = 0;
      while ((m = FONT.exec(line))) {
        const fam = m[1].trim();
        if (!ALLOWED_FONT_TOKENS.test(fam)) violations.push({ rel, ln: i + 1, kind: "font", val: fam.slice(0, 40), src: line.trim().slice(0, 100) });
      }
    });
  }
}

if (!violations.length) {
  console.log("✓ brand-lint: no hardcoded colors or off-brand fonts found.");
  process.exit(0);
}
console.error(`✗ brand-lint: ${violations.length} off-brand value(s). Use @ssi/brand tokens / CSS vars instead.\n`);
for (const v of violations.slice(0, 200)) {
  console.error(`  ${v.rel}:${v.ln}  [${v.kind}] ${v.val}\n      ${v.src}`);
}
if (violations.length > 200) console.error(`  …and ${violations.length - 200} more`);
process.exit(1);
