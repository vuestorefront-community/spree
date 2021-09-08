import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { deserializePaymentMethods } from '../serializers/payment';

export default async function getPaymentMethods({ client, config }: ApiContext) {
  const token = await getCurrentBearerOrCartToken({ client, config });
  const result = await client.checkout.paymentMethods(token);

  if (result.isSuccess()) {
    const payload = result.success();
    return payload.data.map(deserializePaymentMethods);
  } else {
    throw result.fail();
  }
}
