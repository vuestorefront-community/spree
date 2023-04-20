import { Address, ApiContext } from '../../types';
import type { RequiredAnyToken } from '@spree/storefront-api-v2-sdk';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { serializeAddress } from '../serializers/address';

export default async function saveCheckoutBillingAddress(
  { client, config }: ApiContext,
  { billingAddress }: { billingAddress: Address }
): Promise<void> {
  const token = await getCurrentBearerOrCartToken({ client, config }) as RequiredAnyToken;
  const currency = await config.internationalization.getCurrency();
  const result = await client.checkout.orderUpdate({
    ...token,
    order: { bill_address_attributes: serializeAddress(billingAddress) },
    currency
  });

  if (result.isFail()) {
    throw result.fail();
  }
}
