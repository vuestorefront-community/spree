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
  const result = await context.client.products.list({
    filter: {
      ids: params.id,
      taxons: params.catId
    },
    include: 'variants',
    page: 1,
    // eslint-disable-next-line camelcase
    per_page: params.limit || 10
  });

  if (result.isSuccess()) {
    const productsData = result.success();
    return params.limit ? getLimitedVariants(productsData) : getVariants(productsData);
  } else {
    throw result.fail();
  }
}

