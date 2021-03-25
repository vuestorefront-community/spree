import { SpreeError } from '@spree/storefront-api-v2-sdk/types/errors';
import { IQuery } from '@spree/storefront-api-v2-sdk/types/interfaces/Query';
import { ApiContext, Cart } from '../../types';
import { deserializeCart } from '../serializers/cart';

const cartParams: IQuery = { include: 'line_items' };

export default async function getCart({ client, config }: ApiContext): Promise<Cart> {
  const bearerToken = await config.auth.getToken();
  const result = await client.cart.show({ bearerToken }, cartParams);

  if (result.isSuccess()) {
    const payload = result.success();
    const cart = deserializeCart(payload.data, payload.included);
    return cart;
  } else {
    const error = result.fail() as SpreeError;
    const serverResponse = error.serverResponse;
    if (serverResponse && serverResponse.status === 404) {
      const createCartResult = await client.cart.create({ bearerToken }, cartParams);

      if (createCartResult.isSuccess()) {
        const payload = createCartResult.success();
        const cart = deserializeCart(payload.data, payload.included);
        return cart;
      } else {
        throw result.fail();
      }
    }
  }
}
