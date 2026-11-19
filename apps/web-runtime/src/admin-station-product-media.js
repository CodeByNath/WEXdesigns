import { createProductSectionHead } from './admin-station-product-sections.js';
import { labelledRows, node } from './admin-station-product-summary.js';
import { allServicesPreviewSnapshot } from './admin-station-services.js';

/** @typedef {{ src: string, alt: string }} ProductMediaImage */
/** @typedef {{ videoUrl: string, hero: ProductMediaImage, gallery: ReadonlyArray<ProductMediaImage> }} ProductMedia */

/* Presentation-only fixture: reuse the existing Studio image assets until product media is supplied. */
const previewImages = allServicesPreviewSnapshot.services.map((service) => ({ src: service.imageUrl, alt: service.name }));
/** @type {ProductMedia} */
const productMediaFixture = {
  videoUrl: 'https://www.youtube.com/watch?v=XqD4j_iFyiQ',
  hero: previewImages[0] ?? { src: '', alt: '' },
  gallery: previewImages,
};

/** The Overview image frame with Owner-directed Media sizes. @param {Document} document @param {ProductMediaImage} value */
function picture(document, value) {
  const frame = node(document, 'div', 'wex-admin-product-summary__image wex-admin-product-media__image');
  const image = document.createElement('img');
  image.src = value.src;
  image.alt = value.alt;
  image.loading = 'lazy';
  frame.append(image);
  return frame;
}

/** Read-only Media presentation; editing and asset management belong to the requester. @param {HTMLElement} shell @param {ProductMedia} [product] */
export function createProductMedia(shell, product = productMediaFixture) {
  const document = shell.ownerDocument;
  const section = node(document, 'section', 'wex-admin-product-media');
  section.setAttribute('aria-label', 'Product media');
  const gallery = node(document, 'ul', 'wex-admin-product-media__gallery');
  product.gallery.forEach((value) => {
    const item = document.createElement('li');
    item.append(picture(document, value));
    gallery.append(item);
  });
  section.append(
    createProductSectionHead(document, 'media'),
    labelledRows(document, [
      ['Video URL', node(document, 'p', 'wex-admin-product-media__url wex-type-navigation-small-semibold', product.videoUrl)],
      ['Hero image', picture(document, product.hero)],
      ['Gallery images', gallery],
    ]),
  );
  return section;
}
