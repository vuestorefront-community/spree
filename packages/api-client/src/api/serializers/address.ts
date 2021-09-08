import { AccountAddressAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Account';
import { IAddress } from '@spree/storefront-api-v2-sdk/types/interfaces/attributes/Address';
import { Address } from '../../types';

export const deserializeAddress = (apiAddress: AccountAddressAttr): Address => ({
  _id: apiAddress.id,
  firstName: apiAddress.attributes.firstname,
  lastName: apiAddress.attributes.lastname,
  company: apiAddress.attributes.company,
  addressLine1: apiAddress.attributes.address1,
  addressLine2: apiAddress.attributes.address2,
  postalCode: apiAddress.attributes.zipcode,
  city: apiAddress.attributes.city,
  state: apiAddress.attributes.state_name,
  country: apiAddress.attributes.country_iso,
  phone: apiAddress.attributes.phone
});

export const serializeAddress = (address: Address): IAddress => ({
  firstname: address.firstName,
  lastname: address.lastName,
  company: address.company,
  address1: address.addressLine1,
  address2: address.addressLine2,
  zipcode: address.postalCode,
  city: address.city,
  state_name: address.state,
  country_iso: address.country,
  phone: address.phone
});
