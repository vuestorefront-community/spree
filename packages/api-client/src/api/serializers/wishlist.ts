import { JsonApiDocument } from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi';
import { Wishlist, WishedProduct } from '../../types';
import { extractRelationships, extractSingleRelationship } from './common';

const deserializeWishedProduct = (wishedProduct: JsonApiDocument, included: JsonApiDocument[]): WishedProduct => {
  const variant = extractSingleRelationship(included, 'variant', wishedProduct);
  const product = extractSingleRelationship(included, 'product', variant);

  return {
    wishedProductId: wishedProduct.id,
    variantId: variant.id,
    name: product.attributes.name,
    sku: variant.attributes.sku,
    price: variant.attributes.price,
    displayPrice: variant.attributes.display_price
  };
};

const deserializeWishedProducts = (data: JsonApiDocument, included: JsonApiDocument[]): WishedProduct[] => {
  const wishedProducts = extractRelationships(included, 'wished_product', 'wished_products', data);

  return wishedProducts.map(wishedProduct => deserializeWishedProduct(wishedProduct, included));
};

export const deserializeWishlist = (data: JsonApiDocument, included: JsonApiDocument[]): Wishlist => ({
  token: data.attributes.access_hash,
  wishedProducts: deserializeWishedProducts(data, included)
});
