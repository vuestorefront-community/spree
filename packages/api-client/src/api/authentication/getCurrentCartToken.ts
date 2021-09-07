import { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';
import { ApiConfig } from '../../types';

export default async function getCurrentCartToken(config: ApiConfig): Promise<IToken> {
  const cartToken = await config.auth.getCartToken();
  if (cartToken) {
    return { orderToken: cartToken };
  }

  return undefined;
}
