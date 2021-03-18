import { CustomQuery } from "@vue-storefront/core";

export default async function changePassword(context, params, _customQuery?: CustomQuery) {
  const { newPassword } = params;
  const { bearerToken } = context.auth.getToken();

  const passwordData = {
    password: newPassword,
    password_confirmation: newPassword,
  };

  await context.client.account.update({ bearerToken }, passwordData);
}