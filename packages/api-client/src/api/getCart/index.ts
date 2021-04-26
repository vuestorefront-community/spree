import { IQuery } from '@spree/storefront-api-v2-sdk/types/interfaces/Query';
import { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';
import { ApiContext, Cart } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { deserializeCart } from '../serializers/cart';

const cartParams: IQuery = { include: 'line_items' };

async function createCart({ client }: ApiContext, token: IToken): Promise<Cart> {
  const createCartResult = await client.cart.create(token, cartParams);

  if (createCartResult.isSuccess()) {
    const payload = createCartResult.success();
    return deserializeCart(payload.data, payload.included);
  } else {
    throw createCartResult.fail();
  }
}

export default async function getCart({ client, config }: ApiContext): Promise<Cart> {
  const token = await getCurrentBearerOrCartToken({ client, config });
  const result = await client.cart.show(token, cartParams);

  if (result.isSuccess()) {
    const payload = result.success();
    return deserializeCart(payload.data, payload.included);
  }

  return await createCart({ client, config }, token);
}
