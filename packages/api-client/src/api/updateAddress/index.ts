import { serializeAddress } from '../serializers/address';

export default async function updateAddress(context, params) {
  const bearerToken = context.config.auth.getToken();
  const serializedAddress = serializeAddress(params);
  const result = await context.client.account.updateAddress({ bearerToken }, params.id, { address: serializedAddress });

  if (result.isSuccess()) {
    const data = result.success.data;
    return data;
  } else {
    throw result.fail();
  }
}
