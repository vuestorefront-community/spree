import { Country, State } from '../../types/country';

export const deserializeState = (apiState): State => ({
  code: apiState.attributes.abbr,
  name: apiState.attributes.name
});

export const deserializeCountry = (apiCountry, includedStates): Country => ({
  key: apiCountry.attributes.iso,
  label: apiCountry.attributes.name,
  stateRequired: apiCountry.attributes.states_required,
  postalCodeRequired: apiCountry.attributes.zipcode_required,
  isDefault: apiCountry.attributes.default,
  states: includedStates.map(deserializeState)
});
