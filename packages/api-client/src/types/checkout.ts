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

export type AddressWithEmail = Address & {
  email: string | undefined;
}

export type ShippingRate = {
  id: string;
  methodId: string;
  name: string;
  selected: boolean;
  cost: string;
};

export type Shipment = {
  id: string;
  availableShippingRates: ShippingRate[];
}

export type Checkout = {
  email: string;
  shippingAddress: Address;
  billingAddress: Address;
};
