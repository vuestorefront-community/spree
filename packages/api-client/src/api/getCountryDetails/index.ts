import { CustomQuery } from "@vue-storefront/core";

const formatCountry = (apiCountry, includedStates) => ({
  iso: apiCountry.attributes.iso,
  name: apiCountry.attributes.name,
  stateRequired: apiCountry.attributes.state_required,
  postalCodeRequired: apiCountry.attributes.zipcode_required,
  isDefault: apiCountry.attributes.default,
  states: includedStates.map(formatState)
});

const formatState = (apiState) => ({
  code: apiState.attributes.abbr,
  name: apiState.attributes.name
});

export default async function getAvailableCountries(context, { iso }, _customQuery?: CustomQuery) {
  const result = await context.client.countries.show(iso, { include: 'states' });
  if (result.isSuccess()) {
    const includedStates = result.success().included;
    const apiCountry = result.success().data;
    return formatCountry(apiCountry, includedStates);
  } else {
    throw result.fail();
  }
}