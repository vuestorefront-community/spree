import { CustomQuery } from "@vue-storefront/core";

const formatCountry = (apiCountry) => ({
  iso: apiCountry.attributes.iso,
  name: apiCountry.attributes.name,
  isStateRequired: apiCountry.attributes.state_required,
  isPostalCodeRequired: apiCountry.attributes.zipcode_required,
  isDefault: apiCountry.attributes.default
});

export default async function getAvailableCountries(context, _params, _customQuery?: CustomQuery) {
  const result = await context.client.countries.list({ include: 'states' });
  if (result.isSuccess()) {
    return result.success().data.map(formatCountry);
  } else {
    throw result.fail();
  }
}