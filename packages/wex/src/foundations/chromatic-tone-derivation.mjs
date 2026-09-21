/**
 * Deterministic chromatic tone derivation for the WEX core.
 *
 * ADR 0011 makes Base the only authored value for each chromatic family.
 * Dark and Light are derived delivery tokens, using calibrated OKLCH transforms
 * rather than independently maintained hex values.
 */

const BLACK = '#000000';
const WHITE = '#ffffff';

export const CHROMATIC_FAMILIES = Object.freeze({
  accent: {
    cssName: 'accent',
    base: '#0f62fe',
    tones: {
      dark: { lightnessDelta: -0.102514, chromaMultiplier: 0.909577, hueDelta: 0.679303 },
      light: { lightnessDelta: 0.179918, chromaMultiplier: 0.559872, hueDelta: -0.870887 },
    },
  },
  warning: {
    cssName: 'yellow',
    base: '#f1c21b',
    tones: {
      dark: { lightnessDelta: -0.187096, chromaMultiplier: 0.798337, hueDelta: -5.190601 },
      light: { lightnessDelta: 0.068128, chromaMultiplier: 0.835838, hueDelta: 2.997106 },
    },
  },
  success: {
    cssName: 'green',
    base: '#24a148',
    tones: {
      dark: { lightnessDelta: -0.096229, chromaMultiplier: 0.847441, hueDelta: 0.206128 },
      light: { lightnessDelta: 0.186244, chromaMultiplier: 0.913110, hueDelta: 2.352889 },
    },
  },
  error: {
    cssName: 'red',
    base: '#da1e28',
    tones: {
      dark: { lightnessDelta: -0.109187, chromaMultiplier: 0.785449, hueDelta: -0.361739 },
      light: { lightnessDelta: 0.096967, chromaMultiplier: 0.960244, hueDelta: -3.794904 },
    },
  },
});

/** Registered foreground contracts, matching the existing semantic WEX tokens. */
export const REGISTERED_CHROMATIC_PAIRINGS = Object.freeze([
  { token: 'on-accent', family: 'accent', tone: 'base', foreground: WHITE },
  { token: 'on-accent-hover', family: 'accent', tone: 'dark', foreground: WHITE },
  { token: 'on-accent-selected', family: 'accent', tone: 'light', foreground: BLACK },
  { token: 'on-warning', family: 'warning', tone: 'base', foreground: BLACK },
  { token: 'on-warning-hover', family: 'warning', tone: 'dark', foreground: BLACK },
  { token: 'on-warning-selected', family: 'warning', tone: 'light', foreground: BLACK },
  { token: 'on-success', family: 'success', tone: 'base', foreground: BLACK },
  { token: 'on-success-hover', family: 'success', tone: 'dark', foreground: WHITE },
  { token: 'on-success-selected', family: 'success', tone: 'light', foreground: BLACK },
  { token: 'on-error', family: 'error', tone: 'base', foreground: WHITE },
  { token: 'on-error-hover', family: 'error', tone: 'dark', foreground: WHITE },
  { token: 'on-error-selected', family: 'error', tone: 'light', foreground: BLACK },
]);

const clamp = (value, lower, upper) => Math.min(upper, Math.max(lower, value));
const degrees = (radians) => (radians * 180) / Math.PI;
const radians = (angle) => (angle * Math.PI) / 180;
const normaliseHue = (hue) => ((hue % 360) + 360) % 360;

function parseHex(hex) {
  const match = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!match) throw new TypeError(`Expected a six-digit hex colour, received ${hex}`);

  const value = match[1];
  return {
    red: Number.parseInt(value.slice(0, 2), 16) / 255,
    green: Number.parseInt(value.slice(2, 4), 16) / 255,
    blue: Number.parseInt(value.slice(4, 6), 16) / 255,
  };
}

function linearise(channel) {
  return channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

function encode(channel) {
  return channel <= 0.0031308
    ? 12.92 * channel
    : (1.055 * (channel ** (1 / 2.4))) - 0.055;
}

function hexToOklch(hex) {
  const srgb = parseHex(hex);
  const red = linearise(srgb.red);
  const green = linearise(srgb.green);
  const blue = linearise(srgb.blue);

  const l = Math.cbrt((0.4122214708 * red) + (0.5363325363 * green) + (0.0514459929 * blue));
  const m = Math.cbrt((0.2119034982 * red) + (0.6806995451 * green) + (0.1073969566 * blue));
  const s = Math.cbrt((0.0883024619 * red) + (0.2817188376 * green) + (0.6299787005 * blue));

  const lightness = (0.2104542553 * l) + (0.793617785 * m) - (0.0040720468 * s);
  const a = (1.9779984951 * l) - (2.428592205 * m) + (0.4505937099 * s);
  const b = (0.0259040371 * l) + (0.7827717662 * m) - (0.808675766 * s);

  return { lightness, chroma: Math.hypot(a, b), hue: normaliseHue(degrees(Math.atan2(b, a))) };
}

function oklchToLinearRgb({ lightness, chroma, hue }) {
  const a = chroma * Math.cos(radians(hue));
  const b = chroma * Math.sin(radians(hue));
  const l = (lightness + (0.3963377774 * a) + (0.2158037573 * b)) ** 3;
  const m = (lightness - (0.1055613458 * a) - (0.0638541728 * b)) ** 3;
  const s = (lightness - (0.0894841775 * a) - (1.291485548 * b)) ** 3;

  return {
    red: (4.0767416621 * l) - (3.3077115913 * m) + (0.2309699292 * s),
    green: (-1.2684380046 * l) + (2.6097574011 * m) - (0.3413193965 * s),
    blue: (-0.0041960863 * l) - (0.7034186147 * m) + (1.707614701 * s),
  };
}

function isInSrgbGamut(rgb) {
  return Object.values(rgb).every((channel) => channel >= 0 && channel <= 1);
}

function quantise(channel) {
  return clamp(Math.floor((channel * 255) + 0.5), 0, 255);
}

function linearRgbToHex(rgb) {
  const components = [rgb.red, rgb.green, rgb.blue]
    .map((channel) => quantise(encode(channel)).toString(16).padStart(2, '0'));
  return `#${components.join('')}`;
}

function mapOklchToHex(oklch) {
  let candidate = oklchToLinearRgb(oklch);

  if (!isInSrgbGamut(candidate)) {
    let lower = 0;
    let upper = oklch.chroma;

    for (let iteration = 0; iteration < 16; iteration += 1) {
      const midpoint = (lower + upper) / 2;
      const mapped = oklchToLinearRgb({ ...oklch, chroma: midpoint });
      if (isInSrgbGamut(mapped)) lower = midpoint;
      else upper = midpoint;
    }

    candidate = oklchToLinearRgb({ ...oklch, chroma: lower });
  }

  return linearRgbToHex(candidate);
}

/**
 * Derive one calibrated chromatic tone from a Base. The optional Base allows a
 * future server/admin caller to validate a proposed edit with this same rule.
 */
export function deriveChromaticTone(familyName, toneName, base = CHROMATIC_FAMILIES[familyName]?.base) {
  const family = CHROMATIC_FAMILIES[familyName];
  const calibration = family?.tones[toneName];
  if (!family || !calibration) throw new TypeError(`Unknown chromatic tone ${familyName}/${toneName}`);

  const source = hexToOklch(base);
  return mapOklchToHex({
    lightness: clamp(source.lightness + calibration.lightnessDelta, 0, 1),
    chroma: source.chroma * calibration.chromaMultiplier,
    hue: normaliseHue(source.hue + calibration.hueDelta),
  });
}

export function getChromaticFamilyTokens(familyName, base = CHROMATIC_FAMILIES[familyName]?.base) {
  const family = CHROMATIC_FAMILIES[familyName];
  if (!family) throw new TypeError(`Unknown chromatic family ${familyName}`);

  return {
    base: base.toLowerCase(),
    dark: deriveChromaticTone(familyName, 'dark', base),
    light: deriveChromaticTone(familyName, 'light', base),
  };
}

function relativeLuminance(hex) {
  const srgb = parseHex(hex);
  return (0.2126 * linearise(srgb.red)) + (0.7152 * linearise(srgb.green)) + (0.0722 * linearise(srgb.blue));
}

export function contrastRatio(first, second) {
  const brighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (brighter + 0.05) / (darker + 0.05);
}

export function validateRegisteredChromaticContrast(bases = {}) {
  return REGISTERED_CHROMATIC_PAIRINGS.map((pairing) => {
    const tokens = getChromaticFamilyTokens(pairing.family, bases[pairing.family] ?? CHROMATIC_FAMILIES[pairing.family].base);
    return {
      ...pairing,
      background: tokens[pairing.tone],
      ratio: contrastRatio(pairing.foreground, tokens[pairing.tone]),
    };
  });
}

/** Reject a proposed Base set when any registered normal-text pairing fails AA. */
export function assertRegisteredChromaticContrast(bases = {}) {
  const validations = validateRegisteredChromaticContrast(bases);
  const failures = validations.filter((validation) => validation.ratio < 4.5);
  if (failures.length > 0) {
    const detail = failures
      .map((failure) => `${failure.token} (${failure.ratio.toFixed(2)}:1)`)
      .join(', ');
    throw new RangeError(`Chromatic Base change fails WCAG AA normal-text contrast: ${detail}`);
  }
  return validations;
}

export function renderChromaticTokensCss() {
  const lines = [
    '/* This file is generated by chromatic-tone-derivation.mjs. Do not edit it directly. */',
    ':root {',
  ];

  for (const [familyName, family] of Object.entries(CHROMATIC_FAMILIES)) {
    const tokens = getChromaticFamilyTokens(familyName);
    lines.push(`  --wex-color-${family.cssName}: ${tokens.base};`);
    lines.push(`  --wex-color-${family.cssName}-dark: ${tokens.dark};`);
    lines.push(`  --wex-color-${family.cssName}-light: ${tokens.light};`);
  }

  lines.push('}', '');
  return lines.join('\n');
}
