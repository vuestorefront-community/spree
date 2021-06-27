import { JsonApiDocument, JsonApiResponse } from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi';
import { ApiConfig, ProductVariant, OptionType, OptionValue } from '../../types';
import { extractRelationships, filterAttachments } from './common';

const deserializeImages = (included, defaultVariant, variant) => {
  let defaultVariantImageIds = [];
  if (defaultVariant.images && defaultVariant.images.data) {
    defaultVariantImageIds = defaultVariant.images.data.map((e) => e.id);
  }
  let variantImageIds = [];
  if (variant.relationships.images && variant.relationships.images.data) {
    variantImageIds = variant.relationships.images.data.map((e) => e.id);
  }

  const imageIds = new Set(defaultVariantImageIds.concat(variantImageIds));

  const images = filterAttachments(included, 'image', Array.from(imageIds));
  return images.map(image => ({
    id: image.id,
    styles: image.attributes.styles.map(style => ({
      url: style.url,
      width: parseInt(style.width, 10),
      height: parseInt(style.height, 10)
    }))
  }));
};

const deserializeProperties = (included, product) => {
  const properties = extractRelationships(included, 'product_property', 'product_properties', product);

  return properties.map(property => ({
    name: property.attributes.description,
    value: property.attributes.value
  }));
};

const deserializeOptionTypes = (included, product): OptionType[] => {
  const optionTypes = extractRelationships(included, 'option_type', 'option_types', product);
  return optionTypes.map(optionType => ({
    id: optionType.id,
    name: optionType.attributes.name,
    position: optionType.attributes.position,
    presentation: optionType.attributes.presentation
  }));
};

const deserializeOptionValues = (included, variant): OptionValue[] => {
  const optionValues = extractRelationships(included, 'option_value', 'option_values', variant);
  return optionValues.map(optionValue => ({
    id: optionValue.id,
    name: optionValue.attributes.name,
    position: optionValue.attributes.position,
    presentation: optionValue.attributes.presentation,
    optionTypeId: optionValue.relationships.option_type.data.id
  }));
};

const buildBreadcrumbs = (included, product) => {
  const taxons = extractRelationships(included, 'taxon', 'taxons', product);

  const rootBreadcrumb = {
    text: 'Home',
    link: '/'
  };

  const breadcrumbs = [rootBreadcrumb];

  const taxon = taxons[0].attributes;
  const categoryBreadcrumbs = [];
  const texts = taxon.pretty_name.split(' -> ').slice(1);
  const links = taxon.permalink.split('/');

  texts.forEach((text, index) => {
    categoryBreadcrumbs.push({
      text,
      link: index === 0 ? `/c/${links[0]}` : `${categoryBreadcrumbs[index - 1].link}/${links[index]}`
    });
  });

  breadcrumbs.push(...categoryBreadcrumbs);

  const productBreadcrumb = {
    text: product.attributes.name,
    link: product.attributes.slug
  };

  breadcrumbs.push(productBreadcrumb);

  return breadcrumbs;
};

const deserializeProductVariant = (product, variant, defaultVariant, attachments): ProductVariant => ({
  _id: variant.id,
  _productId: product.id,
  _description: variant.attributes.description || product.attributes.description,
  _categoriesRef: product.relationships.taxons.data.map((t) => t.id),
  name: product.attributes.name,
  slug: product.attributes.slug,
  sku: product.attributes.sku,
  optionTypes: deserializeOptionTypes(attachments, product),
  optionValues: deserializeOptionValues(attachments, variant),
  images: deserializeImages(attachments, defaultVariant, variant),
  breadcrumbs: buildBreadcrumbs(attachments, product),
  properties: deserializeProperties(attachments, product),
  displayPrice: variant.attributes.display_price,
  price: {
    original: variant.attributes.price,
    current: variant.attributes.price
  },
  inStock: variant.attributes.in_stock
});

const findProductVariants = (product, included) =>
  included.filter((e) => e.type === 'variant' && e.relationships.product.data.id === product.id);

export const deserializeVariants = (apiProducts) =>
  apiProducts.data.flatMap((product) => {
    const variants = findProductVariants(product, apiProducts.included);
    const defaultVariant = variants.find((e) => e.attributes.is_master) || variants[0];
    return variants.map((variant) => deserializeProductVariant(product, variant, defaultVariant, apiProducts.included));
  });

export const deserializeLimitedVariants = (apiProducts) =>
  apiProducts.data.map((product) => {
    const attachments = apiProducts.included;
    const variants = findProductVariants(product, attachments);
    const defaultVariant = variants.find((e) => e.attributes.is_master) || variants[0];

    return deserializeProductVariant(product, defaultVariant, defaultVariant, attachments);
  });

const addHostToImage = (image, config: ApiConfig) => ({
  ...image,
  attributes: {
    ...image.attributes,
    styles: image.attributes?.styles ? image.attributes.styles.map((style) => ({
      width: style.width,
      height: style.height,
      url: config.backendUrl + style.url
    })) : []
  }
});

const addHostToIncluded = (included: JsonApiDocument[], config: ApiConfig) =>
  included.map((e) =>
    e.type === 'image' ? addHostToImage(e, config) : e
  );

export const addHostToProductImages = (apiProductsData: JsonApiResponse, config: ApiConfig) => ({
  ...apiProductsData,
  included: addHostToIncluded(apiProductsData.included, config)
});
