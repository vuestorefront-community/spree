import { ApiContext, Checkout } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { deserializeCheckout } from '../serializers/checkout';

export default async function getCheckout({ client, config }: ApiContext): Promise<Checkout> {
  const token = await getCurrentBearerOrCartToken({ client, config });
  const result = await client.cart.show(token, { include: 'shipping_address,billing_address' });

  if (result.isSuccess()) {
    const payload = result.success();
    return deserializeCheckout(payload.data, payload.included);
  } else {
    throw result.fail();
  }
}
