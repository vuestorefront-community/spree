import { Client } from '@spree/storefront-api-v2-sdk';
import { IOAuthToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';

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

export type ImageStyle = {
  height: string;
  width: string;
  url: string;
}

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
}

export type Property = {
  name: string,
  value: string,
}

export type Breadcrumb = {
  text: string,
  link: string
}

export type LineItem = {
  _id: number;
  _variantId: number;
  _description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  images: string[];
  price: {
    original: number;
    current: number;
  };
  qty: number;
}

export type Cart = {
  _id: number;
  lineItems: LineItem[];
};

export type Wishlist = Record<string, unknown>;
export type ProductVariant = {
  _id: number;
  _description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  images: Image[];
  properties: Property[];
  breadcrumbs: Breadcrumb[];
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

export type ApiContext = {
  client: Client;
  config: {
    auth: AuthIntegrationContext;
  };
}

export type Address = {
  _id: string;
  firstName: string;
  lastName: string;
  company: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
};

export type CouponCode = {
  couponCode: string;
}

export type Checkout = {
  shippingAddress: Address;
  billingAddress: Address;
}
