import { JsonApiDocument, JsonApiResponse } from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi';
import { ApiConfig, ProductVariant, OptionType, OptionValue } from '../../types';
import { extractRelationships, filterAttachments } from './common';

const deserializeImages = (included, mainVariant, fallbackVariant) => {
  let mainVariantImageIds = [];

  if (mainVariant) {
    mainVariantImageIds = mainVariant.relationships.images.data.map((e) => e.id);
  }

  let fallbackVariantImageIds = [];

  if (fallbackVariant) {
    fallbackVariantImageIds = fallbackVariant.relationships.images.data.map((e) => e.id);
  }

  const imageIds = new Set(mainVariantImageIds.concat(fallbackVariantImageIds));

  const images = filterAttachments(included, 'image', Array.from(imageIds));

  const sortedImages = images
    .sort((image1, image2) => Math.sign(image1.attributes.position - image2.attributes.position));

  return sortedImages
    .map(image => ({
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
  const breadcrumbs = [{ text: 'Home', link: '/' }];

  const addTaxonToBreadcrumbs = (item) => {
    const parentId = item.relationships.parent?.data?.id;
    const parent = parentId ? filterAttachments(included, 'taxon', parentId)[0] : undefined;
    if (parent) addTaxonToBreadcrumbs(parent);

    breadcrumbs.push({
      text: item.attributes.name,
      link: `/c/${item.attributes.permalink}`
    });
  };

  addTaxonToBreadcrumbs(taxons[0]);

  breadcrumbs.push({
    text: product.attributes.name,
    link: product.attributes.slug
  });

  return breadcrumbs;
};

const deserializeProductVariant = (product, mainVariant, fallbackVariant, attachments): ProductVariant => ({
  _id: mainVariant.id,
  _productId: product.id,
  _variantId: mainVariant.id,
  _description: mainVariant.attributes.description || product.attributes.description,
  _categoriesRef: product.relationships.taxons.data.map((taxon) => taxon.id),
  name: product.attributes.name,
  slug: product.attributes.slug,
  sku: product.attributes.sku,
  optionTypes: deserializeOptionTypes(attachments, product),
  optionValues: deserializeOptionValues(attachments, mainVariant),
  images: deserializeImages(attachments, mainVariant, fallbackVariant),
  breadcrumbs: buildBreadcrumbs(attachments, product),
  properties: deserializeProperties(attachments, product),
  displayPrice: mainVariant.attributes.display_price,
  price: {
    original: mainVariant.attributes.price,
    current: mainVariant.attributes.price
  },
  inStock: mainVariant.attributes.in_stock
});

const groupIncluded = (included, discriminators) => {
  const discriminatorsKeys = Object.keys(discriminators);

  const emptyGroups = discriminatorsKeys.reduce((accumulatedGroups, discriminatorKey) => {
    accumulatedGroups[discriminatorKey] = [];

    return accumulatedGroups;
  }, {});

  const filledGroups = included.reduce((accumulatedGroups, document) => {
    discriminatorsKeys.forEach((discriminatorKey) => {
      if (discriminators[discriminatorKey](document)) {
        accumulatedGroups[discriminatorKey].push(document);
      }
    });

    return accumulatedGroups;
  }, emptyGroups);

  return filledGroups;
};

const isVariantOfParent = (document, parentId) => document.type === 'variant' && document.relationships.product.data.id === parentId;

export const deserializeSingleProductVariants = (apiProduct) => {
  const attachments = apiProduct.included;
  const productId = apiProduct.data.id;

  const variants = groupIncluded(
    attachments,
    {
      primaryVariants: (document) => (isVariantOfParent(document, productId) && document.attributes.is_master),
      optionVariants: (document) => (isVariantOfParent(document, productId) && !document.attributes.is_master)
    }
  );
  const primaryVariant = variants.primaryVariants[0];

  return variants.optionVariants.map(
    (variant) => deserializeProductVariant(apiProduct.data, variant, primaryVariant, attachments)
  );
};

export const deserializeLimitedVariants = (apiProducts) => {
  const attachments = apiProducts.included;

  return apiProducts.data.map((product) => {
    const productId = product.id;
    const defaultVariantId = product.relationships.default_variant.data.id;

    const variants = groupIncluded(
      attachments,
      {
        primaryVariants: (document) => (isVariantOfParent(document, productId) && document.attributes.is_master),
        defaultOptionVariants: (document) => (
          isVariantOfParent(document, productId) &&
          !document.attributes.is_master &&
          defaultVariantId === document.id
        )
      }
    );

    const primaryVariant = variants.primaryVariants[0];
    const defaultOptionVariant = variants.defaultOptionVariants[0];

    return deserializeProductVariant(product, primaryVariant, defaultOptionVariant, attachments);
  });
};

export const deserializeSearchMetadata = (searchMetadata) => ({
  totalPages: parseInt(searchMetadata.total_pages, 10),
  totalCount: parseInt(searchMetadata.total_count, 10),
  count: parseInt(searchMetadata.count, 10)
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
