import { CustomQuery } from "@vue-storefront/core";

export default async function getAddresses(context, _params, _customQuery?: CustomQuery) {
  const bearerToken = context.auth.getToken();
  const result = await context.client.account.addressesList({ bearerToken });

  if (result.isSuccess()) {
    const data = result.success().data;
    const addresses = data.map(e => ({ id: e.id, ...e.attributes }));

    return addresses;
  } else {
    throw result.fail();
  }
}