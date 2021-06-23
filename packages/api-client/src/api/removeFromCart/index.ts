import { ApiContext, Cart } from '../../types';
import { defaultCartIncludes } from '../common/cart';
import { deserializeCart } from '../serializers/cart';

export default async function removeFromCart({ client, config }: ApiContext, { lineItemId, token }): Promise<Cart> {
  config.auth.changeCartToken(token);
  const result = await client.cart.removeItem({ orderToken: token }, lineItemId, defaultCartIncludes);

  if (result.isSuccess()) {
    const payload = result.success();
    const cart = deserializeCart(payload.data, payload.included, config);
    return cart;
  } else {
    throw result.fail();
  }
}
