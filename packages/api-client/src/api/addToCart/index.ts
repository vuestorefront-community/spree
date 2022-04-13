import { Logger } from '@vue-storefront/core';
import { AddToCartParams, ApiContext, Cart } from '../../types';
import { cartParams } from '../common/cart';
import { deserializeCart } from '../serializers/cart';

export default async function addToCart({ client, config }: ApiContext, { token, variantId, quantity }: AddToCartParams): Promise<Cart> {
  try {
    config.auth.changeCartToken(token);
    const currency = await config.internationalization.getCurrency();

    const result = await client.cart.addItem(
      {
        orderToken: token
      },
      {
        variant_id: variantId,
        quantity,
        currency,
        ...cartParams
      }
    );

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
