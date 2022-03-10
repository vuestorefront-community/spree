import { JsonApiDocument } from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi';
import {
  ApiConfig,
  Wishlist,
  WishedProduct,
  ProductVariant
} from '../../types';
import { extractRelationships, extractSingleRelationship } from './common';

const deserializeWishedProductImage = (
  images: JsonApiDocument[],
  backendUrl: string
): string => {
  if (!images || images.length < 1) return undefined;

  const imageUrl = images[0].attributes.original_url;
  return backendUrl.concat(imageUrl);
};

const deserializeWishedProduct = (
  wishedProduct: JsonApiDocument,
  included: JsonApiDocument[],
  config: ApiConfig
): WishedProduct => {
  const variant = extractSingleRelationship(included, 'variant', wishedProduct);
  const product = extractSingleRelationship(included, 'product', variant);
  const images = extractRelationships(included, 'image', 'images', variant);

  return {
    wishedProductId: wishedProduct.id,
    variantId: variant?.id,
    name: product?.attributes.name,
    sku: variant?.attributes.sku,
    price: variant?.attributes.price,
    displayPrice: variant?.attributes.display_price,
    image: deserializeWishedProductImage(images, config.backendUrl)
  };
};

export const deserializeWishlist = (
  data: JsonApiDocument,
  included: JsonApiDocument[],
  config: ApiConfig,
  wishedProductDocumentType: string,
  wishedProductsRelationshipName: string
): Wishlist => {
  const wishedProducts = extractRelationships(
    included,
    wishedProductDocumentType,
    wishedProductsRelationshipName,
    data
  );

  const deserializedWishedProducts = wishedProducts.map(e => deserializeWishedProduct(e, included, config));

  return {
    token: data.attributes.access_hash || data.attributes.token,
    wishedProducts: deserializedWishedProducts
  };
};

export const serializeWishedProduct = (
  product: ProductVariant
  // eslint-disable-next-line camelcase
): { variant_id: string; quantity: number } => ({
  variant_id: String(product._variantId),
  quantity: 1
});
