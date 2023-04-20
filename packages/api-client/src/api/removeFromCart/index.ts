import { Logger } from '@vue-storefront/core';
import { ApiContext, Cart } from '../../types';
import { cartParams } from '../common/cart';
import { deserializeCart } from '../serializers/cart';
import { RemoveFromCartParams } from '../../types';

export default async function removeFromCart(
  { client, config }: ApiContext,
  { lineItemId, token }: RemoveFromCartParams
): Promise<Cart> {
  try {
    config.auth.changeCartToken(token);
    const currency = await config.internationalization.getCurrency();
    const result = await client.cart.removeItem({ id: lineItemId, order_token: token, ...cartParams, currency });

    if (result.isSuccess()) {
      const payload = result.success();
      const cart = deserializeCart(payload.data, payload.included, config);
      return cart;
    } else {
      throw result.fail();
    }
  } catch (e) {
    Logger.error(e);
    throw e;
  }
}
