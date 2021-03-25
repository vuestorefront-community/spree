/* eslint-disable camelcase */

export const deserializeState = (apiState) => ({
  code: apiState.attributes.abbr,
  name: apiState.attributes.name
});

export const deserializeCountry = (apiCountry, includedStates) => ({
  iso: apiCountry.attributes.iso,
  name: apiCountry.attributes.name,
  stateRequired: apiCountry.attributes.state_required,
  postalCodeRequired: apiCountry.attributes.zipcode_required,
  isDefault: apiCountry.attributes.default,
  states: includedStates.map(deserializeState)
});
