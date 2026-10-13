/**
 * Materializes the small shared structural-description contract for this web
 * platform. It deliberately knows no component or application semantics.
 *
 * @param {import('@weerax/ui').RenderDescription} description
 * @returns {Node}
 */
export function materializeRenderDescription(description) {
  if (description.kind === 'text') return document.createTextNode(description.value);

  const element = document.createElement(description.tagName);
  element.classList.add(...description.classNames);
  Object.entries(description.attributes).forEach(([name, value]) => element.setAttribute(name, value));
  if (description.kind === 'element') {
    description.children.forEach((child) => element.append(materializeRenderDescription(child)));
  }
  return element;
}
