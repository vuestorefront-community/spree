import { AgnosticBreadcrumb, AgnosticGroupedFacet } from '@vue-storefront/core';

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
  styles: ImageStyle[];
};

export type Property = {
  name: string;
  value: string;
};

export type ProductVariant = {
  _id: number;
  _productId: number;
  _variantId: number;
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

export type ProductSearchMetadata = {
  totalPages: number;
  totalCount: number;
  count: number;
  facets: AgnosticGroupedFacet[];
}

export type ProductSearchResult = {
  data: ProductVariant[];
  meta: ProductSearchMetadata;
}
