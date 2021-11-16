import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { ProductVariant, Image } from '@vue-storefront/spree-api/src/types';

import _ from 'lodash';

type ProductVariantFilters = any

// TODO: Add interfaces for some of the methods in core
// Product

export const getProductName = (product: ProductVariant): string => product?.name || 'Product\'s name';

export const getProductSlug = (product: ProductVariant): string => product.slug;

export const getProductPrice = (product: ProductVariant): AgnosticPrice => {
  return {
    regular: product?.price?.current,
    special: undefined
  };
};

const findImageStyleUrlByDimensions = (image: Image, width: number, height: number) => {
  if (!image) {
    return undefined;
  }

  const styles = image.styles;
  if (styles.length === 0) {
    return undefined;
  }

  const sortedStyles = _.sortBy(styles, (style) => {
    const widthLoss = Math.abs(width - style.width);
    const heightLoss = Math.abs(height - style.height);

    return widthLoss + heightLoss;
  });

  return sortedStyles[0].url;
};

export const getProductGallery = (product: ProductVariant): AgnosticMediaGalleryItem[] => {
  if (!product) return [];

  const findSmallImageStyle = (image: Image) => findImageStyleUrlByDimensions(image, 240, 240);
  const findNormalImageStyle = (image: Image) => findImageStyleUrlByDimensions(image, 350, 468);
  const findBigImageStyle = (image: Image) => findImageStyleUrlByDimensions(image, 650, 870);

  return product.images.map((image) => ({
    mobile: { url: findSmallImageStyle(image) },
    desktop: { url: findNormalImageStyle(image) },
    big: { url: findBigImageStyle(image) },
    alt: product.name
  })) as any;
};

export const getProductCoverImage = (product: ProductVariant): string => {
  if (!product) return undefined;

  const mainProductImage = product.images[0];
  if (!mainProductImage) {
    return undefined;
  }

  const styles = mainProductImage.styles;
  if (!styles || styles.length === 0) {
    return undefined;
  }

  const largestStyle = styles.reduce((prev, curr) => curr.height > prev.height ? curr : prev);
  return largestStyle.url;
};

export const getProductFiltered = (products: ProductVariant[], filters: ProductVariantFilters | any = {}): ProductVariant[] => {
  if (!products || products.length === 0) return [];

  const filterAttributes = filters.attributes;

  const filterByAttributes = (product: ProductVariant) => {
    if (filterAttributes) {
      return Object.entries(filterAttributes).every(([attrName, attrVal]) => {
        const optionType = product.optionTypes.find((ot) => ot.name === attrName);
        if (!optionType) return false;

        return product.optionValues.some((ov) => ov.optionTypeId === optionType.id && ov.presentation === attrVal);
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
    const optionType = optionTypes.find((optionType) => optionType.id === optionValue.optionTypeId);

    return optionType ? optionType.name : undefined;
  };

  const options = optionValues.map((currOptionValue) => {
    const currOptionTypeName = findOptionTypeName(currOptionValue);

    return {
      name: currOptionTypeName,
      value: currOptionValue.presentation,
      label: currOptionValue.presentation
    };
  }).filter((option) => filterByAttributeName ? filterByAttributeName.includes(option.name) : true);

  return options.reduce((acc, currAttr) => ({
    ...acc,
    [currAttr.name]: isSingleProduct ? currAttr.value : (acc[currAttr.name] || []).concat([currAttr])
  }), {});
};

export const getProductOptionTypeNames = (product: ProductVariant): string[] => product
  ? product.optionTypes.map((optionType) => optionType.name)
  : [];

export const getProductDescription = (product: ProductVariant): any => (product as any)?.shortDescription || '';

export const getProductCategoryIds = (product: ProductVariant): string[] => (product as any)?._categoriesRef || '';

export const getProductId = (product: ProductVariant): string => (product as any)?._id || '';

export const getFormattedPrice = (product): string => product?.displayPrice || '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductTotalReviews = (product: ProductVariant): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAverageRating = (product: ProductVariant): number => 0;

export const getProductProperties = (product: ProductVariant) => product ? product.properties : [];

export const getProductBreadcrumbs = (product: ProductVariant) => product ? product.breadcrumbs : [];

export const getProductInStock = (product: ProductVariant): boolean => product?.inStock || false;

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
  getProperties: getProductProperties,
  getBreadcrumbs: getProductBreadcrumbs,
  getInStock: getProductInStock
};

export default productGetters;
