/* eslint-disable camelcase */

import { ApiContext } from '../../types';

export default async function changePassword({ client, config }: ApiContext, params) {
  const { newPassword } = params;
  const bearerToken = await config.auth.getToken();

  const passwordData = {
    password: newPassword,
    password_confirmation: newPassword
  };

  await client.account.update({ bearerToken }, passwordData);
}
