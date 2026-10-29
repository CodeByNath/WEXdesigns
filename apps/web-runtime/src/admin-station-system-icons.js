const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const OUTLINE_STROKE_WIDTH = '1.5';

/** @typedef {'table' | 'columns' | 'filter'} ServiceActionIconName */

/* Heroicons 24/outline action glyphs, MIT License, Copyright Tailwind Labs. */
/** @type {Record<ServiceActionIconName, ReadonlyArray<readonly [string, Readonly<Record<string, string>>]>>} */
const serviceActionShapes = {
  table: [
    ['path', { d: 'M3.75 3v18h16.5V3H3.75ZM3.75 9h16.5M3.75 15h16.5M9.75 3v18M15.75 3v18' }],
  ],
  columns: [
    ['path', { d: 'M3.75 5.25h16.5v13.5H3.75zM9 5.25v13.5M15 5.25v13.5' }],
  ],
  filter: [
    ['path', { d: 'M3.75 4.5h16.5L14.25 12v5.25l-4.5 2.25V12L3.75 4.5Z' }],
  ],
};

/** @param {Document} document @param {ServiceActionIconName} name */
export function createServiceActionIcon(document, name) {
  const svg = document.createElementNS(SVG_NAMESPACE, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', OUTLINE_STROKE_WIDTH);
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  serviceActionShapes[name].forEach(([shape, attributes]) => {
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
