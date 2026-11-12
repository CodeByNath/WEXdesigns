const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const OUTLINE_STROKE_WIDTH = '1.5';

/** @typedef {'list' | 'table' | 'columns' | 'filter' | 'plus' | 'user' | 'x' | 'chevron-down' | 'chevron-left' | 'chevron-right' | 'calendar' | 'tag' | 'layers' | 'tool' | 'cart' | 'user-group' | 'presentation-chart-bar'} SystemIconName */

/* Heroicons 24/outline system glyphs, MIT License, Copyright Tailwind Labs. */
/** @type {Record<SystemIconName, ReadonlyArray<readonly [string, Readonly<Record<string, string>>]>>} */
const systemIconShapes = {
  list: [
    ['path', { d: 'M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75ZM3.75 12h.007v.008H3.75V12Zm0 5.25h.007v.008H3.75V17.25Z' }],
  ],
  table: [
    ['path', { d: 'M3.75 3v18h16.5V3H3.75ZM3.75 9h16.5M3.75 15h16.5M9.75 3v18M15.75 3v18' }],
  ],
  columns: [
    ['path', { d: 'M3.75 5.25h16.5v13.5H3.75zM9 5.25v13.5M15 5.25v13.5' }],
  ],
  filter: [
    ['path', { d: 'M3.75 4.5h16.5L14.25 12v5.25l-4.5 2.25V12L3.75 4.5Z' }],
  ],
  plus: [
    ['path', { d: 'M12 4.5v15m7.5-7.5h-15' }],
  ],
  user: [
    ['circle', { cx: '12', cy: '8.25', r: '3.25' }],
    ['path', { d: 'M5.25 20.25a6.75 6.75 0 0 1 13.5 0' }],
  ],
  x: [
    ['path', { d: 'M6 18 18 6M6 6l12 12' }],
  ],
  'chevron-down': [
    ['path', { d: 'm6.75 9 5.25 5.25L17.25 9' }],
  ],
  'chevron-left': [
    ['path', { d: 'm14.25 18-6-6 6-6' }],
  ],
  'chevron-right': [
    ['path', { d: 'm9.75 18 6-6-6-6' }],
  ],
  calendar: [
    ['path', { d: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5' }],
  ],
  tag: [
    ['path', { d: 'M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3ZM6 6h.008v.008H6V6Z' }],
  ],
  tool: [
    ['path', { d: 'M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z' }],
    ['path', { d: 'M4.867 19.125h.008v.008h-.008v-.008Z' }],
  ],
  cart: [
    ['path', { d: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z' }],
  ],
  'user-group': [
    ['path', { d: 'M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z' }],
  ],
  'presentation-chart-bar': [
    ['path', { d: 'M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6' }],
  ],
  layers: [
    ['path', { d: 'M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3' }],
  ],
};

/** The names `createSystemIcon` accepts. */
export const systemIconNames = new Set(Object.keys(systemIconShapes));

/** @param {Document} document @param {SystemIconName} name */
export function createSystemIcon(document, name) {
  const svg = document.createElementNS(SVG_NAMESPACE, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', OUTLINE_STROKE_WIDTH);
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  systemIconShapes[name].forEach(([shape, attributes]) => {
    const node = document.createElementNS(SVG_NAMESPACE, shape);
    Object.entries(attributes).forEach(([attribute, value]) => node.setAttribute(attribute, value));
    svg.append(node);
  });
  return svg;
}

/** @param {Document} document @param {'default'|'small'} [size] */
export function createMoreActionIcon(document, size = 'default') {
  const svg = document.createElementNS(SVG_NAMESPACE, 'svg');
  svg.classList.add('wex-more-action-icon');
  if (size === 'small') svg.classList.add('wex-more-action-icon--small');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  ['6', '12', '18'].forEach((cx) => {
    const dot = document.createElementNS(SVG_NAMESPACE, 'circle');
    dot.setAttribute('cx', cx);
    dot.setAttribute('cy', '12');
    dot.setAttribute('r', '1.5');
    svg.append(dot);
  });
  return svg;
}
