const findProductOptionTypes = (product, attachments) => {
  const productOptionTypesIds = product.relationships.option_types.data.map((e) => e.id);
  return attachments.filter((e) => e.type === 'option_type' && productOptionTypesIds.includes(e.id));
};

const findVariantOptionValues = (variant, attachments) => {
  const variantOptionValuesIds = variant.relationships.option_values.data.map((e) => e.id);
  return attachments.filter((e) => e.type === 'option_value' && variantOptionValuesIds.includes(e.id));
};

const findProductVariantImages = (product, variant, attachments) => {
  const productImageIds = product.relationships.images.data.map((image) => image.id);
  const variantImageIds = variant.relationships.images.data.map((image) => image.id);
  const imageIds = variantImageIds.concat(productImageIds);

  return attachments.filter((e) => e.type === 'image' && imageIds.includes(e.id));
};

const findProductProperties = (product, attachments) => {
  const productPropertiesIds = product.relationships.product_properties.data.map((e) => e.id);
  return attachments.filter((e) => e.type === 'product_property' && productPropertiesIds.includes(e.id));
};

const formatProductVariant = (product, variant, attachments) => ({
  _id: product.id,
  _variantId: variant.id,
  _description: variant.attributes.description || product.attributes.description,
  _categoriesRef: product.relationships.taxons.data.map((t) => t.id),
  optionTypes: findProductOptionTypes(product, attachments),
  optionValues: findVariantOptionValues(variant, attachments),
  images: findProductVariantImages(product, variant, attachments),
  properties: findProductProperties(product, attachments),
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

const addHostToImageUrls = (image, context) => ({
  ...image,
  attributes: {
    ...image.attributes,
    styles: image.attributes?.styles ? image.attributes.styles.map((style) => ({
      width: style.width,
      height: style.height,
      url: context.config.backendUrl.concat(style.url)
    })) : []
  }
});

const addHostToUrls = (attachments, context) =>
  attachments.map((e) =>
    e.type === 'image' ? addHostToImageUrls(e, context) : e
  );

const preprocessProductsData = (productsData, context) => ({
  ...productsData,
  included: addHostToUrls(productsData.included, context)
});

export default async function getProduct(context, params) {
  const result = await context.client.products.list({
    filter: {
      ids: params.id,
      taxons: params.catId
    },
    include: 'variants.option_values,option_types,product_properties,images',
    page: 1,
    // eslint-disable-next-line camelcase
    per_page: params.limit || 10
  });

  if (result.isSuccess()) {
    const productsData = preprocessProductsData(result.success(), context);
    return params.limit ? getLimitedVariants(productsData) : getVariants(productsData);
  } else {
    throw result.fail();
  }
}

