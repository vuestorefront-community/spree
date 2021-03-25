import { CustomQuery } from '@vue-storefront/core';

const findProductOptionTypes = (product, attachments) => {
  const productOptionTypesIds = product.relationships.option_types.data.map((e) => e.id);
  return attachments.filter((e) => e.type === 'option_type' && productOptionTypesIds.includes(e.id));
};

const findVariantOptionValues = (variant, attachments) => {
  const variantOptionValuesIds = variant.relationships.option_values.data.map((e) => e.id);
  return attachments.filter((e) => e.type === 'option_value' && variantOptionValuesIds.includes(e.id));
};

const formatProductVariant = (product, variant, attachments) => ({
  _id: product.id,
  _variantId: variant.id,
  _description: variant.attributes.description || product.attributes.description,
  _categoriesRef: product.relationships.taxons.data.map((t) => t.id),
  optionTypes: findProductOptionTypes(product, attachments),
  optionValues: findVariantOptionValues(variant, attachments),
  ...product.attributes,
  ...variant.attributes
});

const findProductVariants = (product, attachments) =>
  attachments.filter((e) => e.type === 'variant' && e.relationships.product.data.id === product.id);

const getVariants = (productsData) =>
  productsData.data.flatMap((product) => {
    const attachments = productsData.included;
    const variants = findProductVariants(product, attachments);
    return variants.map((variant) => formatProductVariant(product, variant, attachments));
  });

const getLimitedVariants = (productsData) =>
  productsData.data.map((product) => {
    const attachments = productsData.included;
    const variants = findProductVariants(product, attachments);
    const defaultVariant = variants.find((e) => e.attributes.is_master) || variants[0];

    return formatProductVariant(product, defaultVariant, attachments);
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getProduct(context, params, _customQuery?: CustomQuery) {
  const result = await context.client.products.list({
    filter: {
      ids: params.id,
      taxons: params.catId
    },
    include: 'variants.option_values,option_types',
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

