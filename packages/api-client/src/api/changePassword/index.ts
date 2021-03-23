/* eslint-disable camelcase */

export default async function changePassword(context, params) {
  const { newPassword } = params;
  const { bearerToken } = context.config.auth.getToken();

  const passwordData = {
    password: newPassword,
    password_confirmation: newPassword
  };

  await context.client.account.update({ bearerToken }, passwordData);
}
