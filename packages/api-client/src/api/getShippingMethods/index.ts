import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { deserializeShippingMethods } from '../serializers/shipping';

export default async function getShippingMethods({ client, config }: ApiContext) {
  const token = await getCurrentBearerOrCartToken({ client, config });
  const result = await client.checkout.shippingMethods(token);

  if (result.isSuccess()) {
    const payload = result.success();
    const shippingMethods = payload.included.filter(e => e.type === 'shipping_rate');
    const methods = shippingMethods.map(deserializeShippingMethods);

    return {
      shipmentIds: payload.data.map(e => e.id),
      methods
    };
  } else {
    throw result.fail();
  }
}
