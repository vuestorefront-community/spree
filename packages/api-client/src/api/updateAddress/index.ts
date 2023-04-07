import type { RequiredAccountToken, AccountAddressAttr } from '@spree/storefront-api-v2-sdk';
import { Address, ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { serializeAddress } from '../serializers/address';

export default async function updateAddress({ client, config }: ApiContext, params: Address): Promise<AccountAddressAttr> {
  const token = await getCurrentBearerToken({ client, config }) as RequiredAccountToken;
  const serializedAddress = serializeAddress(params);
  const result = await client.account.updateAddress({ ...token, id: params._id, address: serializedAddress });

  if (result.isSuccess()) {
    const data = result.success().data;
    return data;
  } else {
    throw result.fail();
  }
}
