export type State = {
  code: string;
  name: string;
};

export type Country = {
  key: string;
  label: string;
  stateRequired: boolean;
  postalCodeRequired: boolean;
  isDefault: boolean;
  states?: State[];
};
