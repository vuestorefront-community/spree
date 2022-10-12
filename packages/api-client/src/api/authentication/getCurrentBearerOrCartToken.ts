import { OptionalAnyToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';
import { ApiContext } from '../../types';
import getCurrentBearerToken from './getCurrentBearerToken';
import getCurrentCartToken from './getCurrentCartToken';

export default async function getCurrentBearerOrCartToken({ client, config }: ApiContext): Promise<OptionalAnyToken> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  if (bearerToken) return bearerToken;

  const cartToken = await getCurrentCartToken(config);
  if (cartToken) return cartToken;

  return {};
}
