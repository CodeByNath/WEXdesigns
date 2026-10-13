/** A narrow, platform-neutral structural description for shared UI output. */
export type RenderDescription = RenderElementDescription | RenderImageDescription | RenderTextDescription;

export interface RenderElementDescription {
  readonly kind: 'element';
  readonly tagName: 'span';
  readonly classNames: readonly string[];
  readonly attributes: Readonly<Record<string, string>>;
  readonly children: readonly RenderDescription[];
}

export interface RenderImageDescription {
  readonly kind: 'image';
  readonly tagName: 'img';
  readonly classNames: readonly string[];
  readonly attributes: Readonly<Record<string, string>>;
}

export interface RenderTextDescription {
  readonly kind: 'text';
  readonly value: string;
}
