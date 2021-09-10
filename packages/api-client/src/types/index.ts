import { Client } from '@spree/storefront-api-v2-sdk';
import { IOAuthToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';

export * from './cart';
export * from './product';
export * from './checkout';

export type Wishlist = Record<string, unknown>;

export type Category = {
  id: number;
  name: string;
  slug: string;
  items?: Category[];
  parent?: Category;
};
export type CategoryFilter = Record<string, unknown>;
export type ShippingMethod = Record<string, unknown>;

export type AuthIntegration = {
  getOAuthToken: () => IOAuthToken;
  changeOAuthToken: (newValue: IOAuthToken) => void;
  removeOAuthToken: () => void;

  getCartToken: () => string;
  changeCartToken: (newValue: string) => void;
  removeCartToken: () => void;
}

export type AuthIntegrationContext = {
  getOAuthToken: () => Promise<IOAuthToken>;
  changeOAuthToken: (newValue: IOAuthToken) => Promise<void>;
  removeOAuthToken: () => Promise<void>;

  getCartToken: () => Promise<string>;
  changeCartToken: (newValue: string) => Promise<void>;
  removeCartToken: () => Promise<void>;
}

export type ApiConfig = {
  auth: AuthIntegrationContext;
  backendUrl: string;
  spreeFeatures: {
    associateGuestCart: boolean;
    fetchPrimaryVariant: boolean;
  }
}

export type ApiContext = {
  client: Client;
  config: ApiConfig;
}

export type GetProductParams = {
  id: string;
  categoryId: string;
  term: string;
  page: number;
  sort: string;
  optionValuesIds: number[];
  price: number;
  itemsPerPage: number;
}
