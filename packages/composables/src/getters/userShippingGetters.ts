import { UserShippingGetters } from '@vue-storefront/core';

const UserShippingGetters: UserShippingGetters<any, any> = {
  getAddresses: (shipping, criteria?: Record<string, any>) => {
    const { addresses } = shipping;
    if (!criteria || !Object.keys(criteria).length) {
      return addresses;
    }
    const entries = Object.entries(criteria);
    return shipping.addresses.filter((address) =>
      entries.every(([key, value]) => address[key] === value)
    );
  },
  getDefault: (shipping) =>
    shipping.addresses.find((address) => address.isDefault),
  getTotal: (shipping) => shipping.addresses.length,
  getPostCode: (address) => address?.zipCode ?? '',
  getStreetName: (address) => address?.streetName ?? '',
  getStreetNumber: (address) => address?.streetNumber ?? '',
  getCity: (address) => address?.city ?? '',
  getFirstName: (address) => address?.firstName ?? '',
  getLastName: (address) => address?.lastName ?? '',
  getCountry: (address) => address?.country ?? '',
  getPhone: (address) => address?.phoneNumber ?? '',
  getEmail: (address) => address?.email ?? '',
  getProvince: (address) => address?.state ?? '',
  getCompanyName: (address) => address?.company ?? '',
  getTaxNumber: (address) => address?.taxId ?? '',
  getId: (address) => address?._id ?? '',
  getApartmentNumber: (address) => address?.apartment ?? '',
  isDefault: (address) => address?.isDefault ?? false
};

export default UserShippingGetters;
