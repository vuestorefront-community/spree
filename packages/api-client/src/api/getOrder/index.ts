import { Logger } from '@vue-storefront/core';
import { ApiContext, GetOrderParams, Order } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { deserializeCart } from '../serializers/cart';
import { cartParams } from '../common/cart';

export default async function getOrder({ client, config }: ApiContext, { orderId }: GetOrderParams): Promise<Order> {
  try {
    const token = await getCurrentBearerToken({ client, config });
    const response = await client.account.completedOrder({ bearerToken: token }, orderId, { ...cartParams });

    if (response.isSuccess()) {
      const payload = response.success();
      return deserializeCart(payload.data, payload.included, config);
    } else {
      throw response.fail();
    }
  } catch (e) {
    Logger.error(e);
    throw e;
  }
}
