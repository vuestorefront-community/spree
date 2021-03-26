import { ApiContext, Checkout } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { deserializeCheckout } from '../serializers/checkout';

export default async function getCheckout({ client, config }: ApiContext): Promise<Checkout> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  const result = await client.cart.show({ bearerToken }, { include: 'shipping_address,billing_address' });

  if (result.isSuccess()) {
    const payload = result.success();
    return deserializeCheckout(payload.data, payload.included);
  } else {
    throw result.fail();
  }
}
