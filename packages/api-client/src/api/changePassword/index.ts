import { ApiContext, ChangePasswordParams } from '../../types';
import type { RequiredAccountToken } from '@spree/storefront-api-v2-sdk';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';

export default async function changePassword({ client, config }: ApiContext, params: ChangePasswordParams): Promise<void> {
  const { newPassword } = params;
  const token = await getCurrentBearerToken({ client, config }) as RequiredAccountToken;

  const passwordData = {user: {
    password: newPassword,
    password_confirmation: newPassword
  }};

  // this needs email address
  await client.account.update({ bearerToken: token.bearer_token }, passwordData);
}
