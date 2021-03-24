import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { ProductVariant } from '@upsidelab/vue-storefront-spree-api/src/types';

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
export const getProductGallery = (product: ProductVariant): AgnosticMediaGalleryItem[] => [
  {
    small: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg',
    normal: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg',
    big: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
  },
  {
    small: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg',
    normal: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg',
    big: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
  }
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductCoverImage = (product: ProductVariant): string => 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductFiltered = (products: ProductVariant[], filters: ProductVariantFilters | any = {}): ProductVariant[] => {
  // return [
  //   {
  //     _id: 1,
  //     _description: 'Some description',
  //     _categoriesRef: [
  //       '1',
  //       '2'
  //     ],
  //     name: 'Black jacket',
  //     sku: 'black-jacket',
  //     images: [
  //       'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
  //     ],
  //     price: {
  //       original: 12.34,
  //       current: 10.00
  //     }
  //   },
  //   {
  //     _id: 2,
  //     _description: 'Some different description',
  //     _categoriesRef: [
  //       '1',
  //       '2',
  //       '3'
  //     ],
  //     name: 'White shirt',
  //     sku: 'white-shirt',
  //     images: [
  //       'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
  //     ],
  //     price: {
  //       original: 15.11,
  //       current: 11.00
  //     }
  //   }
  // ];
  // PoC: Filtering disabled
  return products;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const getProductDescription = (product: ProductVariant): any => (product as any)?._description || '';

export const getProductCategoryIds = (product: ProductVariant): string[] => (product as any)?._categoriesRef || '';

export const getProductId = (product: ProductVariant): string => (product as any)?._id || '';

export const getFormattedPrice = (price: number) => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductTotalReviews = (product: ProductVariant): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAverageRating = (product: ProductVariant): number => 0;

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
  getAverageRating: getProductAverageRating
};

export default productGetters;
