import type { OptionalAnyToken } from '@spree/storefront-api-v2-sdk';
import { Logger } from '@vue-storefront/core';
import { ApiContext } from '../../types';

export default async function getCurrentBearerToken({ client, config }: ApiContext): Promise<OptionalAnyToken> {
  const token = await config.auth.getOAuthToken();
  if (!token) return;

  const tokenExpiresAt = token.created_at + token.expires_in;
  const currentTime = Date.now() / 1000;

  if (currentTime < tokenExpiresAt) {
    return { bearer_token: token.access_token };
  }

  const result = await client.authentication.refreshToken({ refresh_token: token.refresh_token });
  if (result.isFail()) {
    await config.auth.removeOAuthToken();
    await config.auth.removeCartToken();
    Logger.error(result.fail());

    return;
  }

  const newToken = result.success();
  await config.auth.changeOAuthToken(newToken);

  return { bearer_token: newToken.access_token };
}
