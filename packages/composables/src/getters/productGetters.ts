import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { ProductVariant, Image } from '@upsidelab/vue-storefront-spree-api/src/types';

import _ from 'lodash';

type ProductVariantFilters = any

// TODO: Add interfaces for some of the methods in core
// Product

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductName = (product: ProductVariant): string => product?.name || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductSlug = (product: ProductVariant): string => product.sku;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductPrice = (product: ProductVariant): AgnosticPrice => {
  return {
    regular: product?.price?.original || 0,
    special: product?.price?.current || 0
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductGallery = (product: ProductVariant): AgnosticMediaGalleryItem[] => {
  const findImageStyleByDimensions = (image: Image, width: number, height: number) => {
    if (!image.attributes?.styles) return undefined;

    const sortedStyles = _.sortBy(image.attributes.styles, (style) => {
      const widthLoss = Math.abs(width - parseInt(style.width, 10));
      const heightLoss = Math.abs(height - parseInt(style.height, 10));

      return widthLoss + heightLoss;
    });

    return sortedStyles[0].url;
  };

  const findSmallImageStyle = (image: Image) => findImageStyleByDimensions(image, 240, 240);
  const findNormalImageStyle = (image: Image) => findImageStyleByDimensions(image, 350, 468);
  const findBigImageStyle = (image: Image) => findImageStyleByDimensions(image, 650, 870);

  return product.images.map((image) => ({
    small: findSmallImageStyle(image),
    normal: findNormalImageStyle(image),
    big: findBigImageStyle(image)
  }));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductCoverImage = (product: ProductVariant): string => 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg';

export const getProductFiltered = (products: ProductVariant[], filters: ProductVariantFilters | any = {}): ProductVariant[] => {
  if (!products) return [];

  const filterAttributes = filters.attributes;

  const filterByAttributes = (product: ProductVariant) => {
    if (filterAttributes) {
      return Object.entries(filterAttributes).every(([attrName, attrVal]) => {
        const optionType = product.optionTypes.find((ot) => ot.attributes.name === attrName);
        if (!optionType) return false;

        return product.optionValues.some((ov) => ov.relationships.option_type.data.id === optionType.id && ov.attributes.presentation === attrVal);
      });
    }

    return true;
  };

  return products.filter(filterByAttributes);
};

export const getProductAttributes = (products: ProductVariant[] | ProductVariant, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  const isSingleProduct = !Array.isArray(products);
  const productList = (isSingleProduct ? [products] : products) as ProductVariant[];
  if (!products || productList.length === 0) {
    return {};
  }

  const optionTypes = _.uniqBy(productList.flatMap((product) => product.optionTypes), (ot) => ot.id);
  const optionValues = _.uniqBy(productList.flatMap((product) => product.optionValues), (ov) => ov.id);

  const findOptionTypeName = (optionValue) => {
    const optionType = optionTypes.find((optionType) => optionType.id === optionValue.relationships.option_type.data.id);

    return optionType ? optionType.attributes.name : undefined;
  };

  const options = optionValues.map((currOptionValue) => {
    const currOptionTypeName = findOptionTypeName(currOptionValue);

    return {
      name: currOptionTypeName,
      value: currOptionValue.attributes.presentation,
      label: currOptionValue.attributes.presentation
    };
  }).filter((option) => filterByAttributeName ? filterByAttributeName.includes(option.name) : true);

  return options.reduce((acc, currAttr) => ({
    ...acc,
    [currAttr.name]: isSingleProduct ? currAttr.value : (acc[currAttr.name] || []).concat([currAttr])
  }), {});
};

export const getProductOptionTypeNames = (product: ProductVariant): string[] => {
  return product.optionTypes.map((optionType) => optionType.attributes.name);
};

export const getProductDescription = (product: ProductVariant): any => (product as any)?._description || '';

export const getProductCategoryIds = (product: ProductVariant): string[] => (product as any)?._categoriesRef || '';

export const getProductId = (product: ProductVariant): string => (product as any)?._id || '';

export const getFormattedPrice = (price: number) => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductTotalReviews = (product: ProductVariant): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAverageRating = (product: ProductVariant): number => 0;

export const getProductProperties = (product: ProductVariant) =>
  product.properties.map((property) => ({
    ...property.attributes
  }));

const productGetters: ProductGetters<ProductVariant, ProductVariantFilters> = {
  getName: getProductName,
  getSlug: getProductSlug,
  getPrice: getProductPrice,
  getGallery: getProductGallery,
  getCoverImage: getProductCoverImage,
  getFiltered: getProductFiltered,
  getAttributes: getProductAttributes,
  getDescription: getProductDescription,
  getCategoryIds: getProductCategoryIds,
  getId: getProductId,
  getFormattedPrice: getFormattedPrice,
  getTotalReviews: getProductTotalReviews,
  getAverageRating: getProductAverageRating,
  getOptionTypeNames: getProductOptionTypeNames,
  getProperties: getProductProperties
};

export default productGetters;
