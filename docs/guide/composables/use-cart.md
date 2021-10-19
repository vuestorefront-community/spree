# useCart

## Features

`useCart` composable can be used to:
- load cart information
- add, update and remove items in cart
- apply and remove coupons
- checking if a product is already in the cart

## API
- `cart: Cart` - main data object
  ```ts
  type Cart = {
      _id: number;
      email: string;
      number: string;
      state: string;
      total: string;
      totalAmount: number;
      itemTotal: string;
      itemTotalAmount: number;
      shipTotal: string;
      shipTotalAmount: number;
      taxTotalAmount: number;
      adjustmentTotal: string;
      lineItems: LineItem[];
      completedAt: Date;
      token: string;
      address: {
          shipping: Address;
          billing: Address;
      };
  };

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

- `load` - function to load cart information. If there is no cart assigned to current session/user, it will return a dummy cart without creating it in the backend.

- `addItem` - function to add an item to the cart. It requires the following params:
  - `currentCart: Cart`
  - `product: ProductVariant`
  - `quantity: number`

- `removeItem` - function to remove an item from the cart. It requires the following params:
  - `currentCart: Cart`
  - `product: LineItem`

- `updateItemQty` - function to update the quantity of an item in the cart. It requires the following params:
  - `currentCart: Cart`
  - `product: LineItem`
  - `quantity: number`

- `clear` - function to remove all items from the cart. It requieres the following params:
  - `currentCart: Cart`

- `applyCoupon` - function to apply a coupon to the cart. It requires the following params:
  - `currentCart: Cart`
  - `couponCode: string`

- `removeCoupon` - function to remove a coupon from the cart. It requires the following params:
  - `currentCart: Cart`
  - `couponCode: string`

- `isInCart` - function to check if a product is already in the cart. It requires the following params:
  - `currentCart: Cart`
  - `product: ProductVariant`
