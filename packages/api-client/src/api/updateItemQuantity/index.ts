import { ApiContext, Cart } from '../../types';
import { cartParams } from '../common/cart';
import { deserializeCart } from '../serializers/cart';

export default async function updateItemQuantity({ client, config }: ApiContext, { lineItemId, quantity, token }): Promise<Cart> {
  try {
    config.auth.changeCartToken(token);

    const result = await client.cart.setQuantity(
      {
        orderToken: token
      },
      {
        line_item_id: lineItemId,
        quantity,
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
    console.error(e);
    throw e;
  }
}
