import type { JsonApiDocument, JsonApiResponse } from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi';
import type { IProduct, IProducts } from '@spree/storefront-api-v2-sdk/types/interfaces/Product';
import type { RelationType } from '@spree/storefront-api-v2-sdk/types/interfaces/Relationships';
import type { ApiConfig, ProductVariant, OptionType, OptionValue, Image } from '../../types';
import { extractRelationships, filterAttachments } from './common';

const groupIncluded = <Groups extends keyof any>(included, discriminators): { [key in Groups]: JsonApiDocument[] } => {
  const discriminatorsKeys = Object.keys(discriminators);

  const emptyGroups = discriminatorsKeys.reduce((accumulatedGroups, discriminatorKey) => {
    accumulatedGroups[discriminatorKey] = [];

    return accumulatedGroups;
  }, {});

  const filledGroups = included.reduce((accumulatedGroups, document) => {
    return discriminatorsKeys.reduce((discriminatedGroups, discriminatorKey) => {
      if (discriminators[discriminatorKey](document)) {
        return {
          ...discriminatedGroups,
          [discriminatorKey]: [...discriminatedGroups[discriminatorKey], document]
        };
      }

      return discriminatedGroups;
    }, accumulatedGroups);
  }, emptyGroups);

  return filledGroups;
};

const isVariantOfProduct = (document, productId) => document.type === 'variant' && document.relationships.product.data.id === productId;

const deserializeImages = (included: JsonApiDocument[], documents: JsonApiDocument[]): Image[] => {
  const flattenedImageIdentifiers = documents
    .reduce<RelationType[]>(
      (collectedImageDocuments, imageDocument) => [...collectedImageDocuments, ...imageDocument.relationships.images.data],
      []
    );

  const uniqueImageIdentifiers = flattenedImageIdentifiers.reduce<RelationType[]>(
    (collectedImageDocuments, imageDocumentRelationship) => {
      if (collectedImageDocuments.some((maybeSameImageDocument) => maybeSameImageDocument.id === imageDocumentRelationship.id)) {
        return collectedImageDocuments;
      }

      return [...collectedImageDocuments, imageDocumentRelationship];
    },
    []
  );

  const imageIdentifiersIds = uniqueImageIdentifiers.map((imageDocumentRelationship) => imageDocumentRelationship.id);

  const imageDocuments = filterAttachments(included, 'image', imageIdentifiersIds);

  const sortedImageDocuments = imageDocuments.sort((image1, image2) => Math.sign(image1.attributes.position - image2.attributes.position));

  return sortedImageDocuments
    .map(image => ({
      id: parseInt(image.id, 10),
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
    id: parseInt(optionType.id, 10),
    type: optionType.type,
    name: optionType.attributes.name,
    position: optionType.attributes.position,
    presentation: optionType.attributes.presentation
  }));
};

const deserializeOptionValues = (included, variant): OptionValue[] => {
  const optionValues = extractRelationships(included, 'option_value', 'option_values', variant);

  return optionValues.map(optionValue => ({
    id: parseInt(optionValue.id, 10),
    type: optionValue.attributes.type,
    name: optionValue.attributes.name,
    position: optionValue.attributes.position,
    presentation: optionValue.attributes.presentation,
    optionTypeId: parseInt(optionValue.relationships.option_type.data.id, 10)
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

const partialDeserializeProductVariant = (
  product, variant, attachments: JsonApiDocument[]
): Omit<ProductVariant, 'images'> => ({
  _id: variant.id,
  _productId: product.id,
  _variantId: variant.id,
  _description: variant.attributes.description || product.attributes.description,
  _categoriesRef: product.relationships.taxons.data.map((taxon) => taxon.id),
  name: product.attributes.name,
  slug: product.attributes.slug,
  sku: product.attributes.sku,
  optionTypes: deserializeOptionTypes(attachments, product),
  optionValues: deserializeOptionValues(attachments, variant),
  breadcrumbs: buildBreadcrumbs(attachments, product),
  properties: deserializeProperties(attachments, product),
  displayPrice: variant.attributes.display_price,
  price: {
    original: variant.attributes.price,
    current: variant.attributes.price
  },
  inStock: variant.attributes.in_stock
});

export const deserializeSingleProductVariants = (apiProduct: IProduct): ProductVariant[] => {
  const attachments = apiProduct.included;
  const productId = apiProduct.data.id;
  // primary_variant may not exist if na older version of Spree is used. Only use primary_variant if available.
  const primaryVariantId = (apiProduct.data.relationships.primary_variant?.data as RelationType).id || null;

  const groupedVariants = groupIncluded<'primaryVariants' | 'optionVariants'>(
    attachments,
    {
      primaryVariants: (document) => (isVariantOfProduct(document, productId) && document.id === primaryVariantId),
      optionVariants: (document) => (isVariantOfProduct(document, productId) && document.id !== primaryVariantId)
    }
  );

  if (groupedVariants.optionVariants.length === 0) {
    const images = deserializeImages(attachments, groupedVariants.primaryVariants);

    return [{
      ...partialDeserializeProductVariant(apiProduct.data, groupedVariants.primaryVariants[0], attachments),
      images
    }];
  }

  return groupedVariants.optionVariants.map(
    (variant) => {
      const images = deserializeImages(attachments, [...groupedVariants.primaryVariants, variant]);

      return {
        ...partialDeserializeProductVariant(apiProduct.data, variant, attachments),
        images
      };
    }
  );
};

export const deserializeLimitedVariants = (apiProducts: IProducts): ProductVariant[] => {
  const attachments = apiProducts.included;

  return apiProducts.data.map((product) => {
    const productId = product.id;
    // primary_variant may not exist if na older version of Spree is used. Only use primary_variant if available.
    const primaryVariantId = (product.relationships.primary_variant?.data as RelationType).id || null;

    const groupedVariants = groupIncluded<'primaryVariants' | 'optionVariants' | 'masterVariants' | 'nonMasterVariants'>(
      attachments,
      {
        primaryVariants: (document) => (isVariantOfProduct(document, productId) && document.id === primaryVariantId),
        optionVariants: (document) => (isVariantOfProduct(document, productId) && document.id !== primaryVariantId),
        masterVariants: (document) => (isVariantOfProduct(document, productId) && document.attributes.is_master),
        nonMasterVariants: (document) => (isVariantOfProduct(document, productId) && !document.attributes.is_master)
      }
    );

    const images = deserializeImages(attachments, [...groupedVariants.masterVariants, ...groupedVariants.nonMasterVariants]);

    let variant;

    if (groupedVariants.primaryVariants.length === 0) {
      variant = [...groupedVariants.masterVariants, ...groupedVariants.optionVariants][0];
    } else {
      variant = [...groupedVariants.optionVariants, ...groupedVariants.primaryVariants][0];
    }

    return {
      ...partialDeserializeProductVariant(
        product,
        variant,
        attachments
      ),
      images
    };
  });
};

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

export const addHostToProductImages = <DocumentType extends JsonApiResponse>(apiProductsData: DocumentType, config: ApiConfig): DocumentType => ({
  ...apiProductsData,
  included: addHostToIncluded(apiProductsData.included, config)
});
