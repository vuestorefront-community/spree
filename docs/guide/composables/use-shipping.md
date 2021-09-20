# useShipping

## Features

`useShipping` composable can be used to:
- load shipping address from the current cart
- save shipping address for the current cart

## API

- `load` - function for fetching shipping address. It takes current cart from cookies.

- `save` - function for saving shipping address. It takes current cart from cookies. It requires the following params:
  - `shippingDetails: Address`

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

- `shipping` - main data object, holding shipping address.

- `loading: boolean` - boolean indicating if the `load` or `save` is still in progress.

- `error: UseShippingErrors` - error object, holding information if the `load` or `save` failed.
