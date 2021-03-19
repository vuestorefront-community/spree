import { CustomQuery } from "@vue-storefront/core";

export default async function addAddress(context, params, _customQuery: CustomQuery) {
  const bearerToken = context.auth.getToken();
  const address = {
    ...params
  }

  await context.client.account.createAddress({ bearerToken }, { address });
}