import { CustomQuery } from "@vue-storefront/core";

const formatAddress = (apiAddress) => ({
  id: apiAddress.id,
  firstName: apiAddress.attributes.firstname,
  lastName: apiAddress.attributes.lastname,
  company: apiAddress.attributes.company,
  addressLine1: apiAddress.attributes.address1,
  addressLine2: apiAddress.attributes.address2,
  postalCode: apiAddress.attributes.zipcode,
  city: apiAddress.attributes.city,
  state: apiAddress.attributes.state_code,
  countryName: apiAddress.attributes.country_name,
  phone: apiAddress.attributes.phone
})

export default async function getAddresses(context, _params, _customQuery?: CustomQuery) {
  const bearerToken = context.auth.getToken();
  const result = await context.client.account.addressesList({ bearerToken });

  if (result.isSuccess()) {
    const data = result.success().data;
    const addresses = data.map(formatAddress);

    return addresses;
  } else {
    throw result.fail();
  }
}