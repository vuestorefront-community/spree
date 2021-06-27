import { AgnosticBreadcrumb } from '@vue-storefront/core';

export type OptionValue = {
  id: number;
  type: string;
  name: string;
  position: number;
  presentation: string;
  optionTypeId: number;
};

export type OptionType = {
  id: number;
  type: string;
  name: string;
  position: number;
  presentation: string;
};

export type ImageStyle = {
  height: string;
  width: string;
  url: string;
};

export type Image = {
  id: number;
  type: string;
  attributes?: {
    // eslint-disable-next-line camelcase
    viewable_id: number;
    // eslint-disable-next-line camelcase
    viewable_type: string;
    styles: ImageStyle[];
  }
};

export type Property = {
  name: string;
  value: string;
};

export type ProductVariant = {
  _id: number;
  _productId: number;
  _description: string;
  _categoriesRef: string[];
  name: string;
  slug: string;
  sku: string;
  images: Image[];
  properties: Property[];
  breadcrumbs: AgnosticBreadcrumb[];
  optionTypes: OptionType[];
  optionValues: OptionValue[];
  inStock: boolean;
  price: {
    current: number;
    original: number;
  }
  displayPrice: string;
};
