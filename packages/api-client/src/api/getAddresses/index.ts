import type { RequiredAccountToken } from '@spree/storefront-api-v2-sdk';
import { Address, ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { deserializeAddress } from '../serializers/address';

export default async function getAddresses({ client, config }: ApiContext): Promise<Address[]> {
  const token = await getCurrentBearerToken({ client, config }) as RequiredAccountToken;
  const result = await client.account.addressesList({ ...token });

  if (result.isSuccess()) {
    const data = result.success().data;
    const addresses = data.map(deserializeAddress);

    return addresses;
  } else {
    throw result.fail();
  }
}
