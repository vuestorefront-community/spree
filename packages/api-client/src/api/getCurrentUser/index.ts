import type { RequiredAccountToken } from '@spree/storefront-api-v2-sdk';
import { ApiContext } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { deserializeUser } from '../serializers/user';
import { User } from '../../types';

export default async function getCurrentUser({ client, config }: ApiContext): Promise<User> {
  const token = await getCurrentBearerToken({ client, config }) as RequiredAccountToken;

  const response = await client.account.accountInfo({ ...token });
  if (response.isSuccess()) {
    return deserializeUser(response.success().data);
  } else {
    throw response.fail();
  }
}
