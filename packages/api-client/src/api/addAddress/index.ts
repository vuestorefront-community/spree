import { RequiredAccountToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';
import { Address, ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { serializeAddress } from '../serializers/address';

export default async function addAddress({ client, config }: ApiContext, params: Address): Promise<void> {
  const token = await getCurrentBearerToken({ client, config }) as RequiredAccountToken;
  const serializedAddress = serializeAddress(params);
  const result = await client.account.createAddress({ ...token, address: serializedAddress });

  if (result.isFail()) {
    throw result.fail();
  }
}
