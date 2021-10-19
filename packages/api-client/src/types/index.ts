import { Client } from '@spree/storefront-api-v2-sdk';
import { IOAuthToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';

export * from './cart';
export * from './product';
export * from './checkout';
export * from './category';
export * from './country';

export type Wishlist = Record<string, unknown>;

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

export type GetProductsOptionTypeFilter = {
  optionTypeName: string;
  optionValueId: number;
};

export type GetProductsPropertyFilter = {
  productPropertyName: string;
  productPropertyValue: string;
};

export type GetProductsParams = {
  categoryId: string;
  term: string;

  optionTypeFilters:GetProductsOptionTypeFilter[],
  productPropertyFilters: GetProductsPropertyFilter[],
  priceFilter: string;

  page: number;
  itemsPerPage: number;
  sort: string;
}
