import type { RequiredAccountToken } from '@spree/storefront-api-v2-sdk';
import { Logger } from '@vue-storefront/core';
import { ApiContext, Order } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { deserializeCart } from '../serializers/cart';
import { cartParams } from '../common/cart';

export default async function getOrders({ client, config }: ApiContext): Promise<Order[]> {
  try {
    const token = await getCurrentBearerToken({ client, config }) as RequiredAccountToken;
    const response = await client.account.completedOrdersList({ ...token, ...cartParams, per_page: 20 });

    if (response.isSuccess()) {
      const payload = response.success();
      return payload.data.map(order => deserializeCart(order, payload.included, config));
    } else {
      throw response.fail();
    }
  } catch (e) {
    Logger.error(e);
    throw e;
  }
}
