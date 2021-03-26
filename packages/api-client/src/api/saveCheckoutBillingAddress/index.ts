/* eslint-disable camelcase */

import { Address, ApiContext } from '../../types';
import { serializeAddress } from '../serializers/address';

export default async function saveCheckoutShippingAddress({ client, config }: ApiContext, { billingAddress }: { billingAddress: Address }) {
  const bearerToken = await config.auth.getToken();
  const result = await client.checkout.orderUpdate({ bearerToken }, { order: { bill_address_attributes: serializeAddress(billingAddress) } });

  if (result.isFail()) {
    throw result.fail();
  }
}
