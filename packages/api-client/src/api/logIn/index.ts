import { CustomQuery } from '@vue-storefront/core';

export default async function logIn(context, params, _customQuery?: CustomQuery) {
  const { username, password } = params;

  const response = await context.client.authentication.getToken({ username, password });

  if (response.isSuccess()) {
    const bearerToken = response.success().access_token;
    context.auth.changeToken(bearerToken);
  } else {
    throw response.fail();
  }
}