import { CustomQuery } from "@vue-storefront/core";
import { deserializeAddress } from '../serializers/address';

export default async function getAddresses(context, _params, _customQuery?: CustomQuery) {
  const bearerToken = context.auth.getToken();
  const result = await context.client.account.addressesList({ bearerToken });

  if (result.isSuccess()) {
    const data = result.success().data;
    const addresses = data.map(deserializeAddress);

    return addresses;
  } else {
    throw result.fail();
  }
}