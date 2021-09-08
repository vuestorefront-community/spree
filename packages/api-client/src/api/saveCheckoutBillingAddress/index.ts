import { Address, ApiContext } from '../../types';
import getCurrentCartToken from '../authentication/getCurrentCartToken';
import { serializeAddress } from '../serializers/address';

export default async function saveCheckoutShippingAddress({ client, config }: ApiContext, { billingAddress }: { billingAddress: Address }) {
  const token = await getCurrentCartToken(config);
  const result = await client.checkout.orderUpdate(token, { order: { bill_address_attributes: serializeAddress(billingAddress) } });

  if (result.isFail()) {
    throw result.fail();
  }
}
