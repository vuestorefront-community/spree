import { ApiContext, PaymentMethods } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { deserializePaymentMethods } from '../serializers/payment';
import { RequiredAnyToken } from '@spree/storefront-api-v2-sdk';

export default async function getPaymentMethods({ client, config }: ApiContext): Promise<PaymentMethods> {
  const token = await getCurrentBearerOrCartToken({ client, config }) as RequiredAnyToken;
  const currency = await config.internationalization.getCurrency();

  const response = await client.checkout.paymentMethods({
    ...token,
    currency
  });

  if (response.isSuccess()) {
    const payload = response.success();
    return deserializePaymentMethods(payload);
  } else {
    throw response.fail();
  }
}
