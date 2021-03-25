import { ApiContext } from '../../types';
import { deserializeAddress } from '../serializers/address';

export default async function getAddresses({ client, config }: ApiContext) {
  const bearerToken = await config.auth.getToken();
  const result = await client.account.addressesList({ bearerToken });

  if (result.isSuccess()) {
    const data = result.success().data;
    const addresses = data.map(deserializeAddress);

    return addresses;
  } else {
    throw result.fail();
  }
}
