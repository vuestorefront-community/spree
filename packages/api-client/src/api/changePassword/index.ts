import { ApiContext, ChangePasswordParams } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';

export default async function changePassword({ client, config }: ApiContext, params: ChangePasswordParams): Promise<void> {
  const { newPassword } = params;
  const { bearer_token } = await getCurrentBearerToken({ client, config });

  const passwordData = {user: {
    password: newPassword,
    password_confirmation: newPassword
  }};

  await client.account.update({ bearerToken: bearer_token }, passwordData);
}
