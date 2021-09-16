import type { CategorySearchResult, LineItem, ProductVariant, Order } from '@upsidelab/vue-storefront-spree-api';
import type { AgnosticGroupedFacet } from '@vue-storefront/core';

export { UseCategory, UseProduct } from '@vue-storefront/core';

export type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export { Cart, Order, LineItem, ProductVariant, Category } from '@upsidelab/vue-storefront-spree-api';

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

export type SearchData = {
  categories: CategorySearchResult;
  products: ProductVariant[],
  productsMeta: Record<string, number>;
  facets: AgnosticGroupedFacet[];
  itemsPerPage: number;
};
