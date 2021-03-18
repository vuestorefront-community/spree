import { CustomQuery } from '@vue-storefront/core';

export default async function getCurrentUser(context, _params, _customQuery?: CustomQuery) {
  const bearerToken = context.auth.getToken();

  const response = await context.client.accountInfo({ bearerToken });
  if (response.isSuccess()) {
    return response.success()
  } else {
    throw response.fail()
  }
}