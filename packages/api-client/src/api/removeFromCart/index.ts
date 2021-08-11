import { ApiContext, Cart } from '../../types';
import { cartParams } from '../common/cart';
import { deserializeCart } from '../serializers/cart';

export default async function removeFromCart({ client, config }: ApiContext, { lineItemId, token }): Promise<Cart> {
  try {
    config.auth.changeCartToken(token);
    const result = await client.cart.removeItem({ orderToken: token }, lineItemId, cartParams);

    if (result.isSuccess()) {
      const payload = result.success();
      const cart = deserializeCart(payload.data, payload.included, config);
      return cart;
    } else {
      throw result.fail();
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}
