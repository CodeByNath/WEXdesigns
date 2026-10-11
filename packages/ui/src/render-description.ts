/** A narrow, platform-neutral structural description for shared UI output. */
export type RenderDescription = RenderElementDescription | RenderTextDescription;

export interface RenderElementDescription {
  readonly kind: 'element';
  readonly tagName: 'span';
  readonly classNames: readonly string[];
  readonly attributes: Readonly<Record<string, string>>;
  readonly children: readonly RenderDescription[];
}

export interface RenderTextDescription {
  readonly kind: 'text';
  readonly value: string;
}
