import { Client } from '@spree/storefront-api-v2-sdk';

export type OptionValue = {
  id: number;
  type: string;
  attributes?: {
    name: string;
    position: number;
    presentation: string;
  };
  relationships?: {
    // eslint-disable-next-line camelcase
    option_type: {
      data: {
        id: number;
        type: string;
      }
    }
  }
}

export type OptionType = {
  id: number;
  type: string;
  attributes?: {
    name: string;
    position: number;
    presentation: string;
  };
  relationships?: {
    // eslint-disable-next-line camelcase
    option_values: {
      data: OptionValue[];
    }
  }
}

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
  optionTypes: OptionType[];
  optionValues: OptionValue[];
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
