import { ApiContext, Cart } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { deserializeCart } from '../serializers/cart';
import { cartParams } from '../common/cart';

const emptyCart: Cart = {
  _id: 0,
  email: '',
  number: '',
  state: 'cart',
  total: '',
  totalAmount: 0.0,
  itemTotalAmount: 0.0,
  itemTotal: '',
  shipTotal: '',
  shipTotalAmount: 0.0,
  taxTotalAmount: 0.0,
  adjustmentTotal: '',
  lineItems: [],
  itemCount: 0,
  completedAt: new Date(),
  address: {
    shipping: undefined,
    billing: undefined
  },
  token: undefined
};

export default async function getCart({ client, config }: ApiContext): Promise<Cart> {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config });

    // User is not signed in nor has a cart
    // We're returning dummy cart here not to create empty carts in the backend
    // We'll create a proper cart when user adds to cart
    if (!token) {
      return emptyCart;
    }

    const result = await client.cart.show(token, cartParams);

    if (result.isSuccess()) {
      const payload = result.success();
      const cart = deserializeCart(payload.data, payload.included, config);

      return cart;
    } else {
      throw result.fail();
    }
  } catch (e) {
    console.error(e);
    return emptyCart;
  }
}
