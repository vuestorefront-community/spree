import { Address, ApiContext } from '../../types';
import getCurrentCartToken from '../authentication/getCurrentCartToken';
import { serializeAddress } from '../serializers/address';

export default async function saveCheckoutShippingAddress({ client, config }: ApiContext, { shippingAddress }: { shippingAddress: Address }) {
  const token = await getCurrentCartToken(config);
  const result = await client.checkout.orderUpdate(token, { order: { ship_address_attributes: serializeAddress(shippingAddress) } });

  if (result.isFail()) {
    throw result.fail();
  }
}
