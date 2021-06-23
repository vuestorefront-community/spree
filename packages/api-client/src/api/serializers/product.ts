import { ApiConfig, ProductVariant } from '../../types';
import { extractRelationships, filterAttachments } from './common';

const deserializeImages = (included, product, variant) => {
  const productIds = product.relationships.images.data.map((e) => e.id);
  const variantIds = variant.relationships.images.data.map((e) => e.id);
  const imageIds = variantIds.concat(productIds);

  return filterAttachments(included, 'image', imageIds);
};

const deserializeProperties = (included, product) => {
  const properties = extractRelationships(included, 'product_property', 'product_properties', product);

  return properties.map(property => ({
    name: property.attributes.description,
    value: property.attributes.value
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

const deserializeProductVariant = (product, variant, attachments): ProductVariant => ({
  _id: product.id,
  _variantId: variant.id,
  _description: variant.attributes.description || product.attributes.description,
  _categoriesRef: product.relationships.taxons.data.map((t) => t.id),
  optionTypes: extractRelationships(attachments, 'option_type', 'option_types', product),
  optionValues: extractRelationships(attachments, 'option_value', 'option_values', variant),
  images: deserializeImages(attachments, product, variant),
  breadcrumbs: buildBreadcrumbs(attachments, product),
  properties: deserializeProperties(attachments, product),
  displayPrice: variant.attributes.display_price,
  inStock: variant.attributes.in_stock,
  shortDescription: product.attributes.short_description,
  ...product.attributes,
  ...variant.attributes
});

const findProductVariants = (product, included) =>
  included.filter((e) => e.type === 'variant' && e.relationships.product.data.id === product.id);

export const deserializeVariants = (apiProducts) =>
  apiProducts.data.flatMap((product) => {
    const variants = findProductVariants(product, apiProducts.included);
    return variants.map((variant) => deserializeProductVariant(product, variant, apiProducts.included));
  });

export const deserializeLimitedVariants = (apiProducts) =>
  apiProducts.data.map((product) => {
    const attachments = apiProducts.included;
    const variants = findProductVariants(product, attachments);
    const defaultVariant = variants.find((e) => e.attributes.is_master) || variants[0];

    return deserializeProductVariant(product, defaultVariant, attachments);
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

const addHostToIncluded = (included, config: ApiConfig) =>
  included.map((e) =>
    e.type === 'image' ? addHostToImage(e, config) : e
  );

export const addHostToProductImages = (apiProductsData, config: ApiConfig) => ({
  ...apiProductsData,
  included: addHostToIncluded(apiProductsData.included, config)
});
