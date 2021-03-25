import { Client } from '@spree/storefront-api-v2-sdk';

export type Cart = Record<string, unknown>;
export type Wishlist = Record<string, unknown>;
export type ProductVariant = {
  _id: number;
  _description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  images: string[];
  price: {
    original: number;
    current: number;
  };
};
export type Category = {
  id: number;
  name: string;
  slug: string;
  items: Category[];
};
export type CategoryFilter = Record<string, unknown>;
export type ShippingMethod = Record<string, unknown>;
export type LineItem = Record<string, unknown>;

export type ApiContext = {
  client: Client;
  config: {
    auth: {
      getToken: () => Promise<string>;
      changeToken: (newValue: string) => Promise<void>;
      removeToken: () => Promise<void>;
    };
  };
}
