import { CustomQuery } from '@vue-storefront/core';

const formatProductVariant = (product, variant) => ({
  _id: product.id,
  _variantId: variant.id,
  _description: variant.attributes.description || product.attributes.description,
  _categoriesRef: product.relationships.taxons.data.map((t) => t.id),
  ...product.attributes,
  ...variant.attributes
});

const findProductVariants = (product, attachments) =>
  attachments.filter((e) => e.type === 'variant' && e.relationships.product.data.id === product.id);

const getVariants = (productsData) =>
  productsData.data.flatMap((product) => {
    const variants = findProductVariants(product, productsData.included);
    return variants.map((variant) => formatProductVariant(product, variant));
  });

const getLimitedVariants = (productsData) =>
  productsData.data.map((product) => {
    const variants = findProductVariants(product, productsData.included);
    const defaultVariant = variants.find((e) => e.attributes.is_master) || variants[0];

    return formatProductVariant(product, defaultVariant);
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getProduct(context, params, _customQuery?: CustomQuery) {
  const response = await context.client.products.axios.get('/api/v2/storefront/products', {
    params: {
      filter: {
        ids: params.id,
        taxons: params.catId
      },
      include: 'variants',
      page: 1,
      // eslint-disable-next-line camelcase
      per_page: params.limit || 10
    }
  });
  return params.limit ? getLimitedVariants(response.data) : getVariants(response.data);
}

