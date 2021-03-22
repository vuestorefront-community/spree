import { CustomQuery } from "@vue-storefront/core";

const formatCountry = (apiCountry) => ({
  name: apiCountry.attributes.iso,
  label: apiCountry.attributes.name,
  stateRequired: apiCountry.attributes.state_required,
  postalCodeRequired: apiCountry.attributes.zipcode_required,
  isDefault: apiCountry.attributes.default
});

export default async function getAvailableCountries(context, _params, _customQuery?: CustomQuery) {
  const result = await context.client.countries.list();
  if (result.isSuccess()) {
    return result.success().data.map(formatCountry);
  } else {
    throw result.fail();
  }
}