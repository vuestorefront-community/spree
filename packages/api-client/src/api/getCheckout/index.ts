import { ApiContext, Checkout } from '../../types';
import { deserializeCheckout } from '../serializers/checkout';

export default async function getCheckout({ client, config }: ApiContext): Promise<Checkout> {
  const bearerToken = await config.auth.getToken();
  const result = await client.cart.show({ bearerToken }, { include: 'shipping_address,billing_address' });

  if (result.isSuccess()) {
    const payload = result.success();
    return deserializeCheckout(payload.data, payload.included);
  } else {
    throw result.fail();
  }
}
