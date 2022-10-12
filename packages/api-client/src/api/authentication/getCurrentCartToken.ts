import { OptionalAnyToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';
import { ApiConfig } from '../../types';

export default async function getCurrentCartToken(config: ApiConfig): Promise<OptionalAnyToken> {
  const cartToken = await config.auth.getCartToken();
  if (cartToken) {
    return { order_token: cartToken };
  }

  return undefined;
}
