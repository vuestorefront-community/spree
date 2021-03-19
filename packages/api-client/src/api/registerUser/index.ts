import { CustomQuery } from "@vue-storefront/core";

export default async function registerUser(context, params, _customQuery?: CustomQuery) {
  const { email, password } = params;
  const userData = {
    email,
    password,
    passwordConfirmation: password
  };

  await context.client.account.create({
    user: userData
  });
}