export const deserializeAddress = (apiAddress) => ({
  id: apiAddress.id,
  firstName: apiAddress.attributes.firstname,
  lastName: apiAddress.attributes.lastname,
  company: apiAddress.attributes.company,
  addressLine1: apiAddress.attributes.address1,
  addressLine2: apiAddress.attributes.address2,
  postalCode: apiAddress.attributes.zipcode,
  city: apiAddress.attributes.city,
  state: apiAddress.attributes.state_code,
  country: apiAddress.attributes.country_iso,
  phone: apiAddress.attributes.phone
});

export const serializeAddress = (address) => ({
  id: address.id,
  firstname: address.firstName,
  lastname: address.lastName,
  company: address.company,
  address1: address.addressLine1,
  address2: address.addressLine2,
  zipcode: address.postalCode,
  city: address.city,
  state_code: address.state,
  country_iso: address.country,
  phone: address.phone
});