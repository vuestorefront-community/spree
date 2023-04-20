import { CountryAttr, JsonApiDocument } from '@spree/storefront-api-v2-sdk';
import { Country, State } from '../../types/country';

export const deserializeState = (apiState: JsonApiDocument): State => ({
  code: apiState.attributes.abbr,
  name: apiState.attributes.name
});

export const deserializeCountry = (
  apiCountry: CountryAttr,
  includedStates: JsonApiDocument[]
): Country => ({
  key: apiCountry.attributes.iso,
  label: apiCountry.attributes.name,
  stateRequired: apiCountry.attributes.states_required,
  postalCodeRequired: apiCountry.attributes.zipcode_required,
  isDefault: apiCountry.attributes.default,
  states: includedStates.map(deserializeState)
});
