/* eslint-disable camelcase */

import { ApiContext, Cart } from '../../types';
import { defaultCartIncludes } from '../common/cart';
import { deserializeCart } from '../serializers/cart';

export default async function addToCart({ client, config }: ApiContext, { token, variantId, quantity }): Promise<Cart> {
  config.auth.changeCartToken(token);

  const result = await client.cart.addItem(
    {
      orderToken: token
    },
    {
      variant_id: variantId,
      quantity: quantity,
      ...defaultCartIncludes
    }
  );

  if (result.success()) {
    const payload = result.success();
    const cart = deserializeCart(payload.data, payload.included, config);
    return cart;
  } else {
    throw result.fail();
  }
}
