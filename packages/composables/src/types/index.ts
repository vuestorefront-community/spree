import type { CategorySearchResult, LineItem, ProductVariant, Order, Country, State } from '@vue-storefront/spree-api';
import type { AgnosticGroupedFacet, ComputedProperty } from '@vue-storefront/core';

export { UseCategory, UseProduct } from '@vue-storefront/core';

export type UseCountryErrors = {
  load: Error;
  loadStates: Error;
};

export type UseCountry = {
  countries: ComputedProperty<Country[]>;
  states: ComputedProperty<State[]>;
  loading: ComputedProperty<boolean>
  error: ComputedProperty<UseCountryErrors>
  load(): Promise<void>;
  loadStates(key: string): Promise<void>;
};

export type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export { Cart, Order, LineItem, ProductVariant, Category } from '@vue-storefront/spree-api';

export type UserAddress = Record<string, unknown>;

export type Coupon = Record<string, unknown>;

export type OrderItem = LineItem;

export type Review = Record<string, unknown>;

export type Shipping = Record<string, unknown>;

export type ShippingMethod = Record<string, unknown>;

export type WishlistProduct = Record<string, unknown>;

export type Wishlist = Record<string, unknown>;

export type ProductsResponse = {
  data: ProductVariant[];
  total: number;
};

export type OrderSearchParams = Record<string, any>;

export type OrdersResponse = Order[];

export type PriceRange = {
  min: number;
  max: number;
};

export type SearchParamsOptionTypeFilter = {
  optionTypeName: string;
  optionValueId: number;
};

export type SearchParamsProductPropertyFilter = {
  productPropertyName: string;
  productPropertyValue: string;
}

export type SearchParams = {
  categorySlug?: string;
  term?: string;
  selectedOptionTypeFilters: SearchParamsOptionTypeFilter[];
  selectedProductPropertyFilters: SearchParamsProductPropertyFilter[];
  priceFilter: string;

  page?: number;
  itemsPerPage?: number;
  sort?: string;
};

export type SearchData = {
  categories: CategorySearchResult;
  products: ProductVariant[],
  productsMeta: {
    totalPages: number;
    totalCount: number;
  };
  facets: AgnosticGroupedFacet[];
  itemsPerPage: number;
};

export type PasswordResetResult = {
  isPasswordChanged?: boolean;
};
