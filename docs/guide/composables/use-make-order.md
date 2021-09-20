# useMakeOrder

## Features

`useMakeOrder` composable can be used to finalize an order.

## API

- `make` - function for making an order. It takes current cart from cookies.

- `loading: boolean` - indicates whether making order is in progress.

- `error: UseMakeOrderErrors` -  the error object that contains the error details if the `make` method fails.
