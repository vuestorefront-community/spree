# useBilling

## Features

`useBilling` composable can be used to:
- load billing address from the current cart
- save billing address for the current cart

## API

- `load` - function for fetching billing address. It takes current cart from cookies.

- `save` - function for saving billing address. It takes current cart from cookies. It requires the following params:
  - `billingDetails: Address`

  ```ts
  type Address = {
    _id: string;
    firstName: string;
    lastName: string;
    company: string;
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    phone: string;
  };
  ```

- `billing` - main data object, holding billing address.

- `loading: boolean` - boolean indicating if the `load` or `save` is still in progress.

- `error: UseBillingErrors` - error object, holding information if the `load` or `save` failed.
